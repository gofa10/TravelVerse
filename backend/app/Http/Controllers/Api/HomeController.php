<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ActivityResource;
use App\Http\Resources\HotelResource;
use App\Http\Resources\RestaurantResource;
use App\Http\Resources\TripResource;
use App\Models\Activity;
use App\Models\Hotel;
use App\Models\Restaurant;
use App\Models\Trip;
use Illuminate\Http\JsonResponse;

class HomeController extends Controller
{
     /**
      * Return the latest items for each home-page category section.
      *
      * GET /api/home
      *
      * Response shape:
      * {
      *   "activities": [...],
      *   "trips":      [...],
      *   "hotels":     [...],
      *   "restaurants":[...]
      * }
      */
     public function index(): JsonResponse
     {
          $limit = 8; // cards per carousel section

          $activities = Activity::with(['images'])->withCount('reviews')
               ->latest()
               ->limit($limit)
               ->get();

          $trips = Trip::with(['images'])->withCount('reviews')
               ->latest()
               ->limit($limit)
               ->get();

          $hotels = Hotel::with(['images'])->withCount('reviews')
               ->latest()
               ->limit($limit)
               ->get();

          $restaurants = Restaurant::with(['images'])->withCount('reviews')
               ->latest()
               ->limit($limit)
               ->get();

          return response()->json([
               'activities' => ActivityResource::collection($activities),
               'trips' => TripResource::collection($trips),
               'hotels' => HotelResource::collection($hotels),
               'restaurants' => RestaurantResource::collection($restaurants),
          ]);
     }

     /**
      * Return a single category's items only.
      * GET /api/home/{category}  (optional convenience endpoint)
      *
      * Supported: activities, trips, hotels, restaurants
      */
     public function category(string $category): JsonResponse
     {
          $limit = 8;

          return match ($category) {
               'activities' => response()->json(
                    ActivityResource::collection(
                         Activity::with(['images', 'reviews'])->latest()->limit($limit)->get()
                    )
               ),
               'trips' => response()->json(
                    TripResource::collection(
                         Trip::with(['images', 'reviews'])->latest()->limit($limit)->get()
                    )
               ),
               'hotels' => response()->json(
                    HotelResource::collection(
                         Hotel::with(['images', 'reviews'])->latest()->limit($limit)->get()
                    )
               ),
               'restaurants' => response()->json(
                    RestaurantResource::collection(
                         Restaurant::with(['images', 'reviews'])->latest()->limit($limit)->get()
                    )
               ),
               default => response()->json(['error' => 'Unknown category: ' . $category], 422),
          };
     }
}
