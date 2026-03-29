<?php

namespace App\Traits;

trait ApiResponse
{
    protected function success($data = null, string $message = '', int $code = 200, array $extra = [])
    {
        return response()->json(array_merge([
            'status' => 'success',
            'data' => $data,
            'message' => $message,
        ], $extra), $code);
    }

    protected function error(string $message, int $code = 400, $errors = [])
    {
        $payload = [
            'status' => 'error',
            'message' => $message,
            'errors' => is_array($errors) ? $errors : [],
        ];

        if ($errors && !is_array($errors)) {
            $payload['errors'] = $errors;
        }

        return response()->json($payload, $code);
    }
}
