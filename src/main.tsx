import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import AuthProvider from "react-auth-kit";

import "./index.css";
import Header from "./components/Header-sub";
//import SignIn from "./pages/Login/SignIn";
//import SelectLogin from "./pages/Login/selectLogin";
import SignUpBuyer from "./pages/Login/SignUpBuyer";
import BecomeASeller from "./pages/BecomeASeller";
//import ProductMap from "./pages/ProductMap";
import SignupSeller from "./pages/Login/SignupSeller";
import SellerProfile from "./pages/SellerProfile";
import StepProgressBar from "./pages/Login/StepProgressBar";
import Verifybank from "./pages/Login/Verifybank";
import SignIn from "./pages/Login/SignIn";
import AddProduct from "./pages/Login/AddProduct";
import Verify from "./pages/Login/Verify";
import NewPW from "./pages/Login/NewPW";
import BuyerProfile from "./pages/buyerProfile";
import createStore from "react-auth-kit/createStore";
//import AddProduct from "./pages/Login/AddProduct";
//import Email2 from "./pages/Login/Email";
//import Verify from "./pages/Login/Verify";
//import NewPW from "./pages/Login/NewPW";
// import HomePage from "./pages/HomePage";
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
  },
  /*{
    path: "/",
    element: <SignIn />,
    errorElement: <div>404 Not Found</div>, //put this into a page later
  },*/
  {
    path: "/Addproduct",
    element: <AddProduct currentStep={3} />,
  },
  /*{
    path: "/selectLogin",
    element: <SelectLogin />,
  },*/
  {
    path: "/signUpBuyer",
    element: <SignUpBuyer />,
  },
  {
    path: "/becomeASeller",
    element: <BecomeASeller />,
  },
  {
    path: "/SellerProfile/:sellerId",
    element: <SellerProfile />,
  },
  {
    path: "/buyerProfile/:buyerId?",
    element: <BuyerProfile />,
  },
  {
    path: "/signupSeller",
    element: <SignupSeller/>,
  },
  
  {
    path: "/stepProgressBar",
    element: <StepProgressBar currentStep={1}/>,
  },
  
  {
    path: "/Verifybank/:sellerId?",
    element: <Verifybank currentStep={2}  />,
  },
  
  
  /*{
    path: "/Header/:category,serchQuery",
    element: <Header/>,
  },*/
  /*{
    path: "/email",
    element: <Email/>,
  },*/
  {
    path: "/Verify",
    element: <Verify/>,
  },
  {
    path: "/NewPw",
    element: <NewPW/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);