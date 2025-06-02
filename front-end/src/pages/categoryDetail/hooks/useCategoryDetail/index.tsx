import api from "@/api";
import { CategoryI } from "@/types/category";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Response from "@/interfaces/response";
import { useNotification } from "@/hooks/useContext";
import { ProductI } from "@/types/product";
import { finalization } from "process";

type NewImages = {
  id: string;
  url: string;
  file: File;
};
const useCategoryDetail = () => {
  const { categoryId } = useParams();
  const { showNotification } = useNotification();
  const [category, setCategory] = useState<CategoryI | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSavingNewChangesLoading, setIsSavingNewChangeLoading] =
    useState<boolean>(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductI[]>([]);
  const [isRelatedProductLoading, setIsRelatedProductLoading] =
    useState<boolean>(true);
  const [isDeletingCategortLoading, setIsDeletingCategoryLoading] =
    useState<boolean>(false);

  const handleCategoryFormChanges = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (category)
      setCategory({ ...category, [event.target.name]: event.target.value });
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = async () => {
    await fetchCategory();
    setIsEditing(false);
  };

  const fetchCategory = async () => {
    try {
      setIsSavingNewChangeLoading(true);
      const response = await api.get<Response<CategoryI | null>>(
        `/categories/${categoryId}`,
      );

      setCategory(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSavingNewChangeLoading(false);
    }
  };

  const saveNewChanges = async () => {
    try {
      setIsSavingNewChangeLoading(true);
      const formData = new FormData();
      if (category) {
        formData.append("name", category.name);
        formData.append("description", category.description);
        if (newImage) formData.append("image", newImage);
      }

      await api.post<Response<null>, FormData>(
        `/categories/update/${categoryId}`,
        formData,
        {
          headers: { "Content-type": "multipart/form-data" },
        },
      );

      setIsSavingNewChangeLoading(true);
      showNotification("success", "The category updated successffully");
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      showNotification("error", "Error: Updating category failed try again!");
    } finally {
      setIsSavingNewChangeLoading(false);
    }
  };

  const onDropNewImage = (img: File[]) => {
    const firstImage = img[0] as File;

    const reader = new FileReader();
    if (category) {
      reader.onload = (event) => {
        if (event.target)
          setCategory({ ...category, imageUrl: event.target.result as string });
      };
      reader.readAsDataURL(firstImage);
      setNewImage(firstImage);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      setIsRelatedProductLoading(true);
      const response = await api.get<Response<ProductI[]>>(
        `/products?category-id=${categoryId}`,
      );
      console.log("ralted products", response.data);
      setRelatedProducts(response.data);
    } catch (error) {
      console.log("related product erro", error);
    } finally {
      setIsRelatedProductLoading(false);
    }
  };

  const deleteCategory = async () => {
    try {
      setIsDeletingCategoryLoading(true);
      await api.delete<Response<null>>("/categories/${categoryId}");
      showNotification(
        "success",
        "Category " + category?.name + " deleted successffully",
      );
    } catch (error) {
      console.log(error);
      showNotification(
        "error",
        "Deleting category " + category?.name + " failed",
      );
    } finally {
      setIsDeletingCategoryLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchRelatedProducts();
  }, []);

  return {
    isEditing,
    category,
    handleCategoryFormChanges,
    cancelEditing,
    startEditing,
    saveNewChanges,
    onDropNewImage,
    isSavingNewChangesLoading,
    isRelatedProductLoading,
    relatedProducts,
    isDeletingCategortLoading,
    deleteCategory,
  };
};

export default useCategoryDetail;
