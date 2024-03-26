import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/Logo1.png";
import Bell from "../assets/Bell.svg";
import Cart from "../assets/Cart.svg";
import login from "../assets/Login.svg";
import Search from "../assets/Search.svg";
import language from "../assets/Languages.svg";
import { Dropdown } from "react-bootstrap";

const MainHeader = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`text-center text-lg-start text-muted ${
        isSticky ? "sticky-top" : ""
      }`}
      style={{ fontSize: "0.7rem", margin: "0", overflowX: "hidden" , fontFamily: "'Poppins', sans-serif"}} // Updated style
    >
      <div className="bg-light" style={{ margin: "0", overflowX: "hidden" }}>
        {" "}
        <div className="row">
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto d-flex justify-content-center align-items-center">
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <img
                  src={language}
                  alt="Language"
                  style={{ width: "18px", height: "18px" }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">English</Dropdown.Item>
                <Dropdown.Item href="#/action-2">සිංහල</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-md-7 col-lg-7 col-xl-7"></div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-2">
            <a
              href="#"
              className="text-decoration-none"
              style={{ color: "black", fontSize: "12px" }}
            >
              Help
            </a>
            <span style={{ margin: "0 10px" }}></span>
            <a
              href="#"
              className="text-decoration-none"
              style={{ color: "#00BA29", fontSize: "12px" }}
            >
              <img
                src={login}
                style={{ width: "14px", height: "12px" }}
                alt="Login"
              />
              <span style={{ margin: "0 2px" }}></span>
              Login/Register
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white" style={{ margin: "0", overflowX: "hidden" }}>
        {" "}
        <div className="row">
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto ml-2  d-flex justify-content-center align-items-center">
            <a href="#">
              <img
                src={Logo}
                style={{ height: "55px", width: "45px" }}
                alt="Logo"
              />
            </a>
          </div>

          <div className="col-md-7 col-lg-7 col-xl-7 mx-auto mt-0 d-flex justify-content-center align-items-center">
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                style={{
                  backgroundColor: "#00BA29",
                  borderColor: "#00BA29",
                  color: "#FFFFFF",
                  padding: "4px 8px",
                  borderRadius: "0",
                  fontSize: "14px",
                }}
              >
                All categories
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item style={{ padding: "4px 8px" }}>1</Dropdown.Item>
                <Dropdown.Item style={{ padding: "4px 8px" }}>2</Dropdown.Item>
                <Dropdown.Item style={{ padding: "4px 8px" }}>3</Dropdown.Item>
                <Dropdown.Item style={{ padding: "4px 8px" }}>4</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <input
              className="form-control mr-sm-2"
              type="search"
              aria-label="Search"
              style={{ borderRadius: "0", width: "200px", fontSize: "0.7rem" }}
            />

            <button
              className="btn btn-success my-2 my-sm-0"
              type="submit"
              style={{
                backgroundColor: "#00BA29",
                borderColor: "#00BA29",
                borderRadius: "0",
                padding: "3px 8px",
              }}
            >
              <img src={Search} alt="Search" />
            </button>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-1 d-flex justify-content-center align-items-center">
            <a href="#" className="nav-link" style={{ padding: "0 5px" }}>
              <img src={Bell} alt="Bell" />
            </a>
            <a href="#" className="nav-link" style={{ padding: "0 5px" }}>
              <img src={Cart} alt="Cart" />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-light" style={{ margin: "0", overflowX: "hidden" }}>
        {" "}
        <div className="row">
          <div className="col-md-9 col-lg-9 col-xl-9 mx-auto">
            <nav
              className="navbar navbar-expand-lg navbar-light bg-light text-black"
              style={{
                marginLeft: "75px",
                marginTop: "0",
                marginBottom: "0",
                padding: "0",
              }}
            >
              <div>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={toggleNavbar}
                  style={{ backgroundColor: "#00BA29" }}
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className={`collapse navbar-collapse ${
                    isExpanded ? "show" : ""
                  } justify-content-center`}
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item text-black">
                      <a
                        className="nav-link text-black"
                        href="#"
                        style={{ fontSize: "12px", paddingRight: "10px" }}
                      >
                        HOME
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link text-black"
                        href="#"
                        style={{ fontSize: "12px", paddingRight: "10px" }}
                      >
                        PRODUCT MAP
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link text-black"
                        href="#"
                        style={{ fontSize: "12px", paddingRight: "10px" }}
                      >
                        PRODUCT CALENDAR
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link text-black"
                        href="#"
                        style={{ fontSize: "12px" }}
                      >
                        CONTACT US
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>

          <div
            className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-2 text-black"
            style={{ fontSize: "12px" }}
          >
            CALL US NOW +94 76 123 4567
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
