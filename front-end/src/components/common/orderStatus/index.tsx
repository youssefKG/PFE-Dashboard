import { FC } from "react";
import { Status } from "@/types/orders.type";

interface OrderStatusPropsI {
  status: Status;
}

const OrderStatus: FC<OrderStatusPropsI> = ({ status }) => {
  return (
    <div
      className={`px-3 p-1 w-fit rounded-full text-sm font-medium ${statusBackground(status)}`}
    >
      {status}
    </div>
  );
};

function statusBackground(status: Status): string {
  switch (status) {
    case "pending":
      return "bg-yellow-400";
    case "completed":
      return "bg-green-500";
    case "canceled":
      return "bg-red-500";
    case "processing":
      return "bg-blue-500";
    default:
      return "bg-gray-200"; // optional fallback
  }
}

export default OrderStatus;
