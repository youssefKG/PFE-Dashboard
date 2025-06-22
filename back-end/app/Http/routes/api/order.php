<?php

use App\Http\Controllers\Api\OrderController;
use App\Http\Middlewares\Api\ValidateToken;
use Illuminate\Support\Facades\Route;

Route::middleware([ValidateToken::class])->group(function () {
    Route::get("/orders", [OrderController::class, "index"]);
    // Route::get("/orders/{id}", [OrderController::class], "show");
    Route::get(
        "/orders/customer/{id}",
        [OrderController::class, "customerOrders"],
    );
    Route::get("/orders/statistics", [OrderController::class, "statistics"]);
    Route::get("/orders/{id}", [OrderController::class, "show"]);
    // Route::put("/orders", [OrderController::class], "update");
});
