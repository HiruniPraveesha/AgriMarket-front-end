import React, { useState, useRef } from "react";
import Mail from "../../assets/email icon.svg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios, { AxiosError } from "axios"; // Import AxiosError for better error handling
import { useNavigate } from "react-router-dom";

const Verify: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResendHovered, setIsResendHovered] = useState<boolean>(false);
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null); // State to hold error message
  const navigate = useNavigate();
  const codeInputsRefs = useRef<(HTMLInputElement | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3 && codeInputsRefs.current[index + 1]) {
      codeInputsRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      codeInputsRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with code:", code.join(""));

    try {
      const otp = code.join("");
      const response = await axios.post("http://localhost:8000/verify-otp", {
        otp,
      });

      console.log("Verification response:", response.data); // Log the response from the backend

      if (response.status === 200) {
        navigate("/NewPW"); // Navigate to the next page upon successful verification
      } else {
        setError("An error occurred while verifying OTP."); // Handle other error cases
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.data) {
          const responseData = axiosError.response.data;
          const errorMessage =
            typeof responseData === "string"
              ? responseData
              : "An error occurred while verifying OTP.";
          setError(errorMessage);
        } else {
          setError("An error occurred while verifying OTP.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container">
      <div className="text-center pb-3">
        <img src={Mail} alt="Key" className="pb-3" />
        <h4>Verify your email</h4>
      </div>

      <p className="text-center pb-3 text-muted">
        Please enter the 4-digit code sent to your email.
      </p>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <Form onSubmit={handleSubmit}>
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
                }}
                value={value}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
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
            onClick={() => {
              // Implement resend code logic here
            }}
          >
            Resend code
          </Button>
        </div>

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
    </div>
  );
};

export default Verify;
