import { FC } from "react";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SelectContent } from "@radix-ui/react-select";
import OrderStatus from "@/components/common/orderStatus";
import { OrderDetailI } from "@/types/orders.type";
import { useNavigate } from "react-router-dom";

interface OrderInformationPropsI {
  orderDetail: OrderDetailI | null;
}
const OrderInformation: FC<OrderInformationPropsI> = ({ orderDetail }) => {
  const navigate = useNavigate();
  return (
    orderDetail && (
      <div className="flex col-span-1 border-l border-gray-300 flex-col gap-2">
        <div className="flex flex-col p-2">
          <h1 className="font-bold ">Customer</h1>
          <div className="flex flex-col ml-2 gap-1 justify-center border-b pb-2 border-gray-300">
            <div className="flex items-center gap-2">
              <Label className="font-medium text-gray-700">
                Email <span className="text-red-500">*</span> :
              </Label>
              <p className="font-medium text-sm tracking-wider text-gray-600">
                {orderDetail.user.email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Label className="font-medium text-gray-700">
                Fist name <span className="text-red-500">*</span> :
              </Label>
              <p className="font-medium text-sm tracking-wider text-gray-600">
                {orderDetail.user.firstName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Label className="font-medium text-gray-700">
                Last name <span className="text-red-500">*</span> :
              </Label>
              <p className="font-medium text-sm tracking-wider text-gray-600 ">
                {orderDetail.user.lastName}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-2 gap-2 border-b border-gray-300">
          <h1 className="font-bold ">Shipping Address</h1>
          <p className="text-sm text-gray-500">{orderDetail.shippingAdress}</p>
        </div>
        <div className="flex flex-col p-2 gap-2 border-b border-gray-300">
          <h1 className="font-bold ">Created At</h1>
          <p className="text-sm text-gray-500">
            {new Date(orderDetail.createdAt).toLocaleDateString()}{" "}
            {new Date(orderDetail.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <div className="flex p-2 flex-col gap-2">
          <h1 className="font-bold">Order status</h1>
          <OrderStatus status="processing" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="change order status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="pending w-full">
                <OrderStatus status="pending" />
              </SelectItem>
              <SelectItem value="cancelled">
                <OrderStatus status="cancelled" />
              </SelectItem>
              <SelectItem value="completed">
                <OrderStatus status="completed" />
              </SelectItem>
              <SelectItem value="processing">
                <OrderStatus status="processing" />
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    )
  );
};

export default OrderInformation;
