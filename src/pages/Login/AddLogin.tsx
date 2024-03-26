import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Back from '../../assets/Back.svg';
import HeaderSub from "../../components/Header-sub";
import { Link } from "react-router-dom";

interface StepProgressBarProps {
  currentStep: number;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep }) => {
  const [formData, setFormData] = useState({
    storeName: '',
    email: '',
    district: '',
    addressLine1: '',
    addressLine2: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate the form fields
    const newErrors: { [key: string]: string } = {};
    if (!formData.storeName.trim()) {
      newErrors.storeName = 'Store name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.district.trim()) {
      newErrors.district = 'District is required';
    }
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address line 1 is required';
    }
    setErrors(newErrors);

    // If there are no errors, you can proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      // Perform form submission logic here
      console.log('Form submitted successfully:', formData);
      // Reset form fields
      setFormData({
        storeName: '',
        email: '',
        district: '',
        addressLine1: '',
        addressLine2: ''
      });
    }
  };

  return (
    <>
    <div>
      <div style={{margin:'0 20%'}}><HeaderSub/></div>
    <div>
      <Row className="justify-content-between align-items-center">
        <Col xs={3} md={3}></Col>
        <Col xs={6} md={6} className="d-flex justify-content-between align-items-center">
          {/* Step Progress Bar */}
          <div style={{ marginLeft: '20px' }}>
            <div
              style={{
                width: '25px',
                height: '25px',
                borderRadius: '50%',
                border: '5px solid #D9D9D9',
                backgroundColor: currentStep >= 1 ? '#00BA29' : '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <p style={{ margin: 0, whiteSpace: 'nowrap', fontSize: '14px', marginTop:'50px' }}>Add Profile</p>
            </div>
          </div>
          <div style={{ width: '70%', height: '1px', backgroundColor: '#000' }}></div>
          <div
            style={{
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              border: '5px solid #D9D9D9',
              backgroundColor: currentStep >= 2 ? '#00BA29' : '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <p style={{ margin: 0, whiteSpace: 'nowrap', fontSize: '14px' , marginTop:'50px'}}>Verify ID & Bank</p>
          </div>
          <div style={{ width: '70%', height: '1px', backgroundColor: '#000' }}></div>
          <div
            style={{
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              border: '5px solid #D9D9D9',
              backgroundColor: currentStep >= 3 ? '#00BA29' : '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <p style={{ margin: 0, whiteSpace: 'nowrap', fontSize: '14px', marginTop:'50px' }}>Add Product</p>
          </div>
        </Col>
        <Col xs={3} md={3}></Col>
      </Row>
      <Row className="justify-content-between align-items-center">
        <Col md={3}></Col>
        <Col md={6}>
          {/* Form */}
          <Form style={{ marginTop: '100px', position: 'relative' }} onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Enter Your Store Name</Form.Label>
              <Form.Control
                type="text"
                name="storeName"
                value={formData.storeName}
                style={{ borderRadius: '0px', borderWidth: '3px', height: '50px' }}
                isInvalid={!!errors.storeName}
              />
              <Form.Control.Feedback type="invalid">{errors.storeName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2" style={{ marginTop: '25px' }}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                style={{ borderRadius: '0px', borderWidth: '3px', height: '50px' }}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1" style={{ marginTop: '25px' }}>
              <Form.Label>Address</Form.Label>
              <Form.Select
                name="district"
                value={formData.district}
                onChange={handleChange}
                style={{ marginBottom: '20px', borderRadius: '0px', borderWidth: '3px', height: '50px' }}
                isInvalid={!!errors.district}
              >
                <option>Select District</option>
                <option>Kandy</option>
                <option>Colombo</option>
                <option>Galle</option>
              </Form.Select>
              <Form.Control
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                style={{ marginBottom: '20px', borderRadius: '0px', borderWidth: '3px', height: '50px' }}
                isInvalid={!!errors.addressLine1}
              />
              <Form.Control
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                style={{ marginBottom: '20px', borderRadius: '0px', borderWidth: '3px', height: '50px' }}
              />
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '35px' }}>
              <Link to ="/verify-bank">
              <Button type="submit" style={{ backgroundColor: '#00BA29', height: '50px', width: '400px' }}>
                Next
              </Button></Link>
            </div>
            <Button
              type="button"
              variant="light"
              style={{ height: '50px', width: '150px', position: 'absolute', right: '20px', marginTop: '40px' }}
            >
              <img src={Back} alt="Back" style={{ marginRight: '10px', height: '20px' }} />
              Back
            </Button>
          </Form>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
    </div>
    
    </>
  );
};

export default StepProgressBar;
