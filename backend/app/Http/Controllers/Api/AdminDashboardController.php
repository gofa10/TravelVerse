<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Hotel;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\Review;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Facades\Auth;

class AdminDashboardController extends Controller
{
    public function index()
    {
        if (!Auth::check() || Auth::user()->user_type !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $funnelCountsRaw = Reservation::selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        $reservationFunnel = [
            'saved' => (int) ($funnelCountsRaw['saved'] ?? 0),
            'redirect_pending' => (int) ($funnelCountsRaw['redirect_pending'] ?? 0),
            'booking_claimed' => (int) ($funnelCountsRaw['booking_claimed'] ?? 0),
            'booking_declined' => (int) ($funnelCountsRaw['booking_declined'] ?? 0),
            'left_without_booking' => (int) ($funnelCountsRaw['left_without_booking'] ?? 0),
            'cancelled' => (int) ($funnelCountsRaw['cancelled'] ?? 0),
        ];

        $conversionDenominator = $reservationFunnel['booking_claimed'] + $reservationFunnel['booking_declined'] + $reservationFunnel['left_without_booking'];
        $bookingConversionRate = $conversionDenominator > 0
            ? round(($reservationFunnel['booking_claimed'] / $conversionDenominator) * 100)
            : 0;

        $stats = [
            'total_users' => User::where('user_type', 'user')->count(),
            'total_guides' => User::where('user_type', 'tour_guide')->count(),
            'total_trips' => Trip::count(),
            'total_hotels' => Hotel::count(),
            'total_restaurants' => Restaurant::count(),
            'total_activities' => Activity::count(),
            'total_reservations' => Reservation::count(),
            'booking_conversion_rate' => (int) $bookingConversionRate,
            'total_reviews' => Review::count(),
            'average_rating' => round((float) (Review::avg('rate') ?? 0), 1),
        ];

        $recentReservations = Reservation::with([
            'user:id,name,email',
            'user.image',
            'reservable' => function (MorphTo $morphTo) {
                $morphTo->morphWith([
                    Trip::class => ['images'],
                    Hotel::class => ['images'],
                    Restaurant::class => ['images'],
                    Activity::class => ['images'],
                ]);
            },
        ])->latest()->limit(5)->get()->map(function ($reservation) {
            $reservable = $reservation->reservable;

            return [
                'id' => $reservation->id,
                'user' => [
                    'name' => $reservation->user?->name,
                    'email' => $reservation->user?->email,
                    'profile_image' => $reservation->user?->image?->url,
                ],
                'reservable_type' => class_basename($reservation->reservable_type),
                'reservable_name' => $this->entityName($reservable),
                'status' => $reservation->status,
                'created_at' => $reservation->created_at,
            ];
        })->values();

        $recentReviews = Review::with([
            'user:id,name,email',
            'user.image',
            'reviewable' => function (MorphTo $morphTo) {
                $morphTo->morphWith([
                    Trip::class => ['images'],
                    Hotel::class => ['images'],
                    Restaurant::class => ['images'],
                    Activity::class => ['images'],
                ]);
            },
        ])->latest()->limit(5)->get()->map(function ($review) {
            $reviewable = $review->reviewable;

            return [
                'id' => $review->id,
                'user' => [
                    'name' => $review->user?->name,
                    'email' => $review->user?->email,
                    'profile_image' => $review->user?->image?->url,
                ],
                'reviewable_type' => class_basename($review->reviewable_type),
                'reviewable_name' => $this->entityName($reviewable),
                'rating' => (int) ($review->rate ?? 0),
                'body' => $review->comment,
                'created_at' => $review->created_at,
            ];
        })->values();

        $topRatedTrips = Trip::withAvg('reviews', 'rate')
            ->withCount('reviews')
            ->having('reviews_count', '>=', 3)
            ->orderByDesc('reviews_avg_rate')
            ->orderByDesc('reviews_count')
            ->limit(3)
            ->with('images')
            ->get()
            ->map(function ($trip) {
                return [
                    'id' => $trip->id,
                    'name' => $trip->name_en ?: ($trip->name_ar ?: 'Trip'),
                    'location' => $trip->location,
                    'average_rating' => round((float) ($trip->reviews_avg_rate ?? 0), 1),
                    'reviews_count' => (int) ($trip->reviews_count ?? 0),
                    'image' => $trip->images->first()?->url,
                ];
            })->values();

        $contentCounts = [
            'trips' => $stats['total_trips'],
            'hotels' => $stats['total_hotels'],
            'restaurants' => $stats['total_restaurants'],
            'activities' => $stats['total_activities'],
        ];

        return response()->json([
            'stats' => $stats,
            'reservation_funnel' => $reservationFunnel,
            'recent_reservations' => $recentReservations,
            'recent_reviews' => $recentReviews,
            'top_rated_trips' => $topRatedTrips,
            'content_counts' => $contentCounts,
        ]);
    }

    private function entityName($entity): string
    {
        if (!$entity) {
            return 'Unknown item';
        }

        if (!empty($entity->name_en)) {
            return $entity->name_en;
        }

        if (!empty($entity->name_ar)) {
            return $entity->name_ar;
        }

        if (!empty($entity->name)) {
            return $entity->name;
        }

        if (!empty($entity->title)) {
            return $entity->title;
        }

        if (!empty($entity->from_location) && !empty($entity->to_location)) {
            return $entity->from_location . ' -> ' . $entity->to_location;
        }

        return 'Unknown item';
    }
}
