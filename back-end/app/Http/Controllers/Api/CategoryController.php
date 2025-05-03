<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryResource;
use App\Http\Traits\Api\ApiResponse;
use App\Interfaces\StorageServiceI;
use App\Models\Category;
use App\Models\CategoryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController
{
    use ApiResponse;

    public function __construct(private StorageServiceI $storageService) {}

    public  function store(Request $request)
    {
        $categoryValidator = Validator::make($request->all(), [
            "name" => "required|min:4|max:255",
            "description" => "required|min:10|max:255",
            "image" => "required|image|max:5120"
        ]);

        if ($categoryValidator->fails()) {
            return $this->errorResponse(
                "Form category validation failed",
                400,
                $categoryValidator->errors()
            );
        }

        // create the category
        $newCategory =  Category::create([
            "name" => $request->name,
            "description" => $request->description
        ]);

        // creater the image
        $catImage = $this->storageService->upload($request->file("image"));


        // store the image in cloudinary Image
        $newCategoryImage = CategoryImage::create([
            "public_id" => $catImage["public_id"],
            "category_id" => $newCategory->id,
            "is_primary" => true,
            "image_url" => $catImage["url"],
        ]);

        return $this->successResponse(
            "Success: The category " . $request->name . " created successfully",
            200,
            new CategoryResource($newCategory)
        );
    }

    public function index()
    {
        return new CategoryCollection(Category::with("images")->paginate());
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $categories = Category::with("images")->findOrFail($id);
        return new CategoryResource($categories);
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
