import React from "react";
import SignIn from "./pages/Login/SignIn";
import SignUpBuyer from "./pages/Login/SignUpBuyer";

const App: React.FC = () => {
  return (
    <div>
      <SignUpBuyer />
      <SignIn />
    </div>
  );
};

export default App;
