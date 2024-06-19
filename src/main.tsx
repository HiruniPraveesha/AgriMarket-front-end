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
import SignupSeller from "./pages/Login/SignupSeller";

import StepProgressBar from "./pages/Login/StepProgressBar";
import Verifybank from "./pages/Login/Verifybank";
//import AddProduct from "./pages/Login/AddProduct";
import Email2 from "./pages/Login/Email";
import Verify from "./pages/Login/Verify";
import NewPW from "./pages/Login/NewPW";
// import HomePage from "./pages/HomePage";

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
    path: "/selectLogin",
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
    path: "/signupSeller",
    element: <SignupSeller/>,
  },
  
  {
    path: "/stepProgressBar",
    element: <StepProgressBar currentStep={0}/>,
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
    element: <Email2/>,
  },
  {
    path: "/verify",
    element: <Verify/>,
  },
  {
    path: "/newpw",
    element: <NewPW/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
