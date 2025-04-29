import { Area, AreaChart } from "recharts";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { CreditCardIcon } from "@heroicons/react/24/outline";

const inclindeData = [{ pv: 0 }, { pv: 598 }, { pv: 898 }, { pv: 1698 }];

const declineData = [{ pv: 698 }, { pv: 598 }, { pv: 200 }, { pv: 198 }];

const DeclineChartLine = () => {
  return (
    <AreaChart width={100} height={50} data={declineData}>
      <Area dataKey="pv" stroke="red" fill="#ff758f" />
    </AreaChart>
  );
};

const InclinedChartCard = () => {
  return (
    <AreaChart width={100} height={50} data={inclindeData}>
      <Area dataKey="pv" stroke="green" fill="#b7e4c7" />
    </AreaChart>
  );
};

const StatCardsList = () => {
  return (
    <div className="flex flex-wrap justify-around p-4 gap-4 mt-16 ">
      <div
        className="flex flex-col  min-w-[250px] max-w-[260px] w-full shadow
      bg-blue-400/20 flex-1 p-3 gap-4"
      >
        <div className="flex gap-2 items-center">
          <CreditCardIcon className="size-6" />
          <p className="text-gray-800 font-medium text-sm">Total Transaction</p>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex gap-2 items-center">
            <p className="font-extralight text-gray-800">$330003</p>
            <div className="flex gap-px items-center font-bold text-xs text-green-800">
              <ArrowTrendingUpIcon className="size-4" />
              <p>+23</p>
            </div>
          </div>
          <InclinedChartCard />
        </div>
        <p className="text-gray-500 text-xs justify-self-end self-end">
          Compared to the last mounth
        </p>
      </div>
      <div
        className="flex flex-col  min-w-[250px] max-w-[260px] w-full shadow
      bg-green-400/20 flex-1 p-3 gap-4"
      >
        <div className="flex gap-2 items-center">
          <CreditCardIcon className="size-6" />
          <p className="text-gray-800 font-medium text-sm">Total Transaction</p>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex gap-2 items-center">
            <p className="font-extralight text-gray-800">$330003</p>
            <div className="flex gap-px items-center font-bold text-xs text-green-800">
              <ArrowTrendingUpIcon className="size-4" />
              <p>+23</p>
            </div>
          </div>
          <DeclineChartLine />
        </div>
        <p className="text-gray-500 text-xs justify-self-end self-end">
          Compared to the last mounth
        </p>
      </div>
      <div
        className="flex flex-col  min-w-[250px] max-w-[260px] w-full shadow
      bg-gray-400/20 flex-1 p-3 gap-4"
      >
        <div className="flex gap-2 items-center">
          <CreditCardIcon className="size-6" />
          <p className="text-gray-800 font-medium text-sm">Total Transaction</p>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex gap-2 items-center">
            <p className="font-extralight text-gray-800">$330003</p>
            <div className="flex gap-px items-center font-bold text-xs text-green-800">
              <ArrowTrendingUpIcon className="size-4" />
              <p>+23</p>
            </div>
          </div>
          <InclinedChartCard />
        </div>
        <p className="text-gray-500 text-xs justify-self-end self-end">
          Compared to the last mounth
        </p>
      </div>
      <div
        className="flex flex-col  min-w-[250px] max-w-[260px] w-full shadow
      bg-red-400/20 flex-1 p-3 gap-4"
      >
        <div className="flex gap-2 items-center">
          <CreditCardIcon className="size-6" />
          <p className="text-gray-800 font-medium text-sm">Total Transaction</p>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex gap-2 items-center">
            <p className="font-extralight text-gray-800">$330003</p>
            <div className="flex gap-px items-center font-bold text-xs text-green-800">
              <ArrowTrendingUpIcon className="size-4" />
              <p>+23</p>
            </div>
          </div>
          <InclinedChartCard />
        </div>
        <p className="text-gray-500 text-xs justify-self-end self-end">
          Compared to the last mounth
        </p>
      </div>
      <div
        className="flex flex-col  min-w-[250px] max-w-[260px] w-full shadow
      bg-purple-400/20 flex-1 p-3 gap-4"
      >
        <div className="flex gap-2 items-center">
          <CreditCardIcon className="size-6" />
          <p className="text-gray-800 font-medium text-sm">Total Transaction</p>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex gap-2 items-center">
            <p className="font-extralight text-gray-800">$330003</p>
            <div className="flex gap-px items-center font-bold text-xs text-green-800">
              <ArrowTrendingUpIcon className="size-4" />
              <p>+23</p>
            </div>
          </div>
          <DeclineChartLine />
        </div>
        <p className="text-gray-500 text-xs justify-self-end self-end">
          Compared to the last mounth
        </p>
      </div>
    </div>
  );
};

const Stat = () => {
  return <div>Hello</div>;
};

export default Stat;
