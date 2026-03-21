<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\Hotel;
use App\Models\Restaurant;
use App\Models\Activity;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $q = $request->input('q', '');
        if (strlen($q) < 1)
            return response()->json([]);

        $trips = Trip::where('name_en', 'LIKE', "%$q%")
            ->with('images')->limit(3)->get()
            ->map(fn($i) => [
                'id' => $i->id,
                'type' => 'trip',
                'title' => $i->name_en,
                'image' => $i->images[0]->url ?? null,
                'location' => $i->location ?? null,
            ]);

        $hotels = Hotel::where('name_en', 'LIKE', "%$q%")
            ->with('images')->limit(3)->get()
            ->map(fn($i) => [
                'id' => $i->id,
                'type' => 'hotel',
                'title' => $i->name_en,
                'image' => $i->images[0]->url ?? null,
                'location' => $i->location ?? null,
            ]);

        $restaurants = Restaurant::where('name_en', 'LIKE', "%$q%")
            ->with('images')->limit(3)->get()
            ->map(fn($i) => [
                'id' => $i->id,
                'type' => 'restaurant',
                'title' => $i->name_en,
                'image' => $i->images[0]->url ?? null,
                'location' => $i->location ?? null,
            ]);

        $activities = Activity::where('name_en', 'LIKE', "%$q%")
            ->with('images')->limit(3)->get()
            ->map(fn($i) => [
                'id' => $i->id,
                'type' => 'activity',
                'title' => $i->name_en,
                'image' => $i->images[0]->url ?? null,
                'location' => $i->location ?? null,
            ]);

        return response()->json(array_merge(
            $trips->toArray(),
            $hotels->toArray(),
            $restaurants->toArray(),
            $activities->toArray()
        ));
    }
}
