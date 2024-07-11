import React from "react";
import MainHeader from "../../components/Header-main";
import MainFooter from "../../components/Footer-main";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <MainHeader />
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <p
              style={{
                fontSize: "1.5rem",
                color: "#222",
                marginBottom: "1rem",
              }}
            >
              Contact Us
            </p>
          </div>
          <div className="col-12">
            <p>CALL US NOW: +94 76 123 4567</p>
            <p>Email: hirunipraveesha18@gmail.com</p>
            <p>Fax: 0414493134</p>
            <p>Customer Service Hours: Monday to Friday, 8 AM to 5 PM</p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <p style={{ fontSize: "18px", color: "GrayText" }}>Follow Us On</p>
          </div>
          <div
            className="col-12 d-flex justify-content-start"
            style={{ marginBottom: "100px" }}
          >
            <a
              href="#"
              className="me-3 text-reset text-decoration-none"
              style={{ fontSize: "1.5em" }}
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="me-3 text-reset text-decoration-none"
              style={{ fontSize: "1.5em" }}
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="me-3 text-reset text-decoration-none"
              style={{ fontSize: "1.5em" }}
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="me-3 text-reset text-decoration-none"
              style={{ fontSize: "1.5em" }}
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              className="text-reset text-decoration-none"
              style={{ fontSize: "1.5em" }}
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default Contact;
