import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { ErrorResponse } from "../types/api";

// Extend InternalAxiosRequestConfig to include _retry property
declare module "axios" {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError<ErrorResponse>) => {
    if (error.response?.status === 401) {
      console.log("remove item");
      localStorage.removeItem("user_totib");
      localStorage.removeItem("user_totib");
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
