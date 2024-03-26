import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function Footer2() {
  return (
    <footer
      className="bg-light text-center text-lg-start text-muted mt-2"
      style={{ fontSize: "0.8rem" }}
    >
      <div className="container mt-3">
        <div className="row mt-3">
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-1">
            <h6
              className="fw-bold mb-2"
              style={{ color: "#00BA28", marginTop: "10px" }}
            >
              <span
                style={{
                  borderBottom: "3px solid #00BA28",
                  fontSize: "0.9rem",
                }}
              >
                Quick Links
              </span>
            </h6>
            <p>
              <Link to="/" className="text-reset text-decoration-none">
                Home
              </Link>
            </p>
            <p>
              <Link
                to="/ProductMap"
                className="text-reset text-decoration-none"
              >
                Product Map
              </Link>
            </p>
            <p>
              <Link
                to="/ProductCalendar"
                className="text-reset text-decoration-none"
              >
                Product Calendar
              </Link>
            </p>
            <p>
              <a href="#!" className="text-reset text-decoration-none">
                Offers
              </a>
            </p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-1">
            <h6
              className="fw-bold mb-2"
              style={{ color: "#00BA28", marginTop: "10px" }}
            >
              <span
                style={{
                  borderBottom: "3px solid #00BA28",
                  fontSize: "0.9rem",
                }}
              >
                Information
              </span>
            </h6>
            <p>
              <a href="#!" className="text-reset text-decoration-none">
                About Us
              </a>
            </p>
            <p>
              <Link
                to="/PrivacyPolicy"
                className="text-reset text-decoration-none"
              >
                Privacy Policy
              </Link>
            </p>
            <p>
              <a href="/TC" className="text-reset text-decoration-none">
                Terms and Conditions
              </a>
            </p>
            <p>
              <a href="#!" className="text-reset text-decoration-none">
                Contact Us
              </a>
            </p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-1">
            <h6
              className="fw-bold mb-2"
              style={{ color: "#00BA28", marginTop: "10px" }}
            >
              <span
                style={{
                  borderBottom: "3px solid #00BA28",
                  fontSize: "0.9rem",
                }}
              >
                Categories
              </span>
            </h6>
            <p>
              <a href="#!" className="text-reset text-decoration-none">
                Fruits
              </a>
            </p>
            <p>
              <a href="#!" className="text-reset text-decoration-none">
                Vegetables
              </a>
            </p>
            <p>
              <a href="#!" className="text-reset text-decoration-none">
                Grains
              </a>
            </p>
            <p>
              <a href="#!" className="text-reset text-decoration-none">
                Others
              </a>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-1">
            <h6
              className="fw-bold mb-2"
              style={{ color: "#00BA28", marginTop: "10px" }}
            >
              <span
                style={{
                  borderBottom: "3px solid #00BA28",
                  fontSize: "0.9rem",
                }}
              >
                About Us
              </span>
            </h6>

            <p>
              AgriMarket is an online platform for farmers to sell their
              products directly to customers,streamlining the agricultural
              supply chain and eliminating middlemen.
            </p>
            <a
              href=""
              className="me-3 text-reset text-decoration-none"
              style={{ fontSize: "1.5em" }}
            >
              <FaFacebook />
            </a>
            <a
              href=""
              className="me-3 text-reset text-decoration-none"
              style={{ fontSize: "1.5em" }}
            >
              <FaInstagram />
            </a>
            <a
              href=""
              className="me-3 text-reset text-decoration-none"
              style={{ fontSize: "1.5em" }}
            >
              <FaTwitter />
            </a>
            <a
              href=""
              className="me-3 text-reset text-decoration-none"
              style={{ fontSize: "1.5em" }}
            >
              <FaLinkedin />
            </a>
            <a
              href=""
              className="text-reset text-decoration-none"
              style={{ fontSize: "1.5em" }}
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center p-2" style={{ backgroundColor: "#00BA28" }}>
        <p className="mb-1 text-white">
          &#169; 2024 AgriMarket. All rights Reserved.
        </p>
      </div>
    </footer>
  );
}
