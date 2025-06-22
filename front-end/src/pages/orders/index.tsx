import Breadcrumb from "../../components/common/breadcrumbs";
import OrdersTable from "./components/ordersTable";
import FilterOrders from "./components/filterOrders";
import useOrders from "./hooks/useOrders";
import OrdersStats from "./components/OrdersStats";

const Order = () => {
  const {
    isOrdersLoading,
    orders,
    searchTerm,
    handleStatusFilterChange,
    handleSearchTermChange,
    statusFilter,
    ordersStats,
    isOrdersStatsLoading,
  } = useOrders();

  return (
    <div className="flex flex-col h-screen gap-2 p-2 py-6 mb-4">
      <div className="flex flex-col gap-2 ">
        <div>
          <h1 className="font-extrabold text-2xl">Orders</h1>
        </div>
        <Breadcrumb links={[{ value: "Orders", to: "/" }]} />
      </div>
      <OrdersStats
        isOrdersStatsLoading={isOrdersStatsLoading}
        ordersStats={ordersStats}
      />

      <div className="flex flex-col md:p-14 p-4 gap-6">
        <h1 className="text-xl font-bold">Recent Orders</h1>
        <FilterOrders
          searchTerm={searchTerm}
          handleSearchTermChange={handleSearchTermChange}
          handleStatusFilterChange={handleStatusFilterChange}
          statusFilter={statusFilter}
        />
        <OrdersTable orders={orders} isOrdersLoading={isOrdersLoading} />
      </div>
    </div>
  );
};

export default Order;
