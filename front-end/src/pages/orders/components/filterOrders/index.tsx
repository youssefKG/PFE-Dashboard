import { ChangeEvent, FC } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Status } from "@/types/orders.type";
import { stat } from "fs";

interface FilterOrdersPropsI {
  searchTerm: string;
  handleSearchTermChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleStatusFilterChange: (option: Status, checked: boolean) => void;
  statusFilter: Status[];
}

const statusFilterData: Status[] = [
  "pending",
  "cancelled",
  "completed",
  "processing",
];

const FilterOrders: FC<FilterOrdersPropsI> = ({
  searchTerm,
  handleSearchTermChange,
  handleStatusFilterChange,
  statusFilter,
}) => {
  return (
    <div className="flex justify-between flex-wrap">
      <Input
        value={searchTerm}
        className="max-w-2xl"
        onChange={handleSearchTermChange}
        placeholder="Search for orders by customer name or email"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Status</Button>
        </PopoverTrigger>
        <PopoverContent className="w-60">
          <div className="flex flex-col gap-2">
            {statusFilterData.map((status: Status) => (
              <div className="flex gap-2">
                <Checkbox
                  name={status}
                  checked={statusFilter.includes(status)}
                  onCheckedChange={(checked: boolean) =>
                    handleStatusFilterChange(status, checked)
                  }
                />
                <Label>{status}</Label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterOrders;
