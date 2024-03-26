import React, { useState } from 'react';
import Mail from "../../../assets/email icon.png";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewPW: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResendHovered, setIsResendHovered] = useState<boolean>(false);
  const [code, setCode] = useState<string[]>(['', '', '', '']); // State to store individual digit values

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  };

  const imageStyle: React.CSSProperties = {
    paddingBottom: '30px',
  };

  const formStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    padding: '10px',
  };

  const paragraphStyle: React.CSSProperties = {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
    color: '#A3A3A3',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
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
    boxShadow: isHovered ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none',
    transition: 'box-shadow 0.3s',
  };

  const textbuttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '100px',
    position: 'relative',
  };

  const codeSpacesStyle: React.CSSProperties = {
    position: 'absolute',
    paddingTop: '20px',
    top: '-24px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const codeSpaceStyle: React.CSSProperties = {
    width: '15%',
    height: '60px',
    backgroundColor: '#BEF3C9',
    borderBottom: '2px solid #00BA29',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const codeInputStyle: React.CSSProperties = {
    width: '80%', // Adjust the width as needed
    border: 'none',
    textAlign: 'center',
    backgroundColor: 'transparent',
    outline: 'none', 
  };

  const textbuttonStyle: React.CSSProperties = {
    color: isResendHovered ? '#BEF3C9' : '#00BA29',
    backgroundColor: 'transparent',
    border: 'none',
  };

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with code:", code.join(''));
  };

  return (
    <div style={containerStyle}>
      <div style={imageStyle}>
        <img src={Mail} alt="Key" />
      </div>
      <div style={headerStyle}>
        <h4>Verify your email</h4>
      </div>

      <div style={paragraphStyle}>
        <p>
          Please enter 4 digit code sent to <br />your email.
        </p>
      </div>

      <Form style={formStyle} onSubmit={handleSubmit}>
        <div style={textbuttonContainerStyle}>
          <div style={codeSpacesStyle}>
            {code.map((value, index) => (
              <div key={index} style={codeSpaceStyle}>
                <input
                  type="text"
                  maxLength={1}
                  style={codeInputStyle}
                  value={value}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <Button
            variant="primary"
            style={textbuttonStyle}
            type="submit"
            onMouseOver={() => setIsResendHovered(true)}
            onMouseOut={() => setIsResendHovered(false)}
          >
            Resend code
          </Button>
        </div>

        <div
          style={buttonContainerStyle}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          <Button
            variant="primary"
            style={buttonStyle}
            type="submit"
          >
            Verify
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewPW;
