import { FC } from "react";
const DashboardWrapper = (WrappedComponent: FC) => {
  return (
    <div className="flex flex-col p-4 bg-gray-100 w-full">
      <WrappedComponent />
    </div>
  );
};

export default DashboardWrapper;
