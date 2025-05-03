import { Outlet } from "react-router-dom";
import SiderBar from "../../components/containers/sideBar";
import Navbar from "../../components/containers/navbar";
import DrawerPhone from "../../components/containers/Drawer";

const DashboardLayout = () => {
  return (
    <div className="flex flex-row h-screen relative">
      <SiderBar />
      <DrawerPhone />
      <div
        className="w-full  transition-colors col-start-1  md:col-start-2
      dark:bg-neutral-800 dark:text-white h-screen overflow-y-scroll
      bg-blue-50/40 flex flex-col gap-4"
      >
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
