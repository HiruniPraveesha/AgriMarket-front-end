import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 
import Header from "../../components/Header-sub";
import Footer from "../../components/Footer-sub";
import { Link } from "react-router-dom";
// import axios from "axios";
import axios, { AxiosError } from "axios";

const SignUpBuyer: React.FC = () => {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    line1: "",
    line2: "",
    city: "",
    contactNo: "",
    password: ""
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false); 
  const [registrationError, setRegistrationError] = useState(""); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("Input name:", name);
    console.log("Input value:", value);
    setFormData({
      ...formData,
      [name]: value
    });
    console.log("After State Update:", formData);
  };


  





  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.contactNo||
        !formData.line1 ||
        !formData.password||
        !termsChecked
      ) {
        alert("Please fill out all required fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid email address.");
        return;
      }
  
     
      const contactNoRegex = /^\d{10}$/;
      if (!contactNoRegex.test(formData.contactNo)) {
        alert("Please enter a valid 10-digit contact number.");
        return;
      }
      


      await axios.post("http://localhost:8080/signup", formData);

    //   const enteredOTP = prompt("Please enter the OTP sent to your email:");

   
    // if (enteredOTP) {
      
    //   const response = await axios.post("http://localhost:8000/verifyOTP", { email: formData.email, otp: enteredOTP });
      
    // }
      setRegistrationSuccess(true);
      console.log("successful");
      setRegistrationError("");
  } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
          const responseData = axiosError.response.data;
          const errorMessage = typeof responseData === 'string' ? responseData : 'An error occurred';
          if (errorMessage === 'User already exist') {
              setRegistrationError('User already exists');
          } else {
              console.error('Error saving data:', error);
              setRegistrationError('An error occurred. Please try again later.');
          }
      } else {
          console.error('Error saving data:', error);
          setRegistrationError('An error occurred. Please try again later.');
      }
  }
  
  };



  



 


  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [termsChecked, setTermsChecked] = useState(false);
  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsChecked(e.target.checked);
  };

  

  return (
    <div style={{ margin: "0 20%" }}>
      <div>
        <Header />
      </div>
      <div style={{ padding: "20px", fontSize: "20px", textAlign: "center" }}>
        <p style={{ fontWeight: "Bold" }}>SIGN UP</p>
      </div>
      {registrationError && (
        <div style={{ textAlign: "center", color: "red" }}>
          {registrationError}
        </div>
      )}
      {registrationSuccess && ( // Conditionally render success message
         <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(5px)", display: "flex", justifyContent: "center", alignItems: "center" }}>
         <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
           <p>Registration successful!</p>
           <Link to="/signIn">
            <button
              type="button"
              className="btn btn-primary continue"
              style={{
                backgroundColor: "#DFFFC0",
                borderRadius: "55px",
                color: "#00BA29",
                fontSize: "10px",
              }}
            >
              Next
            </button>
          </Link>
         </div>
       </div>
      )}
      <Form 
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#D9D9D9",
          padding: "20px",
          fontSize: "10px",
        }}
      >
        <Row>
          {/* Left Part */}
          <Col md={6}>
            <Form.Group as={Row} className="mb-4" controlId="formPlaintextName">
              <Form.Label column sm="4">
                Full Name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" className="mb-3" name="name" value={formData.name} onChange={handleInputChange} />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="4">
                Email<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" className="mb-3" name="email" value={formData.email} onChange={handleInputChange}/>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formPlaintextAddress"
            >
              <Form.Label column sm="4">
                Address<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" name="line1" className="mb-3" value={formData.line1} onChange={handleInputChange}/>
                <Form.Control type="text" name="line2" className="mb-3" value={formData.line2} onChange={handleInputChange}/>
                <Form.Control type="text" name="city" value={formData.city} onChange={handleInputChange}/>
              </Col>
            </Form.Group>
          </Col>

          {/* Right Part */}
          <Col md={6}>
            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formPlaintextMobile"
            >
              <Form.Label column sm="4">
                Mobile<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" name="contactNo" className="mb-3" value={formData.contactNo} onChange={handleInputChange} />
              </Col>
            </Form.Group>


            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="4">
                Password<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="8">
                <div>
                  <Form.Control
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="mb-3"
                    style={{ paddingRight: "40px" }}
                    value={formData.password} onChange={handleInputChange}
                   
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </div>
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4">
              <Col sm={{ offset: 4, span: 8 }} className="text-left">
                <Form.Check
                  type="checkbox"
                  className="mb-3"
                  label={
                    <span>
                      I agree with AgriMarket{" "}
                      <a
                        href="your_link_here"
                        style={{ color: "green", textDecoration: "none" }}
                      >
                        Terms and Conditions
                      </a>
                    </span>
                  }
                  checked={termsChecked}
                  onChange={handleTermsChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4">
              <Col sm={{ offset: 6, span: 11 }} className="text-left">
                <Button
                  variant="primary"
                  type="submit"
                  className="mb-3"
                  style={{
                    backgroundColor: "#00BA29",
                    fontSize: "10px",
                    marginBottom: "10px",
                    border: "none",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Register
                </Button>
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <div style={{ marginTop: "10px" }}>
        <Footer />
      </div>
    </div>
  );
};

export default SignUpBuyer;
