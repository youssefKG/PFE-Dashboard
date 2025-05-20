import { ArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Backdrop, Divider } from "@mui/material";
import { ProductI } from "../../../types/product";
import { CategoryI } from "../../../types/category";
import { FC, useEffect, useState } from "react";
import { productsData } from "../../../utils";
import useCategory from "../../../hooks/useCategory";

interface ProductDetailBackdropPropsI {
  isOpen: boolean;
  handleClose: () => void;
  product: ProductI | null;
}
const ProductDetailBackdrop = ({
  isOpen,
  handleClose,
  product,
}: ProductDetailBackdropPropsI) => {
  return (
    product && (
      <Backdrop
        className="relative items-end h-screen z-20 w-full flex justify-end"
        open={true}
      >
        <div className="bg-white my-9 flex flex-col  mx-2 gap-4 rounded-xl p-4 h-[98%] max-w-sm justify-self-end absolute w-full right-0 justify-between">
          <div className="flex  flex-col gap-4">
            <div className="flex justify-between ">
              <h1 className="font-bold text-lg uppercase">Product Detail</h1>
              <button
                className="bg-gray-50 hover:opacity-80 transition-all p-2
          rounded-full"
                onClick={handleClose}
              >
                <XMarkIcon className="size-4 text-black" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <img
                src={product.images[0].imageUrl}
                className="flex w-full size-fit max-h-[300px] rounded-lg"
              />
              <div className="border border-gray-300 p-2 space-y-2 rounded-lg">
                <h1 className="text-gray-700 font-semibold text-sm">
                  Product Name:
                </h1>
                <p className="text-sm font-bold text-gray-500 border border-gray-400 p-2 rounded-xl">
                  {product.name}
                </p>
              </div>
              <div className="border border-gray-300 p-2 space-y-2 rounded-lg">
                <h1 className="text-gray-700 font-semibold text-sm">
                  Product Description
                </h1>
                <p className="text-sm text-gray-500 border border-gray-400 p-2 rounded-xl">
                  {product.description}
                </p>
              </div>
              <div className="border border-gray-300 p-2 space-y-2 rounded-lg">
                <h1 className="text-gray-700 font-semibold text-sm">
                  Product Category
                </h1>
                <div className="text-sm text-gray-500 border flex gap-2 items-center border-gray-400 p-2 rounded-xl">
                  <img className="size-8" src={product.category.imageUrl} />
                  <p>{product.category.name}</p>
                </div>
              </div>
              <div className="flex flex-col bg-gray-50 dark:bg-gray-900 border rounded-md">
                <div className="flex justify-between p-2 items-center">
                  <p className="font-medium text-sm">Sales</p>
                  <div className="flex gap-1 items-center">
                    <ArrowUpIcon className="text-green-700 size-4" />
                    <p className="text-xs text-gray-600">12</p>
                  </div>
                </div>
                <Divider />
                <div className="flex justify-between p-2 items-center">
                  <p className="font-normal text-sm">Quantity</p>
                  <div className="flex gap-1 items-center">
                    <ArrowUpIcon className="text-green-700 size-4" />
                    <p className="text-xs text-gray-600">{product.quantity}</p>
                  </div>
                </div>
                <Divider />
                <div className="flex justify-between p-2 items-center">
                  <p className="font-normal text-sm">Regular price</p>
                  <p className="text-xs text-gray-600">
                    {product.regularPrice} $
                  </p>
                </div>
                <Divider />
                <div className="flex justify-between p-2 items-center">
                  <p className="font-normal text-sm">Sales price</p>
                  <p className="text-xs text-gray-600">
                    {product.salesPrice} $
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleClose}
              className="px-4 p-1 rounded-xl  text-sm text-black border border-gray-400
          font-medium shadow hover:opacity-70 transition-all cursor-pointer"
            >
              Discart
            </button>
            <button
              className="px-4 p-1 rounded-xl bg-black text-sm text-white
          font-medium shadow hover:opacity-70 transition-all cursor-pointer"
            >
              Update Product
            </button>
          </div>
        </div>
      </Backdrop>
    )
  );
};

interface CategorListPropsI {
  list: CategoryI[];
}
const CateogryList: FC<CategorListPropsI> = ({ list }) => {
  return (
    <div className="border border-gray-300 p-2 space-y-2 rounded-lg">
      <h1 className="text-gray-700 font-semibold text-sm">Categories</h1>
      {list.map((cat: CategoryI) => (
        <div key={cat.id} className="felx gap-4 items-center">
          <img src={cat.imageUrl} className="size-20 rounded-full" />
          <p className="text-sm border p-1 rounded-xl border-gray-400  text-gray-500">
            {cat.name}
          </p>
        </div>
      ))}
      <p className="text-sm border p-1 rounded-xl border-gray-400  text-gray-500">
        Bathroom
      </p>
    </div>
  );
};
export default ProductDetailBackdrop;
