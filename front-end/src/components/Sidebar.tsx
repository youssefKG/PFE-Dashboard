import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Products", href: "/dashboard/products", icon: ShoppingCartIcon },
  { name: "Users", href: "/dashboard/users", icon: UserGroupIcon },
  { name: "Analytics", href: "/dashboard/analytics", icon: ChartBarIcon },
  { name: "Settings", href: "/dashboard/settings", icon: CogIcon },
  { name: "Categorys", href: "/dashboard/category", icon: TableCellsIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();

  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 px-4 bg-gray-800">
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    isActive
                      ? "text-gray-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  } mr-3 h-6 w-6`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

