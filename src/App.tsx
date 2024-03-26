import React from "react";
// import HomePage from "./pages/HomePage";
import SignIn from "./pages/Login/SignIn";
import Email from "./pages/Login/ForgotPw/Email";

import Verify from "./pages/Login/ForgotPw/Verify";
import NewPW from "./pages/Login/ForgotPw/NewPW";

import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <div>
      <Verify/>
    </div>
  );
};

export default App;
