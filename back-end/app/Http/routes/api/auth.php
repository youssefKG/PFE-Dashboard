<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::post("/auth/login", [AuthController::class, "login"]);
Route::post("/auth/register", [AuthController::class, "register"]);
Route::get("/auth/logout", [AuthController::class, "logout"]);
