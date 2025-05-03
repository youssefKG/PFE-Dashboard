import { useState, FC, ReactElement } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  CurrencyBangladeshiIcon,
  ClipboardDocumentCheckIcon,
  ChartPieIcon,
  BuildingStorefrontIcon,
  UsersIcon,
  TableCellsIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/outline";
import { Divider, toggleButtonClasses } from "@mui/material";
import "./index.css";

const sidebarItems = [
  { name: "Dashboard", icon: ChartPieIcon, to: "/" },
  { name: "Order", icon: ClipboardDocumentCheckIcon, to: "/orders" },
  { name: "Products", icon: BuildingStorefrontIcon, to: "/products" },
  { name: "Customser", icon: UsersIcon, to: "/customers" },
  { name: "Categorys", icon: TableCellsIcon, to: "/category" },
];

const SiderBar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toogleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div
      className="z-30 transition-all hidden md:flex top-0 transition-colors h-screen
      border-r dark:bg-neutral-900 dark:text-white shadow-sm bg-white
      sm:flex-col gap-16 col-start-1 col-end-2 p-2 max-w-xs "
    >
      <button onClick={toogleExpanded} className="self-end">
        {isExpanded ? (
          <ChevronDoubleLeftIcon className="size-4" />
        ) : (
          <ChevronDoubleRightIcon className="size-5" />
        )}
      </button>
      <Link
        to="/"
        className="flex  flex-row items-center justify-center w-full gap-4"
      >
        <CurrencyBangladeshiIcon className="size-9 text-center text-blue-900" />
        {isExpanded && (
          <h1 className="font-bold text-xl tracking-wider uppercase">Totib</h1>
        )}
      </Link>
      <ul className="flex flex-col gap-1  w-full ">
        {sidebarItems.map((item) => (
          <SidbarItem
            isExpanded={isExpanded}
            to={item.to}
            Icon={item.icon}
            name={item.name}
          />
        ))}
        <Divider />
      </ul>
    </div>
  );
};

interface sidebarItemsPropsI {
  name: string;
  isExpanded: boolean;
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;

  to: string;
}
const SidbarItem: FC<sidebarItemsPropsI> = ({ isExpanded, name, to, Icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className="flex gap-4 p-2 rounded-md items-center opacity-90 transition-opacity"
      >
        <Icon className="size-5" />

        {isExpanded && <h3 className="font-medium text-sm">{name}</h3>}
      </NavLink>
    </li>
  );
};

export default SiderBar;
