import Breadcrumb from "../../components/common/breadcrumbs";
import ProductCardsList from "../../components/containers/productCardsList";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import ProductDetailBackdrop from "../../components/containers/productDetailBackdrop";
import useProduct from "../../hooks/useProduct";
import { ProductFilter } from "./components";
import { ProductsPagination } from "./components/productsPagination";
import { Link } from "react-router-dom";

const Products = () => {
  const {
    products,
    productModal,
    isCreateProductModalOpen,
    openProductDetailModal,
    closeProductDetailModel,
    searchTerm,
    isLoading,
    handleChange,
    handleChangeFilterCategory,
    clearFilter,
  } = useProduct();

  return (
    <div className="flex  flex-col gap-2 p-2  py-6 mb-16">
      <div className="flex flex-col gap-2 ">
        <div>
          <h1 className="font-extrabold text-2xl">All Products</h1>
        </div>
        <Breadcrumb links={[{ value: "Products", to: "/Products" }]} />
      </div>
      <div className="flex flex-col gap-2">
        <ProductFilter
          clearFilter={clearFilter}
          handleChangeFilterCategory={handleChangeFilterCategory}
          searchTerm={searchTerm}
          handleChange={handleChange}
        />
        <Link
          to="/create-product"
          className="flex gap-2 self-end w-fit text-white text-xs justify-center
        items-center bg-black rounded-lg p-1 px-2 hover:opacity-85 transition-all"
        >
          <PlusCircleIcon className="size-6 text-white" />
          <p>Create Product</p>
        </Link>
        <ProductCardsList
          isLoading={isLoading}
          productList={products}
          openProductDetailModal={openProductDetailModal}
        />
      </div>
      <ProductDetailBackdrop
        isOpen={isCreateProductModalOpen}
        handleClose={closeProductDetailModel}
        product={productModal.product}
      />
      <ProductsPagination />
    </div>
  );
};

export default Products;
