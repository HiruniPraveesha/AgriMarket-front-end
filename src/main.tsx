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
import AddProduct from "./pages/AddProduct2";

import HomePage from "./pages/HomePage";
import SellerDashboard from "./pages/Seller/sellerDashboard";

import ProductCalendar from "./pages/CalendarSeller";
import TC from "./pages/Footer/T&C";
import PrivacyPolicy from "./pages/Footer/PrivacyPolicy";

import ShoppingCart from "./pages/Checkout/ShoppingCart";

import createStore from "react-auth-kit/createStore";

import BuyerProfile from "./pages/Buyer/BuyerProfile";
import Buyers from "./pages/Admin/Buyers";
import Sellers from "./pages/Admin/Sellers";
import Products from "./pages/Admin/Products";

import AdminLogin from "./pages/Admin/Admin-login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import SellerProfile from "./pages/SellerProfile";
import MyProducts from "./pages/MyProducts";
import ManageProductPage from "./pages/ManageProducts";
import Checkout from "./pages/Checkout/Checkout";
import AddNotification from "./pages/Seller/AddNotification";
import SellerEditProfile from "./pages/Seller/SellerEditProfile";
import Contact from "./pages/Footer/ContactUS";
const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});
import CalendarBuyer from "./pages/CalendarBuyer";

import ItemDetails from "./pages/ItemDetails2";
import ReviewRating from "./pages/ReviewRating";
import Fruits from "./pages/Fruits";
import Email from "./pages/Login/Email";
import Verify from "./pages/Login/Verify";
import NewPW from "./pages/Login/NewPW";
import ProductPage from "./pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/MyProducts",
    element: <MyProducts />,
  },
  {
    path: "/ManageYourProducts",
    element: <ManageProductPage />,
  },
  {
    path: "/sellerNotification",
    element: <AddNotification />,
  },
  {
    path: "/Email",
    element: <Email />,
  },
  {
    path: "/Verify",
    element: <Verify />,
  },
  {
    path: "/NewPw",
    element: <NewPW />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/AddYourProducts",
    element: <AddProduct />,
  },
  {
    path: "/SellerProfile/:sellerId",
    element: <SellerProfile />,
  },

  {
    path: "/selectLogin",
    element: <SelectLogin />,
  },
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
    path: "/Category/:categoryId",
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
    path: "/editSellerProfile",
    element: <SellerEditProfile />,
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
    path: "/Search",
    element: <ProductPage />,
  },
  {
    path: "/buyerProfile/:buyerId",
    element: <BuyerProfile />,
  },
  {
    path: "/contactUs",
    element: <Contact />,
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
    path: "/admin/adminDashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/adminLogin",
    element: <AdminLogin />,
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
    path: "/verifybank/:sellerId?",
    element: <Verifybank currentStep={2} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
