import { Link } from "react-router-dom";
import { Popover, PopoverPanel, PopoverButton } from "@headlessui/react";
import {
  EllipsisHorizontalIcon,
  TrashIcon,
  DocumentMagnifyingGlassIcon,
  ArrowPathIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { Divider } from "@mui/material";
import { FC } from "react";

interface IProductCardProps {
  id: string;
  name: string;
  description: string;
  sales: number;
  amount: number;
  imgURL: string;
  price: number;
}

const ProductCard: FC<IProductCardProps> = ({
  id,
  name,
  imgURL,
  description,
  sales,
  amount,
  price,
}) => {
  return (
    <Link
      to={`/${id}`}
      className="flex w-full transition-colors  flex-col gap-3 p-3 border border-gray-100 dark:bg-gray-800 dark:text-white shadow-sm  rounded-md "
    >
      <div className="flex gap-4 justify-between">
        <div className="flex gap-4">
          <img src={imgURL} className="size-20 rounded-xl border" />
          <div className="flex flex-col justify-between">
            <h2 className="font-bold text-sm">{name} </h2>
            <p className="text-gray-400 text-xs">Silver</p>
            <p className="font-bold text-sm">{price}</p>
          </div>
        </div>
        <ProductCardPopover />
      </div>
      <h3 className="font-bold text-sm">Summury</h3>
      <p className="font-light text-gray-500 text-xs text-wrap">
        {description}
      </p>
      <div className="flex flex-col bg-gray-50 dark:bg-gray-900 border rounded-md">
        <div className="flex justify-between p-2 items-center">
          <p className="font-medium text-sm">Sales</p>
          <div className="flex gap-1 items-center">
            <ArrowUpIcon className="text-green-700 size-4" />
            <p className="text-xs text-gray-600">{sales}</p>
          </div>
        </div>
        <Divider />
        <div className="flex justify-between p-2 items-center">
          <p className="font-normal text-sm">Amount</p>
          <div className="flex gap-1 items-center">
            <ArrowUpIcon className="text-green-700 size-4" />
            <p className="text-xs text-gray-600">1234</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ProductCardPopover = () => {
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

export default ProductCard;
