import React, { useState, useRef } from "react";
import Mail from "../../assets/email icon.svg"; // Importing image file
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

// Functional Component
const Verify: React.FC = () => {
  // State variables using useState hook
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResendHovered, setIsResendHovered] = useState<boolean>(false);
  const [code, setCode] = useState<string[]>(["", "", "", ""]); // State to store individual digit values
  const codeInputsRefs = useRef<(HTMLInputElement | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate(); // Get history object from React Router
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const email = (location.state as any)?.email;
  const userType = (location.state as any)?.userType;

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (message: string) => {
    setModalMessage(message);
    setShowModal(true);
  };
  const handleCodeChange = (
    index: number,
    value: string,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    const newCode = [...code];

    // Type guard for ChangeEvent
    if ("key" in e === false) {
      newCode[index] = value;
      setCode(newCode);
      return;
    }

    // From here onwards, e is definitely a KeyboardEvent
    if (e.key === "Backspace" && !value && index > 0) {
      newCode[index - 1] = "";
      setCode(newCode);
      codeInputsRefs.current[index - 1]?.focus();
      return;
    }

    newCode[index] = value;
    setCode(newCode);

    // Move focus to the next input
    if (value && index < 3 && codeInputsRefs.current[index + 1]) {
      codeInputsRefs.current[index + 1]?.focus();
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otp = code.join("");
    console.log("Form submitted with code:", code.join(""));

    try {
      // Make POST request to backend for OTP verification
      const response = await axios.post(
        "http://localhost:8080/api/verify-otp",
        { email, otp, userType }
      );
      handleShowModal("OTP verified");
      console.log(response.data); // Log response from backend

      // Handle success and navigate to password reset page
      navigate("/NewPW", { state: { email, userType } }); // Redirect to reset password page after OTP verification
    } catch (error) {
      handleShowModal("Error verifying OTP");
      console.error("Error verifying OTP:", error);
      // Handle error, show user-friendly message if needed
    }
  };

  const handleResendOtp = async () => {
    try {
      // Make POST request to backend for resending OTP
      const response = await axios.post("http://localhost:8001/resend-otp", {
        email,
        userType,
      });
      console.log(response.data); // Log response from backend

      // Handle success, show a success message
      setMessage("OTP has been resent to your email.");
    } catch (error) {
      console.error("Error resending OTP:", error);
      // Handle error, show user-friendly message if needed
      setMessage("Failed to resend OTP. Please try again.");
    }
  };

  // TSX return
  return (
    <div className="container" style={{ marginTop: "25px" }}>
      {/* Header Section */}
      <div className="text-center pb-3">
        <img src={Mail} alt="Key" className="pb-3" />
        <h4>Verify your email</h4>
      </div>

      {/* Instructional Text */}
      <p className="text-center pb-3 text-muted">
        Please enter 4 digit code sent to your email.
      </p>

      {/* Form */}
      <Form onSubmit={handleSubmit}>
        {/* Code Input Fields */}
        <div className="d-flex justify-content-center align-items-center pb-5">
          {code.map((value, index) => (
            <div
              key={index}
              className="d-inline-block px-1"
              style={{ margin: "15px" }}
            >
              <input
                type="text"
                maxLength={1}
                className="form-control text-center small-input"
                style={{
                  width: "50px",
                  height: "60px",
                  fontSize: "16px",
                  backgroundColor: "#BEF3C9",
                  border: "none",
                  borderBottom: "2px solid #00BA29",
                  borderRadius: "0",
                }} // Inline CSS
                value={value}
                onChange={(e) => handleCodeChange(index, e.target.value, e)}
                onKeyDown={(e) =>
                  handleCodeChange(index, e.currentTarget.value, e)
                }
                ref={(el) => (codeInputsRefs.current[index] = el)}
              />
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center mb-3">
          <Button
            variant="primary"
            onMouseOver={() => setIsResendHovered(true)}
            onMouseOut={() => setIsResendHovered(false)}
            style={{
              color: isResendHovered ? "#BEF3C9" : "#00BA29",
              backgroundColor: "transparent",
              border: "none",
            }}
            onClick={handleResendOtp}
          >
            Resend code
          </Button>
        </div>

        {/* Verify Button */}
        <div className="d-flex justify-content-center">
          <Button
            variant="primary"
            type="submit"
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
            Verify
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

export default Verify;
