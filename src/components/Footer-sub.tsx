import "bootstrap/dist/css/bootstrap.min.css";

function SignIn() {
  return (
    <div>
      <div
        className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5"
        style={{ backgroundColor: "#00BA29" }}
      >
        <div className="d-flex align-items-center">
          <a href="/about" className="text-white mx-1 text-decoration-none">
            About Us
          </a>
          <span className="text-white mx-1">|</span>
          <a href="/privacy" className="text-white mx-1 text-decoration-none">
            Privacy
          </a>
          <span className="text-white mx-1">|</span>
          <a
            href="/terms-and-conditions"
            className="text-white mx-1 text-decoration-none"
          >
            Terms and Conditions
          </a>
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

export default SignIn;
