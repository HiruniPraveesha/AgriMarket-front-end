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
import SignupSeller from "./pages/Login/SignupSeller";
import StepProgressBar from "./pages/Login/StepProgressBar";
import Verifybank from "./pages/Login/Verifybank";
//import AddProduct from "./pages/Login/AddProduct";
import Email2 from "./pages/Login/Email";
import Verify from "./pages/Login/Verify";
import NewPW from "./pages/Login/NewPW";
import HomePage from "./pages/HomePage";
import SellerDashboard from "./pages/sellerDashboard";
// import AddLogin from "./pages/Login/AddLogin";
// import AddProduct from "./pages/Login/AddProduct";
// import VerifyBank from "./pages/Login/VerifyBank";
import CalendarSeller from "./pages/CalendarSeller";
import ProductCalendar from "./pages/CalendarSeller";
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
import AdminLogin from "./Admin/Admin-login";
import AdminNavigation from "./components/Admin-bar";
import Buyers from "./Admin/Buyers";
import Sellers from "./Admin/Sellers";
import Products from "./Admin/Products";
import Sidebar1 from "./Admin/AdminSidebar";
const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});
import CalendarBuyer from "./pages/CalendarBuyer";
import Dashboard from "./pages/Dashbaord";
import Email from "./pages/Login/ForgotPw/Email";
import ItemDetails from "./pages/ItemDetails2";
import ReviewRating from "./pages/ReviewRating";
import Fruits from "./pages/Fruits";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/",
    element: <App />,
  },
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
    path: "/AdminSidebar",
    element: <Sidebar1  />,
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
    path: "/Email",
    element: <Email />,
  },
  {
    path: "/Email",
    element: <Email />,
  },
  {
    path: "/selectLogin",
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
    path: "/ItemDetails",
    element: <ItemDetails productId={"3"} />,
  },
  {
    path: "/ReviewRating",
    element: <ReviewRating />,
  },
  {
    path: "/Home",
    element: <HomePage />,
  },
  {
    path: "/Fruits",
    element: <Fruits />,
  },
  {
    path: "/ProductMap",
    element: <ProductMap />,
  },
  {
    path: "/CalendarSeller",
    element: <ProductCalendar />,
  },
  {
    path: "/CalendarBuyer",
    element: <CalendarBuyer />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
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
  {
    path: "/signupSeller",
    element: <SignupSeller />,
  },

  {
    path: "/stepProgressBar",
    element: <StepProgressBar currentStep={0} />,
  },

  {
    path: "/verifybank",
    element: <Verifybank currentStep={0} />,
  },
  /*
  {
    path: "/addProduct",
    element: <AddProduct/>,
  },*/
  {
    path: "/email",
    element: <Email2 />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/newpw",
    element: <NewPW />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
