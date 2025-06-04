<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('role', 'user')->get();
        $statuses = ['pending', 'processing', 'completed', 'cancelled'];
        $paymentMethods = ['credit_card', 'paypal', 'bank_transfer'];
        $paymentStatuses = ['pending', 'paid', 'failed'];

        foreach ($users as $user) {
            // Create 1-5 orders for each user
            $numberOfOrders = rand(1, 5);

            for ($i = 0; $i < $numberOfOrders; $i++) {
                Order::create([
                    "id" => Str::uuid(),
                    'user_id' => $user->id,
                    'order_number' => Order::generateOrderNumber(),
                    'total_amount' => 0, // Will be updated by OrderItemSeeder
                    'status' => $statuses[array_rand($statuses)],
                    'notes' => rand(0, 1) ? 'Sample order notes' : null,
                    'shipping_address' => '123 Sample Street, City, Country',
                    'billing_address' => '123 Sample Street, City, Country',
                    'payment_method' => $paymentMethods[array_rand($paymentMethods)],
                    'payment_status' => $paymentStatuses[array_rand($paymentStatuses)],
                    'created_at' => now()->subDays(rand(0, 30)),
                    'updated_at' => now()->subDays(rand(0, 30)),
                ]);
            }
        }
    }
}

