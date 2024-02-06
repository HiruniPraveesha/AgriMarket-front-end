// Import necessary dependencies and components
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header-sub";
import Footer from "../../components/Footer-sub";
import signupImage from "../../assets/signupimage.png";
import SignUpIcon from "../../assets/signup_icon.svg";
import Button from "react-bootstrap/Button";

function SignIn() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="container-fluid p-3">
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

            <form>
              <div className="mb-3">
                <label htmlFor="formControlLg" className="form-label">
                  Email address / Username / Contact No
                </label>
                <input
                  id="formControlLg"
                  type="text"
                  className="form-control form-control-lg"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formControlLg" className="form-label">
                  Password
                </label>
                <input
                  id="formControlLg"
                  type="password"
                  className="form-control form-control-lg"
                />
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
                    marginTop: "5%",
                    marginBottom: "10%",
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
                    marginTop: "5%",
                    marginBottom: "30%",
                  }}
                >
                  Don't have an Account yet?
                </p>
              </div>

              <Button
                variant="primary"
                type="submit"
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
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default SignIn;
