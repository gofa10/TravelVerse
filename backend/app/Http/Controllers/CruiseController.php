<?php

namespace App\Http\Controllers;

use App\Models\Cruise;
use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\DB;

class CruiseController extends Controller
{
    public function index(Request $request)
{
    $locale = $request->header('Accept-Language') ?? app()->getLocale();

    $query = Cruise::with('images', 'reviews');

    // Apply filters
    if ($request->filled('search')) {
        $search = $request->input('search');
        $query->where(function ($builder) use ($search) {
            $builder->where('name_en', 'LIKE', "%{$search}%")
                ->orWhere('name_ar', 'LIKE', "%{$search}%")
                ->orWhere('location', 'LIKE', "%{$search}%");
        });
    }

    if ($request->filled('min_price')) {
        $query->where('price', '>=', $request->input('min_price'));
    }

    if ($request->filled('max_price')) {
        $query->where('price', '<=', $request->input('max_price'));
    }

    if ($request->has('property_type')) {
        $propertyTypes = $request->input('property_type');
        if (is_string($propertyTypes)) {
            $propertyTypes = [$propertyTypes];
        }
        $query->whereIn('property_type', $propertyTypes);
    }
    
    if ($request->has('style')) {
        $styles = $request->input('style');
        if (is_string($styles)) {
            $styles = [$styles];
        }
        $query->whereIn('style', $styles);
    }
    
    if ($request->has('amenities')) {
        $amenities = $request->input('amenities');
        if (is_string($amenities)) {
            $amenities = [$amenities];
        }
        $query->where(function($q) use ($amenities) {
            foreach ($amenities as $amenity) {
                $q->orWhereJsonContains('amenities', $amenity);
            }
        });
    }

    if ($request->sort === 'price_asc') {
        $query->orderBy('price', 'asc');
    } elseif ($request->sort === 'price_desc') {
        $query->orderBy('price', 'desc');
    } elseif ($request->sort === 'rating') {
        $query->orderBy('rate', 'desc');
    } else {
        $query->latest();
    }

    $perPage = $request->per_page ?? 12;
    $cruises = $query->paginate($perPage);

    $data = $cruises->getCollection()->map(function ($cruise) use ($locale) {
        // Get images using direct query since morph relationship isn't working
        $images = DB::table('images')
            ->where('imageable_id', $cruise->id)
            ->where('imageable_type', 'App\\Models\\Cruise')
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
            'id' => $cruise->id,
            'name' => $locale === 'ar' ? $cruise->name_ar : $cruise->name_en,
            'description' => $locale === 'ar' ? $cruise->description_ar : $cruise->description_en,
            'location' => $cruise->location,
            'price' => $cruise->price,
            'booking_link' => $cruise->booking_link,
            'rate' => $cruise->rate,
            'from' => $cruise->from,
            'to' => $cruise->to,
            'depart_time' => $cruise->depart_time,
            'return_time' => $cruise->return_time,
            'property_type' => $cruise->property_type,
            'style' => $cruise->style,
            'amenities' => $cruise->amenities,
            'reviews_count' => $cruise->reviews->count(),
            'images' => $images,
        ];
    });

    return $this->success([
        'current_page' => $cruises->currentPage(),
        'last_page' => $cruises->lastPage(),
        'per_page' => $cruises->perPage(),
        'total' => $cruises->total(),
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
        'price' => 'required|numeric',
        'booking_link' => 'nullable|url',
        'from' => 'nullable|string',
        'to' => 'nullable|string',
        'depart_time' => 'nullable|date_format:H:i',
        'return_time' => 'nullable|date_format:H:i',
        'property_type' => 'nullable|string',
        'style' => 'nullable|string',
        'rate' => 'nullable|numeric|min:0|max:5',
        'amenities' => 'nullable|array',
        'images.*' => 'nullable|image|max:2048',
        'image_urls' => 'nullable|array',
'image_urls.*' => 'nullable|url',

    ]);

    $cruise = Cruise::create($validated);

    // حفظ الصور
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $imageFile) {
            $path = $imageFile->store('cruises', 'public');
            $cruise->images()->create(['url' => "/storage/{$path}"]);
        }
    }

    // حفظ روابط الصور إن وجدت
if ($request->has('image_urls')) {
    foreach ($request->image_urls as $url) {
        $cruise->images()->create(['url' => $url]);
    }
}


    return $this->success($cruise, '', 201);
}

public function update(Request $request, $id)
{
    $cruise = Cruise::findOrFail($id);

    $validated = $request->validate([
        'name_en' => 'sometimes|required|string',
        'name_ar' => 'sometimes|required|string',
        'description_en' => 'nullable|string',
        'description_ar' => 'nullable|string',
        'location' => 'sometimes|required|string',
        'price' => 'sometimes|required|numeric',
        'booking_link' => 'nullable|url',
        'from' => 'nullable|string',
        'to' => 'nullable|string',
        'depart_time' => 'nullable|date_format:H:i',
        'return_time' => 'nullable|date_format:H:i',
        'property_type' => 'nullable|string',
        'style' => 'nullable|string',
        'rate' => 'nullable|numeric|min:0|max:5',
        'amenities' => 'nullable|array',
        'images.*' => 'nullable|image|max:2048',
        'image_urls' => 'nullable|array',
        'image_urls.*' => 'nullable|url',

    ]);

    $cruise->update($validated);

    // حفظ الصور الجديدة
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $imageFile) {
            $path = $imageFile->store('cruises', 'public');
            $cruise->images()->create(['url' => "/storage/{$path}"]);
        }
    }
    // حفظ روابط الصور إن وجدت
if ($request->has('image_urls')) {
    foreach ($request->image_urls as $url) {
        $cruise->images()->create(['url' => $url]);
    }
}


    return $this->success($cruise);
}


public function show(Request $request, $id)
{
    $locale = $request->header('Accept-Language') ?? app()->getLocale();

    $cruise = Cruise::with('reviews')->findOrFail($id);
    
    // Get images using direct query since morph relationship isn't working
    $images = DB::table('images')
        ->where('imageable_id', $cruise->id)
        ->where('imageable_type', 'App\\Models\\Cruise')
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
        'id' => $cruise->id,
        'name' => $locale == 'ar' ? $cruise->name_ar : $cruise->name_en,
        'name_en' => $cruise->name_en,
        'name_ar' => $cruise->name_ar,
        'description' => $locale == 'ar' ? $cruise->description_ar : $cruise->description_en,
        'description_en' => $cruise->description_en,
        'description_ar' => $cruise->description_ar,
        'location' => $cruise->location,
        'price' => $cruise->price,
        'booking_link' => $cruise->booking_link,
        'rate' => $cruise->rate,
        'from' => $cruise->from,
        'to' => $cruise->to,
        'depart_time' => $cruise->depart_time,
        'return_time' => $cruise->return_time,
        'property_type' => $cruise->property_type,
        'style' => $cruise->style,
        'amenities' => $cruise->amenities,
        'reviews_count' => $cruise->reviews->count(),
        'images' => $images,
    ]);
}


// public function update(Request $request, $id)
// {


//     $cruise = Cruise::findOrFail($id);
//     $cruise->update($request->all());

//     return $cruise;
// }

public function destroy($id)
{


    Cruise::findOrFail($id)->delete();
    return $this->success(null, 'Deleted successfully');
}

}
