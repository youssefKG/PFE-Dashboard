<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Traits\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController
{
    use ApiResponse;

    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            "email" => ["required", "email"],
            "password" => ["required", "min:8", "max:255"],
        ]);

        if ($validator->fails()) {
            return $this->errorResponse(
                "Form validation failed",
                403,
                $validator->errors()
            );
        }

        $credentials = $request->only('email', 'password');


        $user = User::where("email", $credentials["email"])->first();

        if (!$user || !Hash::check(
            $credentials["password"],
            $user["password"]
        )) {
            return $this->errorResponse("Email or password incorrect", 400, null);
        };

        // Start a new session
        $request->session()->start();

        // Store user data in session
        $request->session()->put([
            'user_id' => $user->id,
            'user_email' => $user->email,
            'user_name' => $user->first_name . ' ' . $user->last_name,
            'last_activity' => now()
        ]);

        // Save the session
        $request->session()->save();

        return $this->successResponse(
            "Login successful",
            200,
            [
                "id" => $user["id"],
                "first_name" => $user["first_name"],
                "last_name" => $user["last_name"],
                "email" => $user["email"]
            ],
        );
    }

    public function register(Request $request): JsonResponse
    {
        $userFormData = $request->all();

        $formValidator = Validator::make($userFormData, [
            "first_name" => "required|string|min:4|max:200",
            "last_name" => "required|string|min:4|max:200",
            "email" => "required|string|email|max:255|unique:users",
            "password" => "required|min:8|confirmed",
        ]);

        if ($formValidator->fails()) {
            return $this->errorResponse(
                "Form Validation fail",
                400,
                $formValidator->errors()
            );
        }

        $user = User::create([
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "email" => $request->email,
            "password" => Hash::make($request->password),
            "role" => "user",
        ]);




        return $this->successResponse(
            "User registered successfully",
            201,
            null
        );
    }

    public function logout(Request $request): JsonResponse
    {
        // Clear all session data
        $request->session()->flush();

        // Invalidate the session
        $request->session()->invalidate();

        // Regenerate the session token
        $request->session()->regenerateToken();

        // Logout the user
        Auth::logout();

        return $this->successResponse(
            "Logged out successfully",
            200,
            null
        );
    }

    public function checkSession(Request $request): JsonResponse
    {
        // Check if session exists and has user data
        if (!$request->session()->has('user_id')) {
            return $this->errorResponse(
                "No active session",
                401,
                null
            );
        }

        // Get session data
        $sessionData = [
            'user_id' => $request->session()->get('user_id'),
            'user_email' => $request->session()->get('user_email'),
            'user_name' => $request->session()->get('user_name'),
            'last_activity' => $request->session()->get('last_activity')
        ];

        return $this->successResponse(
            "Session data retrieved",
            200,
            $sessionData
        );
    }

    public function checkAuth(Request $request): JsonResponse
    {
        if (!Auth::check()) {
            return $this->errorResponse(
                "Not authenticated",
                401,
                null
            );
        }

        $user = Auth::user();

        return $this->successResponse(
            "User is authenticated",
            200,
            [
                "user" => [
                    "email" => $user->email,
                    "first_name" => $user->first_name,
                    "last_name" => $user->last_name,
                    "id" => $user->id
                ]
            ]
        );
    }
}
