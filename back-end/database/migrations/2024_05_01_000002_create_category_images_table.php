<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('category_images', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string('public_id');
            $table->uuid('category_id');
            $table->boolean('is_primary')->default(false);
            $table->string('image_url');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('category_images');
    }
};
