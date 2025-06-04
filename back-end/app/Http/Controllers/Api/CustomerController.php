<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\CustomerCollection;
use App\Http\Resources\CustomerResource;
use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Traits\Api\ApiResponse;

class CustomerController
{
    use ApiResponse;

    /**
     * Display a listing of users with pagination and search.
     */
    public function index(Request $request): JsonResponse
    {
        $query = User::query()->where("role", "user")->withCount(["orders"]);


        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }
        if ($request->has("name")) {
            $search = $request->query("name");
            $query->where(
                "first_name",
                "like",
                "%{$search}%"
            )->orWhere(
                "last_name",
                "like",
                "%{$search}%"
            )->orWhere("email", "like", "%{$search}%");
        }

        // Pagination
        $perPage = $request->input('per_page', 10);
        $users = $query->paginate($perPage); // only now should you execute the query

        return response()->json([
            'message' => 'Users retrieved successfully',
            'data' => new CustomerCollection($users),
        ], 200);
    }

    /**
     * Store a newly created user.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:admin,manager,user',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse(
                'Validation failed',
                422,
                $validator->errors()
            );
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return $this->successResponse(
            'User created successfully',
            201,
            $user
        );
    }

    /**
     * Display the specified user with their orders.
     */
    public function show($id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return $this->errorResponse(
                'User not found',
                404
            );
        }

        return $this->successResponse(
            'User retrieved successfully',
            200,
            new CustomerResource($user)
        );
    }

    /**
     * Update the specified user.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return $this->errorResponse(
                'User not found',
                404
            );
        }

        $validator = Validator::make($request->all(), [
            'fistName' => 'sometimes|required|string|max:255',
            'lastName' => 'sometimes|required|string|max:255',
            'phoneNumber' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse(
                'Validation failed',
                422,
                $validator->errors()
            );
        }

        $user->update([
            "first_name" => $request->firstName,
            "last_name" => $request->lastName,
            "phone" => $request->phoneNumber
        ]);


        return $this->successResponse(
            'User updated successfully',
            200,
            $user
        );
    }

    /**
     * Remove the specified user.
     */
    public function destroy($id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return $this->errorResponse(
                'User not found',
                404
            );
        }

        $user->delete();

        return $this->successResponse(
            'User deleted successfully',
            200
        );
    }

    /**
     * Toggle user status (active/inactive).
     */
    public function toggleStatus($id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return $this->errorResponse(
                'User not found',
                404
            );
        }

        $user->is_active = !$user->is_active;
        $user->save();

        return $this->successResponse(
            'User status updated successfully',
            200,
            $user
        );
    }

    /**
     * Get user statistics including order information.
     */
    public function statistics(): JsonResponse
    {
        $stats = [
            'total_users' => User::where('role', 'user')->count(),
            'active_users' => User::where('role', 'user')->where('is_active', true)->count(),
            'inactive_users' => User::where('role', 'user')->where('is_active', false)->count(),
            'new_users_today' => User::where('role', 'user')->whereDate('created_at', today())->count(),
            'order_statistics' => [
                'total_orders' => Order::whereHas('user', function ($q) {
                    $q->where('role', 'user');
                })->count(),
                'pending_orders' => Order::whereHas('user', function ($q) {
                    $q->where('role', 'user');
                })->where('status', 'pending')->count(),
                'completed_orders' => Order::whereHas('user', function ($q) {
                    $q->where('role', 'user');
                })->where('status', 'completed')->count(),
                'total_revenue' => Order::whereHas('user', function ($q) {
                    $q->where('role', 'user');
                })->where('status', 'completed')->sum('total_amount'),
            ]
        ];

        return $this->successResponse(
            'User statistics retrieved successfully',
            200,
            $stats
        );
    }
}
