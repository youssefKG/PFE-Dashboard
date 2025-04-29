import { PopoverButton, Popover, PopoverPanel } from "@headlessui/react";
import {
  ArrowPathIcon,
  DocumentMagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

interface CategoryCardPropsI {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
}
const CategoryCard = ({
  name,
  description,
  imgUrl,
  id,
}: CategoryCardPropsI) => {
  return (
    <Link
      to={`/product/${id}`}
      className="flex relative flex-col max-w-xs p-4 gap-2 bg-white rounded-lg w-full shadow flex-wrap item"
    >
      <div className="flex justify-between">
        <h1 className="text-gray-700 font-bold">{name}</h1>
        <CategoryCardDetailPopover />
      </div>
      <img src={imgUrl} className="rounded-xl" />
      <p className="text-gray-600 text-sm">{description}</p>
    </Link>
  );
};

const CategoryCardDetailPopover = () => {
  return (
    <Popover className="relative justify-self-end">
      <PopoverButton>
        <div className="px-2 py-1 bg-gray-100 dark:bg-gray-900 dark:text-white rounded-md">
          <EllipsisHorizontalIcon className="size-4" />
        </div>
      </PopoverButton>
      <PopoverPanel anchor="bottom" className="flex flex-col p-2">
        <div className="flex flex-col bg-white border w-full max-w-42 rounded-md">
          <Link
            to=""
            className="flex items-center gap-2 p-2 px-2 hover:bg-gray-100 duration-300 ease-out"
          >
            <DocumentMagnifyingGlassIcon className="size-5 text-gray-700" />
            <p className="text-gray-500 text-xs">Product Detail</p>
          </Link>
          <Divider />
          <Link
            to=""
            className="flex items-center gap-2  p-2 hover:bg-gray-100 duration-300 ease-out"
          >
            <ArrowPathIcon className="size-5 text-gray-700" />
            <p className="text-gray-500 text-xs">Update</p>
          </Link>
          <Divider />
          <Link
            to=""
            className="flex items-center gap-2 p-2 hover:bg-gray-100 duration-300 ease-out"
          >
            <TrashIcon className="size-5 text-red-700" />
            <p className="text-red-500 text-xs">Delete</p>
          </Link>
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default CategoryCard;
