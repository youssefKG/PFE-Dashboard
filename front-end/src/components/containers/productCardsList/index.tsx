import ProductCard from "../../common/ProductCard/index";
import { productsData } from "../../../utils";

const ProductCardsList = () => {
  return (
    <div className="p-4 flex mx-auto  w-full gap-4 dark:bg-neutral-800 lg:grid-cols-3 xl:grid-cols-4 rounded-xl flex-wrap bg-white shadow">
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
