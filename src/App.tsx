import React from "react";
import HomePage from "./pages/Home";
import SignIn from "./pages/Login/SignIn";
import Email from "./pages/Login/ForgotPw/Email";
import Verify from "./pages/Login/ForgotPw/Verify";
import NewPW from "./pages/Login/ForgotPw/NewPW";
import Item from "./pages/ItemDetails";
import Items from "./pages/ItemDetails";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <div>
      <Items item={{
        imageUrl: "",
        name: "",
        description: "",
        price: 0
      }} />
    </div>
  );
};

export default App;
