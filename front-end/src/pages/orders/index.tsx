import DataTable from "../../components/containers/table/index";
import data from "../../assets/dataTable.json";
import Breadcrumb from "../../components/common/breadcrumbs";
import OrderStats from "@/components/containers/OrdersStats";
const Order = () => {
  return (
    <div className="flex flex-col h-screen gap-2 p-2 py-6 mb-4">
      <div className="flex flex-col gap-2 ">
        <div>
          <h1 className="font-extrabold text-2xl">Orders</h1>
        </div>
        <Breadcrumb links={[{ value: "Orders", to: "/" }]} />
      </div>

      <div className="flex flex-col md:p-14 p-4">
        <DataTable data={data} />
        <OrderStats />
      </div>
    </div>
  );
};

export default Order;
