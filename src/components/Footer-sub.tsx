import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function FooterSub() {
  return (
    <div>
      <div
        className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-2 px-4 px-xl-5"
        style={{ backgroundColor: "#00BA29" }}
      >
        <div className="d-flex flex-column flex-md-row align-items-center">
          <a href="/about" className="text-white mx-1 text-decoration-none">
            About Us
          </a>
          <span className="text-white mx-1">|</span>
          <Link
            to="/PrivacyPolicy"
            className="text-white mx-1 text-decoration-none"
          >
            Privacy
          </Link>
          <span className="text-white mx-1">|</span>
          <Link to="/TC" className="text-white mx-1 text-decoration-none">
            Terms and Conditions
          </Link>
          <span className="text-white mx-1">|</span>
          <a
            href="/contact-us"
            className="text-white mx-1 text-decoration-none"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default FooterSub;
