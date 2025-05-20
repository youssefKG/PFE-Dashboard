import ProductCard from "../../common/ProductCard/index";
import { productsData } from "../../../utils";
import { FC } from "react";
import { ProductI } from "../../../types/product";

interface ProductCardListPropsI {
  productList: ProductI[];
  openProductDetailModal: (product: ProductI) => void;
}

const ProductCardsList: FC<ProductCardListPropsI> = ({
  productList,
  openProductDetailModal,
}) => {
  return (
    <div className="p-4 flex mx-auto  w-full gap-4 dark:bg-neutral-800 lg:grid-cols-3 xl:grid-cols-4 rounded-xl flex-wrap bg-white shadow">
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
  );
};

export default ProductCardsList;
