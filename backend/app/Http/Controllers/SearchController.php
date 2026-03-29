<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\Hotel;
use App\Models\Restaurant;
use App\Models\Activity;
use App\Models\Cruise;
use App\Models\Car;
use App\Models\Flight;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $locale = $request->header('Accept-Language') ?? app()->getLocale();
        $q = trim((string) $request->input('q', ''));
        $category = $request->input('category');
        $location = trim((string) $request->input('location', ''));
        $minPrice = $request->input('min_price');
        $maxPrice = $request->input('max_price');
        $full = filter_var($request->input('full', false), FILTER_VALIDATE_BOOLEAN);

        if ($q === '' && $location === '' && $minPrice === null && $maxPrice === null) {
            return $this->success([]);
        }

        $limit = $full ? null : 3;
        $allowedCategories = ['trip', 'hotel', 'restaurant', 'activity', 'cruise', 'car', 'flight'];

        $searchDefinitions = [
            'trip' => Trip::class,
            'hotel' => Hotel::class,
            'restaurant' => Restaurant::class,
            'activity' => Activity::class,
            'cruise' => Cruise::class,
            'car' => Car::class,
            'flight' => Flight::class,
        ];

        if ($category && !in_array($category, $allowedCategories, true)) {
            return $this->success([]);
        }

        $categoriesToSearch = $category ? [$category] : array_keys($searchDefinitions);
        $results = collect();

        foreach ($categoriesToSearch as $type) {
            $model = $searchDefinitions[$type];
            $query = $model::query()->with('images');

            if ($q !== '') {
                $query->where(function ($builder) use ($q) {
                    $builder->where('name_en', 'LIKE', "%{$q}%");

                    if (\Schema::hasColumn($builder->getModel()->getTable(), 'name_ar')) {
                        $builder->orWhere('name_ar', 'LIKE', "%{$q}%");
                    }
                });
            }

            if ($location !== '') {
                $query->where('location', 'LIKE', "%{$location}%");
            }

            if ($minPrice !== null && $minPrice !== '') {
                $query->where('price', '>=', $minPrice);
            }

            if ($maxPrice !== null && $maxPrice !== '') {
                $query->where('price', '<=', $maxPrice);
            }

            if ($limit !== null) {
                $query->limit($limit);
            }

            $results = $results->merge(
                $query->get()->map(function ($item) use ($type, $locale) {
                    $title = $locale === 'ar'
                        ? ($item->name_ar ?? $item->name_en)
                        : ($item->name_en ?? $item->name_ar);

                    return [
                        'id' => $item->id,
                        'type' => $type,
                        'title' => $title,
                        'image' => (function() use ($item) {
                            $url = $item->images->first()?->url ?? null;
                            if ($url && (str_starts_with($url, '/storage/') || str_starts_with($url, 'storage/'))) {
                                $url = str_starts_with($url, '/') ? $url : '/' . $url;
                                return url($url);
                            }
                            return $url;
                        })(),
                        'location' => $item->location ?? null,
                        'price' => $item->price ?? null,
                    ];
                })
            );
        }

        return $this->success($results->values());
    }
}
