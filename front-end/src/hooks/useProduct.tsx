import { useEffect, useState } from "react";
import { CreateProductI, ProductI } from "../types/product";
import { useNotification } from "./useContext";
import Response from "../interfaces/response";
import api from "../api";

type ProductDetailModelStateType = {
  isOpen: boolean;
  product: ProductI | null;
};
const useProduct = () => {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productModal, setProductModal] = useState<ProductDetailModelStateType>(
    {
      isOpen: false,
      product: null,
    },
  );

  const [isCreateProductModalOpen, setIsCreateProductModalVisible] =
    useState<boolean>(false);
  const [isProductDeletingLoading, setProductDeletingLoading] =
    useState<boolean>(false);

  const { showNotification } = useNotification();

  // product model
  const openProductDetailModal = (product: ProductI) => {
    setProductModal({ isOpen: true, product });
  };
  const closeProductDetailModel = () => {
    setProductModal({ isOpen: false, product: null });
  };
  const openCreateProductModal = () => {
    setIsCreateProductModalVisible(true);
  };
  const closeCreateProductModal = () => {
    setIsCreateProductModalVisible(false);
  };

  // fetch list of products
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<Response<ProductI[]>>("/products");
      setProducts(response.data);
      console.log("product list", response.data);
    } catch (error) {
      console.log(error);
      showNotification("error", "Error: can't fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (values: CreateProductI) => {
    console.log(values);
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("regularPrice", values.regularPrice.toString());
      formData.append("salesPrice", values.salesPrice.toString());
      formData.append("quantity", values.quantity.toString());
      formData.append("categoryId", values.categoryId);
      values.images.map((img: File) => {
        formData.append("images[]", img);
      });

      const response = await api.post<Response<ProductI>, FormData>(
        "/products",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      setProducts((prev) => [...prev, response.data]);
      showNotification("success", "Success: Product created successfully!");

      console.log(response);
    } catch (error) {
      showNotification("error", "Error in create new product");
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setProductDeletingLoading(true);
      await api.delete<Response<null>>(`/products/${id}`);
      showNotification("success", "Succss: product deleted successfully");
    } catch (_) {
      showNotification("error", "Error: product deletion fail");
    } finally {
      setProductDeletingLoading(false);
    }
  };

  useEffect(() => {
    console.log("page loaded");
    fetchProducts();
  }, []);

  return {
    products,
    openProductDetailModal,
    closeProductDetailModel,
    isLoading,
    productModal,
    createProduct,
    closeCreateProductModal,
    openCreateProductModal,
    isCreateProductModalOpen,
    isProductDeletingLoading,
  };
};

export default useProduct;
