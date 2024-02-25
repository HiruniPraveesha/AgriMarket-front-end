import React from "react";
import MainHeader from "../components/Header-main";
import MainFooter from "../components/Footer-main";
import NoFee from "../assets/NoFee.svg";
import Delivery from "../assets/Delivery.svg";
import Payment from "../assets/Payment.svg";
import Farmer from "../assets/Farmer.png";
import Ellipse1 from "../assets/Ellipse1.svg";
import Ellipse2 from "../assets/Ellipse2 .svg";
import Ellipse3 from "../assets/Ellipse3 .svg";
import Ellipse4 from "../assets/Ellipse4 .svg";
import Ellipse5 from "../assets/Ellipse5 .svg";
import Farmer1 from "../assets/Farmer1.png";
import One from "../assets/One.svg";
import Two from "../assets/Two.svg";
import Three from "../assets/Three.svg";
import Farmer2 from "../assets/Farmer2.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const BecomeASeller: React.FC = () => {
  return (
    <div>
      <div>
        <MainHeader />
      </div>
      <div
        className="main container"
        style={{
          cursor: "default",
          userSelect: "none",
          overflowX: "hidden", // hide x-scroll
        }}
      >
        <div className="container">
          <div
            className="row align-items-center"
            style={{
              backgroundColor: "#00ba29",
            }}
          >
            <div className="col-md-6">
              <div className="text-topic1 text-white p-3">
                <h3
                  className="topic1-header"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Fuel your Success
                </h3>
                <p
                  className="topic-para1 mb-3"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Embark on Your Seller Journey Today! Sign Up and Sell Online!
                </p>
                <div className="signbtn">
                  <Link
                    to="#"
                    className="btn btn-success btn-lg"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      padding: "10px 50px",
                      fontSize: "15px",
                      backgroundColor: "white",
                      color: "#00ba29",
                      border: "none",
                      borderRadius: "22px",
                    }}
                  >
                    SignUp
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="farmer-ellipse d-flex align-items-center justify-content-md-end justify-content-center">
                <div
                  className="ellipse d-grid gap-2"
                  style={{ marginRight: "20px" }}
                >
                  <img
                    className="ellipse1"
                    src={Ellipse1}
                    alt="Ellipse1"
                    style={{ width: "30px", height: "auto" }}
                  />
                  <img
                    className="ellipse2"
                    src={Ellipse2}
                    alt="Ellipse2"
                    style={{
                      width: "30px",
                      height: "auto",
                      marginLeft: "42px",
                    }}
                  />
                  <img
                    className="ellipse3"
                    src={Ellipse3}
                    alt="Ellipse3"
                    style={{ width: "30px", height: "auto" }}
                  />
                  <img
                    className="ellipse4"
                    src={Ellipse4}
                    alt="Ellipse4"
                    style={{
                      width: "30px",
                      height: "auto",
                      marginLeft: "42px",
                    }}
                  />
                  <img
                    className="ellipse5"
                    src={Ellipse5}
                    alt="Ellipse5"
                    style={{ width: "30px", height: "auto" }}
                  />
                </div>
                <img
                  className="farmer"
                  src={Farmer}
                  alt="Farmer"
                  style={{
                    marginRight: "-11px",
                    maxWidth: "300px",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="container mt-4 d-flex align-items-center justify-content-center"
          style={{
            height: "200px",
            backgroundColor: "#00ba29",
          }}
        >
          <div className="row">
            <div className="col">
              <p
                className="text-white text-center"
                style={{
                  fontSize: "min(6vw, 45px)", // Dynamic font size based on screen width, with a maximum size of 45px
                  padding: "10px",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Create your store in 5 Minutes! Start selling within 24 Hours!
              </p>
            </div>
          </div>
        </div>
        <div
          className="container mt-4 d-flex flex-column align-items-center justify-content-center"
          style={{
            backgroundColor: "#00BA29",
            padding: "20px",
            color: "white",
          }}
        >
          <h3
            className="topic3 text-white"
            style={{
              fontSize: "28px",
              marginTop: "20px",
              marginBottom: "20px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Why join AgriMarket
          </h3>
          <div
            className="box-topic3 d-flex flex-wrap justify-content-around align-items-start"
            style={{
              border: "3px solid #fff",
              padding: "30px",
              marginBottom: "15px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <div
              className="icon-topic3 text-center mb-4"
              style={{
                margin: "10px",
                padding: "10px",
                transition: "transform 0.2s", // Add transition for smooth effect
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.1)"; // Zoom in on hover
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)"; // Return to normal size on mouse out
              }}
            >
              <img
                className="nofee"
                src={NoFee}
                alt="NoFee"
                style={{ width: "100px", height: "auto", marginBottom: "10px" }}
              />
              <h4
                className="no-registration"
                style={{ fontSize: "18px", margin: 0 }}
              >
                No Registration Fee
              </h4>
            </div>
            <div
              className="icon-topic3 text-center mb-4"
              style={{
                margin: "10px",
                padding: "10px",
                transition: "transform 0.2s", // Add transition for smooth effect
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.1)"; // Zoom in on hover
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)"; // Return to normal size on mouse out
              }}
            >
              <img
                className="delivery"
                src={Delivery}
                alt="Delivery"
                style={{ width: "100px", height: "auto", marginBottom: "10px" }}
              />
              <h4
                className="convenient-delivery"
                style={{ fontSize: "18px", margin: 0 }}
              >
                Convenient Delivery Methods
              </h4>
            </div>
            <div
              className="icon-topic3 text-center mb-4"
              style={{
                margin: "10px",
                padding: "10px",
                transition: "transform 0.2s", // Add transition for smooth effect
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.1)"; // Zoom in on hover
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)"; // Return to normal size on mouse out
              }}
            >
              <img
                className="payment"
                src={Payment}
                alt="Payment"
                style={{ width: "100px", height: "auto", marginBottom: "10px" }}
              />
              <h4
                className="easy-payment"
                style={{ fontSize: "18px", margin: 0 }}
              >
                Easy Payment method
              </h4>
            </div>
          </div>
        </div>

        <div
          className="container text-white py-5"
          style={{
            marginTop: "25px",
            backgroundColor: "#00ba29",
          }}
        >
          <h3
            className="text-center mb-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              marginTop: "-5px",
              fontSize: "50px",
            }}
          >
            Sell in 3 Easy Steps
          </h3>
          <div className="row align-items-center">
            <div className="col-md-6">
              <img
                className="img-fluid"
                src={Farmer1}
                alt="farmer1"
                style={{ width: "60%", marginLeft: "100px" }}
              />
            </div>
            <div
              className="col-md-6"
              style={{ marginTop: "40px", fontFamily: "'Poppins', sans-serif" }}
            >
              <div className="row flex-column">
                <div className="col-md-12 mb-3">
                  <div className="d-flex align-items-center">
                    <img src={One} alt="One" className="img-fluid mr-3" />
                    <p
                      className="text-black mb-0"
                      style={{
                        backgroundColor: "white",
                        padding: "20px",
                        marginLeft: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      Create Seller Account
                    </p>
                  </div>
                </div>
                <div className="col-md-12 mb-3" style={{ marginLeft: "15px" }}>
                  <div className="d-flex align-items-center">
                    <img src={Two} alt="Two" className="img-fluid mr-3" />
                    <p
                      className="text-black mb-0"
                      style={{
                        backgroundColor: "white",
                        padding: "20px",
                        marginLeft: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      Upload your products
                    </p>
                  </div>
                </div>
                <div className="col-md-12 mb-3" style={{ marginLeft: "30px" }}>
                  <div className="d-flex align-items-center">
                    <img src={Three} alt="Three" className="img-fluid mr-3" />
                    <p
                      className="text-black mb-0"
                      style={{
                        backgroundColor: "white",
                        padding: "20px",
                        marginLeft: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      Start Selling and Earn
                    </p>
                  </div>
                </div>
              </div>
              <div className="container mt-4 text-center">
                <a
                  href="#"
                  className="btn btn-outline-dark btn-lg"
                  style={{
                    fontSize: "17px",
                    padding: "10px 40px",
                    border: "none",
                    borderRadius: "22px",
                    backgroundColor: "white",
                    color: "#00ba29", // Green text color
                    animation: "tada 2s infinite", // Apply the tada animation
                  }}
                >
                  Be a Seller Now!
                </a>
                <style>
                  {`
      @keyframes tada {
        0% { transform: scale(1); }
        10%, 20% { transform: scale(1.1) rotate(-1deg); }
        30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
        40%, 60%, 80% { transform: scale(1.1) rotate(-1deg); }
        100% { transform: scale(1) rotate(0); }
      }
    `}
                </style>
              </div>
            </div>
          </div>
        </div>

        <div
          className="container mt-5 text-white text-center"
          style={{
            backgroundColor: "#00BA29",
            height: "200px",
          }}
        >
          <div className="text-topic5">
            <header
              className="header-topic5"
              style={{
                fontSize: "30px",
                marginTop: "-20px",
                paddingTop: "15px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Seller Stories
            </header>
            <p
              className="para-topic5"
              style={{
                marginTop: "20px",
                fontSize: "20px",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              We are the largest Agrimarket in Sri Lanka. Sellers enjoy doing
              business with us, but don't just believe us when we say so. Hear
              to it for them.
            </p>
          </div>
        </div>
        <div
          className="container mt-4"
          style={{
            backgroundColor: "#00BA29",
          }}
        >
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 text-center">
              <header
                className="header-topic6 text-white"
                style={{
                  margin: "10px",
                  fontSize: "30px",
                  marginTop: "20px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                WNDK Stores
              </header>
              <p
                className="para-topic6 text-white c"
                style={{
                  paddingTop: "20px",
                  fontSize: "18px",
                  marginLeft: "60px",
                  textAlign: "left",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                "Working with AgriMarket has been a very positive experience, so
                far. When we have problems, the teams support us and offer
                advice as a service. AgriMarket is a great option if you want to
                improve your business online."
              </p>
              <p
                className="dilip text-white"
                style={{
                  fontSize: "20px",
                  marginLeft: "60px",
                  textAlign: "left",
                  paddingBottom: "10px",
                }}
              >
                ~Dilip Kumara
              </p>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <img
                className="farmer2"
                src={Farmer2}
                alt="Farmer2"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  maxHeight: "300px", // Adjust height as needed
                  marginRight: "-11px", // Adjust to remove the small space on the right
                }}
              />
            </div>
          </div>
        </div>

        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div className="signbtn">
                <a
                  href="#"
                  className="btn btn-success btn-lg"
                  style={{
                    margin: "25px",
                    padding: "13px 90px",
                    fontSize: "15px",
                    backgroundColor: "#00ba29",
                    color: "#fff",
                    border: "none",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)", // Box shadow added here
                  }}
                >
                  Join AgriMarket Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <MainFooter />
      </div>
    </div>
  );
};

export default BecomeASeller;
