import { useContext } from "react";
import { GlobalContext } from "../../../context/globalContext";
import {
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  SunIcon,
  BellIcon,
  MoonIcon,
  Bars3Icon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Avatar, Divider } from "@mui/material";
import Button from "../../common/button";
import { useAuthContext } from "../../../hooks/useContext";
import { Link } from "react-router-dom";
import UserType from "../../../types/user";
import { log } from "console";

const Navbar = () => {
  const { toggleMode, mode, toggleDrawer } = useContext(GlobalContext);
  const { user, logout } = useAuthContext();

  return (
    <nav className="bg-white dark:bg-neutral-900 dark-text-white  flex z-20 flex-col-reverse md:flex-row gap-2 items-center p-2 md:px-6 sticky top-0 justify-between border-b shadow-sm">
      <button onClick={toggleDrawer} className="transition-all md:hidden flex">
        <Bars3Icon className="text-black size-6 absolute top-3 left-4" />
      </button>
      <div
        className="flex justify-between px-4 p-2 w-full max-w-xl text-sm
       rounded-md text-gray-600 bg-gray-50"
      >
        <input
          placeholder="Search for products and client"
          className="outline-none flex-1 bg-transparent"
        />
        <MagnifyingGlassIcon className="size-5 " />
      </div>
      <div className="flex gap-4 items-center text-gray-500 dark:text-white">
        <button>
          <ChatBubbleLeftRightIcon className="size-5" />
        </button>
        <button>
          <BellIcon className="size-6 " />
        </button>
        <Button handleClick={toggleMode}>
          {mode === "ligth" ? (
            <MoonIcon className="size-6" />
          ) : (
            <SunIcon className="size-6" />
          )}
        </Button>
        <PopupProfil logout={logout} user={user} />
      </div>
    </nav>
  );
};

interface PopupProfilPropsI {
  user: UserType | null;
  logout: () => Promise<void>;
}
function PopupProfil({ user, logout }: PopupProfilPropsI) {
  return (
    <Popover className="z-40">
      <PopoverButton className="">
        <Avatar
          alt="avater imgae"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Dh-hCRQx8d2VZzrmMMLcpUhAh53KlS1s5A&s"
        />
      </PopoverButton>
      <PopoverPanel anchor="bottom" className="flex flex-col mr-20 p-4 z-40">
        <div className="flex flex-col bg-white border w-60 rounded-md">
          <div
            className="flex  flex-col gap-2 p-2 w-full
            justify-center  px-2 hover:bg-gray-100
          duration-300 ease-out"
          >
            {user && (
              <>
                <p className="text-xs text-center text-gray-700">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-xs font-bold">{user.email}</p>
              </>
            )}
          </div>
          <Divider />
          <Link
            to="/profil"
            className="flex items-center gap-2 p-2 px-2 hover:bg-gray-100 duration-300 ease-out"
          >
            <UserIcon className="size-5 text-gray-700" />
            <p className="text-gray-500 text-xs">Profil</p>
          </Link>
          <Divider />
          <button
            onClick={logout}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 duration-300 ease-out"
          >
            <ArrowRightStartOnRectangleIcon className="size-5 text-red-700" />
            <p className="text-red-500 text-xs">Logout</p>
          </button>
        </div>
      </PopoverPanel>
    </Popover>
  );
}

export default Navbar;
