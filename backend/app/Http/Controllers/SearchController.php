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
        $category = trim((string) $request->input('category', ''));
        $location = trim((string) $request->input('location', ''));
        $minPrice = $request->input('min_price');
        $maxPrice = $request->input('max_price');
        $full = filter_var($request->input('full', false), FILTER_VALIDATE_BOOLEAN);

        if ($q === '' && $category === '' && $location === '' && $minPrice === null && $maxPrice === null) {
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

        $categoriesToSearch = $category
            ? [$category => $searchDefinitions[$category]]
            : $searchDefinitions;
        $results = collect();

        foreach ($categoriesToSearch as $type => $model) {
            $query = $model::query()->with('images');

            if ($q !== '') {
                $query->where(function ($builder) use ($q) {
                    $table = $builder->getModel()->getTable();
                    if (\Schema::hasColumn($table, 'name_en')) {
                        $builder->where('name_en', 'LIKE', "%{$q}%");
                        if (\Schema::hasColumn($table, 'name_ar')) {
                            $builder->orWhere('name_ar', 'LIKE', "%{$q}%");
                        }
                    } elseif (\Schema::hasColumn($table, 'name')) {
                        $builder->where('name', 'LIKE', "%{$q}%");
                    } elseif (\Schema::hasColumn($table, 'brand')) {
                        $builder->where('brand', 'LIKE', "%{$q}%")
                                ->orWhere('model', 'LIKE', "%{$q}%");
                    } elseif (\Schema::hasColumn($table, 'from_location')) {
                        $builder->where('from_location', 'LIKE', "%{$q}%")
                                ->orWhere('to_location', 'LIKE', "%{$q}%");
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
                    $title = (function() use ($item, $locale) {
                        if (isset($item->name_en) || isset($item->name_ar)) {
                            return $locale === 'ar'
                                ? ($item->name_ar ?? $item->name_en)
                                : ($item->name_en ?? $item->name_ar);
                        }
                        if (isset($item->name)) return $item->name;
                        if (isset($item->brand)) return trim(($item->brand ?? '') . ' ' . ($item->model ?? ''));
                        if (isset($item->from_location)) return ($item->from_location ?? '') . ' to ' . ($item->to_location ?? '');
                        return 'Untitled';
                    })();

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
