import { FC } from "react";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomersFilterPropsI {
  searchTerm: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const CustomersFilter: FC<CustomersFilterPropsI> = ({
  searchTerm,
  handleChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <Input
        onChange={handleChange}
        value={searchTerm}
        placeholder="Search for customer by name"
        className="lg:max-w-2xl"
      />

      <div className="w">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ordersCount">Order number</SelectItem>
            <SelectItem value="ordersCount">Recent</SelectItem>
            <SelectItem value="ordersCount">Clear</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
export default CustomersFilter;
