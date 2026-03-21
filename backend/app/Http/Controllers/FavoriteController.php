<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Car;
use App\Models\Cruise;
use App\Models\Favorite;
use App\Models\Flight;
use App\Models\Hotel;
use App\Models\Restaurant;
use App\Models\Trip;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{

    public function index()
    {
        $favorites = Favorite::where('user_id', auth()->id())->get();

        foreach ($favorites as $fav) {
            $type = $fav->favoritable_type;
            if (!is_string($type))
                continue;

            $normalized = trim($type);

            if ($normalized === 'activitie' || $normalized === 'activity') {
                $fav->favoritable_type = Activity::class;
            } elseif ($normalized === 'trip') {
                $fav->favoritable_type = Trip::class;
            } elseif ($normalized === 'hotel') {
                $fav->favoritable_type = Hotel::class;
            } elseif ($normalized === 'restaurant') {
                $fav->favoritable_type = Restaurant::class;
            } elseif ($normalized === 'cruise') {
                $fav->favoritable_type = Cruise::class;
            } elseif ($normalized === 'car') {
                $fav->favoritable_type = Car::class;
            } elseif ($normalized === 'flight') {
                $fav->favoritable_type = Flight::class;
            }
        }

        $favorites->load(['favoritable.images']);
        return $favorites;
    }

    public function store(Request $request)
    {
        $request->validate([
            'favoritable_id' => 'required',
            'favoritable_type' => 'required|string',
        ]);

        $type = trim($request->favoritable_type);
        if ($type === 'activitie' || $type === 'activity') {
            $type = Activity::class;
        } elseif ($type === 'trip') {
            $type = Trip::class;
        } elseif ($type === 'hotel') {
            $type = Hotel::class;
        } elseif ($type === 'restaurant') {
            $type = Restaurant::class;
        } elseif ($type === 'cruise') {
            $type = Cruise::class;
        } elseif ($type === 'car') {
            $type = Car::class;
        } elseif ($type === 'flight') {
            $type = Flight::class;
        }

        $exists = Favorite::where('user_id', auth()->id())
            ->where('favoritable_id', $request->favoritable_id)
            ->where('favoritable_type', $type)
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Already in favorites'], 409);
        }

        $favorite = Favorite::create([
            'user_id' => auth()->id(),
            'favoritable_id' => $request->favoritable_id,
            'favoritable_type' => $type,
        ]);

        return response()->json($favorite->load('favoritable'), 201);
    }


    public function destroy($id)
    {
        $favorite = Favorite::where('id', $id)->where('user_id', auth()->id())->firstOrFail();
        $favorite->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
