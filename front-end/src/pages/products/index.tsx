import { useState } from "react";
import Breadcrumb from "../../components/common/breadcrumbs";
import Button from "../../components/common/button";
import ProductCardsList from "../../components/containers/productCardsList";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import CreateProductBackDrop from "../../components/common/CreateProductBackDrop";
import { useNotification } from "../../hooks/useContext";
import { CreateProductI, ProductI } from "../../types/product";
import ProductDetailBackdrop from "../../components/containers/productDetailBackdrop";
import Response from "../../interfaces/response";
import api from "../../api";

const Products = () => {
  const [isProductBackDropOpen, setIsProductBackDropOpen] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProductDetailbBackdropOpen, setIsProductDetailBackdropOpen] =
    useState<boolean>(true);
  const { showNotification } = useNotification();

  const createProduct = async (values: CreateProductI) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("desciprion", values.description);
      formData.append("regularPrice", values.regularPrice.toString());
      formData.append("salePrice", values.salesPrice.toString());
      formData.append("quantiy", values.quantity.toString());
      formData.append("category_id", values.category_id);
      values.images.map((img: File) => {
        formData.append("images[]", img);
      });

      const response = await api.post<Response<ProductI>, FormData>(
        "/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response);
    } catch (error) {
      showNotification("error", "Error in create new product");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
          handleClick={async () =>
            setIsProductBackDropOpen(!isProductBackDropOpen)
          }
        >
          <PlusCircleIcon className="size-6 text-white" />
          <p>Create Product</p>
        </Button>
        <ProductCardsList />
      </div>
      <CreateProductBackDrop
        isOpen={isProductBackDropOpen}
        handleClose={async () => setIsProductBackDropOpen(false)}
        createProduct={createProduct}
      />
      <ProductDetailBackdrop
        isOpen={isProductDetailbBackdropOpen}
        handleClose={() => setIsProductDetailBackdropOpen(false)}
      />
    </div>
  );
};

export default Products;
