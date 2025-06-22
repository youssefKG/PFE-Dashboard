import { ChangeEvent, useEffect, useState } from "react";
import Response from "../interfaces/response";
import api from "../api";
import { useNotification } from "./useContext";
import { CategoryI, CreateCategoryFormDataType } from "../types/category";
import { useNavigate } from "react-router-dom";
import useDebounce from "./useDebounce";

const useCategory = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoriesList, setCategoriesList] = useState<CategoryI[]>([]);
  const [isCreateModelOpen, setIsCreateModelOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm);
  const navigate = useNavigate();

  const { showNotification } = useNotification();

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
        `/categories`,
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

  const fetchCategories = async () => {
    try {
      let query = "?search=";
      if (debouncedSearchTerm.length >= 3) {
        query += `&cat_name=${encodeURIComponent(debouncedSearchTerm)}`;
      }
      setIsLoading(true);
      const response = await api.get<Response<CategoryI[]>>(
        `/categories${query}`,
      );
      setCategoriesList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) fetchCategories();
  }, [debouncedSearchTerm]);

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
    handleSearchTermChange,
    searchTerm,
  };
};

export default useCategory;
