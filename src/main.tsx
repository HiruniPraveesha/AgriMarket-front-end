import React from "react";
import ReactDOM from "react-dom/client";
import  AuthProvider  from "react-auth-kit";
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
import AddProduct from "./pages/Login/AddProduct";
import TestComponent from "./components/TestComponent";
import MyProducts from "./pages/MyProducts";
import ShoppingCart from "./pages/ShoppingCart";
import Login from "./pages/AdminLogin";
import createStore from 'react-auth-kit/createStore';


const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/test",
    element: <TestComponent />,
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={store}
    >
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
