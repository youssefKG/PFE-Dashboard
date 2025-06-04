<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PermissionController extends Controller
{
    public function index(Request $request)
    {
        $query = Permission::query();

        // Search functionality
        if ($request->has('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }

        // Filter by module
        if ($request->has('module')) {
            $query->where('module', $request->module);
        }

        // Sort functionality
        $sortField = $request->sort_by ?? 'created_at';
        $sortDirection = $request->sort_direction ?? 'desc';
        $query->orderBy($sortField, $sortDirection);

        $permissions = $query->paginate($request->per_page ?? 10);

        return response()->json([
            'status' => 'success',
            'message' => 'Permissions retrieved successfully',
            'data' => $permissions
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:permissions',
            'description' => 'required|string',
            'module' => 'required|string|max:255',
            'action' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $permission = Permission::create([
                'name' => $request->name,
                'description' => $request->description,
                'module' => $request->module,
                'action' => $request->action
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Permission created successfully',
                'data' => $permission
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create permission',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $permission = Permission::findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Permission retrieved successfully',
            'data' => $permission
        ]);
    }

    public function update(Request $request, $id)
    {
        $permission = Permission::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:permissions,name,' . $id,
            'description' => 'required|string',
            'module' => 'required|string|max:255',
            'action' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $permission->update([
                'name' => $request->name,
                'description' => $request->description,
                'module' => $request->module,
                'action' => $request->action
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Permission updated successfully',
                'data' => $permission
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update permission',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $permission = Permission::findOrFail($id);

        try {
            $permission->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Permission deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete permission',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getModules()
    {
        $modules = Permission::distinct()->pluck('module');

        return response()->json([
            'status' => 'success',
            'message' => 'Modules retrieved successfully',
            'data' => $modules
        ]);
    }

    public function getActions()
    {
        $actions = Permission::distinct()->pluck('action');

        return response()->json([
            'status' => 'success',
            'message' => 'Actions retrieved successfully',
            'data' => $actions
        ]);
    }
} 