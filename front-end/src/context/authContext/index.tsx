import { createContext, ReactNode, useEffect, useState } from "react";
import { LoginFormDataType, RegisterFormDataType } from "../../types/auth";
import UserType from "../../types/user";
import Response from "../../interfaces/response";
import api from "../../api";
import LocalStorageService from "../../services/localStorageService";
import { useNotification } from "../../hooks/useContext";
import { useNavigate } from "react-router-dom";

interface AuthContextProviderPropsI {
  children: ReactNode;
}

interface AuthContextI {
  login(values: LoginFormDataType): Promise<void>;
  register(values: RegisterFormDataType): Promise<void>;
  logout(): Promise<void>;
  user: UserType;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextI>({} as AuthContextI);

const AuthContextProvider = ({ children }: AuthContextProviderPropsI) => {
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>({} as UserType);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (values: LoginFormDataType) => {
    try {
      setIsLoading(true);
      const response = await api.post<Response<UserType>, LoginFormDataType>(
        "/auth/login",
        values,
      );
      showNotification("success", response.message);

      setUser(response.data);
      LocalStorageService.setItem("totib_user", response.data);

      navigate("/");
    } catch (error) {
      showNotification("error", "Login failed");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (values: RegisterFormDataType) => {
    try {
      console.log("click");
      setIsLoading(true);
      const response = await api.post<Response<null>, RegisterFormDataType>(
        "/auth/register",
        values,
      );

      console.log(response);
      navigate("/login");
      // showNotification("success", response.message);
    } catch (error) {
      console.log("error ", error);
      showNotification("error", "Error in register you account");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("logout");
      setIsLoading(true);
      await api.get<Response<null>>("/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const user = LocalStorageService.getItem("totib_user");
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ login, register, logout, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export { AuthContext };
