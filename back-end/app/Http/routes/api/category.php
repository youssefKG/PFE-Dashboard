<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Middlewares\Api\ValidateToken;
use App\Http\Resources\CategoryResource;
use Illuminate\Support\Facades\Route;

Route::middleware([ValidateToken::class])->group(function () {
Route::resource("categorys", CategoryController::class );
});
