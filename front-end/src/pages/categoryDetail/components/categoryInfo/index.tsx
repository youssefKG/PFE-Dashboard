import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryI } from "@/types/category";
import { ChangeEvent } from "react";
import { Textarea } from "@/components/ui/textarea";

interface CategoryInfoPropsI {
  isEditing: boolean;
  handleCategoryFormChanges: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;

  category: CategoryI;
}
const CategoryInfo: FC<CategoryInfoPropsI> = ({
  isEditing,
  handleCategoryFormChanges,
  category,
}) => {
  return (
    <div className="flex p-4 flex-col max-w-4xl w-full bg-white shadow rounded-md gap-6">
      <h1 className="font-bold text-xl">Categry Information</h1>
      <div className="flex gap-4 flex-col">
        <div className="flex flex-col gap-2">
          <Label htmlFor="category name" className="font-bold">
            Category name: <span className="text-red-600">*</span> :
          </Label>
          {isEditing ? (
            <Input
              name="name"
              onChange={handleCategoryFormChanges}
              placeholder="Enter category name"
              value={category.name}
            />
          ) : (
            <p className="font-bold text-gray-700 ml-4">{category.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="category name" className="font-bold">
            Category name: <span className="text-red-600">*</span> :
          </Label>
          {isEditing ? (
            <Textarea
              onChange={handleCategoryFormChanges}
              placeholder="Enter category description"
              name="description"
              value={category.description}
            />
          ) : (
            <p className="text-gray-600 text-sm ml-2">{category.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryInfo;
