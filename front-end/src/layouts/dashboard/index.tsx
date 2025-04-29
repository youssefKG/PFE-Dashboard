import { Outlet } from "react-router-dom";
import SiderBar from "../../components/containers/sideBar";
import Navbar from "../../components/containers/navbar";
import DrawerPhone from "../../components/containers/Drawer";

const DashboardLayout = () => {
  return (
    <div className="md:grid md:grid-cols-10 h-screen relative">
      <SiderBar />
      <DrawerPhone />
      <div
        className="col-end-12 transition-colors col-start-1  md:col-start-3 dark:bg-neutral-800 dark:text-white h-screen overflow-scroll
        bg-blue-50/40 flex flex-col gap-4 "
      >
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
