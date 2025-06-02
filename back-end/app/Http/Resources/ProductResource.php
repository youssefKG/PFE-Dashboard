<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CategoryResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "quantity" => $this->quantity,
            "category_id" => $this->category_id,
            "regularPrice" => $this->regular_price,
            "salesPrice" => $this->sales_price,
            "images" => ProductImageResource::collection($this->whenLoaded("images")),
            "category" =>  [
                "id" => $this->category?->id,
                "name" => $this->category?->name,
                "description" => $this->category?->description,
                "imgUrl" => (
                    new CategoryImagesResource(
                        $this->category?->images->first()
                    ))?->image_url ?? null,

            ]
        ];
    }
}
