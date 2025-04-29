import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

const data = [
  {
    month: "January",
    completedOrders: 1200, // Total price of completed orders
    unpaidOrders: 300, // Total price of unpaid orders
    pendingOrders: 500, // Total price of pending orders
  },
  {
    month: "February",
    completedOrders: 1500,
    unpaidOrders: 200,
    pendingOrders: 400,
  },
  {
    month: "March",
    completedOrders: 1700,
    unpaidOrders: 250,
    pendingOrders: 450,
  },
  {
    month: "April",
    completedOrders: 1100,
    unpaidOrders: 150,
    pendingOrders: 300,
  },
  {
    month: "May",
    completedOrders: 2000,
    unpaidOrders: 350,
    pendingOrders: 600,
  },
  {
    month: "June",
    completedOrders: 1800,
    unpaidOrders: 400,
    pendingOrders: 700,
  },
  {
    month: "July",
    completedOrders: 2100,
    unpaidOrders: 500,
    pendingOrders: 800,
  },
  {
    month: "August",
    completedOrders: 2200,
    unpaidOrders: 450,
    pendingOrders: 750,
  },
  {
    month: "September",
    completedOrders: 2300,
    unpaidOrders: 300,
    pendingOrders: 650,
  },
  {
    month: "October",
    completedOrders: 2500,
    unpaidOrders: 350,
    pendingOrders: 700,
  },
  {
    month: "November",
    completedOrders: 2700,
    unpaidOrders: 400,
    pendingOrders: 800,
  },
  {
    month: "December",
    completedOrders: 3000,
    unpaidOrders: 600,
    pendingOrders: 900,
  },
];
const SalesPerformanceChart = () => {
  return (
    <ResponsiveContainer>
      <AreaChart
        width={800}
        height={400}
        data={data}
        margin={{
          // top: 10,
          // right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickCount={12}
          minTickGap={2}
          className="font-medium text-sm"
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="completedOrders"
          stackId="1"
          stroke="blue"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="unpaidOrders"
          stackId="2"
          stroke="green"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="pendingOrders"
          stackId="3"
          stroke="#d00000"
          fill="#e85d04"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const SalesPerformance = () => {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-700 gap-4 h-[70vh] col-span-4 shadow p-4 w-full rounded-xl">
      <div className="flex justify-between">
        <h1 className="font-bold text-sm">Sales Performance</h1>
        <div className="flex gap-8 text-sm font-extralight">
          <h2 className="">Todays</h2>
          <h2>Monthly</h2>
        </div>
      </div>
      <ul className="flex gap-4 text-xs text-slate-700">
        <li className="flex items-center gap-2 font-extralight text-xs">
          <div className="size-4 bg-blue-600 rounded" />
          <p>Completed</p>
        </li>
        <li className="flex items-center gap-2 font-light text-xs">
          <div className="size-4 bg-green-600 rounded" />
          <p>Pending</p>
        </li>
        <li className="flex items-center gap-2 font-light text-xs">
          <div className="size-4 bg-orange-600 rounded" />
          <p>Unpaid</p>
        </li>
      </ul>
      <SalesPerformanceChart />
    </div>
  );
};

export default SalesPerformance;
