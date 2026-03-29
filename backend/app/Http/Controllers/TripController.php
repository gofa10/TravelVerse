<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TripController extends Controller
{
    public function guideTrips()
    {
        $trips = Trip::where('guide_id', Auth::id())
            ->with('images')
            ->withCount('reviews')
            ->latest()
            ->paginate(20);

        return $this->success($trips);
    }

    public function index(Request $request)
    {
        $locale = $request->header('Accept-Language') ?? app()->getLocale();

        $query = Trip::with('images', 'guide')->withCount('reviews');

        // Filter by type only if the column exists to avoid SQL errors.
        if ($request->filled('type') && Schema::hasColumn('trips', 'type')) {
            $query->where('type', $request->type);
        }

        // فلترة حسب الدولة (country)
        if ($request->has('country') && $request->country) {
            $query->where('location', $request->country); // country هنا تكون string مثل "United Arab Emirates"

            if ($request->has('min_price')) {
                $query->where('price', '>=', $request->min_price);
            }
            if ($request->has('max_price')) {
                $query->where('price', '<=', $request->max_price);
            }

            if ($request->has('min_duration')) {
                $query->whereRaw("duration REGEXP '^[0-9]+'")
                    ->whereRaw("CAST(SUBSTRING_INDEX(duration, ' ', 1) AS UNSIGNED) >= ?", [$request->min_duration]);
            }
            if ($request->has('max_duration')) {
                $query->whereRaw("duration REGEXP '^[0-9]+'")
                    ->whereRaw("CAST(SUBSTRING_INDEX(duration, ' ', 1) AS UNSIGNED) <= ?", [$request->max_duration]);
            }

        }


        // فلترة حسب الشريك (partner)


        // فلترة حسب الميزانية (rating = budget)
        if ($request->has('budget') && is_numeric($request->budget)) {
            $query->where('price', '<=', $request->budget);
        }

        $trips = $query->paginate(30);

        $data = $trips->getCollection()->map(function ($trip) use ($locale) {
            // Get images using direct query since morph relationship isn't working
            $images = DB::table('images')
                ->where('imageable_id', $trip->id)
                ->where('imageable_type', 'trip')
                ->pluck('url')
                ->map(function ($url) {
                    if (!is_string($url) || trim($url) === '') {
                        return null;
                    }

                    $trimmed = trim($url);

                    if (str_contains($trimmed, '/storage/')) {
                        $relativePath = explode('/storage/', $trimmed, 2)[1] ?? '';
                        if ($relativePath === '' || !Storage::disk('public')->exists($relativePath)) {
                            return null;
                        }
                        return url('/storage/' . ltrim($relativePath, '/'));
                    }

                    if (str_starts_with($trimmed, 'storage/')) {
                        $relativePath = substr($trimmed, strlen('storage/'));
                        if ($relativePath === '' || !Storage::disk('public')->exists($relativePath)) {
                            return null;
                        }
                        return url('/storage/' . ltrim($relativePath, '/'));
                    }

                    return $trimmed;
                })
                ->filter()
                ->values()
                ->toArray();

            return [
                'id' => $trip->id,
                'name' => $locale === 'ar' ? $trip->name_ar : $trip->name_en,
                'description' => $locale === 'ar' ? $trip->description_ar : $trip->description_en,
                'location' => $trip->location,
                'price' => $trip->price,
                'rate' => $trip->rate,
                'duration' => $trip->duration,
                'continent' => $trip->continent,
                'difficulty' => $trip->difficulty,
                'reviews_count' => $trip->reviews_count,
                'images' => $images,
                'booking_link' => $trip->booking_link,
                'guide' => [
                    'id' => $trip->guide?->id,
                    'name' => $trip->guide?->name,
                ],
            ];
        });

        return $this->success([
            'current_page' => $trips->currentPage(),
            'last_page' => $trips->lastPage(),
            'per_page' => $trips->perPage(),
            'total' => $trips->total(),
            'items' => $data,
        ]);
    }



    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name_en' => 'required|string',
            'name_ar' => 'required|string',
            'description_en' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'location' => 'required|string',
            'price' => 'required|numeric',
            'rate' => 'required|numeric|min:0|max:5',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'booking_link' => 'nullable|url',
            'guide_id' => [
                'nullable',
                Rule::exists('users', 'id')->where(fn($query) => $query->where('user_type', 'tour_guide')),
            ],
            'duration' => 'nullable|string',
            'continent' => 'nullable|string',
            'difficulty' => 'nullable|in:easy,medium,hard',
            'images.*' => 'nullable|image|max:2048',
            'image_urls' => 'nullable|array',
            'image_urls.*' => 'nullable|url',
        ]);

        // تأكد أن الحقول الاختيارية تكون null عند عدم الإرسال
        $validated['difficulty'] = $validated['difficulty'] ?? null;

        if ($user->user_type === 'tour_guide') {
            $validated['guide_id'] = $user->id;
        } elseif ($user->user_type === 'admin') {
            $validated['guide_id'] = $validated['guide_id'] ?? null;
        } else {
            return $this->error('Unauthorized', 403);
        }

        $trip = Trip::create($validated);

        // ✅ رفع الصور من الجهاز
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) {
                $path = $imageFile->store('trips', 'public');
                $trip->images()->create(['url' => '/storage/' . $path]);
            }
        }

        // ✅ روابط صور خارجية
        if ($request->has('image_urls')) {
            foreach ($request->image_urls as $url) {
                $trip->images()->create(['url' => $url]);
            }
        }

        return $this->success($trip->load('images'), '', 201);
    }





    public function show(Request $request, $id)
    {
        $locale = $request->header('Accept-Language') ?? app()->getLocale();

        $trip = Trip::with('guide', 'reviews')->findOrFail($id);
        
        // Get images using direct query since morph relationship isn't working
        $images = DB::table('images')
            ->where('imageable_id', $trip->id)
            ->where('imageable_type', 'trip')
            ->pluck('url')
            ->map(function ($url) {
                if (!is_string($url) || trim($url) === '') {
                    return null;
                }

                $trimmed = trim($url);

                if (str_contains($trimmed, '/storage/')) {
                    $relativePath = explode('/storage/', $trimmed, 2)[1] ?? '';
                    if ($relativePath === '' || !Storage::disk('public')->exists($relativePath)) {
                        return null;
                    }
                    return url('/storage/' . ltrim($relativePath, '/'));
                }

                if (str_starts_with($trimmed, 'storage/')) {
                    $relativePath = substr($trimmed, strlen('storage/'));
                    if ($relativePath === '' || !Storage::disk('public')->exists($relativePath)) {
                        return null;
                    }
                    return url('/storage/' . ltrim($relativePath, '/'));
                }

                return $trimmed;
            })
            ->filter()
            ->values()
            ->toArray();

        return $this->success([
            'id' => $trip->id,
            'name' => $locale === 'ar' ? $trip->name_ar : $trip->name_en,
            'name_en' => $trip->name_en,
            'name_ar' => $trip->name_ar,
            'description' => $locale === 'ar' ? $trip->description_ar : $trip->description_en,
            'description_en' => $trip->description_en,
            'description_ar' => $trip->description_ar,
            'location' => $trip->location,
            'price' => $trip->price,
            'rate' => $trip->rate,
            'duration' => $trip->duration,
            'continent' => $trip->continent,
            'difficulty' => $trip->difficulty,
            'reviews_count' => $trip->reviews->count(),
            'images' => $images,
            'booking_link' => $trip->booking_link,
            'guide' => [
                'id' => $trip->guide?->id,
                'name' => $trip->guide?->name,
            ],
        ]);
    }

    public function uploadImages(Request $request, $id)
    {
        $trip = Trip::findOrFail($id);

        $request->validate([
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $uploadedImages = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('trips', 'public');

                $uploadedImages[] = $trip->images()->create([
                    'url' => '/storage/' . $path,
                ]);
            }
        }

        return $this->success([
            'message' => 'Images uploaded successfully',
            'images' => $uploadedImages,
        ]);
    }

    public function update(Request $request, $id)
    {
        $trip = Trip::findOrFail($id);
        $user = Auth::user();

        if ($user->user_type === 'tour_guide' && (int) $trip->guide_id !== (int) $user->id) {
            return $this->error('Forbidden', 403);
        }


        $validated = $request->validate([
            'name_en' => 'sometimes|required|string',
            'name_ar' => 'sometimes|required|string',
            'description_en' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'location' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric',
            'rate' => 'sometimes|required|numeric',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'booking_link' => 'nullable|url',
            'guide_id' => [
                'nullable',
                Rule::exists('users', 'id')->where(fn($query) => $query->where('user_type', 'tour_guide')),
            ],
            'duration' => 'nullable|string',
            'continent' => 'nullable|string',
            'difficulty' => 'nullable|in:easy,medium,hard',
            'images.*' => 'nullable|image|max:2048',
            'image_urls' => 'nullable|array',
            'image_urls.*' => 'nullable|url',
            'old_images' => 'nullable|array',
            'old_images.*' => 'integer|exists:images,id',
        ]);

        $validated['difficulty'] = $validated['difficulty'] ?? null;

        if ($user->user_type === 'tour_guide') {
            $validated['guide_id'] = $user->id;
        }


        // تحديث البيانات
        $trip->update($validated);

        // حذف الصور غير المرسلة
        $existingImageIds = $trip->images()->pluck('id')->toArray();
        $keepImages = $request->old_images ?? [];
        $deleteImages = array_diff($existingImageIds, $keepImages);

        foreach ($deleteImages as $imageId) {
            $trip->images()->where('id', $imageId)->delete();
        }

        // رفع صور من الجهاز
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) {
                $path = $imageFile->store('trips', 'public');
                $trip->images()->create(['url' => '/storage/' . $path]);
            }
        }

        // روابط صور مباشرة
        if ($request->has('image_urls')) {
            foreach ($request->image_urls as $url) {
                $trip->images()->create(['url' => $url]);
            }
        }

        return $this->success($trip->load('images'));
    }




    public function destroy($id)
    {
        $trip = Trip::findOrFail($id);
        $user = Auth::user();

        if ($user->user_type === 'tour_guide' && (int) $trip->guide_id !== (int) $user->id) {
            return $this->error('Forbidden', 403);
        }


        $trip->delete();

        return $this->success(null, 'Deleted successfully');
    }

}
