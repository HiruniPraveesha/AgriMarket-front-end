import React, { useState, useRef } from "react";
import Mail from "../../../assets/email icon.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const Verify: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResendHovered, setIsResendHovered] = useState<boolean>(false);
  const [code, setCode] = useState<string[]>(["", "", "", ""]); // State to store individual digit values
  const codeInputsRefs = useRef<(HTMLInputElement | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const handleCodeChange = (
    index: number,
    value: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const newCode = [...code];

    // Clear the previous input if backspace is pressed and the current input is empty
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with code:", code.join(""));
  };

  return (
    <div className="container">
      <div className="text-center pb-3">
        <img src={Mail} alt="Key" className="pb-3" />
        <h4>Verify your email</h4>
      </div>

      <p className="text-center pb-3 text-muted">
        Please enter 4 digit code sent to your email.
      </p>

      <Form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center align-items-center pb-5">
          {code.map((value, index) => (
            <div key={index} className="d-inline-block px-1" style={{ margin: '15px' }}>
              <input
                type="text"
                maxLength={1}
                className="form-control text-center small-input"
                style={{ width: "50px", height: "60px", fontSize: "16px", backgroundColor: '#BEF3C9', border: 'none',borderBottom: '2px solid #00BA29', borderRadius: '0' }} // Inline CSS
                value={value}
                onChange={(e) => handleCodeChange(index, e.target.value, e)}
                onKeyDown={(e) => handleCodeChange(index, e.target.value, e)}
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
