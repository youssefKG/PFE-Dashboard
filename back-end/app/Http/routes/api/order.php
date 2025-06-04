<?php

use App\Http\Controllers\Api\OrderController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::middleware([VerifyCsrfToken::class])->group(function () {
    Route::get("/orders", [OrderController::class], "index");
    Route::get("/orders/{id}", [OrderController::class], "show");
    Route::get(
        "/orders/customer/{id}",
        [OrderController::class, "customerOrders"],
    );
    Route::put("/orders", [OrderController::class], "update");
});
