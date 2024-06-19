import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "react-auth-kit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import SignIn from "./pages/Login/SignIn";
import SelectLogin from "./pages/Login/selectLogin";
import SignUpBuyer from "./pages/Login/SignUpBuyer";
import BecomeASeller from "./pages/Login/BecomeASeller";
import ProductMap from "./pages/ProductMap";
import HomePage from "./pages/HomePage";
import SellerDashboard from "./pages/sellerDashboard";
import TC from "./pages/T&C";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import MyProducts from "./pages/MyProducts";
import ShoppingCart from "./pages/ShoppingCart";
import Login from "./pages/AdminLogin";
import createStore from "react-auth-kit/createStore";
import OrderHistory from "./pages/Buyer/OrderHistory";
import OrderDetails from "./pages/Buyer/OrderDetails";
import BuyerProfile from "./pages/Buyer/BuyerProfile";
import OngoingOrders from "./pages/Buyer/OngoingOrders";
import Checkout from "./pages/Checkout/Checkout";
import Wallet from "./pages/Buyer/Wallet";
import RechargeWallet from "./pages/Buyer/RechargeWallet";
import AddProduct from "./pages/Seller/AddProduct";
import Sidebar from "./components/Seller-side-bar";
import AdminLogin from "./pages/Admin/Admin-login";
import Dashboard from "./pages/Admin/Dashboard";
import AdminNavigation from "./components/Admin-bar";
import Buyers from "./pages/Admin/Buyers";
import Sellers from "./pages/Admin/Sellers";
import Products from "./pages/Admin/Products";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/ShoppingCart",
    element: <ShoppingCart />,
  },
  {
    path: "/adminLogin",
    element: <Login />,
  },
  {
    path: "/HomePage",
    element: <HomePage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/select",
    element: <SelectLogin />,
  },
  {
    path: "/MyProducts",
    element: <MyProducts />,
  },
  {
    path: "/signUpBuyer",
    element: <SignUpBuyer />,
  },
  {
    path: "/becomeASeller",
    element: <BecomeASeller />,
  },
  {
    path: "/ProductMap",
    element: <ProductMap />,
  },
  {
    path: "/TC",
    element: <TC />,
  },
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/sellerDashboard",
    element: <SellerDashboard />,
  },
  {
    path: "/AddProduct",
    element: <AddProduct />,
  },
  {
    path: "/buyer-profile",
    element: <BuyerProfile />,
  },
  {
    path: "/order-history",
    element: <OrderHistory />,
  },
  {
    path: "/order-details",
    element: <OrderDetails />,
  },
  {
    path: "/ongoing-orders",
    element: <OngoingOrders />,
  },
  {
    path: "/shopping-cart",
    element: <ShoppingCart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/wallet",
    element: <Wallet />,
  },
  {
    path: "/signup-buyer",
    element: <SignUpBuyer />,
  },
  {
    path: "/recharge-wallet",
    element: <RechargeWallet />,
  },
  // {
  //   path: "/seller-dashboard",
  //   element: <Sidebar/>,
  // },
  {
    path: "/admin-page",
    element: <AdminNavigation />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin-dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin-buyers",
    element: <Buyers />,
  },
  {
    path: "/admin-sellers",
    element: <Sellers />,
  },
  {
    path: "/admin-products",
    element: <Products />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
