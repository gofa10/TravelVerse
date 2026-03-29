<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HotelController extends Controller
{
    /**
     * عرض قائمة الفنادق مع عرض الاسم والوصف باللغة المطلوبة.
     */
    public function index(Request $request)
{
    $locale = $request->header('Accept-Language') ?? app()->getLocale();

    $query = Hotel::with('images')->withCount('reviews');

    if ($request->filled('search')) {
        $search = $request->input('search');
        $query->where(function ($builder) use ($search) {
            $builder->where('name_en', 'LIKE', "%{$search}%")
                ->orWhere('name_ar', 'LIKE', "%{$search}%")
                ->orWhere('location', 'LIKE', "%{$search}%");
        });
    } elseif ($request->filled('q')) {
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
    $hotels = $query->paginate($perPage);

    // تعديل البيانات قبل الإرجاع
    $data = $hotels->getCollection()->map(function ($hotel) use ($locale) {
        // Get images using direct query since morph relationship isn't working
        $images = DB::table('images')
            ->where('imageable_id', $hotel->id)
            ->where('imageable_type', 'hotel')
            ->pluck('url')
            ->map(function ($url) {
                if (str_starts_with($url, '/storage/') || str_starts_with($url, 'storage/')) {
                    $url = str_starts_with($url, '/') ? $url : '/' . $url;
                    return url($url);
                }
                return $url;
            })
            ->toArray();

        $name = $locale == 'ar' ? ($hotel->name_ar ?? $hotel->name_en) : ($hotel->name_en ?? $hotel->name_ar);
        $description = $locale == 'ar' ? ($hotel->description_ar ?? $hotel->description_en) : ($hotel->description_en ?? $hotel->description_ar);

        return [
            'id' => $hotel->id,
            'name' => $name,
            'description' => $description,
            'location' => $hotel->location,
            'rate' => $hotel->rate,
            'price' => $hotel->price,
            'old_price' => $hotel->old_price,
            'class' => $hotel->class,
            'style' => $hotel->style,
            'amenities' => $hotel->amenities,
            'reviews_count' => $hotel->reviews_count,
            'booking_link' => $hotel->booking_link,
            'images' => $images,
        ];
    });

    // دمج بيانات pagination مع النتائج
    return $this->success([
        'current_page' => $hotels->currentPage(),
        'last_page' => $hotels->lastPage(),
        'per_page' => $hotels->perPage(),
        'total' => $hotels->total(),
        'items' => $data,
    ]);
}


    /**
     * تخزين فندق جديد.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
    'name_en' => 'required|string',
    'name_ar' => 'required|string',
    'description_en' => 'nullable|string',
    'description_ar' => 'nullable|string',
    'rate' => 'nullable|numeric|between:0,5',
    'price' => 'nullable|numeric|min:0',
    'old_price' => 'nullable|numeric|min:0',
    'class' => 'nullable|string|max:255',
    'style' => 'nullable|string|max:255',
    'amenities' => 'nullable|array',
    'amenities.*' => 'string',
    'location' => 'required|string',
    'booking_link' => 'nullable|url',
    'images.*' => 'nullable|image|max:2048',
    // 'images.*' => 'nullable|image|max:2048',
    'image_urls' => 'nullable|array',
    'image_urls.*' => 'nullable|url',
]);

$hotel = Hotel::create($validated);
if ($request->hasFile('images')) {
        foreach ($request->file('images') as $imageFile) {
            $path = $imageFile->store('uploads/hotels', 'public');
            $hotel->images()->create([
                'url' => 'storage/' . $path,
            ]);
        }
    }

if ($request->has('image_urls')) {
    foreach ($request->image_urls as $url) {
        $hotel->images()->create(['url' => $url]);
    }
}

        return $this->success($hotel, '', 201); // 201 Created
    }

    /**
     * عرض تفاصيل فندق معين.
     */
    public function show(Request $request, $id)
    {
        $locale = $request->header('Accept-Language') ?? app()->getLocale();

        $hotel = Hotel::findOrFail($id);
        
        // Get images using direct query since morph relationship isn't working
        $images = DB::table('images')
            ->where('imageable_id', $hotel->id)
            ->where('imageable_type', 'hotel')
            ->pluck('url')
            ->map(function ($url) {
                if (str_starts_with($url, '/storage/') || str_starts_with($url, 'storage/')) {
                    $url = str_starts_with($url, '/') ? $url : '/' . $url;
                    return url($url);
                }
                return $url;
            })
            ->toArray();

        $name = $locale == 'ar' ? ($hotel->name_ar ?? $hotel->name_en) : ($hotel->name_en ?? $hotel->name_ar);
        $description = $locale == 'ar' ? ($hotel->description_ar ?? $hotel->description_en) : ($hotel->description_en ?? $hotel->description_ar);

        return $this->success([
            'id' => $hotel->id,
    'name' => $name,
    'name_en' => $hotel->name_en,
    'name_ar' => $hotel->name_ar,
    'description' => $description,
    'description_en' => $hotel->description_en,
    'description_ar' => $hotel->description_ar,
    'location' => $hotel->location,
    'rate' => $hotel->rate,
    'price' => $hotel->price,
    'old_price' => $hotel->old_price,
    'class' => $hotel->class,
    'style' => $hotel->style,
    'amenities' => $hotel->amenities,
    'reviews_count' => 0, // We'll skip reviews for now since relationship isn't working
    'booking_link' => $hotel->booking_link,
    'images' => $images,
        ]);
    }

    /**
     * تحديث بيانات فندق موجود.
     */
    public function update(Request $request, $id)
{
    $hotel = Hotel::findOrFail($id);

    $validated = $request->validate([
        'name_en' => 'sometimes|required|string',
        'name_ar' => 'sometimes|required|string',
        'description_en' => 'nullable|string',
        'description_ar' => 'nullable|string',
        'rate' => 'nullable|numeric|between:0,5',
        'price' => 'nullable|numeric|min:0',
        'old_price' => 'nullable|numeric|min:0',
        'class' => 'nullable|string|max:255',
        'style' => 'nullable|string|max:255',
        'amenities' => 'nullable|array',
        'amenities.*' => 'string',
        'location' => 'nullable|string',
        'booking_link' => 'nullable|url',
        'images.*' => 'nullable|image|max:2048',
        // 'images.*' => 'nullable|image|max:2048',
    'image_urls' => 'nullable|array',
    'image_urls.*' => 'nullable|url',
    ]);

    // تحديث بيانات الفندق
    $hotel->update($validated);

    // رفع الصور الجديدة إذا أُرسلت
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $imageFile) {
            $path = $imageFile->store('uploads/hotels', 'public');
            $hotel->images()->create([
                'url' => 'storage/' . $path,
            ]);
        }
    }
    if ($request->has('image_urls')) {
    foreach ($request->image_urls as $url) {
        $hotel->images()->create(['url' => $url]);
    }
}


    return $this->success($hotel->load('images'));
}


    /**
     * حذف فندق.
     */
    public function destroy($id)
    {
        Hotel::findOrFail($id)->delete();

        return $this->success(null, 'Deleted successfully');
    }
}
