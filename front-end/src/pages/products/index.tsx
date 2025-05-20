import { useState } from "react";
import Breadcrumb from "../../components/common/breadcrumbs";
import Button from "../../components/common/button";
import ProductCardsList from "../../components/containers/productCardsList";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import CreateProductBackDrop from "../../components/common/CreateProductBackDrop";
import ProductDetailBackdrop from "../../components/containers/productDetailBackdrop";
import useProduct from "../../hooks/useProduct";

const Products = () => {
  const [isProductBackDropOpen] = useState<boolean>(false);
  const {
    products,
    productModal,
    isLoading,
    isCreateProductModalOpen,
    closeCreateProductModal,
    createProduct,
    openProductDetailModal,
    closeProductDetailModel,
    openCreateProductModal,
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
        <Button
          className="flex gap-2 self-end w-fit text-white text-xs justify-center
        items-center bg-black rounded-lg p-1 px-2 hover:opacity-85 transition-all"
          handleClick={openCreateProductModal}
        >
          <PlusCircleIcon className="size-6 text-white" />
          <p>Create Product</p>
        </Button>
        <ProductCardsList
          productList={products}
          openProductDetailModal={openProductDetailModal}
        />
      </div>
      <CreateProductBackDrop
        isOpen={isCreateProductModalOpen}
        handleClose={closeCreateProductModal}
        createProduct={createProduct}
      />
      <ProductDetailBackdrop
        isOpen={isCreateProductModalOpen}
        handleClose={closeProductDetailModel}
        product={productModal.product}
      />
    </div>
  );
};

export default Products;
