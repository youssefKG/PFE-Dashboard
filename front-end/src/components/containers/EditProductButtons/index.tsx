import { FC } from "react";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { BookMarkedIcon, TrashIcon } from "lucide-react";
import Button from "@/components/common/button";

interface EditProductButtonsPropsI {
  isEditing: boolean;
  startEdit: () => void;
  saveProductChanges: () => Promise<void>;
  cancelProductEditing: () => Promise<void>;
  isSavingProductLoading: boolean;
  deleteProduct: () => Promise<void>;
  isDeletingProductLoading: boolean;
}

const EditProductButtons: FC<EditProductButtonsPropsI> = ({
  isEditing,
  startEdit,
  saveProductChanges,
  cancelProductEditing,
  isSavingProductLoading,
  isDeletingProductLoading,
  deleteProduct,
}) => {
  return (
    <div className="flex justify-end gap-4">
      {!isEditing ? (
        <div className="flex items-center gap-4">
          <Button
            handleClick={deleteProduct}
            isLoading={isDeletingProductLoading}
            className="px-2 p-1 rounded-md hover:opacity-80 text-white hover:text-black w-30 justify-center
            items-center transition-all flex gap-2 black bg-red-600/40"
          >
            <TrashIcon className="size-5" />
            <p className="text-sm  tracking-wider">Delete</p>
          </Button>
          <button
            onClick={startEdit}
            className="px-2 p-1 rounded-md flex gap-2 items-center text-white bg-black"
          >
            <PencilSquareIcon className="size-5 text-white" />
            <p className="text-sm  tracking-wider">edit</p>
          </button>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <button
            onClick={cancelProductEditing}
            className="px-2 p-1 rounded-md flex gap-2 items-center text-black
            bg-red-200"
          >
            <XMarkIcon className="size-5" />
            <p className="text-sm  tracking-wider">Cancel</p>
          </button>
          <Button
            handleClick={() => saveProductChanges()}
            isLoading={isSavingProductLoading}
            className="px-2 p-1 rounded-md flex gap-2 w-full  max-w-40
            items-center text-white bg-black"
          >
            <BookMarkedIcon className="size-5 text-white" />
            <p className="text-sm  tracking-wider">Save Changes</p>
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditProductButtons;
