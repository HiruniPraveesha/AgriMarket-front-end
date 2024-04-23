import React from "react";
import HomePage from "./pages/Home";
import SignIn from "./pages/Login/SignIn";
import Email from "./pages/Login/ForgotPw/Email";
import Verify from "./pages/Login/ForgotPw/Verify";
import NewPW from "./pages/Login/ForgotPw/NewPW";
import ItemDetails from "./pages/Details";


const App: React.FC = () => {
  return (
    <div>
      <HomePage/>
    </div>
  );
};

export default App;
