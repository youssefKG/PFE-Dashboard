import { FC } from "react";
import ImagesDropZone from "@/components/containers/ImagesDropZone";
import { TrashIcon } from "@heroicons/react/24/outline";

interface CategoryMediaPropsI {
  isEditing: boolean;
  imageUrl: string;
  onDropNewImage: (images: File[]) => void;
}
const CategoryMedia: FC<CategoryMediaPropsI> = ({
  isEditing,
  imageUrl,
  onDropNewImage,
}) => {
  return (
    <div className="flex flex-col w-full bg-white p-4 gap-6">
      <h1 className="font-bold text-xl">Category Media</h1>
      <div className="relative hover:opacity-90 transition rounded-md">
        <img
          className="w-full rounded-xl max-h-96 max-w-96 self-center justify-self-center"
          src={imageUrl}
        />
      </div>
      {isEditing && <ImagesDropZone onDrop={onDropNewImage} />}
    </div>
  );
};

export default CategoryMedia;
