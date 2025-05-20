<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $images = $this->whenLoaded("images");
        $firstImage =$images->first();
        $result =  [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "imageUrl" => $firstImage?->image_url
        ];
        return $result;
    }
}
