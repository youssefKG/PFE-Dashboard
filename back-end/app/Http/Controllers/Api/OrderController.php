<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Controller;
use App\Http\Resources\CustomerOrdersCollection;
use App\Http\Resources\OrderCollection;
use App\Http\Resources\OrderDetailResource;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with(['user', 'items'])->withCount("items");


        if ($request->has('pending')) {
            $query->where('status', "pending");
        }
        if ($request->has("completed")) {
            $query->orWhere("status", "completed");
        }
        if ($request->has("cancelled")) {
            $query->orWhere("status", "cancelled");
        }
        if ($request->has("processing")) {
            $query->orWhere("status", "processing");
        }

        if ($request->has("name")) {
            $name = $request->query("name");
            $query->whereHas("user", function ($q) use ($name) {
                $q->where("first_name", "like", "%{$name}%")
                    ->orWhere("last_name", "like", "%{$name}%")
                    ->orWhere("email", "like", "%{$name}%");
            });
        }
        // Filter by date range
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('created_at', [$request->start_date, $request->end_date]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Orders retrieved successfully',
            'data' => new OrderCollection($query->get())
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'client_id' => 'required|exists:clients,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'shipping_address' => 'required|string',
            'payment_method' => 'required|in:credit_card,cash,paypal',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            // Generate order number
            $orderNumber = 'ORD-' . strtoupper(uniqid());

            // Calculate total amount
            $totalAmount = 0;
            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);
                $totalAmount += $product->price * $item['quantity'];
            }

            // Create order
            $order = Order::create([
                'client_id' => $request->client_id,
                'order_number' => $orderNumber,
                'total_amount' => $totalAmount,
                'status' => 'pending',
                'shipping_address' => $request->shipping_address,
                'payment_method' => $request->payment_method,
                'notes' => $request->notes
            ]);

            // Create order items
            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'subtotal' => $product->price * $item['quantity']
                ]);

                // Update product stock
                $product->decrement('stock', $item['quantity']);
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Order created successfully',
                'data' => $order->load(['client.user', 'items.product'])
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $order = Order::with(['user', 'items.product.images'])->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Order retrieved successfully',
            'data' => new OrderDetailResource($order)
        ]);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
            'shipping_address' => 'sometimes|required|string',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            // If order is being cancelled, restore product stock
            if ($request->status === 'cancelled' && $order->status !== 'cancelled') {
                foreach ($order->items as $item) {
                    $item->product->increment('stock', $item->quantity);
                }
            }

            $order->update($request->only(['status', 'shipping_address', 'notes']));

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Order updated successfully',
                'data' => $order->load(['client.user', 'items.product'])
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);

        try {
            DB::beginTransaction();

            // Restore product stock
            foreach ($order->items as $item) {
                $item->product->increment('stock', $item->quantity);
            }

            // Delete order items
            $order->items()->delete();

            // Delete order
            $order->delete();

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Order deleted successfully'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function statistics()
    {
        $totalOrders = Order::count();
        $totalRevenue = Order::where('status', '!=', 'cancelled')->sum('total_amount');
        $pendingOrders = Order::where('status', 'pending')->count();
        $completedOrders = Order::where('status', 'delivered')->count();
        $ordersThisMonth = Order::whereMonth('created_at', now()->month)->count();
        $revenueThisMonth = Order::whereMonth('created_at', now()->month)
            ->where('status', '!=', 'cancelled')
            ->sum('total_amount');

        return response()->json([
            'status' => 'success',
            'message' => 'Order statistics retrieved successfully',
            'data' => [
                'totalOrders' => $totalOrders,
                'totalRevenue' => $totalRevenue,
                'pendingOrders' => $pendingOrders,
                'completedOrders' => $completedOrders,
                'ordersThisMonth' => $ordersThisMonth,
                'revenueThisMonth' => $revenueThisMonth
            ]
        ]);
    }

    public function customerOrders(string $id)
    {

        $orders  = Order::where("user_id", $id);

        return $this->successResponse(
            "Cutomer orders list",
            200,
            new CustomerOrdersCollection($orders->get())
        );
    }
}
