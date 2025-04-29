import { FC } from "react";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import { productsData } from "../../../utils";

interface ITopSellingProductsProps {}

const TopSellingProducts: FC<ITopSellingProductsProps> = () => {
  return (
    <div className="flex flex-col md:col-span-2  min-w-28 bg-white dark:bg-gray-700 dark:text-white w-full p-3 gap-4 rounded-xl shadow">
      <h1 className="text-sm font-bold text-gray-700 dark:text-white">
        Top Selling Products
      </h1>
      <Divider />
      <div className="flex flex-col">
        {productsData.map((product) => (
          <Link
            to={product.id.toString()}
            key={product.id}
            className="flex gap-2 items-center px-4 p-2 rounded-xl hover:opacity-60 duration-300 ease-out"
          >
            <img src={product.imgURL} className="size-12 rounded-xl" />
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-px">
                <h2 className="font-medium text-gray-700 dark:text-white text-sm">
                  {product.name}
                </h2>
                <p className="text-xs ml-4 font-extralight text-gray-400">
                  {product.description}
                </p>
              </div>
              <p className="font-semibold text-sm ">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;
