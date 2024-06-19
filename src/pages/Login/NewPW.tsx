import React, { useState } from 'react';
import Lock from "../../assets/lock icon.svg";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const NewPW: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [areFieldsFilled, setAreFieldsFilled] = useState<boolean>(true);
    const [arePasswordsMatching, setArePasswordsMatching] = useState<boolean>(true);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isPasswordFormatValid, setIsPasswordFormatValid] = useState<boolean>(true);
    const [resetStatus, setResetStatus] = useState<string>(''); // State to hold reset status message

    const isPasswordValid = (pw: string): boolean => {
    // Check for at least 7 characters
    if (pw.length < 7) {
        return false;
    }

    let hasUpperCase = false;
    let hasNumber = false;
    let hasSpecialChar = false;

    // Check for uppercase letters, numbers, and special characters
    for (const char of pw) {
        if (/[A-Z]/.test(char)) {
            hasUpperCase = true;
        } else if (/[0-9]/.test(char)) {
            hasNumber = true;
        } else if (/[!@#]/.test(char)) { // Adjusted special characters to match the requirement
            hasSpecialChar = true;
        }
    }

    // Ensure all conditions are met
    return hasUpperCase && hasNumber && hasSpecialChar;
};


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate if fields are filled
        if (!password || !confirmPassword) {
            setAreFieldsFilled(false);
            return;
        } else {
            setAreFieldsFilled(true);
        }

        // Validate if passwords match
        if (password !== confirmPassword) {
            setArePasswordsMatching(false);
            return;
        } else {
            setArePasswordsMatching(true);
        }

        // Validate if password format is correct
        if (!isPasswordValid(password)) {
            setIsPasswordFormatValid(false);
            return;
        } else {
            setIsPasswordFormatValid(true);
        }

        // Extract email and otp from query params (replace with actual logic)
        const searchParams = new URLSearchParams(window.location.search);
        const email = searchParams.get('email');
        const otp = searchParams.get('otp');

        if (!email || !otp) {
            console.error('Email and OTP are required');
            return;
        }

        // Prepare request data
        const requestData = {
            newPassword: password,
            otp,
        };

        try {
            // Make API call to reset password using axios
            const response = await axios.post(`http://localhost:8001/reset-password?email=${email}&otp=${otp}`, requestData);

            if (response.status === 200) {
                setResetStatus('Password reset successfully');
                // Optionally redirect or show success message
            } else {
                console.error('Failed to reset password:', response.data.error);
                setResetStatus('Failed to reset password');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            setResetStatus('An error occurred while resetting password');
        }
    };

    return (
        <div className="container"
             style={{
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
                 padding: '20px',
             }}
        >
            {/* Header Section */}
            <div className="text-center pb-3">
                <img src={Lock} alt="Key" className="pb-3"/>
                <h4>Create a new password</h4>
            </div>

            {/* Instructional Text */}
            <p className="text-center pb-3 text-muted">
                Your new password must be different from previously used password.
            </p>

            {/* Form */}
            <Form onSubmit={handleSubmit}
                  style={{
                      width: '100%', // Make the form full width initially
                      maxWidth: '400px', // Limit the maximum width for larger screens
                      padding: '10px',
                  }}
            >
                {/* Password Input */}
                <Form.Group controlId="formBasicPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                {/* Confirm Password Input */}
                <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                {/* Error Messages */}
                {!areFieldsFilled && (
                    <div className="text-danger mb-3">
                        Please fill in all fields.
                    </div>
                )}
                {!arePasswordsMatching && (
                    <div className="text-danger mb-3">
                        Passwords do not match. Please enter the same password in both fields.
                    </div>
                )}
                {!isPasswordFormatValid && (
                    <div className="text-danger mb-3">
                        Password must contain 8 characters including at least one number, one uppercase letter, one lowercase letter, and one of the following special characters: '@', '#', '$'.
                    </div>
                )}

                {/* Reset Status */}
                {resetStatus && (
                    <div className={`text-center mb-3 ${resetStatus === 'Password reset successfully' ? 'text-success' : 'text-danger'}`}>
                        {resetStatus}
                    </div>
                )}

                {/* Button Section */}
                <div className="d-flex justify-content-center">
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={!areFieldsFilled || !arePasswordsMatching}
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

export default NewPW;
