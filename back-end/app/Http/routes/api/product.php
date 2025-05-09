<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Middlewares\Api\ValidateToken;
use Illuminate\Support\Facades\Route;

Route::middleware([ValidateToken::class])->group(function () {
    Route::resource("products", ProductController::class);
});
