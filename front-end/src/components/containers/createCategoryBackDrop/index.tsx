import { Backdrop, Divider } from "@mui/material";
import ReactQuill from "react-quill";
import { ProductImageI } from "../../../types/product";
import ImagesDropZone from "../ImagesDropZone";
import Button from "../../common/button";

interface CreateCategoryBackDropPropsI {
  isOpen: boolean;
  handleClose: () => void;
}
const CreateCategoryBackDrop = ({
  isOpen,
  handleClose,
}: CreateCategoryBackDropPropsI) => {
  const onDrop = (imgFile) => {};
  return (
    <Backdrop className="items-center justify-center" open={isOpen}>
      <div className="bg-white p-3 overflow-y-visible flex flex-col max-w-3xl w-full  gap-6  rounded-xl">
        <h1 className="font-bold text-blue-900 text-center">Create Category</h1>
        <div className="flex gap-4 flex-1">
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col gap-2 w-full">
              <h1 className="text-sm">Category Name</h1>
              <div className="border-gray-400 border p-1 rounded-md">
                <input
                  className="w-full border-none text-gray-900 text-xs
            outline-none focus:border-none focus:outline-none"
                  placeholder="Type category name here"
                  name="name"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h1 className="text-sm">Category Description</h1>
              <div className="border-gray-400 border p-1 rounded-md">
                <textarea
                  className="w-full border-none text-gray-900 text-xs
            outline-none focus:border-none focus:outline-none"
                  placeholder="Type category name here"
                  name="name"
                />
              </div>
            </div>
          </div>
          <Divider />
          <ImagesDropZone className="" onDrop={null} />
        </div>
        <div className="flex gap-2 justify-self-end self-end">
          <button
            onClick={handleClose}
            className="text-xs text-red-600 rounded-sm font-semibold p-1 px-3 bg-red-100"
          >
            <p>Cancel</p>
          </button>
          <Button className="text-xs text-blue-600 rounded-sm font-semibold p-1 px-3 bg-blue-100">
            <p>Create</p>
          </Button>
        </div>
      </div>
    </Backdrop>
  );
};

export default CreateCategoryBackDrop;
