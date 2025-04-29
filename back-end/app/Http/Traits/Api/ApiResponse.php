<?php

namespace App\Http\Traits\Api;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    /**
     * Success Response
     *
     * @param mixed $data
     * @param string $message
     * @param int $code
     * @return JsonResponse
     */
    protected function successResponse(string $message = '', int $code = 200, $data): JsonResponse
    {
        return response()->json([
            'message' => $message,
            'status' => 'success',
            'data' => $data
        ], $code);
    }

    /**
     * Error Response
     *
     * @param string $message
     * @param int $code
     * @param mixed $errors
     * @return JsonResponse
     */
    protected function errorResponse(string $message, int $code = 400, $errors = null): JsonResponse
    {
        $response = [
            'status' => 'error',
            'message' => $message,
            "data" => $errors,
        ];


        return response()->json($response, $code);
    }
}
