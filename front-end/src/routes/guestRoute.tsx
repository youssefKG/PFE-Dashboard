import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useContext";

const GuestRoute = () => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
