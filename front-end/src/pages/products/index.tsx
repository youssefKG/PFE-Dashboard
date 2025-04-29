import { ChangeEvent, useState } from "react";
import Breadcrumb from "../../components/common/breadcrumbs";
import Button from "../../components/common/button";
import ProductCardsList from "../../components/containers/productCardsList";
import { PlusIcon } from "@heroicons/react/24/outline";
import CreateProductBackDrop from "../../components/common/CreateProductBackDrop";
import { useNotification } from "../../hooks/useContext";
import { CreateProductI } from "../../types/product";

const Products = () => {
  const [isProductBackDropOpen, setIsProductBackDropOpen] =
    useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showNotification } = useNotification();

  const createProduct = async (values: CreateProductI) => {
    try {
      setIsLoading(true);
    } catch (error) {
      showNotification("error", "Error in create new product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2  py-6 mb-16">
      <div className="flex flex-col gap-2 ">
        <div>
          <h1 className="font-extrabold text-2xl">All Products</h1>
        </div>
        <Breadcrumb links={[{ value: "Products", to: "/Products" }]} />
      </div>
      <ProductCardsList />
      <Button
        className="bg-blue-800 rounded-full p-2 hover:bg-blue-900
        duration-500 ease-in-out absolute bottom-4 right-6"
        handleClick={async () =>
          setIsProductBackDropOpen(!isProductBackDropOpen)
        }
      >
        <PlusIcon className="size-8 text-white" />
      </Button>
      <CreateProductBackDrop
        isOpen={isProductBackDropOpen}
        handleClose={async () => setIsProductBackDropOpen(false)}
        createProduct={createProduct}
      />
    </div>
  );
};

export default Products;
