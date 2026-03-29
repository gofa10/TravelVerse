<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserType
{
    public function handle(Request $request, Closure $next, ...$types): Response
    {
        $user = auth()->user();
        $validTypes = ['user', 'admin', 'tour_guide'];
        $types = array_values(array_intersect($types, $validTypes));

         if (! $user || empty($types) || ! in_array($user->user_type, $types, true)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}
