import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header-sub";
import Footer from "../../components/Footer-sub";
import signupImage from "../../assets/signupimage.png";
import SignUpIcon from "../../assets/signup_icon.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailValid(true); // Reset validation when the email changes
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordValid(true); // Reset validation when the password changes
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setIsEmailValid(false);
      return;
    }
    if (!password) {
      setIsPasswordValid(false);
      return;
    }
    // Continue with form submission logic
  };

  return (
    <div style={{ margin: "0 20%" }}>
      <Header />
      <div className="container-fluid">
        <div className="row">
          {/* Login Column */}
          <div className="col-12 col-md-6 mb-3">
            <div className="d-flex align-items-center my-4">
              <p
                className="text-center fw-bold mx-3 mb-0"
                style={{ fontSize: "20px" }}
              >
                SIGN IN
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="formControlLg" className="form-label">
                  Email address / Username / Contact No
                </label>
                <input
                  id="formControlLg"
                  type="text"
                  className={`form-control form-control-lg ${
                    isEmailValid ? "" : "is-invalid"
                  }`}
                  style={{ fontSize: "14px" }}
                  value={email}
                  onChange={handleEmailChange}
                />
                {!isEmailValid && (
                  <div className="invalid-feedback">
                    Please enter a valid email address/ username / contact no
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="formControlLg" className="form-label">
                  Password
                </label>
                <input
                  id="formControlLg"
                  type="password"
                  className={`form-control form-control-lg ${
                    isPasswordValid ? "" : "is-invalid"
                  }`}
                  style={{ fontSize: "14px" }}
                  value={password}
                  onChange={handlePasswordChange}
                />
                {!isPasswordValid && (
                  <div className="invalid-feedback">
                    Please enter a password.
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-between mx-4 mb-4">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Remember me
                  </label>
                </div>
                <a href="!#" className="text-success">
                  Forgot your password?
                </a>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="mb-4 py-3 w-100"
                style={{
                  marginTop: "30px",
                  borderRadius: "15px",
                  backgroundColor: "#00BA29",
                  fontSize: "1.2rem",
                  marginBottom: "10px",
                  border: "none",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                Login
              </Button>
            </form>
          </div>

          {/* Sign Up Column */}
          <div
            className="col-12 col-md-6 mb-3 d-flex flex-column justify-content-center"
            style={{
              textAlign: "center",
              backgroundImage: `url(${signupImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "100%",
            }}
          >
            <div className="align-items-center my-4">
              <div className="text-center mb-4">
                <img
                  src={SignUpIcon}
                  alt="SignUp Icon"
                  style={{
                    marginTop: "10%",
                    marginBottom: "5%",
                  }}
                />
              </div>
              <div>
                <p
                  className="text-center fw-bold mx-3 mb-0"
                  style={{
                    fontSize: "20px",
                    marginTop: "7%",
                    marginBottom: "15%",
                  }}
                >
                  SIGN UP
                </p>
              </div>
              <div>
                <p
                  className="text-center fw-bold mx-3 mb-0"
                  style={{
                    fontSize: "20px",
                    marginTop: "%",
                    marginBottom: "35%",
                  }}
                >
                  Don't have an Account yet?
                </p>
              </div>

              <Link to="/select">
                <Button
                  variant="primary"
                  className="mb-4 py-3"
                  style={{
                    marginTop: "30px",
                    borderRadius: "15px",
                    backgroundColor: "#00BA29",
                    fontSize: "1.2rem",
                    border: "none",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-0">
        <Footer />
      </div>
    </div>
  );
}

export default SignIn;
