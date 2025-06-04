import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LucideArrowBigLeft } from "lucide-react";

const FilterOrders = () => {
  return (
    <div className="flex justify-between flex-wrap">
      <Input
        className="max-w-2xl"
        placeholder="Search for orders by customer name or email"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Status</Button>
        </PopoverTrigger>
        <PopoverContent className="w-60">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Checkbox name="pending" />
              <Label>Pending</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox name="pending" />
              <Label>Progress</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox name="pending" />
              <Label>Canceled</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox value="pending" name="pending" />
              <Label>Progress</Label>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterOrders;
