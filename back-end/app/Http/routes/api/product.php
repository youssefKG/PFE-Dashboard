<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Middlewares\Api\ValidateToken;
use Illuminate\Support\Facades\Route;

Route::middleware([ValidateToken::class])->group(function () {
    Route::post("/products/update/{id}", [ProductController::class, "update"]);
    Route::post("/products", [ProductController::class, "store"]);
    Route::get("/products/{id}", [ProductController::class, "show"]);
    Route::get("/products", [ProductController::class, "index"]);
    Route::delete("/products/{id}", [ProductController::class, "destroy"]);

    Route::get("products/{id}/toggle-status", [ProductController::class, "toggleStatus"]);
    Route::get("products/statistics", [ProductController::class, "statistics"]);
});
