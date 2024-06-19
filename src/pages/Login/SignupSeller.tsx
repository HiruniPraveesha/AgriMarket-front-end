import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import BecomeASeller from "../BecomeASeller";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupSeller2: React.FC = () => {
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$]).{8,}$/;
    if (!passwordPattern.test(event.target.value)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one letter, one number, and one of the special characters '@', '#', '$'."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    if (event.target.value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8001/become-seller", {
        email,
        action: "sendOtp",
      });

      if (response.status === 201) {
        console.log(response.data.message);
        setOtpSent(true);
      } else {
        console.error("Error sending OTP. Status:", response.status);
        if (response.data && response.data.error) {
          console.error("Error message:", response.data.error);
        }
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8001/become-seller", {
        email,
        otp,
        action: "verifyOtp",
      });

      if (response.status === 200) {
        setOtpVerified(true);
        console.log(response.data.message);
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8001/become-seller", {
        email,
        otp,
        password,
        action: "completeRegistration",
      });

      if (response.status === 201) {
        console.log(response.data.message);
        navigate("/StepProgressBar");
        // Handle successful registration completion
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error("Error completing registration:", error);
    }
  };

  const isFormValid = () => {
    return (
      otpVerified &&
      passwordError === "" &&
      confirmPasswordError === "" &&
      emailError === "" &&
      password !== "" &&
      confirmPassword !== "" &&
      email.trim() !== ""
    );
  };

  return (
    <>
      <div className="modal-container">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Body>
            <div style={{ border: "1px solid", padding: "20px" }}>
              <Modal.Header style={{ borderBottom: "none" }}>
                <Modal.Title
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    margin: "-2px 62px",
                  }}
                >
                  Create An Account
                </Modal.Title>
                <button
                  className="close"
                  style={{
                    background: "none",
                    border: "none",
                    position: "absolute",
                    right: "50px",
                    top: "30px",
                    fontSize: "30px",
                  }}
                  onClick={handleClose}
                >
                  <span>&times;</span>
                </button>
              </Modal.Header>

              <p style={{ textAlign: "center", fontSize: "14px" }}>
                Welcome! Agrimarket users are waiting to buy your product.
              </p>
              <Form onSubmit={handleSubmit} style={{ fontSize: "14px" }}>
                <Form.Group controlId="email" style={{ marginTop: "10px" }}>
                  <Form.Label>Email</Form.Label>
                  <div style={{ position: "relative" }}>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                      style={{ fontSize: "10px", padding: "10px" }}
                    />
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={handleSendOtp}
                      style={{
                        position: "absolute",
                        bottom: "-30px",
                        right: "0",
                        border: "none",
                        background: "none",
                        color: "#00BA29",
                      }}
                      disabled={!email.trim() || emailError !== "" }
                    >
                      {otpSent ? "Resend OTP" : "Send OTP"}
                    </Button>
                  </div>
                  {emailError && (
                    <p
                      style={{
                        color: "red",
                        marginTop: "5px",
                        fontSize: "10px",
                      }}
                    >
                      {emailError}
                    </p>
                  )}
                </Form.Group>

                <Form.Group controlId="otp" style={{ marginTop: "30px" }}>
                  <Form.Label>Verification Code</Form.Label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Form.Control
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={handleOtpChange}
                      style={{ fontSize: "10px", padding: "10px" }}
                      disabled={!otpSent}
                    />
                    {otpSent && !otpVerified && (
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={handleVerifyOtp}
                        style={{ marginLeft: "10px" }}
                        disabled={!otp.trim()}
                      >
                        Verify
                      </Button>
                    )}
                  </div>
                </Form.Group>

                <Form.Group controlId="password" style={{ marginTop: "10px" }}>
                  <Form.Label>Password</Form.Label>
                  <div style={{ position: "relative" }}>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={handlePasswordChange}
                      style={{ fontSize: "10px", padding: "10px" }}
                    />
                    <span
                      className="eye-icon"
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {passwordError && (
                    <p
                      style={{
                        color: "red",
                        marginTop: "5px",
                        fontSize: "10px",
                      }}
                    >
                      {passwordError}
                    </p>
                  )}
                </Form.Group>

                <Form.Group
                  controlId="confirmPassword"
                  style={{ marginTop: "10px" }}
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    style={{ fontSize: "10px", padding: "10px" }}
                  />
                  {confirmPasswordError && (
                    <p
                      style={{
                        color: "red",
                        marginTop: "5px",
                        fontSize: "10px",
                      }}
                    >
                      {confirmPasswordError}
                    </p>
                  )}
                </Form.Group>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <Button
                      variant="success"
                      type="submit"
                      disabled={!isFormValid()}
                    >
                      Create Account
                    </Button>
                  <p style={{ marginTop: "12px", fontSize: "14px" }}>
                    By clicking 'Create account' you've read and agreed to our
                    terms and conditions.
                  </p>
                </div>
              </Form>
            </div>
          </Modal.Body>
        </Modal>

        <BecomeASeller />

        {show && <div className="modal-overlay" onClick={handleClose}></div>}
      </div>
    </>
  );
};

export default SignupSeller2;
