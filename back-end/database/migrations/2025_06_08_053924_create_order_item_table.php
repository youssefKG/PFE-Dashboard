<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->uuid()->default(Str::uuid());
            $table->uuid('order_id');
            $table->uuid('product_id');
            $table->integer('quantity');
            $table->decimal('unit_pirce', 10, 2);
            $table->decimal('subtotal', 10, 2);
            $table->timestamps();
            $table
                ->foreign("order_id")
                ->references("id")
                ->on("orders")
                ->onDelete("cascade");
            $table->foreign("product_id")
                ->references("id")
                ->on("products")
                ->onDelete("cascade");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
