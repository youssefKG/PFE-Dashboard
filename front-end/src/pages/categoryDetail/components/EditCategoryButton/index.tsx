import { FC } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { BookMarkedIcon } from "lucide-react";
import Button from "@/components/common/button";

interface EditCategoryButtons {
  isEditing: boolean;
  startEditing: () => void;
  saveNewChanges: () => Promise<void>;
  cancelEditing: () => Promise<void>;
  isSavingCategoryLoading: boolean;
  isDeletingCategoryLoading: boolean;
  deleteCategory: () => Promise<void>;
}

const EditCategoryButtons: FC<EditCategoryButtons> = ({
  isEditing,
  startEditing,
  saveNewChanges,
  cancelEditing,
  isDeletingCategoryLoading,
  deleteCategory,
  isSavingCategoryLoading,
}) => {
  return (
    <div className="flex justify-end gap-4">
      {!isEditing ? (
        <div className="flex items-center gap-2">
          <Button
            isLoading={isDeletingCategoryLoading}
            handleClick={deleteCategory}
            className="px-2 p-1 rounded-md hover:opacity-80 flex gap-2
          items-center text-gray-600 hover:text-white transition-all bg-red-600/50"
          >
            <TrashIcon className=" size-5" />
            <p className="text-sm  tracking-wider">Delete</p>
          </Button>
          <button
            onClick={startEditing}
            className="px-2 p-1 rounded-md flex gap-2 items-center text-white bg-black"
          >
            <PencilSquareIcon className="size-5 text-white" />
            <p className="text-sm  tracking-wider">edit</p>
          </button>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <button
            onClick={cancelEditing}
            className="px-2 p-1 rounded-md flex gap-2 items-center text-black
            bg-red-200"
          >
            <XMarkIcon className="size-5" />
            <p className="text-sm tracking-wider">Cancel</p>
          </button>
          <Button
            handleClick={saveNewChanges}
            isLoading={isSavingCategoryLoading}
            className="px-2 p-1 rounded-md flex gap-2  items-center
            justify-center  w-40  max-w-40 text-white bg-black"
          >
            <BookMarkedIcon className="size-5 text-white" />
            <p className="text-sm  tracking-wider">Save Changes</p>
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditCategoryButtons;
