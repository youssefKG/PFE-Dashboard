import Breadcrumb from "../../components/common/breadcrumbs";
import StatCardsList from "../../components/common/statsCard";
import SalesPerformance from "../../components/containers/SalesPerformance";
import TopSellingProducts from "../../components/containers/TopSellingProducts";
import RecentPurchases from "../../components/containers/recentPurchases";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen gap-2 p-2 py-6 mb-4">
      <div className="flex flex-col gap-2 ">
        <div>
          <h1 className="font-extrabold text-2xl">Dashboard</h1>
        </div>
        <Breadcrumb links={[{ value: "Dashboard", to: "/" }]} />
      </div>
      <StatCardsList />
      <div className="md:grid flex flex-col md:grid-cols-6 gap-4 p-2">
        <SalesPerformance />
        <TopSellingProducts />
      </div>
      <RecentPurchases />
    </div>
  );
};

export default Dashboard;
