<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Restaurant;
use App\Models\Trip;
use App\Models\TripPlan;
use App\Models\TripPlanItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class TripPlanItemController extends Controller
{
    private const PLANNABLE_TYPES = [
        'Trip' => Trip::class,
        'Hotel' => Hotel::class,
        'Restaurant' => Restaurant::class,
    ];

    public function store(Request $request, TripPlan $plan)
    {
        $this->authorizePlanOwnership($plan);

        $validated = $request->validate([
            'plannable_id' => 'required|integer',
            'plannable_type' => ['required', 'string', Rule::in(array_keys(self::PLANNABLE_TYPES))],
            'day_number' => 'nullable|integer',
            'planned_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $plannableType = self::PLANNABLE_TYPES[$validated['plannable_type']];

        $duplicate = $plan->items()
            ->where('plannable_id', $validated['plannable_id'])
            ->where('plannable_type', $plannableType)
            ->exists();

        if ($duplicate) {
            return $this->error('This item already exists in the trip plan.', 422);
        }

        $plannableModel = $plannableType::find($validated['plannable_id']);

        if (!$plannableModel) {
            return $this->error('Selected plannable item was not found.', 404);
        }

        $item = $plan->items()->create([
            'plannable_id' => $validated['plannable_id'],
            'plannable_type' => $plannableType,
            'day_number' => $validated['day_number'] ?? null,
            'planned_date' => $validated['planned_date'] ?? null,
            'notes' => $validated['notes'] ?? null,
        ]);

        return $this->success($item->load('plannable'), '', 201);
    }

    public function update(Request $request, TripPlanItem $item)
    {
        $this->authorizeItemOwnership($item);

        $validated = $request->validate([
            'day_number' => 'nullable|integer',
            'planned_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $item->update($validated);

        return $this->success($item->fresh()->load('plannable'));
    }

    public function destroy(TripPlanItem $item)
    {
        $this->authorizeItemOwnership($item);

        $item->delete();

        return $this->success(null, 'Deleted successfully');
    }

    private function authorizePlanOwnership(TripPlan $plan): void
    {
        if ((int) $plan->user_id !== (int) Auth::id()) {
            abort(403, 'Unauthorized');
        }
    }

    private function authorizeItemOwnership(TripPlanItem $item): void
    {
        $item->loadMissing('tripPlan');

        if ((int) $item->tripPlan->user_id !== (int) Auth::id()) {
            abort(403, 'Unauthorized');
        }
    }
}
