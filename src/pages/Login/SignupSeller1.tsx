// SignupSeller1.tsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import BecomeASeller from "../BecomeASeller"; // Import the BecomeASeller component
import arrow from "../../assets/arrow.svg";
import Line from "../../assets/Line.svg";

const SignupSeller1: React.FC = () => {
  const [show, setShow] = useState(true);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [verificationBoxWidth, setVerificationBoxWidth] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [phoneNumberEntered, setPhoneNumberEntered] = useState(false);
  const [verificationClicked, setVerificationClicked] = useState(false);
  const [blurEffect, setBlurEffect] = useState(true); // Add state for blur effect

  const handleClose = () => setShow(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (phoneNumberEntered) {
      setVerificationClicked(true);
      setDragStartX(event.clientX);
    } else {
      alert("Please enter the phone number first.");
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartX !== 0 && verificationClicked) {
      const offsetX = event.clientX - dragStartX;
      setVerificationBoxWidth(Math.max(0, offsetX));
      if (!verificationComplete && offsetX >= 100) {
        setVerificationComplete(true);
      } else if (verificationComplete && offsetX < 100) {
        setVerificationComplete(false);
      }
    }
  };

  const handleMouseUp = () => {
    if (!verificationComplete) {
      setVerificationBoxWidth(0);
    }
    setDragStartX(0);
    setVerificationClicked(false);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const enteredPhoneNumber = event.target.value;
    setPhoneNumber(enteredPhoneNumber);
    const phoneRegex = /^[0-9]{10}$/;
    setPhoneNumberValid(phoneRegex.test(enteredPhoneNumber));
    setPhoneNumberEntered(enteredPhoneNumber.length > 0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phoneNumberValid && verificationComplete) {
      console.log("Form submitted successfully");
    } else {
      console.log("Form submission failed. Please check your input.");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="BecomeASellerModal"
        onExited={() => setBlurEffect(false)} // Disable blur effect when modal is closed
      >
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            zIndex: -1,
            filter: blurEffect ? "blur(5px)" : "none", // Apply blur effect conditionally
          }}
        >
          <BecomeASeller />
        </div>
        <Modal.Body>
          <div
            style={{
              border: "1px solid black",
              padding: "20px",
              borderRadius: "2px",
            }}
          >
            <Modal.Header style={{ borderBottom: "none" }}>
              <Modal.Title
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  margin: "2px 62px",
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

            <h6 style={{ textAlign: "center", fontSize: "15px" }}>
              Welcome! Agrimarket users are waiting to buy your product.
            </h6>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="phoneNumber">
                <Form.Label
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Phone Number
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  isInvalid={!phoneNumberValid}
                  style={{
                    fontSize: "14px",
                    padding: "5px 15px",
                    height: "33px",
                    width: "425px",
                  }}
                />
                {!phoneNumberEntered && verificationClicked && (
                  <Form.Text className="text-danger">
                    Please enter the phone number
                  </Form.Text>
                )}
                <Form.Control.Feedback type="invalid">
                  Please enter a valid 10-digit phone number.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="verification">
                <Form.Label style={{ margin: "15px 0", fontSize: "15px" }}>
                  Verification
                </Form.Label>
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    cursor: "move", // Change cursor to move
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                >
                  <img
                    src={arrow}
                    alt="Arrow"
                    style={{
                      width: "20px",
                      position: "absolute",
                      left: "7px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 1,
                    }}
                  />
                  <img
                    src={Line}
                    alt="Line"
                    style={{
                      height: "34px",
                      position: "absolute",
                      left: "40px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 1,
                    }}
                  />
                  <div
                    style={{
                      color: "gray",
                      fontSize: "14px",
                      padding: "5px 60px", // Adjust this value to vertically center the text
                      pointerEvents: "none", // Prevent the div from receiving pointer events
                      width: "425px", // Adjust width as needed
                      height: "33px", // Adjust height as needed
                      border: "1px solid #ced4da", // Add border to mimic text box
                      borderRadius: "4px", // Add border radius to mimic text box
                      backgroundColor: "#e9ecef", // Add background color to mimic text box
                    }}
                  >
                    Slide to verify
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "40px",
                      top: "0",
                      width: `${verificationBoxWidth}px`,
                      height: "100%",
                      backgroundColor: "#00BA29",
                      zIndex: 0,
                    }}
                  />
                  {verificationComplete && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        zIndex: 2,
                      }}
                    >
                      Verified <i className="fas fa-check-circle"></i>
                    </div>
                  )}
                </div>
              </Form.Group>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="success"
                  type="submit"
                  style={{
                    fontSize: "12px",
                    padding: "5px 20px",
                    marginTop: "30px",
                    color: "#ffff",
                    backgroundColor: "#00BA29",
                    border: "none",
                  }}
                >
                  Create Account
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
      {!show && <BecomeASeller />}
    </>
  );
};

export default SignupSeller1;