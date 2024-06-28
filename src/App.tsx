import React from "react";
import Header from "./components/Header-main";
//import Verify from "./pages/Login/Verify";
//import Email2 from "./pages/Login/Email";
//import NewPW from "./pages/Login/NewPW";
// import HomePage from "./pages/HomePage";
//import SignIn from "./pages/Login/SignIn";
//import StepProgressBar from "./pages/Login/StepProgressBar";
//import Verifybank from "./pages/Login/Verifybank";
import SignUpBuyer from "./pages/Login/SignUpBuyer";
//import Email2 from "./pages/Login/Email";
//import SignIn from "./pages/Login/SignIn";
import SignupSeller from "./pages/Login/SignupSeller";
import StepProgressBar from "./pages/Login/StepProgressBar";
import BecomeASeller from "./pages/BecomeASeller";
//import SignIn from "./pages/Login/SignIn";
import Verifybank from "./pages/Login/Verifybank";
import SellerProfile from "./pages/SellerProfile";
import AddProduct from "./pages/Login/AddProduct";


const App: React.FC = () => {
  return (
    <div>
      <Verifybank currentStep={2}/>
    </div>
  );
};

export default App;
