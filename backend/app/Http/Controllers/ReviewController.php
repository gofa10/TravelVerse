<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ReviewController extends Controller
{
    public function index()
    {
        return response()->json(Review::with('reviewable')->get());
    }

    public function myReviews()
    {
        $reviews = Review::where('user_id', Auth::id())
            ->with('reviewable')
            ->latest()
            ->get();

        return response()->json($reviews);
    }

    public function store(Request $request)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:10|max:1000',
            'reviewable_type' => 'required|in:App\Models\Trip,App\Models\Restaurant,App\Models\Hotel,App\Models\Activity,App\Models\Flight,App\Models\Car,App\Models\Cruise',
            'reviewable_id' => [
                'required',
                'integer',
                Rule::unique('reviews')->where(function ($query) use ($request) {
                    return $query
                        ->where('user_id', Auth::id())
                        ->where('reviewable_type', $request->reviewable_type)
                        ->where('reviewable_id', $request->reviewable_id);
                })
            ],
        ]);

        $review = Review::create([
            'user_id' => Auth::id(),
            'rate' => $request->rating,
            'comment' => $request->comment,
            'reviewable_type' => $request->reviewable_type,
            'reviewable_id' => $request->reviewable_id,
        ]);

        return response()->json($review, 201);
    }

    public function show(Review $review)
    {
        return response()->json($review->load('reviewable'));
    }

    public function destroy(Review $review)
    {
        if (Auth::id() !== $review->user_id && Auth::user()->user_type !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $review->delete();
        return response()->json(['message' => 'Review deleted successfully.']);
    }

    public function guideReviews()
    {
        $guideId = Auth::id();

        $reviews = Review::query()
            ->where('reviewable_type', Trip::class)
            ->whereHasMorph('reviewable', [Trip::class], function ($query) use ($guideId) {
                $query->where('guide_id', $guideId);
            })
            ->with([
                'user:id,name,email',
                'reviewable:id,name_en,name_ar,guide_id',
            ])
            ->latest()
            ->paginate(20);

        return response()->json($reviews);
    }

    public function reply(Request $request, Review $review)
    {
        $validated = $request->validate([
            'reply' => 'required|string|max:2000',
        ]);

        $review->load('reviewable');
        $trip = $review->reviewable;

        if (!($trip instanceof Trip) || (int) $trip->guide_id !== (int) Auth::id()) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $review->update(['reply' => $validated['reply']]);

        return response()->json([
            'message' => 'Reply saved successfully',
            'review' => $review->fresh(['user', 'reviewable']),
        ]);
    }
}
