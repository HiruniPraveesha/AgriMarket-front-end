import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "react-auth-kit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import SignIn from "./pages/Login/SignIn";
import SelectLogin from "./pages/Login/selectLogin";
import SignUpBuyer from "./pages/Login/SignUpBuyer";
import ProductMap from "./pages/ProductMap";
import SignupSeller from "./pages/Login/SignupSeller";
import StepProgressBar from "./pages/Login/StepProgressBar";
import Verifybank from "./pages/Login/Verifybank";
//import AddProduct from "./pages/Login/AddProduct";
// import Email2 from "./pages/Login/Email";
// import Verify from "./pages/Login/Verify";
// import NewPW from "./pages/Login/NewPW";
import HomePage from "./pages/HomePage";
import SellerDashboard from "./pages/sellerDashboard";
// import AddLogin from "./pages/Login/AddLogin";
// import AddProduct from "./pages/Login/AddProduct";
// import VerifyBank from "./pages/Login/VerifyBank";
import ProductCalendar from "./pages/CalendarSeller";
import TC from "./pages/Footer/T&C";
import PrivacyPolicy from "./pages/Footer/PrivacyPolicy";
// import MyProducts from "./pages/MyProducts";
import ShoppingCart from "./pages/Checkout/ShoppingCart";
// import Login from "./pages/AdminLogin";
import createStore from "react-auth-kit/createStore";
// import OrderHistory from "./pages/Buyer/OrderHistory";
// import OrderDetails from "./pages/Buyer/OrderDetails";
import BuyerProfile from "./pages/Buyer/BuyerProfile";
// import OngoingOrders from "./pages/Buyer/OngoingOrders";
// import Checkout from "./pages/Checkout/Checkout";
// import Wallet from "./pages/Buyer/Wallet";
// import RechargeWallet from "./pages/Buyer/RechargeWallet";
// import AddProduct from "./pages/Seller/AddProduct";
import Sidebar from "./components/Seller-side-bar";
// import AdminLogin from "./pages/Admin/Admin-login";
// import AdminNavigation from "./components/Admin-bar";
// import Buyers from "./pages/Admin/Buyers";
// import Sellers from "./pages/Admin/Sellers";
// import Products from "./pages/Admin/Products";
import SellerProfile from "./pages/SellerProfile";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});
import CalendarBuyer from "./pages/CalendarBuyer";
// import Dashboard from "./pages/Dashbaord";

import ItemDetails from "./pages/ItemDetails2";
import ReviewRating from "./pages/ReviewRating";
import Fruits from "./pages/Fruits";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
  },
  // {
  //   path: "/adminLogin",
  //   element: <Login />,
  // },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/SellerProfile/:sellerId",
    element: <SellerProfile />,
  },

  {
    path: "/selectLogin",
    element: <SelectLogin />,
  },
  // {
  //   path: "/MyProducts",
  //   element: <MyProducts />,
  // },
  {
    path: "/signUpBuyer",
    element: <SignUpBuyer />,
  },
  {
    path: "/ItemDetails/:productId",
    element: <ItemDetails />,
  },

  {
    path: "/HomePage",
    element: <HomePage />,
  },
  {
    path: "/ReviewRating/:productId",
    element: <ReviewRating />,
  },

  {
    path: "/Fruits/:categoryId",
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
  // {
  //   path: "/Dashboard",
  //   element: <Dashboard />,
  // },
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
  // {
  //   path: "/AddProduct",
  //   element: <AddProduct />,
  // },
  {
    path: "/buyer-profile",
    element: <BuyerProfile />,
  },
  // {
  //   path: "/order-history",
  //   element: <OrderHistory />,
  // },
  // {
  //   path: "/order-details",
  //   element: <OrderDetails />,
  // },
  // {
  //   path: "/ongoing-orders",
  //   element: <OngoingOrders />,
  // },
  {
    path: "/shopping-cart",
    element: <ShoppingCart />,
  },
  // {
  //   path: "/checkout",
  //   element: <Checkout />,
  // },
  // {
  //   path: "/wallet",
  //   element: <Wallet />,
  // },
  // {
  //   path: "/signup-buyer",
  //   element: <SignUpBuyer />,
  // },
  // {
  //   path: "/recharge-wallet",
  //   element: <RechargeWallet />,
  // },
  // {
  //   path: "/seller-dashboard",
  //   element: <Sidebar/>,
  // },
  // {
  //   path: "/admin-page",
  //   element: <AdminNavigation />,
  // },
  // {
  //   path: "/admin-login",
  //   element: <AdminLogin />,
  // },
  // {
  //   path: "/admin-dashboard",
  //   element: <Dashboard />,
  // },
  // {
  //   path: "/admin-buyers",
  //   element: <Buyers />,
  // },
  // {
  //   path: "/admin-sellers",
  //   element: <Sellers />,
  // },
  // {
  //   path: "/admin-products",
  //   element: <Products />,
  // },
  {
    path: "/signupSeller",
    element: <SignupSeller />,
  },

  {
    path: "/stepProgressBar",
    element: <StepProgressBar currentStep={0} />,
  },

  {
    path: "/verifybank/:sellerId?",
    element: <Verifybank currentStep={2} />,
  },
  /*
  {
    path: "/addProduct",
    element: <AddProduct/>,
  },*/
  // {
  //   path: "/email",
  //   element: <Email2 />,
  // },
  // {
  //   path: "/verify",
  //   element: <Verify />,
  // },
  // {
  //   path: "/newpw",
  //   element: <NewPW />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
