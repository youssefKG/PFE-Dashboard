import api from "@/api";
import { ProductI, ProductImage } from "@/types/product";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Response from "@/interfaces/response";
import { useNotification } from "./useContext";

const useProductDetail = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { showNotification } = useNotification();
  const [product, setProduct] = useState<ProductI | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  useState<boolean>(false);
  const [isSavingProductLoading, setIsSavingProductLoading] =
    useState<boolean>(false);

  const [deletedImagesId, setDeletedImagesId] = useState<string[]>([]);
  const [newImagesUrl, setNewImagesUrl] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isDeletingProductLoading, setIsDeletingProductLoading] =
    useState<boolean>(false);

  const fetchProductDetail = async () => {
    try {
      const response = await api.get<Response<ProductI | null>>(
        "/products/" + productId,
      );
      setProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const startEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    if (product)
      setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const deleteImage = (imageId: string) => {
    if (product)
      setProduct({
        ...product,
        images: product.images.filter(
          (img: ProductImage) => img.id !== imageId,
        ),
      });

    setDeletedImagesId([...deletedImagesId, imageId]);
  };

  const onDropNewImages = (images: File[]) => {
    const reader = new FileReader();

    images.forEach((img: File) => {
      reader.onload = (e) => {
        if (e.target) {
          setNewImagesUrl([...newImagesUrl, e.target.result as string]);
        }
      };

      reader.readAsDataURL(img);
    });

    setNewImages([...newImages, ...images]);
  };

  const saveProductChanges = async () => {
    try {
      if (product) {
        setIsSavingProductLoading(true);
        const productFormData = new FormData();

        productFormData.append("name", product.name);
        productFormData.append("description", product.description);
        productFormData.append("regularPrice", product.regularPrice.toString());
        productFormData.append("salesPrice", product.salesPrice.toString());
        productFormData.append("categoryId", product.category.id);
        productFormData.append("quantity", product.quantity.toString());
        deletedImagesId.forEach((id: string) => {
          productFormData.append("deletedImagesId[]", id);
        });

        newImages.forEach((image: File) => {
          productFormData.append("newImages[]", image);
        });

        // Loop over the form data
        for (const [key, value] of productFormData.entries()) {
          console.log(`${key}:`, value);
        }

        const response = await api.post<Response<null>, FormData>(
          `/products/update/${productId}`,
          productFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        console.log("response", response);
        showNotification("success", response.message);
      }
    } catch (error) {
      showNotification("error", "Failed to update the product");
      console.log(error);
    } finally {
      setIsSavingProductLoading(false);
    }
  };

  const deleteNewImage = (index: number) => {
    setNewImagesUrl(
      newImagesUrl.filter((img: string, i: number) => i !== index),
    );

    setNewImages(newImages.filter((img: File, i: number) => i !== index));
  };

  const cancelProductEditing = async () => {
    await fetchProductDetail();
    setIsEditing(false);
    setNewImages([]);
    setDeletedImagesId([]);
    setNewImagesUrl([]);
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const deleteProduct = async () => {
    try {
      setIsDeletingProductLoading(true);

      await api.delete(`/products/${productId}`);

      showNotification("success", "The product is deleted successffylly");
      navigate("/products");
    } catch (error) {
      console.log(error);
      showNotification("error", "Deleting product is failed");
    } finally {
      setIsDeletingProductLoading(false);
    }
  };
  return {
    isEditing,
    product,
    handleChange,
    fetchProductDetail,
    saveProductChanges,
    startEdit,
    cancelProductEditing,
    deleteImage,
    newImagesUrl,
    onDropNewImages,
    deleteNewImage,
    isSavingProductLoading,
    deleteProduct,
    isDeletingProductLoading,
  };
};

export default useProductDetail;
