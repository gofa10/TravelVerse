<?php

use App\Http\Middleware\CheckUserType;
use App\Http\Middleware\GuestOnly;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withCommands([
        \App\Console\Commands\AuditTripImages::class,
    ])
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'usertype' => CheckUserType::class,
            'guest.only' => GuestOnly::class,

        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (ValidationException $exception) {
            return response()->json([
                'status' => 'error',
                'message' => 'The given data was invalid.',
                'errors' => $exception->errors(),
            ], 422);
        });

        $exceptions->render(function (TooManyRequestsHttpException $exception) {
            $retryAfter = (int) ($exception->getHeaders()['Retry-After'] ?? 60);

            return response()->json([
                'status' => 'error',
                'message' => 'Too many attempts. Please try again in 1 minute.',
                'retry_after' => $retryAfter,
            ], 429, $exception->getHeaders());
        });
    })->create();
