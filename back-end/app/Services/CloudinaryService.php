<?php

namespace App\Services;

use App\Interfaces\StorageServiceI;
use Cloudinary\Api\Upload\UploadApi;
use Illuminate\Http\UploadedFile;
use Cloudinary\Cloudinary;
use Cloudinary\Configuration\Configuration;

class CloudinaryService implements StorageServiceI
{
    private $uploadApi;
    private $cloudinary;

    public function __construct()
    {
        $configuration = new Configuration(config("cloudinary.cloud_url"));
        $this->cloudinary = new Cloudinary($configuration);

        $this->uploadApi = new UploadApi($configuration);
    }


    public function upload(UploadedFile $file, string $folder = "totib")
    {
        // $result =     $this->uploadApi->upload($file->getRealPath(), $folder);

$result = $this->uploadApi->upload($file->getRealPath());

        return $result;
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
