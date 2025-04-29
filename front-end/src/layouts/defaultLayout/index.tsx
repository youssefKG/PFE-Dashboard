import { Outlet } from "react-router-dom";
import GlobalContextProvider from "../../context/globalContext";

const DefaultLayout = () => {
  return (
    <GlobalContextProvider>
      <Outlet />
    </GlobalContextProvider>
  );
};

export default DefaultLayout;
