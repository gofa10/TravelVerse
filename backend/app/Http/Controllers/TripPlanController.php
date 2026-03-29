<?php

namespace App\Http\Controllers;

use App\Models\TripPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TripPlanController extends Controller
{
    public function index()
    {
        $plans = TripPlan::where('user_id', Auth::id())
            ->withCount('items')
            ->latest()
            ->get();

        return $this->success($plans);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'budget' => 'nullable|numeric|min:0',
            'status' => 'nullable|string|in:planning,upcoming,completed',
            'cover_image' => 'nullable|string|max:255',
        ]);

        $plan = TripPlan::create([
            ...$validated,
            'user_id' => Auth::id(),
        ]);

        return $this->success($plan->loadCount('items'), '', 201);
    }

    public function show(TripPlan $tripPlan)
    {
        $this->authorizeOwnership($tripPlan);

        return $this->success(
            $tripPlan->load(['items.plannable'])
        );
    }

    public function update(Request $request, TripPlan $tripPlan)
    {
        $this->authorizeOwnership($tripPlan);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'budget' => 'nullable|numeric|min:0',
            'status' => 'nullable|string|in:planning,upcoming,completed',
            'cover_image' => 'nullable|string|max:255',
        ]);

        $tripPlan->update($validated);

        return $this->success($tripPlan->fresh()->loadCount('items'));
    }

    public function destroy(TripPlan $tripPlan)
    {
        $this->authorizeOwnership($tripPlan);

        $tripPlan->delete();

        return $this->success(null, 'Deleted successfully');
    }

    private function authorizeOwnership(TripPlan $tripPlan): void
    {
        if ((int) $tripPlan->user_id !== (int) Auth::id()) {
            abort(403, 'Unauthorized');
        }
    }
}
