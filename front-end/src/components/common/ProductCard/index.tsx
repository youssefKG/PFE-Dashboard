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
import { ProductI } from "../../../types/product";
import Button from "../button";

interface IProductCardProps {
  openProductDetailModal: () => void;
  productData: ProductI;
}

const ProductCard: FC<IProductCardProps> = ({
  productData,
  openProductDetailModal,
}) => {
  return (
    <button
      onClick={openProductDetailModal}
      className="flex w-full transition-colors lg:max-w-xs   flex-col gap-3 p-3 border border-gray-100 bg-white dark:bg-gray-800 dark:text-white shadow-sm  rounded-md "
    >
      <div className="flex gap-4 ">
        <div className="flex gap-4">
          {productData.images.length > 0 && productData.images[0].imageUrl && (
            <img
              src={productData.images[0].imageUrl}
              className="size-20 rounded-xl border"
            />
          )}
          <div className="flex text-start flex-col  gap-2 ">
            <h2 className="font-bold text-sm">{productData.name} </h2>
            <p className="text-xs line-clamp-3 text-gray-500">
              {productData.description}
            </p>
          </div>
        </div>
        <ProductCardPopover productId={productData.id} />
      </div>
      <div className="flex flex-col bg-gray-50 dark:bg-gray-900 border rounded-md">
        <div className="flex justify-between p-2 items-center">
          <p className="font-medium text-xs">Regular price</p>
          <div className="flex gap-1 items-center">
            <ArrowUpIcon className="text-green-700 size-4" />
            <p className="text-xs text-gray-600">{productData.salesPrice} $</p>
          </div>
        </div>
        <Divider />
        <div className="flex justify-between p-2 items-center">
          <p className="font-normal text-xs">Sales price</p>
          <div className="flex gap-1 items-center">
            <ArrowUpIcon className="text-green-700 size-4" />
            <p className="text-xs text-gray-600">{productData.salesPrice} $</p>
          </div>
        </div>
      </div>
    </button>
  );
};

interface ProductCardPopoverPropsI {
  deleteProduct: () => Promise<void>;
  isProductDeletingLoading: boolean;
  productId: string;
}

const ProductCardPopover: FC<ProductCardPopoverPropsI> = ({
  deleteProduct,
  isProductDeletingLoading,
  productId,
}) => {
  return (
    <Popover className="relative justify-self-end">
      <PopoverButton className="z-20">
        <div className="px-2 py-1 bg-gray-100 dark:bg-gray-900 dark:text-white rounded-md">
          <EllipsisHorizontalIcon className="size-4" />
        </div>
      </PopoverButton>
      <PopoverPanel anchor="bottom" className="flex flex-col p-2">
        <div className="flex flex-col bg-white border w-full max-w-42 rounded-md">
          <Link
            to={`/product-detail/${productId}`}
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
          <Button
            isLoading={isProductDeletingLoading}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 duration-300 ease-out"
          >
            <TrashIcon className="size-5 text-red-700" />
            <p className="text-red-500 text-xs">Delete</p>
          </Button>
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default ProductCard;
