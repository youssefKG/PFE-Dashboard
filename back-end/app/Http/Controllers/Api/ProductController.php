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

class ProductController
{
    use ApiResponse;

    public function __construct(private StorageServiceI $storageService) {}

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                "name" =>  "required|string|max:55|min:6",
                "description" =>  "required|string|max:255|min:10",
                "categoryId" =>  "required|string|",
                "regularPrice" => "required|min:0",
                "salesPrice" => "required|min:0",
                "quantity" => "required|integer|min:0",
                "images.*" => 'image|required|mimes:jpeg,png,jpg,gif'
            ]
        );

        if ($validator->fails()) {
            return $this->errorResponse(
                "Product validation failed",
                400,
                $validator->errors()
            );
        }


        $productData = [
            "name" => $request->name,
            "description" => $request->description,
            "category_id" => $request->categoryId,
            "regular_price" => $request->regularPrice,
            "sales_price" => $request->salesPrice,
            "quantity" => $request->quantity,
        ];

        $newProduct = Product::create($productData);

        if ($request->hasFile("images")) {
            foreach ($request->file("images")  as $fileImage) {
                $image = $this->storageService->upload($fileImage);
                ProductImage::create([
                    "product_id" => $newProduct["id"],
                    "isPrimary" => false,
                    "public_id" => $image["public_id"],
                    "image_url" => $image["url"]
                ]);
            }
        }

        return $this->successResponse(
            "Success: Product created successfully ",
            200,
            new ProductResource(
                Product::with("images")->find($newProduct["id"])
            )
        );
    }

    public function test()
    {
        $user = Auth::user();
        return $this->successResponse("user ", 200, $user);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return   $this->successResponse(
            "Success: Products list ",
            200,
            new ProductCollection(Product::with("images")->paginate())
        );
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $products = Product::with("images")->find($id);
        return $this->successResponse(
            "Successs: Product list",
            200,
            new ProductCollection($products)
        );
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
