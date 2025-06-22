import { FC } from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableCaption,
  TableHeader,
} from "@/components/ui/table";
import { OrderDetailI } from "@/types/orders.type";
import { useNavigate } from "react-router-dom";

interface OrderProductsPropsI {
  orderDetail: OrderDetailI | null;
}

const OrderProducts: FC<OrderProductsPropsI> = ({ orderDetail }) => {
  const navigate = useNavigate();
  return (
    <div className="flex col-span-3 flex-col gap-2">
      <h1 className="font-bold text-xl">Order Products</h1>
      <Table className="bg-white">
        <TableCaption>List of order products </TableCaption>
        <TableHeader>
          <TableHead>Product Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Date</TableHead>
        </TableHeader>
        <TableBody>
          {orderDetail?.orderItems &&
            orderDetail?.orderItems.map((item) => (
              <TableRow
                onClick={() => navigate(`/product-detail/${item.productId}`)}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img src={item.imageUrl} className="size-10 rounded-lg" />
                    <p>{item.productName}</p>
                  </div>
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unitPrice}</TableCell>
                <TableCell>{item.subtotal}</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleTimeString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderProducts;
