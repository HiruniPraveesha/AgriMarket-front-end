
import React, { useState } from 'react';
import key from "../../assets/key.svg"; // Importing image file
import {Form ,Row, Col}from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

// Functional Component
const Email: React.FC = () => {
    const navigate = useNavigate();
    // State variables using useState hook
    const [email, setEmail] = useState<string>('');
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [areFieldsFilled, setAreFieldsFilled] = useState<boolean>(true);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    
        const [isSeller, setIsSeller] = useState(false);
        const [isBuyer, setIsBuyer] = useState(false);
      
        const handleSellerChange = () => {
          setIsSeller(!isSeller);
          if (isBuyer) setIsBuyer(false);
        };
      
        const handleBuyerChange = () => {
          setIsBuyer(!isBuyer);
          if (isSeller) setIsSeller(false);
        };

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        const userType = isSeller ? 'seller' : 'buyer';

        // If all validations pass, perform form submission logic
        console.log("Form submitted with email:", email, "userType:", userType);
        // If all validations pass, perform form submission logic
        console.log("Form submitted with email:", email);
    
        try {
            // Make POST request to backend
            const response = await axios.post('http://localhost:8001/api/forgot-password', { email, userType });
            console.log(response.data);

            
            navigate('/Verify', { state: { email, userType} }); 
        } catch (error) {
            console.error("Error sending request:", error);
            
        }
    
};
    

    // TSX return
    return (
        <div className="container" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:"20px",
            padding: '20px',
        }}>
            {/* Header Section */}
            <div className="text-center pb-3">
                <img src={key} alt="Key" className="pb-3" />
                <h4>Forgot Password?</h4>
            </div>

            {/* Instructional Text */}
            <p className="text-center pb-3 text-muted">
                Please enter your email address<br /> to receive a verification code
            </p>

            <Row className="justify-content-md-center" style={{ marginTop: '10px' }}>
        <Col md="auto">

          <Form>
          <Form.Group className="d-flex align-items-center">
              <p style={{ marginBottom: '0', marginRight: '30px'}}>Are you a</p>
              <Form.Check 
                type="checkbox" 
                id="seller" 
                label="seller" 
                checked={isSeller} 
                onChange={handleSellerChange} 
                style={{ display: 'inline-block', marginRight: '15px' }} 
              />
              <Form.Check  
                type="checkbox" 
                id="buyer" 
                label="buyer" 
                checked={isBuyer} 
                onChange={handleBuyerChange} 
                style={{ display: 'inline-block' }} 
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

            {/* Form */}
            <Form onSubmit={handleSubmit} style={{
                 width: '100%', // Make the form full width initially
                 maxWidth: '400px', // Limit the maximum width for larger screens
                 padding: '10px',
                 marginTop:'10px'
            }}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                {/* Error Messages */}
                {!areFieldsFilled && (
                    <div className="text-danger">
                        Please enter your email.
                    </div>
                )}
                {!isEmailValid && (
                    <div className="text-danger">
                        Please enter a valid email address.
                    </div>
                )}

                {/* Button Section */}
                <div className="d-flex justify-content-center"
                    style={{
                        paddingTop: '35px',
                    }}
                >
                    <Button
                        variant="primary"
                        className="px-5"
                        type="submit"
                        disabled={!areFieldsFilled || !isEmailValid}
                        onMouseOver={() => setIsHovered(true)}
                        onMouseOut={() => setIsHovered(false)}
                        style={{
                            paddingRight: '70px',
                            paddingLeft: '70px',
                            backgroundColor: '#00BA29',
                            border: 'none',
                            boxShadow: isHovered ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none', // Add box shadow on hover
                            transition: 'box-shadow 0.3s',
                        }}
                    >
                        Send
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Email;