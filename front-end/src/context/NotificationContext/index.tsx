import { createContext, ReactNode } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NotificationContextI {
  showNotification(type: "error" | "success" | "info", message: string): void;
}
const NotificationContext = createContext({} as NotificationContextI);

const NotificationContextProdvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const showNotification = (
    type: "error" | "success" | "info",
    message: string,
  ): void => {
    toast[type](message);
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
      }}
    >
      {children}
      <div style={{ color: "white" }} className="text-white text-sm">
        <ToastContainer
          style={{ color: "white" }}
          position="top-center"
          draggable
          autoClose={3000}
          theme="light"
        />
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationContextProdvider;
export { NotificationContext };
