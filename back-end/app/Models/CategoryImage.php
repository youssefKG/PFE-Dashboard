<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use CloudinaryLabs\CloudinaryLaravel\MediaAlly;

class CategoryImage extends Model
{
    use HasUuids, HasFactory;
    //
    protected $table = "category_images";
    protected $primaryKey = "id";

    protected $fillable = [
        'public_id',
        'image_url',
        'is_primary',
        'category_id'
    ];

    protected $casts = [
        'is_primary' => 'boolean'
    ];

    /**
     * Get the category that owns the image.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }



    /**
     * Get the full image URL with transformations
     */
}
