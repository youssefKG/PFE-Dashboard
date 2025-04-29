import { NavLink, Link } from "react-router-dom";
import {
  CurrencyBangladeshiIcon,
  ClipboardDocumentCheckIcon,
  ChartPieIcon,
  BuildingStorefrontIcon,
  UsersIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { Divider } from "@mui/material";
import "./index.css";

const SiderBar = () => {
  return (
    <div
      className="z-30 hidden md:flex top-0 transition-colors h-screen
      border-r dark:bg-neutral-900 dark:text-white shadow-sm bg-white
      sm:flex-col gap-16 col-start-1 col-end-3 p-4 px-6"
    >
      <Link
        to="/"
        className="flex  flex-row items-center justify-center w-full gap-4"
      >
        <CurrencyBangladeshiIcon className="size-9 text-center text-blue-900" />
        <h1 className="font-bold text-xl tracking-wider uppercase">Totib</h1>
      </Link>
      <ul className="flex flex-col gap-1  w-full px-6 ">
        <li>
          <NavLink
            to="/"
            className="flex gap-4 p-2 px-6 acitve:text-white w-full rounded-md
            items-center shadow-blue-300/30 hover:opacity-90 transition-all"
          >
            <ChartPieIcon className="size-5" />
            <h3 className="font-medium text-sm ">Dashboard</h3>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className="flex gap-4 p-2 px-6  rounded-md items-center opacity-90 transition-opacity"
          >
            <BuildingStorefrontIcon className="size-5" />
            <h3 className="font-medium text-sm">Products</h3>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/orders"
            className="flex gap-4 p-2 px-6 rounded-md items-center transition-opacity"
          >
            <ClipboardDocumentCheckIcon className="size-5" />
            <h3 className="font-medium text-sm">Orders</h3>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/orders"
            className="flex gap-4 p-2 px-6 rounded-md items-center opacity-90 transition-opacity"
          >
            <UsersIcon className="size-5" />
            <h3 className="font-medium text-sm">Clients</h3>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category"
            className="flex gap-4 p-2 px-6 rounded-md items-center opacity-90 transition-opacity"
          >
            <TableCellsIcon className="size-5" />
            <h3 className="font-medium text-sm">Category</h3>
          </NavLink>
        </li>
        <Divider />
      </ul>
    </div>
  );
};

export default SiderBar;
