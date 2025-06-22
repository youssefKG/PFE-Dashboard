import { FC } from "react";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrdersStatsType } from "@/types/orders.type";
import { ClipLoader } from "react-spinners";

interface OrdersStatsPropsI {
  isOrdersStatsLoading: boolean;
  ordersStats: OrdersStatsType;
}
const OrdersStats: FC<OrdersStatsPropsI> = ({
  isOrdersStatsLoading,
  ordersStats,
}) => {
  return isOrdersStatsLoading ? (
    <div className="flex justify-center">
      <ClipLoader size={50} color="black" />
    </div>
  ) : (
    <div
      className="flex gap-4  flex-wrap lg:flex-nowrap px-4 justify-self-center 
    *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5
    *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6"
    >
      <Card className="@container/card w-full lg:max-w-2xl">
        <CardHeader className="relative">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            $ {ordersStats.totalRevenue}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card w-full lg:max-w-2xl">
        <CardHeader className="relative">
          <CardDescription>Revenue this month</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            $ {ordersStats.revenueThisMonth}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card w-full lg:max-w-2xl">
        <CardHeader className="relative">
          <CardDescription>Orders This Month</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {ordersStats.ordersThisMonth}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card w-full lg:max-w-2xl">
        <CardHeader className="relative">
          <CardDescription>Completed orders</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {ordersStats.completedOrders}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card w-full lg:max-w-2xl">
        <CardHeader className="relative">
          <CardDescription>Pending orders</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {ordersStats.pendingOrders}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card w-full lg:max-w-2xl">
        <CardHeader className="relative">
          <CardDescription>Total orders</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {ordersStats.totalOrders}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default OrdersStats;
