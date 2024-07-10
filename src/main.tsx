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
import ItemDetails from "./pages/ItemDetails";
import ReviewRating from "./pages/ReviewRating";
import HomePage from "./pages/Home";
import Category from "./pages/Category";
import AddProduct from "./pages/AddProduct";
import ManageProduct from "./pages/ManageProducts";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
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
    path: "/Home",
    element: <HomePage />,
  },
  {
    path: "/ItemDetails/:productId",
    element: <ItemDetails  />,
  },
  {
    path: "/ReviewRating/:productId",
    element: <ReviewRating />,
  },
  
  {
    path: "/Category/:categoryId",
    element: <Category />,
  },
  {
    path: "/ProductMap",
    element: <ProductMap />,
  },
  {
    path: "/AddYourProducts",
    element: <AddProduct />,
  },
  {
    path: "/ManageYourProducts",
    element: <ManageProduct />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
