<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Database\Seeder;

class OrderItemSeeder extends Seeder
{
    public function run(): void
    {
        $orders = Order::all();
        $products = Product::all();

        foreach ($orders as $order) {
            // Create 1-5 items for each order
            $numberOfItems = rand(1, 5);
            $totalAmount = 0;

            for ($i = 0; $i < $numberOfItems; $i++) {
                $product = $products->random();
                $quantity = rand(1, 3);
                $unitPrice = $product->sales_price;
                $subtotal = $unitPrice * $quantity;
                $totalAmount += $subtotal;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'subtotal' => $subtotal,
                ]);
            }

            // Update order total amount
            $order->update(['total_amount' => $totalAmount]);
        }
    }
}

