import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  ViewColumnsIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import Breadcrumb from "../../components/common/breadcrumbs";
import CreateCategoryBackDrop from "../../components/containers/createCategoryBackDrop";
import Button from "../../components/common/button";
import useCategory from "../../hooks/useCategory";
import CategoryList from "../../components/containers/categoryList";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryI } from "@/types/category";

const Category = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("name");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    categoriesList,
    isLoading,
    createCategory,
    openCreateModel,
    closeCreateModel,
    isCreateModelOpen,
  } = useCategory();

  // Statistics data
  const stats = {
    totalCategories: categoriesList?.length || 0,
    categoriesWithImages: categoriesList?.filter(cat => cat.imageUrl).length || 0,
    categoriesWithDescription: categoriesList?.filter(cat => cat.description).length || 0,
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
  };

  const filteredCategories = categoriesList?.filter((category) => {
    return category.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const sortedCategories = [...(filteredCategories || [])].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

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
            <Button
              className="flex gap-2 items-center bg-black text-white hover:bg-black/90 px-4 py-2 rounded-md"
              handleClick={openCreateModel}
            >
              <PlusCircleIcon className="size-5" />
              <span>Create Category</span>
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
              <Input
                placeholder="Search categories..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={handleSort}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="p-2 border border-gray-200 rounded-md hover:bg-gray-50"
                handleClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              >
                {viewMode === "grid" ? (
                  <ListBulletIcon className="size-5" />
                ) : (
                  <ViewColumnsIcon className="size-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-500">Total Categories</p>
                <p className="text-2xl font-bold">{stats.totalCategories}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-500">Categories with Images</p>
                <p className="text-2xl font-bold">{stats.categoriesWithImages}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-500">Categories with Description</p>
                <p className="text-2xl font-bold">{stats.categoriesWithDescription}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories List */}
        <div className="mt-6">
          {isLoading ? (
            <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"} gap-4`}>
              {[...Array(6)].map((_, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <Skeleton className="h-48 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <CategoryList list={sortedCategories} />
          )}
        </div>
      </div>

      <CreateCategoryBackDrop
        isLoading={isLoading}
        handleClose={closeCreateModel}
        isOpen={isCreateModelOpen}
        createCategory={createCategory}
      />
    </div>
  );
};

export default Category;
