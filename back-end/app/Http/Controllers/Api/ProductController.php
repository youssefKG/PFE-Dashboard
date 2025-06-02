<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Http\Traits\Api\ApiResponse;
use App\Interfaces\StorageServiceI;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    use ApiResponse;

    public function __construct(private StorageServiceI $storageService) {}

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                "name" => "required|string|max:55|min:6",
                "description" => "required|string|max:255|min:10",
                "categoryId" => "required|string|exists:categories,id",
                "regularPrice" => "required|numeric|min:0",
                "salesPrice" => "required|numeric|min:0|lte:regularPrice",
                "quantity" => "required|integer|min:0",
                "images" => "required|array|min:1",
                "images.*" => "required|image|max:5120",
                "is_active" => "boolean",
            ]
        );

        if ($validator->fails()) {
            return $this->errorResponse(
                "Product validation failed",
                400,
                $validator->errors()
            );
        }


        try {
            DB::beginTransaction();

            $productData = [
                "name" => $request->name,
                "description" => $request->description,
                "category_id" => $request->categoryId,
                "regular_price" => $request->regularPrice,
                "sales_price" => $request->salesPrice,
                "quantity" => $request->quantity,
                "is_active" => $request->is_active ?? true,
            ];

            $newProduct = Product::create($productData);

            foreach ($request->file("images") as $index => $fileImage) {
                $image = $this->storageService->upload($fileImage);
                ProductImage::create([
                    "product_id" => $newProduct["id"],
                    "is_primary" => $index === 0, // First image is primary
                    "public_id" => $image["public_id"],
                    "image_url" => $image["url"],
                    "sort_order" => $index
                ]);
            }

            DB::commit();

            return $this->successResponse(
                "Success: Product created successfully",
                200,
                new ProductResource(
                    Product::with(["images", "category.images"])->find($newProduct["id"])
                )
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(
                "Failed to create product",
                500,
                $e->getMessage()
            );
        }
    }

    public function test()
    {
        $user = Auth::user();
        return $this->successResponse("user ", 200, $user);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::with(['images', 'category.images']);

        // Sort by
        $sortField = $request->get('sort_by', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        if ($request->has("name")) {
            $query->where("name", "LIKE", "%{$request->query('name')}%");
        }
        if ($request->has("category_id")) {
            $query->where("category_id", $request->query("category_id"));
        }


        return new ProductCollection(
            $query->paginate($request->get('per_page', 10))
        );

        return $this->successResponse(
            "product list",
            200,
            new ProductCollection($query->paginate())
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        try {
            $query = Product::with(['images', 'category.images'])
                ->findOrFail($id);


            if ($request->has("name")) {
                $query->where("name", "LIKE", "%{$request->query('name')}");
            }


            return $this->successResponse(
                "Success: Product details retrieved",
                200,
                new ProductResource($query)
            );
        } catch (\Exception $e) {
            return $this->errorResponse(
                "Failed to retrieve product",
                404,
                $e->getMessage()
            );
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                "name" => "required|string|max:55|min:6",
                "description" => "sometimes|required|string|max:255|min:10",
                "categoryId" => "sometimes|required|string|exists:categories,id",
                "regularPrice" => "sometimes|required|numeric|min:0",
                "salesPrice" => "sometimes|required|numeric|min:0|lte:regularPrice",
                "quantity" => "sometimes|required|integer|min:0",
                "deletedImagesId.*" => "sometimes|required|string|exists:product_images,id",
                "newImages.*"  => "sometimes|image|max:5120",
                "quantity" => "sometimes|required|integer|min:0|max:10000",
                "is_active" => "boolean",
            ]
        );


        if ($validator->fails()) {
            return $this->errorResponse(
                "Product validation failed",
                400,
                $validator->errors()
            );
        }



        try {
            DB::beginTransaction();

            $product = Product::findOrFail($id);

            $productData = array_filter([
                "name" => $request->name,
                "description" => $request->description,
                "category_id" => $request->categoryId,
                "regular_price" => $request->regularPrice,
                "sales_price" => $request->salesPrice,
                "quantity" => $request->quantity,
                "is_active" => true,
            ]);

            $product->update($productData);


            // delete the images if provided
            if ($request->has("deletedImagesId")) {
                foreach ($request->deletedImagesId as $productImageId) {
                    $productImage = ProductImage::findOrFail($productImageId);
                    $this->storageService->delete($productImage->public_id);
                    $productImage->delete($productImage["public_id"]);
                    ProductImage::destroy($id);
                }
            }

            // create the new images if provided
            if ($request->hasFile("newImages")) {
                foreach ($request->newImages as $fileImage) {
                    $image = $this->storageService->upload($fileImage);

                    ProductImage::create([
                        "product_id" => $id,
                        "public_id" => $image["public_id"],
                        "image_url" => $image["url"],
                    ]);
                }
            }

            DB::commit();

            return $this->successResponse(
                "Success: Product updated successfully",
                200,
                new ProductResource(
                    Product::with(['images', 'category.images'])->find($product->id)
                )
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(
                "Failed to update product",
                500,
                $e->getMessage()
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::beginTransaction();

            $product = Product::with('images')->findOrFail($id);

            // Delete product images from storage
            foreach ($product->images as $image) {
                $this->storageService->delete($image->public_id);
            }

            // Delete the product
            $product->delete();

            DB::commit();

            return $this->successResponse(
                "Success: Product deleted successfully",
                200,
                null
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(
                "Failed to delete product",
                500,
                $e->getMessage()
            );
        }
    }

    public function toggleStatus(string $id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->update(['is_active' => !$product->is_active]);

            return $this->successResponse(
                "Success: Product status updated successfully",
                200,
                new ProductResource($product)
            );
        } catch (\Exception $e) {
            return $this->errorResponse(
                "Failed to update product status",
                500,
                $e->getMessage()
            );
        }
    }

    public function statistics()
    {
        $stats = [
            'total_products' => Product::count(),
            'active_products' => Product::where('is_active', true)->count(),
            'out_of_stock' => Product::where('quantity', 0)->count(),
            'low_stock' => Product::where('quantity', '<', 10)->count(),
            'total_categories' => Product::distinct('category_id')->count(),
            'average_price' => Product::avg('sales_price'),
            'total_value' => Product::sum(DB::raw('quantity * sales_price')),
        ];

        return $this->successResponse(
            "Success: Product statistics retrieved",
            200,
            $stats
        );
    }
}
