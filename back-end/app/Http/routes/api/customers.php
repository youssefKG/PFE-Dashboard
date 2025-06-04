<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Middlewares\Api\ValidateToken;

// User routes
Route::middleware([ValidateToken::class])->group(function () {
    Route::get('/customers', [CustomerController::class, 'index']);
    Route::post('/users', [CustomerController::class, 'store']);
    Route::get('/customers/{id}', [CustomerController::class, 'show']);
    Route::put('/customers/{id}', [CustomerController::class, 'update']);
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);
    Route::post(
'/users/{id}/toggle-status', [CustomerController::class, 'toggleStatus']);
    Route::get('/users/statistics', [CustomerController::class, 'statistics']);
});
