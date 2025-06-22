import Breadcrumb from "@/components/common/breadcrumbs";
import OrderProducts from "./components/orderProducts";
import OrderInformation from "./components/orderInformation";
import useOrderDetail from "./hooks/useOrderDetail";
import { ClipLoader } from "react-spinners";
import { OrderDetailI } from "@/types/orders.type";

const OrderDetail = () => {
  const { isLoading, orderDetail } = useOrderDetail();
  return (
    <div className="flex flex-col h-screen gap-12 lg:p-6 p-2 py-6 mb-4">
      <div className="flex flex-col gap-2 ">
        <div>
          <h1 className="font-extrabold text-2xl">Order detail</h1>
        </div>
        <Breadcrumb links={[{ value: "Order detail", to: "/" }]} />
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <ClipLoader size={40} color="black" />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          <OrderProducts orderDetail={orderDetail} />
          <OrderInformation orderDetail={orderDetail} />
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
