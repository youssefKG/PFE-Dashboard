import { createContext, ReactNode, useState } from "react";
import AuthContextProvider from "../authContext";
import NotificationContextProdvider from "../NotificationContext";

type Mode = "ligth" | "dark";

interface GlobalContextProviderPropsI {
  children: ReactNode;
}

interface GlobalContextI {
  mode: Mode;
  toggleMode(): void;
  toggleDrawer(): void;
  isDrawerOpen: boolean;
}
const GlobalContext = createContext<GlobalContextI>({} as GlobalContextI);

const GlobalContextProvider = ({ children }: GlobalContextProviderPropsI) => {
  const [mode, setMode] = useState<Mode>("ligth");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleMode = (): void => {
    const newTheme: Mode = mode === "dark" ? "ligth" : "dark";
    setMode(newTheme);
  };

  return (
    <GlobalContext.Provider
      value={{ mode, toggleMode, toggleDrawer, isDrawerOpen }}
    >
      <NotificationContextProdvider>
        <AuthContextProvider>
          <div className={`${mode === "dark" ? "dark" : null}`}>{children}</div>
        </AuthContextProvider>
      </NotificationContextProdvider>
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export { GlobalContext };
