import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard";
import Dashboard from "../pages/dashboard";
import Products from "../pages/products";
import DefaultLayout from "../layouts/defaultLayout";
import Login from "../pages/login";
import Register from "../pages/register";
import ProtectedRoute from "./protectedRoutes";
import GuestRoute from "./guestRoute";
import Profil from "../pages/profil";
import Category from "../pages/category";
import ProductDetail from "../pages/productDetail";
import Order from "../pages/orders";
import CreateCategory from "@/pages/createCategory";
import CreateProduct from "@/pages/createProduct";
import CategoryDetail from "@/pages/categoryDetail";
import Customers from "@/pages/customers";
import CustomerDetail from "@/pages/customerDetail";
import OrderDetail from "@/pages/orderDetail";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        path: "/",
        Component: ProtectedRoute,
        children: [
          {
            path: "/",
            Component: DashboardLayout,
            children: [
              {
                path: "/",
                Component: Dashboard,
              },
              {
                path: "/products",
                Component: Products,
              },
              {
                path: "/profil",
                Component: Profil,
              },
              { path: "/category", Component: Category },
              { path: "/product-detail/:productId", Component: ProductDetail },
              { path: "/customers", Component: Customers },
              { path: "/orders", Component: Order },
              { path: "/create-category", Component: CreateCategory },
              { path: "/create-product", Component: CreateProduct },
              {
                path: "/customer-detail/:customerId",
                Component: CustomerDetail,
              },
              {
                path: "/category-detail/:categoryId",
                Component: CategoryDetail,
              },
              { path: "/order-detail/:orderId", Component: OrderDetail },
            ],
          },
        ],
      },
      {
        path: "/",
        Component: GuestRoute,
        children: [
          { path: "/login", Component: Login },
          { path: "/register", Component: Register },
        ],
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={routes} />;
};

export default Router;
