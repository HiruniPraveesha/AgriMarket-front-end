import React, { useState } from 'react';
import key from "../../assets/key.svg";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios, { AxiosError } from 'axios';
import { useNavigate } from "react-router-dom";

const Email2: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate if email is in the correct format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setIsEmailValid(false);
            console.log("Please enter a valid email address.");
            return;
        } else {
            setIsEmailValid(true);
        }

        try {
            // Send POST request to backend endpoint including port number
            const response = await axios.post('http://localhost:8001/send-OTP', { email });
            console.log('Response:', response.data);
            if (response.data.message === 'OTP sent successfully') {
                setMessage('OTP sent successfully');
                navigate("/Verify"); // Navigate to the Verify page
            } else {
                setMessage('Error sending OTP');
            }
        } catch (error) {
            // Handle specific backend errors using AxiosError
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ error: string }>;
                if (axiosError.response?.data.error === 'User not found') {
                    setMessage('User not found');
                } else {
                    setMessage('An error occurred while sending OTP');
                }
            } else {
                setMessage('Network Error: Unable to reach the server');
            }
            console.error("Error sending OTP:", error);
        }
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
                width: '100%',
                maxWidth: '400px',
                padding: '10px',
            }}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setIsEmailValid(true); // Reset validation state when input changes
                        }}
                    />
                </Form.Group>

                {!isEmailValid && (
                    <div className="text-danger">
                        Please enter a valid email address.
                    </div>
                )}

                {message && (
                    <div className="text-danger">
                        {message}
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
                        disabled={!email || !isEmailValid}
                        onMouseOver={() => setIsHovered(true)}
                        onMouseOut={() => setIsHovered(false)}
                        style={{
                            paddingRight: '70px',
                            paddingLeft: '70px',
                            backgroundColor: '#00BA29',
                            border: 'none',
                            boxShadow: isHovered ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none',
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
