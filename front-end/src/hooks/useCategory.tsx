import { useEffect, useState } from "react";
import Response from "../interfaces/response";
import api from "../api";
import { useNotification } from "./useContext";
import { CategoryI, CreateCategoryFormDataType } from "../types/category";
import { useScrollTrigger } from "@mui/material";
import { useNavigate } from "react-router-dom";

const useCategory = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoriesList, setCategoriesList] = useState<CategoryI[]>([]);
  const [isCreateModelOpen, setIsCreateModelOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryI>({} as CategoryI);
  const navigate = useNavigate();

  const { showNotification } = useNotification();

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<Response<CategoryI[]>>("/categories");
      setCategoriesList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToCategoryDetail = (id: string) => {
    navigate(`/category-detail/${id}`);
  };

  const createCategory = async (values: CreateCategoryFormDataType) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("image", values.image);

      const response = await api.post<Response<CategoryI>, FormData>(
        "/categories",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      showNotification("success", response.message);
      setCategoriesList((prev) => [...prev, response.data]);
      closeCreateModel();
    } catch (error) {
      console.log(error);
      showNotification("error", "Error: Creating category failed");
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateModel = () => setIsCreateModelOpen(true);
  const closeCreateModel = () => setIsCreateModelOpen(false);

  const getCategoryById = async (categoryId: string) => {
    const response = await api.get<Response<CategoryI>>(
      `/categories/${categoryId}`,
    );

    return response;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    isLoading,
    categoriesList,
    createCategory,
    openCreateModel,
    closeCreateModel,
    isCreateModelOpen,
    getCategoryById,
    navigateToCategoryDetail,
  };
};

export default useCategory;
