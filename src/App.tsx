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

const App: React.FC = () => {
  return (
    <div>
      <MainHeader /> 
      {/* <Checkout/>  */}
      <Payment/>
      {/* <Complete/> */}
     {/* <BuyerProfile/> */}
      <MainFooter /> 
      {/* <PopupWindow/> */}
    </div>
  );
};

export default App;
