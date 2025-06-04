import Breadcrumb from "../../components/common/breadcrumbs";
import OrderStats from "@/components/containers/OrdersStats";
import OrdersTable from "./components/ordersTable";
import FilterOrders from "./components/filterOrders";

const Order = () => {
  return (
    <div className="flex flex-col h-screen gap-2 p-2 py-6 mb-4">
      <div className="flex flex-col gap-2 ">
        <div>
          <h1 className="font-extrabold text-2xl">Orders</h1>
        </div>
        <Breadcrumb links={[{ value: "Orders", to: "/" }]} />
      </div>
      <OrderStats />

      <div className="flex flex-col md:p-14 p-4 gap-6">
        <h1 className="text-xl font-bold">Recent Orders</h1>
        <FilterOrders />
        <OrdersTable isOrdersLoading={false} />
      </div>
    </div>
  );
};

export default Order;
