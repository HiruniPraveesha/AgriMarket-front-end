import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import eye icons
import Header from "../../components/Header-sub";


const SignUpBuyer: React.FC = () => {

  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendVerificationCode = () => {
    // Add your logic here to send the verification code to the user's phone number
    // For example, you can make an API call or trigger a function to send the code.

    // For the purpose of this example, I'm just updating the state to simulate the code being sent.
    setIsCodeSent(true);
  };

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };


  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div style={{padding: '20px', fontSize: '20px', textAlign: 'center'}}>
        <p style={{fontWeight: 'Bold'}}>SIGN UP</p>
      </div>
      <Form style={{ backgroundColor: '#D9D9D9', padding: '20px', fontSize: '10px'}}>
        <Row>
          {/* Left Part */}
          <Col md={6}>
            <Form.Group as={Row} className="mb-4" controlId="formPlaintextName">
              <Form.Label column sm="4">
                Full Name<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" className="mb-3"/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formPlaintextEmail">
              <Form.Label column sm="4">
                Email<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Col sm="8">
                <Form.Control type="email" className="mb-3"/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formPlaintextAddress">
              <Form.Label column sm="4">
                Address<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" className="mb-3" />
                <Form.Control type="text" className="mb-3" />
                <Form.Control type="text" />
              </Col>
            </Form.Group>
          </Col>

          {/* Right Part */}
          <Col md={6}>
            <Form.Group as={Row} className="mb-4" controlId="formPlaintextMobile">
              <Form.Label column sm="4">
                Mobile<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" className="mb-3"/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formPlaintextCode">
              <Form.Label column sm="4">
                Verification Code<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Col sm="8">
                <div style={{ position: 'relative' }}>
                  <Form.Control
                    type="text"
                    className="mb-3"
                    value={verificationCode}
                    onChange={handleVerificationCodeChange}
                  />
                  <Button
                    variant="primary"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'black',
                      fontSize: '12px',
                      padding: '5px 0',
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      cursor: isCodeSent ? 'not-allowed' : 'pointer',
                      border: 'none',
                    }}
                    onClick={isCodeSent ? undefined : handleSendVerificationCode}
                    disabled={isCodeSent}
                  >
                    {isCodeSent ? 'Sent' : 'Send'}
                  </Button>
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formPlaintextPassword">
              <Form.Label column sm="4">
                Password<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Col sm="8">
                <div style={{ position: 'relative' }}>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    className="mb-3"
                    style={{ paddingRight: '40px' }} // Adjust padding to accommodate the icon
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </div>
                </div>
              </Col>
            </Form.Group>


            <Form.Group as={Row} className="mb-4">
              <Col sm={{ offset: 4, span: 8 }} className="text-left">
                <Form.Check type="checkbox" className="mb-3" label={
                  <span>
                  I agree with AgriMarket <a href="your_link_here" style={{ color: 'green', textDecoration: 'none' }}>Terms and Conditions</a> 
                  </span>
                } />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4">
              <Col sm={{ offset: 6, span: 11 }} className="text-left">
                <Button variant="primary" type="submit" className="mb-3" 
                  style={{ 
                    backgroundColor: '#00BA29',
                    fontSize: '10px',
                    marginBottom: '10px',
                    border: 'none',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}>
                  Register
                </Button>
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <div>
      </div>
    </div>
  );
};

export default SignUpBuyer;
