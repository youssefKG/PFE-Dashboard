import { ChangeEvent, FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectCategory from "@/components/containers/SelectCategory";

interface ProductFilterPropsI {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  searchTerm: string;
  handleChangeFilterCategory: (categoryId: string) => void;
  clearFilter: () => void;
}
const ProductFilter: FC<ProductFilterPropsI> = ({
  searchTerm,
  handleChange,
  handleChangeFilterCategory,
  clearFilter,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          name="searchByName"
          value={searchTerm}
          onChange={handleChange}
          type="text"
          placeholder="Search for product by name"
        />
        <Button className="" type="submit">
          <MagnifyingGlassIcon className="size-5" />
        </Button>
      </div>
      <div className="flex items-center gap-10">
        <SelectCategory handleChange={handleChangeFilterCategory} />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter</SelectLabel>
              <SelectItem value="apple">Date</SelectItem>
              <SelectItem value="banana">A-Z</SelectItem>
              <SelectItem value="blueberry">Price</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <button
          onClick={clearFilter}
          className="bg-white px-2 p-1 hover:opacity-80 transition-all
        text-sm text-gray-600 border border-gray-800 rounded-md"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
