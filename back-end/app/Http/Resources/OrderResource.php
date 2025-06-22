<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            "total" => $this->total_amount,
            "status" => $this->status,
            "firstName" => $this->user->first_name,
            "lastName" => $this->user->last_name,
            "email" => $this->user->email,
            "date" => $this->created_at,
            "userId" => $this->user->id,
            "countItems" => $this->items_count,
        ];
    }
}
