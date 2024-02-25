import React from "react";
import Logo from "../assets/Logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Header: React.FC = () => {
  const gradientStyle = {
    fontFamily: "Sansita",
    fontSize: "4rem",
    marginLeft: "20%",
    background:
      "linear-gradient(180deg, #032004 8.13%, #18C01F 62.1%, #00FF0B 73.6%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <div className="p-3 d-flex flex-column flex-md-row align-items-center">
      <img src={Logo} alt="logo" width="180rem" className="me-3 mb-3 mb-md-0" />
      <div className="text-center text-md-start" style={gradientStyle}>
        Agri Market
      </div>
    </div>
  );
};

export default Header;
