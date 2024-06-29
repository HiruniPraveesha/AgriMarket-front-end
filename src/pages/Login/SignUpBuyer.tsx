import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Header from "../../components/Header-sub";
import Footer from "../../components/Footer-sub";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUpBuyer: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const handleSendVerificationCode = () => {
    axios
      .post("http://localhost:8000/send-otp", { email, contactNo })
      .then((res) => {
        if (res.status === 200) {
          setIsCodeSent(true);
          alert("Verification code sent successfully.");
        } else {
          alert("Error sending verification code.");
        }
      })
      .catch((err) => {
        console.error("Error response from backend:", err.response);
        if (err.response && err.response.data && err.response.data.error) {
          alert(err.response.data.error); // Display the specific error message
        } else {
          alert("An error occurred while sending the verification code.");
        }
      });
  };

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };
  const validateEmail = (email: string): boolean => {
    // Basic email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  };

  const handleContactNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContactNo(value);

    if (!validatePhoneNumber(value)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
    } else {
      setPhoneError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordErrors(validatePassword(newPassword));
    if (reEnteredPassword && newPassword !== reEnteredPassword) {
      setPasswordMatchError("Passwords do not match.");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleReEnteredPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newReEnteredPassword = e.target.value;
    setReEnteredPassword(newReEnteredPassword);
    if (newReEnteredPassword !== password) {
      setPasswordMatchError("Passwords do not match.");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsChecked(e.target.checked);
  };

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 7)
      errors.push("Password must be at least 7 characters long.");
    if (!/[a-z]/.test(password))
      errors.push("Password must include at least one lowercase letter.");
    if (!/[A-Z]/.test(password))
      errors.push("Password must include at least one uppercase letter.");
    if (!/\d/.test(password))
      errors.push("Password must include at least one number.");
    if (!/[@!#]/.test(password))
      errors.push(
        "Password must include at least one special character (@, !, #)."
      );
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      passwordErrors.length > 0 ||
      passwordMatchError ||
      phoneError ||
      emailError
    ) {
      alert("Please fix the errors in the form before submitting.");
      return;
    }

    if (!termsChecked) {
      alert("Please accept the terms and conditions before signing up.");
      return;
    }

    axios
      .post("http://localhost:8000/signup", {
        name,
        email,
        address,
        contactNo,
        password,
        otp: verificationCode,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Sign up successful!");
          navigate("/signIn");
        } else {
          alert("Error signing up.");
        }
      })
      .catch((err) => {
        console.error("Error response from backend:", err.response);
        if (err.response && err.response.data && err.response.data.error) {
          alert(err.response.data.error); // Display the specific error message
        } else {
          alert("An error occurred during sign up.");
        }
      });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ margin: "0 20%" }}>
      <Header />
      <div style={{ fontSize: "18px", textAlign: "center" }}>
        <p style={{ fontWeight: "Bold" }}>SIGN UP</p>
      </div>
      <p style={{ textAlign: "right" }}>
        Already member?<Link to="/SignIn">Login</Link> here
      </p>
      <Form
        style={{
          backgroundColor: "#D9D9D9",
          padding: "20px",
          paddingBottom: 0,
          fontSize: "14px",
        }}
        onSubmit={handleSubmit}
      >
        <Row>
          {/* Left Part */}
          <Col md={6}>
            <Form.Group as={Row} className="mb-4" controlId="formPlaintextName">
              <Form.Label column sm="4">
                Full Name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  className="mb-3"
                  value={name}
                  onChange={handleNameChange}
                  style={{ fontSize: "14px" }}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="4">
                Email<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="email"
                  className="mb-3"
                  value={email}
                  onChange={handleEmailChange}
                  style={{ fontSize: "14px" }}
                  required
                />
                {emailError && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {emailError}
                  </div>
                )}
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formPlaintextAddress"
            >
              <Form.Label column sm="4">
                Address<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  className="mb-3"
                  value={address}
                  onChange={handleAddressChange}
                  style={{ fontSize: "14px" }}
                  required
                />
                <Form.Control
                  type="text"
                  className="mb-3"
                  style={{ fontSize: "14px" }}
                />
                <Form.Control type="text" style={{ fontSize: "14px" }} />
              </Col>
            </Form.Group>
          </Col>

          {/* Right Part */}
          <Col md={6}>
            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formPlaintextMobile"
            >
              <Form.Label column sm="4">
                Mobile<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  className="mb-3"
                  value={contactNo}
                  onChange={handleContactNoChange}
                  style={{ fontSize: "14px" }}
                  required
                />
                {phoneError && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {phoneError}
                  </div>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formPlaintextCode">
              <Form.Label column sm="4">
                Verification Code<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="8">
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type="text"
                    className="mb-3"
                    value={verificationCode}
                    onChange={handleVerificationCodeChange}
                    style={{ fontSize: "14px" }}
                  />
                  <Button
                    variant="primary"
                    style={{
                      backgroundColor: "transparent",
                      color: "black",
                      fontSize: "12px",
                      padding: "5px 0",
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: isCodeSent ? "not-allowed" : "pointer",
                      border: "none",
                    }}
                    onClick={
                      isCodeSent ? undefined : handleSendVerificationCode
                    }
                    disabled={isCodeSent}
                  >
                    {isCodeSent ? "Sent" : "Send"}
                  </Button>
                </div>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="4">
                Password<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="8">
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    className="mb-3"
                    style={{ paddingRight: "40px", fontSize: "14px" }}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </div>
                </div>
                {password.length > 0 && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {passwordErrors.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formPlaintextReEnterPassword"
            >
              <Form.Label column sm="4">
                Re-enter Password<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="8">
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    className="mb-3"
                    style={{ paddingRight: "40px", fontSize: "14px" }}
                    value={reEnteredPassword}
                    onChange={handleReEnteredPasswordChange}
                    required
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </div>
                </div>
                {reEnteredPassword.length > 0 && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {passwordMatchError && <div>{passwordMatchError}</div>}
                  </div>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4">
              <Col sm={{ offset: 4, span: 8 }} className="text-left">
                <Form.Check
                  type="checkbox"
                  className="mb-3"
                  label={
                    <span>
                      I agree with AgriMarket{" "}
                      <a
                        href="your_link_here"
                        style={{ color: "green", textDecoration: "none" }}
                      >
                        Terms and Conditions
                      </a>
                    </span>
                  }
                  checked={termsChecked}
                  onChange={handleTermsChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4">
              <Col sm={{ offset: 6, span: 11 }} className="text-left">
                <Button
                  variant="primary"
                  type="submit"
                  className="mb-3"
                  style={{
                    backgroundColor: "#00BA29",
                    fontSize: "16px",
                    border: "none",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Register
                </Button>
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <div style={{ marginTop: "10px" }}>
        <Footer />
      </div>
    </div>
  );
};

export default SignUpBuyer;
