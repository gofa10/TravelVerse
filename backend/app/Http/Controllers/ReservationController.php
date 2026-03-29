<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Car;
use App\Models\Cruise;
use App\Models\Flight;
use App\Models\Hotel;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\Trip;
use App\Notifications\ReservationCanceled;
use App\Notifications\ReservationConfirmed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ReservationController extends Controller
{
    private function isUser(): bool
    {
        return Auth::check() && Auth::user()->user_type === 'user';
    }

    private function loadReservableWithImages($builder)
    {
        return $builder->with([
            'reservable' => function (MorphTo $morphTo) {
                $morphTo->morphWith([
                    Trip::class => ['images'],
                    Restaurant::class => ['images'],
                    Hotel::class => ['images'],
                    Activity::class => ['images'],
                    Flight::class => ['images'],
                    Car::class => ['images'],
                    Cruise::class => ['images'],
                ]);
            },
        ]);
    }

    public function index()
    {
        if (!$this->isUser()) {
            return $this->error('Unauthorized', 403);
        }

        $reservations = $this->loadReservableWithImages(
            Reservation::where('user_id', Auth::id())
        )->latest()->get();

        return $this->success($reservations);
    }

    public function store(Request $request)
    {
        if (!$this->isUser()) {
            return $this->error('Unauthorized', 403);
        }
        $request->validate([
            'reservable_type' => 'required|string|in:App\Models\Trip,App\Models\Restaurant,App\Models\Hotel,App\Models\Activity,App\Models\Flight,App\Models\Car,App\Models\Cruise',
            'reservable_id' => 'required|integer',
            'date' => 'nullable|date',
            'people' => 'nullable|integer|min:1',
        ]);

        $existing = Reservation::where('user_id', Auth::id())
            ->where('reservable_type', $request->reservable_type)
            ->where('reservable_id', $request->reservable_id)
            ->first();

        if ($existing) {
            $existing->load('reservable');
            if ($existing->reservable && method_exists($existing->reservable, 'images')) {
                $existing->reservable->loadMissing('images');
            }
            return $this->success($existing);
        }

        $reservation = Reservation::create([
            'user_id' => Auth::id(),
            'reservable_type' => $request->reservable_type,
            'reservable_id' => $request->reservable_id,
            'date' => $request->date,
            'people' => $request->input('people', 1),
            'status' => 'saved',
        ]);

        $reservation->load('reservable');
        if ($reservation->reservable && method_exists($reservation->reservable, 'images')) {
            $reservation->reservable->loadMissing('images');
        }

        return $this->success($reservation, '', 201);
    }

    public function updateStatus(Request $request, $id)
    {
        if (!$this->isUser()) {
            return $this->error('Unauthorized', 403);
        }

        $reservation = Reservation::findOrFail($id);

        if ((int) $reservation->user_id !== (int) Auth::id()) {
            return $this->error('Unauthorized', 403);
        }

        $validated = $request->validate([
            'status' => 'required|string|in:saved,redirect_pending,booking_claimed,booking_declined,left_without_booking,cancelled',
        ]);

        $from = $reservation->status;
        $to = $validated['status'];

        // Idempotent status updates should not fail.
        if ($from === $to) {
            return $this->success([
                'message' => 'Status already set',
                'reservation' => $reservation->load('reservable'),
            ]);
        }

        $allowed = [
            'saved' => ['redirect_pending', 'cancelled'],
            'redirect_pending' => ['booking_claimed', 'booking_declined', 'left_without_booking', 'cancelled'],
            'booking_claimed' => ['cancelled'],
            'booking_declined' => ['redirect_pending', 'cancelled'],
            'left_without_booking' => ['redirect_pending', 'left_without_booking', 'cancelled'],
            'cancelled' => [],
        ];

        if (!isset($allowed[$from]) || !in_array($to, $allowed[$from], true)) {
            return $this->error('Invalid status transition.', 422);
        }

        $reservation->status = $to;
        if ($to === 'cancelled') {
            $reservation->cancelled_at = now();
        }
        $reservation->save();

        if ($to === 'booking_claimed') {
            $reservation->user->notify(new ReservationConfirmed($reservation));
        }

        return $this->success([
            'message' => 'Status updated successfully',
            'reservation' => $reservation->load('reservable'),
        ]);
    }

    public function destroy($id)
    {
        if (!$this->isUser()) {
            return $this->error('Unauthorized', 403);
        }

        $reservation = Reservation::findOrFail($id);

        if ((int) $reservation->user_id !== (int) Auth::id()) {
            return $this->error('Unauthorized', 403);
        }

        $reservation->status = 'cancelled';
        $reservation->cancelled_at = now();
        $reservation->save();

        $reservation->user->notify(new ReservationCanceled($reservation));

        return $this->success([
            'message' => 'Reservation cancelled.',
            'reservation' => $reservation->load('reservable'),
        ]);
    }

    public function adminIndex()
    {
        if (Auth::user()->user_type !== 'admin') {
            return $this->error('Unauthorized', 403);
        }

        $query = $this->loadReservableWithImages(
            Reservation::select([
                'id',
                'user_id',
                'reservable_type',
                'reservable_id',
                'status',
                'date',
                'people',
                'cancelled_at',
                'created_at',
                'updated_at',
            ])->with([
                        'user:id,name,email,user_type',
                        'user.image',
                    ])
        )->latest();

        $counts = Reservation::selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        $reservations = $query->paginate(20);

        return $this->success([
            'items' => $reservations->items(),
            'current_page' => $reservations->currentPage(),
            'last_page' => $reservations->lastPage(),
            'per_page' => $reservations->perPage(),
            'total' => $reservations->total(),
            'counts' => [
                'saved' => (int) ($counts['saved'] ?? 0),
                'redirect_pending' => (int) ($counts['redirect_pending'] ?? 0),
                'booking_claimed' => (int) ($counts['booking_claimed'] ?? 0),
                'booking_declined' => (int) ($counts['booking_declined'] ?? 0),
                'left_without_booking' => (int) ($counts['left_without_booking'] ?? 0),
                'cancelled' => (int) ($counts['cancelled'] ?? 0),
            ],
        ]);
    }

    public function guideReservations()
    {
        $guideId = Auth::id();

        $reservations = Reservation::query()
            ->where('reservable_type', Trip::class)
            ->whereHasMorph('reservable', [Trip::class], function ($query) use ($guideId) {
                $query->where('guide_id', $guideId);
            })
            ->with([
                'user:id,name,email',
                'reservable:id,name_en,name_ar,guide_id',
            ])
            ->latest()
            ->paginate(20);

        return $this->success($reservations);
    }

    /**
     * Update attendance status for a reservation (guide only).
     * Attendance can only be marked for booking_claimed reservations on trips owned by the guide.
     * Once set, attendance_status is immutable.
     */
    public function updateAttendance(Request $request, $id)
    {
        $guideId = Auth::id();

        $validated = $request->validate([
            'attendance_status' => 'required|string|in:confirmed_attended,no_show',
        ]);

        $reservation = Reservation::where('id', $id)
            ->where('reservable_type', Trip::class)
            ->whereHasMorph('reservable', [Trip::class], function ($query) use ($guideId) {
                $query->where('guide_id', $guideId);
            })
            ->first();

        if (!$reservation) {
            return $this->error('Reservation not found or not authorized.', 404);
        }

        // Attendance can only be marked for booking_claimed status
        if ($reservation->status !== 'booking_claimed') {
            return $this->error('Attendance can only be recorded for confirmed bookings.', 422);
        }

        // Atomic update - only succeeds if attendance_status is still null (prevents race condition)
        $updated = Reservation::where('id', $reservation->id)
            ->whereNull('attendance_status')
            ->update([
                'attendance_status' => $validated['attendance_status'],
                'attendance_marked_at' => now(),
                'attendance_marked_by' => $guideId,
            ]);

        if ($updated === 0) {
            return $this->error('Attendance has already been recorded and cannot be changed.', 422);
        }

        $reservation->refresh();
        $reservation->load(['user:id,name,email', 'reservable:id,name_en,name_ar,guide_id']);

        return $this->success([
            'message' => 'Attendance recorded successfully',
            'data' => $reservation,
        ]);
    }
}
