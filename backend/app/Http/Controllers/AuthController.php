<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);
        $user->user_type = 'user';
        $user->save();

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->success(
            [
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ],
            'Registered successfully',
            200,
            [
                // Legacy keys kept for backward compatibility.
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ]
        );
    }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        $token = $user->createToken('authToken')->plainTextToken;

        return $this->success(
            [
                'token' => $token,
                'user' => $user,
            ],
            'Logged in successfully',
            200,
            [
                // Legacy keys kept for backward compatibility.
                'token' => $token,
                'user' => $user,
            ]
        );
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return $this->success(null, 'Logged out successfully');
    }

    public function profile(Request $request)
    {
        $user = $request->user();
        $legacy = $user ? $user->toArray() : [];

        return $this->success($legacy, '', 200, $legacy);
    }
}
