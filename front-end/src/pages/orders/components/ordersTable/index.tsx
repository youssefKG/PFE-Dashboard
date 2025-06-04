import { FC } from "react";
import { ClipLoader } from "react-spinners";
import {
  Table,
  TableRow,
  TableCell,
  TableCaption,
  TableBody,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import OrderStatus from "@/components/common/orderStatus";

interface OrdersTablePropsI {
  isOrdersLoading: boolean;
}

const OrdersTable: FC<OrdersTablePropsI> = ({ isOrdersLoading }) => {
  return isOrdersLoading ? (
    <div className="self-center">
      <ClipLoader size={40} color="black" />
    </div>
  ) : (
    <Table className="bg-white">
      <TableCaption>Orders list</TableCaption>
      <TableHeader>
        <TableHead>Customer name</TableHead>
        <TableHead>Customer email</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Number of items</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>total</TableHead>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <div className="flex items-center gap-2 ">
              <Avatar>
                <AvatarImage src="https://imgs.search.brave.com/FJNYHEexQFKkEd0boeUUCuL2bwINeXa5o3VzpOpydeA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvZGVmYXVsdC1h/dmF0YXItcHJvZmls/ZS1pY29uLXNvY2lh/bC1tZWRpYS11c2Vy/LWltYWdlLWdyYXkt/YXZhdGFyLWljb24t/YmxhbmstcHJvZmls/ZS1zaWxob3VldHRl/LXZlY3Rvci1pbGx1/c3RyYXRpb25fNTYx/MTU4LTMzODMuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MA" />
              </Avatar>
              <p>Youssef taoussi</p>
            </div>
          </TableCell>
          <TableCell>customer@example.com</TableCell>
          <TableCell>
            <OrderStatus status="pending" />
          </TableCell>
          <TableCell>12</TableCell>
          <TableCell>20-12-2023</TableCell>
          <TableCell>300$</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
