import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "../../components/common/breadcrumbs";
import useCategory from "../../hooks/useCategory";
import { FilterCategory } from "./components";
import { CategoriesTable } from "./components";
import { Link } from "react-router-dom";

const Category = () => {
  const { categoriesList, isLoading, navigateToCategoryDetail } = useCategory();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">Categories</h1>
              <Breadcrumb links={[{ value: "Categories", to: "/category" }]} />
            </div>
          </div>
          <FilterCategory />
        </div>
        <Link
          to="/create-category"
          className="flex gap-2 w-fit self-end items-center bg-black text-sm text-white
              hover:bg-black/90 px-4 py-1 rounded-md"
        >
          <PlusCircleIcon className="size-5" />
          <span>Create Category</span>
        </Link>
        <CategoriesTable
          navigateToCategoryDetail={navigateToCategoryDetail}
          isLoading={isLoading}
          list={categoriesList}
        />
      </div>
    </div>
  );
};

export default Category;
