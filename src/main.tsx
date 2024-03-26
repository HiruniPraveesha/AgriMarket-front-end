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
import AddLogin from "./pages/Login/AddLogin";
import AddProduct from "./pages/Login/AddProduct";
import VerifyBank from "./pages/Login/VerifyBank";
import ProductCalendar from "./pages/ProductCalendar";
import TC from "./pages/T&C";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>, //put this into a page later
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
  {
    path: "/ProductCalendar",
    element: <ProductCalendar />,
  },
  {
    path: "/TC",
    element: <TC />,
  },
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicy />,
  },
  // {
  //   path: "/AddLogin",
  //   element: <AddLogin />,
  // },
  // {
  //   path: "/AddProduct",
  //   element: <AddProduct />,
  // },
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
