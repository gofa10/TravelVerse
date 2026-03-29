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
use Illuminate\Support\Facades\DB;

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

          $activities = Activity::latest()->limit($limit)->get();
          $trips = Trip::latest()->limit($limit)->get();
          $hotels = Hotel::latest()->limit($limit)->get();
          $restaurants = Restaurant::latest()->limit($limit)->get();

          // Manually attach images using direct queries
          $activities->each(function ($activity) {
               $images = DB::table('images')
                    ->where('imageable_id', $activity->id)
                    ->where('imageable_type', 'activity')
                    ->pluck('url')
                    ->toArray();
               $activity->setRelation('images', collect($images)->map(fn($url) => (object)['url' => $url]));
          });

          $trips->each(function ($trip) {
               $images = DB::table('images')
                    ->where('imageable_id', $trip->id)
                    ->where('imageable_type', 'trip')
                    ->pluck('url')
                    ->toArray();
               $trip->setRelation('images', collect($images)->map(fn($url) => (object)['url' => $url]));
          });

          $hotels->each(function ($hotel) {
               $images = DB::table('images')
                    ->where('imageable_id', $hotel->id)
                    ->where('imageable_type', 'hotel')
                    ->pluck('url')
                    ->toArray();
               $hotel->setRelation('images', collect($images)->map(fn($url) => (object)['url' => $url]));
          });

          $restaurants->each(function ($restaurant) {
               $images = DB::table('images')
                    ->where('imageable_id', $restaurant->id)
                    ->where('imageable_type', 'restaurant')
                    ->pluck('url')
                    ->toArray();
               $restaurant->setRelation('images', collect($images)->map(fn($url) => (object)['url' => $url]));
          });

          return $this->success([
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
               'activities' => $this->success(
                    ActivityResource::collection(
                         Activity::with(['images', 'reviews'])->latest()->limit($limit)->get()
                    )
               ),
               'trips' => $this->success(
                    TripResource::collection(
                         Trip::with(['images', 'reviews'])->latest()->limit($limit)->get()
                    )
               ),
               'hotels' => $this->success(
                    HotelResource::collection(
                         Hotel::with(['images', 'reviews'])->latest()->limit($limit)->get()
                    )
               ),
               'restaurants' => $this->success(
                    RestaurantResource::collection(
                         Restaurant::with(['images', 'reviews'])->latest()->limit($limit)->get()
                    )
               ),
               default => $this->error('Unknown category: ' . $category, 422),
          };
     }
}
