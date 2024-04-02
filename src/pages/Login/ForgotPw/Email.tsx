import React, { useState } from 'react';
import key from "../../../assets/key.png";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Email2: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [areFieldsFilled, setAreFieldsFilled] = useState<boolean>(true);
    const [isHovered, setIsHovered] = useState<boolean>(false);

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
        <div className="container" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
        }}>
            <div className="text-center pb-3">
                <img src={key} alt="Key" className="pb-3" />
                <h4>Forgot Password?</h4>
            </div>

            <p className="text-center pb-3 text-muted">
                Please enter your email address<br /> to receive a verification code
            </p>

            <Form onSubmit={handleSubmit} style={{
                 width: '100%', // Make the form full width initially
                 maxWidth: '400px', // Limit the maximum width for larger screens
                 padding: '10px',
            }}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
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

export default Email2;
