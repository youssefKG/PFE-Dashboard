<?php

namespace  App\Interfaces;

use Illuminate\Http\UploadedFile;

interface StorageServiceI
{
    public function upload(UploadedFile $file, string $folder = "products"): array;
    public function delete(string $public_id): void;
    public function getPrivatImage(string $public_id): string;
}
