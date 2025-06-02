<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\CategoryCollection;
use App\Http\Controllers\Api\Controller;
use App\Http\Resources\CategoryResource;
use App\Interfaces\StorageServiceI;
use App\Models\Category;
use App\Models\CategoryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{

    public function __construct(private StorageServiceI $storageService) {}

    public function store(Request $request)
    {
        $categoryValidator = Validator::make($request->all(), [
            "name" => "required|min:4|max:255",
            "description" => "required|min:10|max:255",
            "image" => "required|image|max:5120",
            "parent_id" => "nullable|exists:categories,id",
            "is_active" => "boolean"
        ]);

        if ($categoryValidator->fails()) {
            return $this->errorResponse(
                "Form category validation failed",
                400,
                $categoryValidator->errors()
            );
        }

        $this->successResponse("create succef", 200, null);
        try {
            DB::beginTransaction();

            // create the category
            $newCategory = Category::create([
                "name" => $request->name,
                "description" => $request->description,
                "parent_id" => $request->parent_id,
                "is_active" => $request->is_active ?? true
            ]);

            // upload and store the image
            $catImage = $this->storageService->upload($request->file("image"));

            CategoryImage::create([
                "public_id" => $catImage["public_id"],
                "category_id" => $newCategory->id,
                "is_primary" => true,
                "image_url" => $catImage["url"],
            ]);

            DB::commit();

            return $this->successResponse(
                "Success: The category " . $request->name . " created successfully",
                200,
                $newCategory->id
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(
                "Failed to create category",
                500,
                $e->getMessage()
            );
        }
    }

    public function index(Request $request)
    {
        $query = Category::with(['images', 'parent', 'children']);

        // Search by name
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('is_active', $request->status === 'active');
        }

        // Filter by parent
        if ($request->has('parent_id')) {
            $query->where('parent_id', $request->parent_id);
        }

        // Sort by
        $sortField = $request->get('sort_by', 'name');
        $sortDirection = $request->get('sort_direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        return new CategoryCollection($query->paginate($request->get('per_page', 10)));
    }

    public function show(string $id)
    {
        $category = Category::with(['images', 'parent', 'children', 'products'])->findOrFail($id);
        return new CategoryResource($category);
    }

    public function update(Request $request, string $id)
    {
        $categoryValidator = Validator::make($request->all(), [
            "name" => "sometimes|required|min:4|max:255",
            "description" => "sometimes|required|min:10|max:255",
            "image" => "sometimes|required|image|max:5120",
            "parent_id" => "nullable|exists:categories,id",
            "is_active" => "boolean"
        ]);

        if ($categoryValidator->fails()) {
            return $this->errorResponse(
                "Form category validation failed",
                400,
                $categoryValidator->errors()
            );
        }

        try {
            DB::beginTransaction();

            $category = Category::findOrFail($id);

            // Update category details
            $category->update($request->only([
                'name',
                'description',
                'parent_id',
                'is_active',
            ]));

            // Handle image update if provided
            if ($request->hasFile('image')) {
                // Delete old image from storage
                if ($category->primaryImage) {
                    $this->storageService->delete($category->primaryImage->public_id);
                    $category->primaryImage->delete();
                }

                // Upload and store new image
                $catImage = $this->storageService->upload($request->file("image"));
                CategoryImage::create([
                    "public_id" => $catImage["public_id"],
                    "category_id" => $category->id,
                    "is_primary" => true,
                    "image_url" => $catImage["url"],
                ]);
            }

            DB::commit();

            return $this->successResponse(
                "Category updated successfully",
                200,
                new CategoryResource($category->fresh(['images', 'parent', 'children']))
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(
                "Failed to update category",
                500,
                $e->getMessage()
            );
        }
    }

    public function destroy(string $id)
    {
        try {
            DB::beginTransaction();

            $category = Category::with('images')->findOrFail($id);

            // Check if category has products
            if ($category->products()->exists()) {
                return $this->errorResponse(
                    "Cannot delete category with associated products",
                    400
                );
            }

            // Delete images from storage
            foreach ($category->images as $image) {
                $this->storageService->delete($image->public_id);
            }

            // Delete the category
            $category->delete();

            DB::commit();

            return $this->successResponse(
                "Category deleted successfully",
                200,
                null

            );
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(
                "Failed to delete category",
                500,
                $e->getMessage()
            );
        }
    }

    public function statistics()
    {
        $stats = [
            'total_categories' => Category::count(),
            'active_categories' => Category::where('is_active', true)->count(),
            'categories_with_images' => Category::whereHas('images')->count(),
            'categories_with_description' => Category::whereNotNull('description')->count(),
            'root_categories' => Category::whereNull('parent_id')->count(),
            'categories_with_products' => Category::whereHas('products')->count(),
        ];

        return $this->successResponse(
            "Category statistics retrieved successfully",
            200,
            $stats
        );
    }

    public function toggleStatus(string $id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->update(['is_active' => !$category->is_active]);

            return $this->successResponse(
                "Category status updated successfully",
                200,
                new CategoryResource($category)
            );
        } catch (\Exception $e) {
            return $this->errorResponse(
                "Failed to update category status",
                500,
                $e->getMessage()
            );
        }
    }
}
