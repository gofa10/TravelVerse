<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Support\MorphTypeResolver;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{

    public function index()
    {
        $favorites = Favorite::where('user_id', auth()->id())->get();

        // Load the favoritable relationships with images
        $favorites->load(['favoritable.images']);

        // Transform the collection to ensure proper JSON structure
        $result = $favorites->map(function ($favorite) {
            $favoritable = $favorite->favoritable;
            
            // Ensure images are properly formatted
            $images = [];
            if ($favoritable && $favoritable->images) {
                $images = $favoritable->images->map(function ($image) {
                    return [
                        'url' => $image->url,
                        'id' => $image->id
                    ];
                })->toArray();
            }

            return [
                'id' => $favorite->id,
                'favoritable_id' => $favorite->favoritable_id,
                'favoritable_type' => $favorite->favoritable_type,
                'created_at' => $favorite->created_at,
                'updated_at' => $favorite->updated_at,
                'favoritable' => [
                    'id' => $favoritable->id ?? null,
                    'name' => $favoritable->name ?? $favoritable->name_en ?? null,
                    'name_en' => $favoritable->name_en ?? null,
                    'name_ar' => $favoritable->name_ar ?? null,
                    'description' => $favoritable->description ?? $favoritable->description_en ?? null,
                    'description_en' => $favoritable->description_en ?? null,
                    'description_ar' => $favoritable->description_ar ?? null,
                    'price' => $favoritable->price ?? null,
                    'location' => $favoritable->location ?? null,
                    'rate' => $favoritable->rate ?? null,
                    'duration' => $favoritable->duration ?? null,
                    'difficulty' => $favoritable->difficulty ?? null,
                    'images' => $images,
                    'image' => !empty($images) ? $images[0]['url'] : null,
                    'thumbnail' => !empty($images) ? $images[0]['url'] : null,
                    'cover' => !empty($images) ? $images[0]['url'] : null,
                ]
            ];
        });

        return $this->success($result);
    }

    public function store(Request $request)
    {
        $request->validate([
            'favoritable_id' => 'required',
            'favoritable_type' => 'required|string',
        ]);

        $type = MorphTypeResolver::toClass($request->favoritable_type);
        if (!$type) {
            return $this->error('Invalid favoritable type', 422);
        }

        if (!$type::whereKey($request->favoritable_id)->exists()) {
            return $this->error('Invalid favoritable id', 422);
        }

        $exists = Favorite::where('user_id', auth()->id())
            ->where('favoritable_id', $request->favoritable_id)
            ->where('favoritable_type', $type)
            ->exists();

        if ($exists) {
            return $this->error('Already in favorites', 409);
        }

        $favorite = Favorite::create([
            'user_id' => auth()->id(),
            'favoritable_id' => $request->favoritable_id,
            'favoritable_type' => $type,
        ]);

        return $this->success($favorite->load('favoritable'), '', 201);
    }


    public function destroy($id)
    {
        $favorite = Favorite::where('id', $id)->where('user_id', auth()->id())->firstOrFail();
        $favorite->delete();
        return $this->success(null, 'Deleted successfully');
    }
}
