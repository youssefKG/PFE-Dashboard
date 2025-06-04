import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/common/button";
import { FC } from "react";
import { BookMarkedIcon } from "lucide-react";

interface EditCustomeButtonsPropsI {
  startEditing: () => void;
  cancelEditing: () => Promise<void>;
  deleteCutomer: () => Promise<void>;
  isEditing: boolean;
  isSavingChangesLoading: boolean;
  isDeletingCustomerLoading: boolean;
  saveChanges: () => Promise<void>;
}

const EditCustomeButtons: FC<EditCustomeButtonsPropsI> = ({
  startEditing,
  cancelEditing,
  deleteCustomer,
  isEditing,
  isDeletingCustomerLoading,
  isSavingChangesLoading,
  saveChanges,
}) => {
  return (
    <div>
      {isEditing ? (
        <div className="flex gap-2 self-end justify-self-end">
          <button
            onClick={cancelEditing}
            className="px-2 p-1 rounded-md flex gap-2 items-center text-black
            bg-red-200"
          >
            <XMarkIcon className="size-5" />
            <p className="text-sm  tracking-wider">Cancel</p>
          </button>
          <Button
            isLoading={isSavingChangesLoading}
            handleClick={saveChanges}
            className="px-2 p-1 rounded-md flex gap-2 w-full  max-w-40
            items-center text-white bg-black"
          >
            <BookMarkedIcon className="size-5 text-white" />
            <p className="text-sm  tracking-wider">Save Changes</p>
          </Button>
        </div>
      ) : (
        <div className="flex gap-2 self-end justify-self-end">
          <Button
            handleClick={deleteCustomer}
            isLoading={isDeletingCustomerLoading}
            className="px-2 p-1 rounded-md hover:opacity-80 text-white hover:text-black w-30 justify-center
            items-center transition-all flex gap-2 black bg-red-600/40"
          >
            <TrashIcon className="size-5" />
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
      )}
    </div>
  );
};

export default EditCustomeButtons;
