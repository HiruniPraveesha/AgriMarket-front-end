import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import eye icons
import Header from "../../components/Header-sub";
import Footer from "../../components/Footer-sub";

const SignUpBuyer: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);

  const handleSendVerificationCode = () => {
    setIsCodeSent(true);
  };

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(e.target.value);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsChecked(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add your validation logic here
    if (
      !fullName ||
      !email ||
      !address ||
      !mobile ||
      !password ||
      !termsChecked
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    // Continue with your form submission logic here
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ margin: "0 20%" }}>
      <div>
        <Header />
      </div>
      <div style={{ fontSize: "18px", textAlign: "center" }}>
        <p style={{ fontWeight: "Bold" }}>SIGN UP</p>
      </div>
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
                  value={fullName}
                  onChange={handleFullNameChange}
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
                  value={mobile}
                  onChange={handleMobileChange}
                  style={{ fontSize: "14px" }}
                  required
                />
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
                    style={{ paddingRight: "40px", fontSize: "14px" }} // Adjust padding to accommodate the icon
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
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="4">
                Re-enter Password<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="8">
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    className="mb-3"
                    style={{ paddingRight: "40px", fontSize: "14px" }} // Adjust padding to accommodate the icon
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
