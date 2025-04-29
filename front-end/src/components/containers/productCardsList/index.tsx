import ProductCard from "../../common/ProductCard";
import { productsData } from "../../../utils";

const ProductCardsList = () => {
  return (
    <div
      className="p-4 mx-auto grid grid-cols-1 w-full sm:grid-cols-2 dark:bg-neutral-800 lg:grid-cols-3
      xl:grid-cols-4 gap-4 rounded-xl flex-wrap  bg-white shadow mt-16"
    >
      {productsData.map((product) => {
        return (
          <ProductCard
            name={product.name}
            imgURL={product.imgURL}
            description={product.description}
            sales={product.stock}
          />
        );
      })}
    </div>
  );
};

export default ProductCardsList;
