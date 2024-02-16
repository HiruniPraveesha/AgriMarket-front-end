import React from "react";
import SignIn from "./pages/Login/SignIn";
import SignUpBuyer from "./pages/Login/SignUpBuyer";
import SelectLogin from "./pages/Login/selectLogin";
import MainHeader from "./components/Header-main";
import MainFooter from "./components/Footer-main";
import ProductMap from "./pages/ProductMap";

const App: React.FC = () => {
  return (
    <div>
      <div>
        <MainHeader />
      </div>
      <div>
        <ProductMap />
        <MainFooter />
      </div>
    </div>
  );
};

export default App;
