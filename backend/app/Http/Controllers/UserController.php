<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use App\Models\Image;
use App\Models\Favorite;
use App\Models\Reservation;
use App\Models\Review;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class UserController extends Controller
{
    public function index()
    {
        return $this->success(
            User::select('id', 'name', 'email', 'user_type')->paginate(10)
        );

    }
    public function all()
    {
        return $this->success(User::select('id', 'name', 'email', 'user_type')->get());
    }

    public function guides()
    {
        $guides = User::query()
            ->where('user_type', 'tour_guide')
            ->with('image')
            ->get()
            ->map(function ($guide) {
                return [
                    'id' => $guide->id,
                    'name' => $guide->name,
                    'email' => $guide->email,
                    'profile_image' => $guide->image?->url,
                ];
            });

        return $this->success($guides);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'user_type' => 'required|string|in:user,admin,tour_guide',
            'password' => 'required|string|min:6',
            'avatar' => 'nullable|image|max:2048',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $user->user_type = $request->user_type;
        $user->save();

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $url = asset('storage/' . $path);

            Image::create([
                'url' => $url,
                'imageable_id' => $user->id,
                'imageable_type' => get_class($user),
            ]);
        }

        return $this->success($user, '', 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'user_type' => 'sometimes|string|in:user,admin,tour_guide',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'user_type' => $request->has('user_type') ? $request->user_type : $user->user_type,
        ]);

        return $this->success($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return $this->success(null, 'Deleted successfully');
    }

    public function details($id)
    {
        $user = User::with('image')->select('id', 'name', 'email', 'user_type', 'created_at')->findOrFail($id);

        $favorites = Favorite::where('user_id', $user->id)
            ->with([
                'favoritable' => function (MorphTo $morphTo) {
                    $morphTo->morphWith([
                        \App\Models\Trip::class => ['images'],
                        \App\Models\Hotel::class => ['images'],
                        \App\Models\Restaurant::class => ['images'],
                        \App\Models\Activity::class => ['images'],
                        \App\Models\Car::class => ['images'],
                        \App\Models\Cruise::class => ['images'],
                        \App\Models\Flight::class => ['images'],
                    ]);
                },
            ])
            ->latest()
            ->get();

        $reviews = Review::where('user_id', $user->id)
            ->with([
                'reviewable' => function (MorphTo $morphTo) {
                    $morphTo->morphWith([
                        \App\Models\Trip::class => ['images'],
                        \App\Models\Hotel::class => ['images'],
                        \App\Models\Restaurant::class => ['images'],
                        \App\Models\Activity::class => ['images'],
                        \App\Models\Car::class => ['images'],
                        \App\Models\Cruise::class => ['images'],
                        \App\Models\Flight::class => ['images'],
                    ]);
                },
            ])
            ->latest()
            ->get();

        $reservations = Reservation::where('user_id', $user->id)
            ->with([
                'reservable' => function (MorphTo $morphTo) {
                    $morphTo->morphWith([
                        \App\Models\Trip::class => ['images'],
                        \App\Models\Hotel::class => ['images'],
                        \App\Models\Restaurant::class => ['images'],
                        \App\Models\Activity::class => ['images'],
                        \App\Models\Car::class => ['images'],
                        \App\Models\Cruise::class => ['images'],
                        \App\Models\Flight::class => ['images'],
                    ]);
                },
            ])
            ->latest()
            ->get();

        $reservationStatusCounts = $reservations
            ->groupBy('status')
            ->map(fn($group) => $group->count());

        return $this->success([
            'user' => $user,
            'summary' => [
                'favorites_count' => $favorites->count(),
                'reviews_count' => $reviews->count(),
                'reservations_count' => $reservations->count(),
                'reservation_status_counts' => $reservationStatusCounts,
            ],
            'favorites' => $favorites,
            'reviews' => $reviews,
            'reservations' => $reservations,
        ]);
    }
    public function profile(Request $request)
    {
        $user = $request->user();
        return $this->success([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'image' => $user->image ? [
                'id' => $user->image->id,
                'url' => $user->image->url,
            ] : null,
        ]);
    }


    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'avatar' => 'nullable|image|max:2048',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->hasFile('avatar')) {
            // حذف الصورة القديمة (لو موجودة)
            if ($user->image) {
                if (str_contains($user->image->url, 'storage')) {
                    $relativePath = str_replace(asset('storage') . '/', '', $user->image->url);
                    Storage::disk('public')->delete($relativePath);
                }
                $user->image->delete();
            }

            $path = $request->file('avatar')->store('avatars', 'public');
            $url = asset('storage/' . $path);

            Image::create([
                'url' => $url,
                'imageable_id' => $user->id,
                'imageable_type' => get_class($user),
            ]);
        }

        $user->save();

        return $this->success([
            'message' => 'Profile updated successfully',
            'user' => $user->load('image')
        ]);
    }

    public function removeAvatar(Request $request)
    {
        $user = $request->user();

        if ($user->image) {
            if (str_contains($user->image->url, 'storage')) {
                $relativePath = str_replace(asset('storage') . '/', '', $user->image->url);
                Storage::disk('public')->delete($relativePath);
            }
            $user->image->delete();
        }

        return $this->success([
            'message' => 'Avatar removed successfully',
            'user' => $user->load('image')
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current' => 'required',
            'new' => 'required|min:6|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current, $user->password)) {
            return $this->error('Current password is incorrect', 422);
        }

        $user->password = bcrypt($request->new);
        $user->save();

        return $this->success(null, 'Password changed successfully');
    }

    public function deleteAccount(Request $request)
    {
        $user = $request->user();

        // حذف صورة المستخدم من جدول images والتخزين
        if ($user->image) {
            if (str_contains($user->image->url, 'storage')) {
                $relativePath = str_replace(asset('storage') . '/', '', $user->image->url);
                Storage::disk('public')->delete($relativePath);
            }
            $user->image->delete();
        }

        // Clean related user-owned records to avoid orphaned polymorphic data.
        Favorite::where('user_id', $user->id)->delete();
        Review::where('user_id', $user->id)->delete();
        Reservation::where('user_id', $user->id)->delete();

        $user->delete();

        return $this->success(null, 'Deleted successfully');
    }
}
