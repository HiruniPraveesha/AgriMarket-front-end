import React from "react";
import SignIn from "./pages/Login/SignIn";
import SignUpBuyer from "./pages/Login/SignUpBuyer";
import SelectLogin from "./pages/Login/selectLogin";
import MainHeader from "./components/Header-main";
import MainFooter from "./components/Footer-main";
import BecomeASeller from "./pages/BecomeASeller";

const App: React.FC = () => {
  return (
    <div>
      <MainHeader />
      <BecomeASeller />
      <MainFooter />
    </div>
  );
};

export default App;
