<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Middlewares\Api\ValidateToken;
use App\Http\Resources\CategoryResource;
use Illuminate\Support\Facades\Route;

Route::middleware([ValidateToken::class])->group(function () {
    // Basic CRUD routes
    Route::get("/categories", [CategoryController::class, "index"]);
    Route::get("/categories/{id}", [CategoryController::class, "show"]);
Route::post("categories/update/{id}", [CategoryController::class, "update"]);
    // Additional routes
    Route::get("categories/{id}/toggle-status", [CategoryController::class, "toggleStatus"]);
    Route::get("categories/statistics", [CategoryController::class, "statistics"]);
});
