import React, { useState } from 'react';
import Lock from "../../../assets/lock icon.png"; // Importing image file
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

// Functional Component
const NewPW: React.FC = () => {
    // State variables using useState hook
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [areFieldsFilled, setAreFieldsFilled] = useState<boolean>(true);
    const [arePasswordsMatching, setArePasswordsMatching] = useState<boolean>(true);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isPasswordFormatValid, setIsPasswordFormatValid] = useState<boolean>(true);

    // Function to validate password format
const isPasswordValid = (pw: string): boolean => {
    // Variables to track whether each condition is met
    let hasNumber = false;
    let hasUpperCase = false;
    let hasLowerCase = false;
    let hasSpecialChar = false;
    let specialCharCount = 0; // Track the count of special characters

    // Check if password length is at least 8 characters
    if (pw.length < 8) {
        return false;
    }

    // Iterate through each character of the password
    for (const char of pw) {
        if (/[0-9]/.test(char)) {
            hasNumber = true;
        } else if (/[A-Z]/.test(char)) {
            hasUpperCase = true;
        } else if (/[a-z]/.test(char)) {
            hasLowerCase = true;
        } else if (/[@#\$]/.test(char)) { // Only allowing '@', '#', '$'
            hasSpecialChar = true;
            specialCharCount++; // Increment special character count
        }
    }

    // Check if all conditions are met
    return hasNumber && hasUpperCase && hasLowerCase && hasSpecialChar && specialCharCount === 1;
};


    // Function to handle form submission
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

        // Validate if password format is correct
        if (!isPasswordValid(password)) {
            setIsPasswordFormatValid(false);
            console.log("Password must contain 8 characters including at least one number, one uppercase letter, one lowercase letter, and one of the following special characters: '@', '#', '$'.");
            return;
        } else {
            setIsPasswordFormatValid(true);
        }

        // If all validations pass, perform form submission logic
        console.log("Form submitted with password:", password);
    };

    // JSX return
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
                <img src={Lock} alt="Key" className="pb-3" />
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
