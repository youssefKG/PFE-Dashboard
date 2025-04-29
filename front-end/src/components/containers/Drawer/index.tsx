import { NavLink, Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";

import {
  CurrencyBangladeshiIcon,
  ClipboardDocumentCheckIcon,
  ChartPieIcon,
  BuildingStorefrontIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { Divider } from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../../../context/globalContext";

const DrawerPhone = () => {
  const { toggleDrawer, isDrawerOpen } = useContext(GlobalContext);
  return (
    <Drawer open={isDrawerOpen}>
      <button
        className="p-2 hover:bg-gray-200 transition m-1 w-9 flex justify-center items-center  h-9 rounded-full"
        onClick={toggleDrawer}
      >
        <XMarkIcon className="w-6 h-6 text-gray-600" />
      </button>
      <Link
        to="/"
        className="flex  flex-row items-center mt-6 justify-center w-full gap-4"
      >
        <CurrencyBangladeshiIcon className="size-9 text-center text-blue-900" />
        <h1 className="font-bold text-xl tracking-wider uppercase">Totib</h1>
      </Link>
      <ul className="flex flex-col gap-1 mt-6  w-full px-6 ">
        <li>
          <NavLink
            to="/"
            className="flex gap-4 p-2 px-6 text-white w-full   rounded-md items-center shadow-blue-300/30 shadow-xl bg-blue-600 color-white hover:opacity-90 transition-all"
          >
            <ChartPieIcon className="size-5" />
            <h3 className="font-medium text-sm ">Dashboard</h3>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className="flex gap-4 p-2 px-6  rounded-md items-center active:shadow-xl
            active:bg-blue-600 active:text-white opacity-90 transition-opacity"
          >
            <BuildingStorefrontIcon className="size-5" />
            <h3 className="font-medium text-sm">Products</h3>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/orders"
            className="flex gap-4 p-2 px-6 rounded-md items-center active:shadow-xl
            active:bg-blue-600 active:text-white opacity-90
            transition-opacity"
          >
            <ClipboardDocumentCheckIcon className="size-5" />
            <h3 className="font-medium text-sm">Orders</h3>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/orders"
            className="flex gap-4 p-2 px-6 rounded-md items-center active:shadow-xl
            active:bg-blue-600 active:text-white opacity-90
            transition-opacity"
          >
            <UsersIcon className="size-5" />
            <h3 className="font-medium text-sm">Clients</h3>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/orders"
            className="flex gap-4 p-2 px-6 rounded-md items-center active:shadow-xl
            active:bg-blue-600 active:text-white opacity-90
            transition-opacity"
          >
            <UsersIcon className="size-5" />
            <h3 className="font-medium text-sm">Clients</h3>
          </NavLink>
        </li>
        <Divider />
      </ul>
    </Drawer>
  );
};

export default DrawerPhone;
