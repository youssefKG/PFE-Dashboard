<?php

namespace App\Services;

use App\Interfaces\StorageServiceI;
use Cloudinary\Api\Upload\UploadApi;
use Illuminate\Http\UploadedFile;
use Cloudinary\Cloudinary;

class CloudinaryService implements StorageServiceI
{
    private $uploadApi;
    private $cloudinary;

    public function __construct()
    {
        $this->cloudinary = new Cloudinary([
            "cloud" => [
                "cloud_name" => config("cloudinary.cloud_name"),
                "api_key" => config("cloudinary.api_key"),
                "secret_key" => config("cloudinary.secret_key"),
            ]
        ]);

        $this->uploadApi = new UploadApi();
    }


    public function upload(UploadedFile $file, string $folder = "products"): array
    {
        $result =     $this->uploadApi->upload($file->getRealPath(), [
            "use_filename" => true,
            "unique_filename" => false,
            "resource_type" => "image",
            "type" => "authenticated"
        ]);

        return [
            "url" => $result["url"],
            "public_id" => $result["public_id"]
        ];
    }

    public function delete(string $public_id): void
    {
        $this->uploadApi->destroy($public_id);
    }



    public function getPrivatImage(string $public_id): string
    {
        $url = $this->cloudinary->image($public_id)->deliveryType("authenticated")->signUrl();
        return $url;
    }
}
