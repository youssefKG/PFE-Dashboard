<?php

namespace App\Providers;

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Interfaces\StorageServiceI;
use App\Services\CloudinaryService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(StorageServiceI::class, function ($app) {
            return new CloudinaryService();
        });

        $this->app->bind(ProductController::class, function ($app) {
            return new ProductController($app->make(StorageServiceI::class));
        });
        $this->app->bind(CategoryController::class, function ($app) {
            return new CategoryController($app->make(StorageServiceI::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
