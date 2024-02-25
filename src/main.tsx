import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import SignIn from "./pages/Login/SignIn";
import SelectLogin from "./pages/Login/selectLogin";
import SignUpBuyer from "./pages/Login/SignUpBuyer";
import BecomeASeller from "./pages/BecomeASeller";
import ProductMap from "./pages/ProductMap";
// import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
