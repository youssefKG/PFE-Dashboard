import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { GlobalContext } from "../context/globalContext";
import { NotificationContext } from "../context/NotificationContext";

const useAuthContext = () => useContext(AuthContext);
const useGlobalContext = () => useContext(GlobalContext);
const useNotification = () => useContext(NotificationContext);

export { useAuthContext, useGlobalContext, useNotification };
