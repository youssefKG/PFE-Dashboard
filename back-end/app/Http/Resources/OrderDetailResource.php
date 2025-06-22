<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {


        $orer_items = [];


        foreach ($this->items as $index => $item) {
            $order_items[$index] = [
                "id" => $item->id,
                "order_id" => $item->order_id,
                "productId" => $item->product_id,
                "unitPrice" => $item->unit_price,
                "subtotal" => $item->subtotal,
                "productName" => $item->product->name,
                "description" => $item->product->description,
                "imageUrl" => $item->product->images->first()->image_url,
                "quantity" => $item->quantity,
                "createdAt" => $item->created_at
            ];
        }
        return [
            "id" => $this->id,
            "user" => [
                "id" => $this->user->id,
                "firstName" => $this->user->first_name,
                "lastName" => $this->user->last_name,
                "email" => $this->user->email,
                "phoneNumber" => $this->user->phone,
            ],
            "status" => $this->status,
            "orderItems" => $order_items,
            "shippingAdress" => $this->shipping_address,
            "createdAt" => $this->created_at
        ];
    }
}
