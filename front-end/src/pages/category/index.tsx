import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Breadcrumb from "../../components/common/breadcrumbs";
import CategoryCard from "../../components/containers/categoryCard";
import { useEffect, useState } from "react";
import CreateCategoryBackDrop from "../../components/containers/createCategoryBackDrop";
import Button from "../../components/common/button";
import { CategoryI, CreateCategoryFormDataType } from "../../types/category";
import Response from "../../interfaces/response";

import api from "../../api";
import { useNotification } from "../../hooks/useContext";

type Category = {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
};

const Category = () => {
  const [isCreateCategoryBackDropOpen, setIsCreateCategoryBackDropOpen] =
    useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryI[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { showNotification } = useNotification();

  const createCategory = async (values: CreateCategoryFormDataType) => {
    try {
      setIsloading(true);
      console.log(values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("image", values.image);

      const response = await api.post<Response<CategoryI>, FormData>(
        "/categorys",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      showNotification("success", response.message);
      setCategories([...categories, response.data]);
      setIsCreateCategoryBackDropOpen(false);
    } catch (error) {
      console.log(error);
      showNotification("error", "Error: Creating category failed");
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    const fetchCategorys = async () => {
      try {
        const response = await api.get<Response<CategoryI[]>>("/categorys");
        setCategories(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    };
    fetchCategorys();
  }, []);
  return (
    <div className="flex flex-col gap-2 p-2  py-6 mb-16">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex flex-col gap-2 ">
          <div>
            <h1 className="font-extrabold text-2xl">All Category</h1>
          </div>
          <Breadcrumb links={[{ value: "Category", to: "/category" }]} />
        </div>
        <div
          className="flex justify-between px-4 p-2 w-full max-w-xl text-sm
       rounded-md text-gray-600 bg-white border border-gray-200 "
        >
          <input
            placeholder="Search for category"
            className="outline-none flex-1 bg-transparent"
          />
          <MagnifyingGlassIcon className="size-5 " />
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <Button
          className="flex gap-2 self-end w-fit text-white text-xs justify-center
        items-center bg-black rounded-lg p-1 px-2 hover:opacity-85 transition-all"
          handleClick={async () => setIsCreateCategoryBackDropOpen(true)}
        >
          <PlusCircleIcon className="size-6 text-white" />
          <p>Create Category</p>
        </Button>
        <div className="flex  gap-4 flex-wrap">
          {categories.map((cat) => (
            <CategoryCard
              id={cat.id}
              key={cat.id}
              name={cat.name}
              description={cat.description}
              imgUrl={cat.imageUrl}
            />
          ))}
        </div>
      </div>
      {isCreateCategoryBackDropOpen && (
        <CreateCategoryBackDrop
          isLoading={isLoading}
          handleClose={() => {
            setIsCreateCategoryBackDropOpen(false);
          }}
          isOpen={isCreateCategoryBackDropOpen}
          createCategory={createCategory}
        />
      )}
    </div>
  );
};

export default Category;
