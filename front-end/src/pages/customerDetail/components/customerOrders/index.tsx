import { FC } from "react";
import OrderStatus from "@/components/common/orderStatus";
import {
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableCaption,
  TableHead,
} from "@/components/ui/table";
import { Order } from "@/types/orders.type";
import { TableBody } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

interface CustomerOrdersPropsI {
  isCustomerOrdersLoading: boolean;
  orders: Order[];
}
const CustomerOrders: FC<CustomerOrdersPropsI> = ({
  isCustomerOrdersLoading,
  orders,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex mt-6 flex-col gap-6">
      <h1 className="font-bold text-xl">Customer orders</h1>
      {isCustomerOrdersLoading ? (
        <div className="self-center">
          <ClipLoader size={40} color="black" />
        </div>
      ) : (
        <Table className="bg-white shadow">
          <TableCaption>Customer order list</TableCaption>
          <TableHeader>
            <TableHead>Order id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
          </TableHeader>
          <TableBody>
            {orders.map((order: Order) => (
              <TableRow onClick={() => navigate(`/order-detail/${order.id}`)}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <OrderStatus status={order.status} />
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total}$</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CustomerOrders;
