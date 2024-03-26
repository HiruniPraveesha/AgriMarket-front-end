import React, { useState } from 'react';
import key from "../../../assets/key.png";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Email: React.FC = () => {
    const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [areFieldsFilled, setAreFieldsFilled] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px', // Add some padding for better spacing
  };

  const imageStyle: React.CSSProperties = {
    paddingBottom: '30px',
  };

  const formStyle: React.CSSProperties = {
    width: '100%', // Make the form full width initially
    maxWidth: '400px', // Limit the maximum width for larger screens
    padding: '10px',
  };

  const paragraphStyle: React.CSSProperties = {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center', // Align text in the center
    padding: '20px',
    color: '#A3A3A3',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center', // Align text in the center
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '35px',
  };

  const buttonStyle: React.CSSProperties = {
    paddingRight: '70px',
    paddingLeft: '70px',
    backgroundColor: '#00BA29',
    border: 'none',
    boxShadow: isHovered ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none', // Add box shadow on hover
    transition: 'box-shadow 0.3s', // Add a smooth transition effect for box shadow
  };

  

  const errorStyle: React.CSSProperties = {
    color: 'red',
    marginBottom: '10px',
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate if fields are filled
    if (!email) {
      setAreFieldsFilled(false);
      setIsEmailValid(true); // Reset email validation message
      console.log("Please fill in all fields.");
      return;
    } else {
      setAreFieldsFilled(true);
    }

    // Validate if email is in the correct format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      console.log("Please enter a valid email address.");
      return;
    } else {
      setIsEmailValid(true);
    }

    // If all validations pass, perform form submission logic
    console.log("Form submitted with email:", email);
  };

  return (
    <div style={containerStyle}>
      <div style={imageStyle}>
        <img src={key} alt="Key" />
      </div>
      <div style={headerStyle}>
        <h4>Forgot Password?</h4>
      </div>

      <div style={paragraphStyle}>
        <p>
          Please enter your email address<br /> to receive a verification code
        </p>
      </div>

      <Form style={formStyle} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        {!areFieldsFilled && (
          <div style={errorStyle}>
            Please fill in all fields.
          </div>
        )}
        {!isEmailValid && (
          <div style={errorStyle}>
            Please enter a valid email address.
          </div>
        )}
        <div
          style={buttonContainerStyle}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          <Button
            variant="primary"
            style={buttonStyle}
            type="submit"
            disabled={!areFieldsFilled || !isEmailValid}
          >
            Send
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Email;
