import { Outlet } from "react-router-dom";
import GlobalContextProvider from "../../context/globalContext";
import { Toaster } from "@/components/ui/toaster";

const DefaultLayout = () => {
  return (
    <GlobalContextProvider>
      <Outlet />
      <Toaster />
    </GlobalContextProvider>
  );
};

export default DefaultLayout;
