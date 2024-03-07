import React from "react";
import SignIn from "./pages/Login/SignIn";
import SignUpBuyer from "./pages/Login/SignUpBuyer";
import SelectLogin from "./pages/Login/selectLogin";
import MainHeader from "./components/Header-main";
import MainFooter from "./components/Footer-main";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Checkout/Payment";
import Select from "./pages/Checkout/Select";
import PopupWindow from "./pages/Checkout/Complete";
import BuyerProfile from "./pages/Buyer/BuyerProfile";
import Complete from "./pages/Checkout/Complete";
import HeaderSub from "./components/Header-sub";
import UserForm  from "./pages/Login/AddLogin";
import { Header } from "react-bootstrap/lib/Modal";
import ThreeDotsBetweenLines from "./pages/Login/AddLogin";
import StepProgressBar from "./pages/Login/AddLogin";
import Verifybank from "./pages/Login/VerifyBank";
import AddLogin from "./pages/Login/AddLogin";
import AddProduct from "./pages/Login/AddProduct";


const App: React.FC = () => {
  return (
    <div>
      {/* <HeaderSub/> */}
      <AddLogin currentStep={1}/>
      {/* < Verifybank currentStep={2}/> */}
      {/* <AddProduct currentStep={3}/> */}
      {/* <MainHeader />  */}
      {/* <Checkout/>  */}
      {/* <Payment/> */}
      {/* <Complete/> */}
     {/* <BuyerProfile/> */}
      {/* <MainFooter />  */}
      {/* <PopupWindow/> */}
    </div>
  );
};

export default App;
