<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $query = Client::with(['user', 'orders']);

        // Search functionality
        if ($request->has('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Sort functionality
        $sortField = $request->sort_by ?? 'created_at';
        $sortDirection = $request->sort_direction ?? 'desc';
        $query->orderBy($sortField, $sortDirection);

        $clients = $query->paginate($request->per_page ?? 10);

        return response()->json([
            'status' => 'success',
            'message' => 'Clients retrieved successfully',
            'data' => $clients
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
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

            // Create user
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'client'
            ]);

            // Handle avatar upload
            $avatarPath = null;
            if ($request->hasFile('avatar')) {
                $avatarPath = $request->file('avatar')->store('avatars', 'public');
            }

            // Create client
            $client = Client::create([
                'user_id' => $user->id,
                'phone' => $request->phone,
                'address' => $request->address,
                'avatar' => $avatarPath,
                'status' => 'active'
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Client created successfully',
                'data' => $client->load('user')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create client',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $client = Client::with(['user', 'orders'])->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Client retrieved successfully',
            'data' => $client
        ]);
    }

    public function update(Request $request, $id)
    {
        $client = Client::findOrFail($id);
        $user = $client->user;

        $validator = Validator::make($request->all(), [
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'phone' => 'sometimes|required|string|max:20',
            'address' => 'sometimes|required|string',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'status' => 'sometimes|required|in:active,inactive'
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

            // Update user
            $user->update($request->only(['first_name', 'last_name', 'email']));

            // Handle avatar upload
            if ($request->hasFile('avatar')) {
                // Delete old avatar
                if ($client->avatar) {
                    Storage::disk('public')->delete($client->avatar);
                }
                $avatarPath = $request->file('avatar')->store('avatars', 'public');
                $request->merge(['avatar' => $avatarPath]);
            }

            // Update client
            $client->update($request->only(['phone', 'address', 'avatar', 'status']));

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Client updated successfully',
                'data' => $client->load('user')
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update client',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $client = Client::findOrFail($id);

        try {
            DB::beginTransaction();

            // Delete avatar if exists
            if ($client->avatar) {
                Storage::disk('public')->delete($client->avatar);
            }

            // Delete user (this will cascade delete the client)
            $client->user->delete();

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Client deleted successfully'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete client',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function toggleStatus($id)
    {
        $client = Client::findOrFail($id);
        $client->status = $client->status === 'active' ? 'inactive' : 'active';
        $client->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Client status updated successfully',
            'data' => $client
        ]);
    }

    public function statistics()
    {
        $totalClients = Client::count();
        $activeClients = Client::where('status', 'active')->count();
        $inactiveClients = Client::where('status', 'inactive')->count();
        $newClientsThisMonth = Client::whereMonth('created_at', now()->month)->count();

        return response()->json([
            'status' => 'success',
            'message' => 'Client statistics retrieved successfully',
            'data' => [
                'total_clients' => $totalClients,
                'active_clients' => $activeClients,
                'inactive_clients' => $inactiveClients,
                'new_clients_this_month' => $newClientsThisMonth
            ]
        ]);
    }
} 