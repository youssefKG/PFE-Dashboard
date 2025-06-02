import { FC } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ImagesDropZone from "../ImagesDropZone";
import { ProductImage } from "@/types/product";

interface ProductImagesProps {
  isEditing: boolean;
  deleteImage: (productImageId: string) => void;
  images: ProductImage[];
  newImagesUrl: string[];
  onDropNewImages: (images: File[]) => void;
  deleteNewImage: (index: number) => void;
}

const EditProductImages: FC<ProductImagesProps> = ({
  isEditing,
  images,
  deleteImage,
  newImagesUrl,
  onDropNewImages,
  deleteNewImage,
}) => {
  return (
    <div className="flex lg:max-w-4xl w-full flex-col bg-white border rounded-xl border-gray-100 p-6 gap-4">
      <h1 className="font-semibold text-gray-600 tracking-wide">
        Product images
      </h1>
      <div className="flex flex-wrap gap-4  items-center">
        {images.map((img: ProductImage) => (
          <div className="relative">
            {isEditing && (
              <button
                onClick={() => deleteImage(img.id)}
                className="absolute z-30 hover:text-black transition-all
              text-gray-400 top-2 bg-white p-1 rounded-full size-8 flex
              items-center justify-center right-2"
              >
                <XMarkIcon className="size-5" />
              </button>
            )}

            <img
              className="lg:max-w-60 w-full max-h-60 border border-gray-300 rounded-2xl"
              src={img.imageUrl}
            />
          </div>
        ))}
        {newImagesUrl.map((url: string, index: number) => (
          <div className="relative">
            {isEditing && (
              <button
                onClick={() => deleteNewImage(index)}
                className="absolute z-30 hover:text-black transition-all
              text-gray-400 top-2 bg-white p-1 rounded-full size-8 flex
              items-center justify-center right-2"
              >
                <XMarkIcon className="size-5" />
              </button>
            )}

            <img
              className="w-60 h-60 border border-gray-300 rounded-2xl"
              src={url}
            />
          </div>
        ))}
      </div>
      {isEditing && <ImagesDropZone onDrop={onDropNewImages} />}
    </div>
  );
};

export default EditProductImages;
