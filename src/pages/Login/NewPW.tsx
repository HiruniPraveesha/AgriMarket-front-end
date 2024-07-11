

import React, { useState } from "react";
import Lock from "../../assets/lock icon.svg"; // Importing image file
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const NewPW: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [areFieldsFilled, setAreFieldsFilled] = useState<boolean>(true);
  const [arePasswordsMatching, setArePasswordsMatching] =
    useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [, setIsPasswordFormatValid] =
    useState<boolean>(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const location = useLocation();
  const email = (location.state as { email?: string })?.email;
  const userType = (location.state as any)?.userType;

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (message: string) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const isPasswordValid = (pw: string, userType: string): boolean => {
    let passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#!]).{7,}$/; 
  
    if (userType === "seller") {
      passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#!]).{8,}$/;
    }
  
    return passwordRegex.test(pw);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  if (!password || !confirmPassword) {
    setAreFieldsFilled(false);
    console.log("Please fill in all fields.");
    return;
  } else {
    setAreFieldsFilled(true);
  }

  if (password !== confirmPassword) {
    setArePasswordsMatching(false);
    handleShowModal(
      "Passwords do not match. Please enter the same password in both fields."
    );
    return;
  } else {
    setArePasswordsMatching(true);
  }

  if (!isPasswordValid(password, userType)) {
    setIsPasswordFormatValid(false);
    let requirementsMessage = "Password must contain:";
    if (userType === "seller") {
      requirementsMessage +=
        " at least 8 characters, including letters, numbers, and special characters (@, #, !).";
    } else {
      requirementsMessage +=
        " at least 7 characters, including letters, numbers, and special characters (@, #, !).";
    }
    handleShowModal(requirementsMessage);
    return;
  } else {
    setIsPasswordFormatValid(true);
  }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/reset-password",
        { email,userType, password }
      );
      handleShowModal("Password reset successfully!");
       console.log(response.data);
      navigate("/signIn");
    } catch (error) {
      console.error("Error resetting password:", error);
      handleShowModal("Failed to reset password. Please try again later.");
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"25px",
        padding: "20px",
      }}
    >
      <div className="text-center pb-3">
        <img src={Lock} alt="Key" className="pb-3" />
        <h4>Create a new password</h4>
      </div>

      <p className="text-center pb-3 text-muted">
        Your new password must be different from previously used password.
      </p>

      <Form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "10px",
        }}
      >
        <Form.Group controlId="formBasicPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <div className="d-flex">
            <div style={{ position: "relative", width: "100%" }}>
              <Form.Control
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: "40px" }} // Add some padding to the right to accommodate the icon
              />
              <span
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {isPasswordVisible ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </div>
          </div>
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <div className="d-flex">
            <div style={{ position: "relative", width: "100%" }}>
              <Form.Control
                type={isConfirmPasswordVisible ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ paddingRight: "40px" }} // Add some padding to the right to accommodate the icon
              />
              <span
                onClick={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {isConfirmPasswordVisible ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </div>
          </div>
        </Form.Group>

        {!areFieldsFilled && (
          <div className="text-danger mb-3">Please fill in all fields.</div>
        )}
        

        <div className="d-flex justify-content-center">
          <Button
            variant="primary"
            type="submit"
            disabled={!areFieldsFilled || !arePasswordsMatching}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            style={{
              paddingRight: "70px",
              paddingLeft: "70px",
              backgroundColor: "#00BA29",
              border: "none",
              boxShadow: isHovered ? "0 0 10px rgba(0, 0, 0, 0.3)" : "none",
              transition: "box-shadow 0.3s",
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "13px" }}>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewPW;
