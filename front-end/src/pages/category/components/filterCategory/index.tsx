import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, FC } from "react";

interface FilterCatgoryPropsI {
  searchTerm: string;
  handleSearchTermChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const FilterCategory: FC<FilterCatgoryPropsI> = ({
  searchTerm,
  handleSearchTermChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
        <Input
          onChange={handleSearchTermChange}
          value={searchTerm}
          placeholder="Search categories..."
          className="pl-10"
        />
      </div>
      <div className="flex gap-2">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterCategory;
