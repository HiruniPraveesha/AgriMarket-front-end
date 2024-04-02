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
        <div className="container">
            <div className="text-center pb-3">
                <img src={Lock} alt="Key" className="pb-3" />
                <h4>Create a new password</h4>
            </div>

            <p className="text-center pb-3 text-muted">
                Your new password must be different from previously used password.
            </p>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
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
