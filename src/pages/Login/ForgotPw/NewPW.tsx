import React, { useState } from 'react';
import Lock from "../../../assets/lock icon.png";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewPW: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [areFieldsFilled, setAreFieldsFilled] = useState<boolean>(true);
  const [arePasswordsMatching, setArePasswordsMatching] = useState<boolean>(true);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate if fields are filled
    if (!password || !confirmPassword) {
      setAreFieldsFilled(false);
      console.log("Please fill in all fields.");
      return;
    } else {
      setAreFieldsFilled(true);
    }

    // Validate if passwords match
    if (password !== confirmPassword) {
      setArePasswordsMatching(false);
      console.log("Passwords do not match. Please enter the same password in both fields.");
      return;
    } else {
      setArePasswordsMatching(true);
    }

    // If all validations pass, perform form submission logic
    console.log("Form submitted with password:", password);
  };

  return (
    <div style={containerStyle}>
      <div style={imageStyle}>
        <img src={Lock} alt="Key" />
      </div>
      <div style={headerStyle}>
        <h4>Create a new password</h4>
      </div>

      <div style={paragraphStyle}>
        <p>
          Your new password must be different  from <br />previously used password.
        </p>
      </div>

      <Form style={formStyle} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {!areFieldsFilled && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            Please fill in all fields.
          </div>
        )}
        {!arePasswordsMatching && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            Passwords do not match. Please enter the same password in both fields.
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
            disabled={!areFieldsFilled || !arePasswordsMatching}
          >
            Send
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewPW;
