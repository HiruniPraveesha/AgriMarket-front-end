import React from "react";
import Logo from "../assets/Logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Header: React.FC = () => {
  const gradientStyle = {
    fontFamily: "Sansita",
    paddingLeft: "40%",
    fontSize: "4rem",
    background:
      "linear-gradient(180deg, #032004 8.13%, #18C01F 62.1%, #00FF0B 73.6%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <nav className="navbar navbar-light bg-white">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src={Logo}
            alt="logo"
            width="180rem"
            className="d-inline-block align-text-top"
          />
          <span style={gradientStyle}>Agri Market</span>
        </a>
      </div>
    </nav>
  );
};

export default Header;
