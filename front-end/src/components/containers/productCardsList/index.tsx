import ProductCard from "../../common/ProductCard/index";
import { productsData } from "../../../utils";
import { FC } from "react";
import { ProductI } from "../../../types/product";
import { ClipLoader } from "react-spinners";

interface ProductCardListPropsI {
  productList: ProductI[];
  openProductDetailModal: (product: ProductI) => void;
  isLoading: boolean;
}

const ProductCardsList: FC<ProductCardListPropsI> = ({
  productList,
  openProductDetailModal,
  isLoading,
}) => {
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center my-14">
          <ClipLoader
            color="blue"
            size={90}
            className="text-blue-800 size-62 selft"
          />
        </div>
      ) : (
        <div className="p-4 flex mx-auto  w-full gap-4 dark:bg-neutral-800 lg:grid-cols-3 xl:grid-cols-4 rounded-xl flex-wrap">
          {productList.map((product: ProductI) => {
            return (
              <ProductCard
                key={product.id}
                openProductDetailModal={() => openProductDetailModal(product)}
                productData={product}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default ProductCardsList;
