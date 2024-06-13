import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import SignIn from "./pages/Login/SignIn";
import SelectLogin from "./pages/Login/selectLogin";
import SignUpBuyer from "./pages/Login/SignUpBuyer";
import BecomeASeller from "./pages/Login/BecomeASeller";
import ProductMap from "./pages/ProductMap";
import HomePage from "./pages/HomePage";
// import AddLogin from "./pages/Login/AddLogin";
import AddProductWrapper from "./pages/Login/AddProductWrapper";
// import VerifyBank from "./pages/Login/VerifyBank";
// import ProductCalendar from "./pages/ProductCalendar";
// import SignupSeller1 from "./pages/Login/SignupSeller1";
// import SignupSeller2 from "./pages/Login/SignupSeller2";
import SellerDashboard from "./pages/sellerDashboard";
import TC from "./pages/T&C";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AddProduct from "./pages/AddProduct2";
import TestComponent from "./components/TestComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>, //put this into a page later
  },
  {
    path: "/test",
    element: <TestComponent />,
  },
  


  {
    path: "/HomePage",
    element: <HomePage />,
    errorElement: <div>404 Not Found</div>, //put this into a page later
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path:"AddNewProduct",
    element: <AddProduct/>,
  },
  // {
  //   path: "/signupSeller1",
  //   element: <SignupSeller1 />,
  // },
  // {
  //   path: "/signupSeller2",
  //   element: <SignupSeller2 />,
  // },
  {
    path: "/select",
    element: <SelectLogin />,
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
  // {
  //   path: "/ProductCalendar",
  //   element: <ProductCalendar />,
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
    element: <SellerDashboard/>
  },
  // {
  //   path: "/AddLogin",
  //   element: <AddLogin />,
  // },
  {
    path: "/AddProduct",
    element: < AddProductWrapper/>,
  }
  // {
  //   path: "/VerifyBank",
  //   element: <VerifyBank />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
