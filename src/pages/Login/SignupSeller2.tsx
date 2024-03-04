import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "bootstrap/dist/css/bootstrap.min.css";
import BecomeASeller from "../BecomeASeller"; // Import the BecomeASeller component

const SignupSeller2: React.FC = () => {
  const [show, setShow] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("123456780");
  const [verification, setVerification] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumberValid, setPhoneNumberValid] = useState(true); // New state to track if phone number is valid

  const handleClose = () => setShow(false);

  const handleVerificationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerification(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    // Password validation regex pattern
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    if (!verification.trim()) {
      console.log("Please enter a verification code.");
      return;
    }
    console.log("Form submitted successfully");
  };

  const handleSendVerificationCode = () => {
    // Implement sending verification code functionality here
    console.log("Sending verification code to:", phoneNumber);
  };

  const isFormValid = () => {
    return (
      verification.trim() !== "" &&
      passwordError === "" &&
      confirmPasswordError === "" &&
      password !== "" &&
      confirmPassword !== "" &&
      phoneNumberValid // Check if phone number is valid
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
            <div style={{ border: "1px solid ", padding: "20px" }}>
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
                <Form.Group controlId="phoneNumber">
                  <Form.Control type="text" value={phoneNumber} readOnly />
                  {!phoneNumberValid && (
                    <p style={{ color: "red", fontSize: "10px" }}>
                      Please enter a valid phone number.
                    </p>
                  )}
                </Form.Group>
                <Form.Group
                  controlId="verification"
                  style={{ marginTop: "10px" }}
                >
                  <Form.Label>Verification</Form.Label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Form.Control
                      type="text"
                      placeholder="Enter verification code"
                      value={verification}
                      onChange={handleVerificationChange}
                      style={{ fontSize: "10px", padding: "10px" }}
                    />
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={handleSendVerificationCode}
                      style={{ marginLeft: "10px" }}
                    >
                      Send
                    </Button>
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
                    type="password"
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

        {/* Become a Seller component */}
        <BecomeASeller />

        {/* Background overlay */}
        {show && <div className="modal-overlay" onClick={handleClose}></div>}
      </div>
    </>
  );
};

export default SignupSeller2;
