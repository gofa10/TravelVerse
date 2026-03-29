<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RestaurantController extends Controller
{
    public function index(Request $request)
    {
        $locale = $request->header('Accept-Language') ?? app()->getLocale();

        $query = Restaurant::with('images')->withCount('reviews');

        if ($request->filled('q')) {
            $q = $request->input('q');
            $query->where(function ($builder) use ($q) {
                $builder->where('name_en', 'LIKE', "%{$q}%")
                    ->orWhere('name_ar', 'LIKE', "%{$q}%");
            });
        }

        if ($request->filled('location')) {
            $query->where('location', 'LIKE', '%' . $request->input('location') . '%');
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->input('min_price'));
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->input('max_price'));
        }

        if ($request->filled('min_rate')) {
            $query->where('rate', '>=', $request->input('min_rate'));
        }

        if ($request->filled('max_rate')) {
            $query->where('rate', '<=', $request->input('max_rate'));
        }

        $restaurants = $query->paginate(10);

        $data = $restaurants->getCollection()->map(function ($restaurant) use ($locale) {
            // Get images using direct query since morph relationship isn't working
            $images = DB::table('images')
                ->where('imageable_id', $restaurant->id)
                ->where('imageable_type', 'restaurant')
                ->pluck('url')
                ->map(function ($url) {
                    if (str_starts_with($url, '/storage/') || str_starts_with($url, 'storage/')) {
                        $url = str_starts_with($url, '/') ? $url : '/' . $url;
                        return url($url);
                    }
                    return $url;
                })
                ->toArray();

            return [
                'id' => $restaurant->id,
                'name' => $locale == 'ar' ? $restaurant->name_ar : $restaurant->name_en,
                'description' => $locale == 'ar' ? $restaurant->description_ar : $restaurant->description_en,
                'location' => $restaurant->location,
                'rate' => $restaurant->rate,
                'property_type' => $restaurant->property_type,
                'cuisine' => $restaurant->cuisine,
                'price' => $restaurant->price,
                'features' => $restaurant->features,
                'reviews_count' => $restaurant->reviews_count,
                'booking_link' => $restaurant->booking_link,
                'images' => $images,
            ];
        });

        return $this->success([
            'current_page' => $restaurants->currentPage(),
            'last_page' => $restaurants->lastPage(),
            'per_page' => $restaurants->perPage(),
            'total' => $restaurants->total(),
            'items' => $data,
        ]);
    }


    public function store(Request $request)
    {


        $validated = $request->validate([
            'name_en' => 'required|string',
            'name_ar' => 'required|string',
            'description_en' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'location' => 'required|string',
            'rate' => 'nullable|numeric|min:0|max:5',
            'booking_link' => 'nullable|url',
            'property_type' => 'nullable|string|max:255',
            'cuisine' => 'nullable|string|max:255',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'images.*' => 'nullable|image|max:2048',
            'image_urls' => 'nullable|array',
            'image_urls.*' => 'nullable|url',
        ]);


        $restaurant = Restaurant::create($validated);


        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) {
                $path = $imageFile->store('uploads/restaurants', 'public');
                $restaurant->images()->create(['url' => 'storage/' . $path]);
            }
        }

        if ($request->has('image_urls')) {
            foreach ($request->image_urls as $url) {
                $restaurant->images()->create(['url' => $url]);
            }
        }


        return $this->success($restaurant->load('images'), '', 201);
    }

    public function show(Request $request, $id)
    {
        $locale = $request->header('Accept-Language') ?? app()->getLocale();

        $restaurant = Restaurant::findOrFail($id);
        
        // Get images using direct query since morph relationship isn't working
        $images = DB::table('images')
            ->where('imageable_id', $restaurant->id)
            ->where('imageable_type', 'restaurant')
            ->pluck('url')
            ->map(function ($url) {
                if (str_starts_with($url, '/storage/') || str_starts_with($url, 'storage/')) {
                    $url = str_starts_with($url, '/') ? $url : '/' . $url;
                    return url($url);
                }
                return $url;
            })
            ->toArray();

        return $this->success([
            'id' => $restaurant->id,
            'name' => $locale == 'ar' ? $restaurant->name_ar : $restaurant->name_en,
            'name_en' => $restaurant->name_en,
            'name_ar' => $restaurant->name_ar,
            'description' => $locale == 'ar' ? $restaurant->description_ar : $restaurant->description_en,
            'description_en' => $restaurant->description_en,
            'description_ar' => $restaurant->description_ar,
            'location' => $restaurant->location,
            'rate' => $restaurant->rate,
            'property_type' => $restaurant->property_type,
            'cuisine' => $restaurant->cuisine,
            'price' => $restaurant->price,
            'features' => $restaurant->features,
            'reviews_count' => 0, // We'll skip reviews for now since relationship isn't working
            'booking_link' => $restaurant->booking_link,
            'images' => $images,
        ]);

    }

    public function update(Request $request, $id)
    {
        $restaurant = Restaurant::findOrFail($id);

        $validated = $request->validate([
            'name_en' => 'sometimes|required|string',
            'name_ar' => 'sometimes|required|string',
            'description_en' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'location' => 'nullable|string',
            'rate' => 'nullable|numeric|min:0|max:5',
            'booking_link' => 'nullable|url',
            'property_type' => 'nullable|string|max:255',
            'cuisine' => 'nullable|string|max:255',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'images.*' => 'nullable|image|max:2048',
            'image_urls' => 'nullable|array',
            'image_urls.*' => 'nullable|url',
            'old_images' => 'nullable|array',
            'old_images.*' => 'integer|exists:images,id',
        ]);

        $restaurant->update($validated);

        // حذف الصور القديمة غير المرسلة ضمن old_images
        $existingImageIds = $restaurant->images()->pluck('id')->toArray();
        $keepImages = $request->old_images ?? [];
        $deleteImages = array_diff($existingImageIds, $keepImages);

        foreach ($deleteImages as $imageId) {
            $restaurant->images()->where('id', $imageId)->delete();
        }

        // رفع الصور الجديدة من الجهاز
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) {
                $path = $imageFile->store('uploads/restaurants', 'public');
                $restaurant->images()->create(['url' => 'storage/' . $path]);
            }
        }

        // إضافة روابط الصور الجديدة من نوع URL
        if ($request->has('image_urls')) {
            foreach ($request->image_urls as $url) {
                $restaurant->images()->create(['url' => $url]);
            }
        }

        return $this->success($restaurant->load('images'));
    }


    public function destroy($id)
    {

        $restaurant = Restaurant::findOrFail($id);
        $restaurant->delete();

        return $this->success(null, 'Deleted successfully');
    }

}
