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
import Email from "./pages/Login/ForgotPw/Email";
import ItemDetails from "./pages/ItemDetails2";
import ReviewRating from "./pages/ReviewRating";
import HomePage from "./pages/Home2";
import Fruits from "./pages/Fruits";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
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
    path: "/Email",
    element: <Email />,
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
    path: "/ItemDetails",
    element: <ItemDetails productId={"1"} />,
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
