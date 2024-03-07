import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import UploadImage from '../../assets/UploadImage.svg';
import Back from '../../assets/Back.svg';
import HeaderSub from "../../components/Header-sub";

const Verifybank: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    idNumber: '',
    bankName: '',
    holderName: '',
    bankCode: '',
    accountNumber: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'ID number is required';
    }
    if (!selectedFile) {
      newErrors.selectedFile = 'Bank document is required';
    }
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }
    if (!formData.holderName.trim()) {
      newErrors.holderName = 'Holder name is required';
    }
    if (!formData.bankCode.trim()) {
      newErrors.bankCode = 'Bank code is required';
    }
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    }
    setErrors(newErrors);

    // Proceed with submission if there are no errors
    if (Object.keys(newErrors).length === 0) {
      // Handle form submission here
      console.log('Form submitted successfully:', formData, selectedFile);
    }
  };

  return (
      <div > 
      <div style={{margin:'0 20%'}}><HeaderSub/></div>
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
                backgroundColor: currentStep >= 1 ? '#white' : '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <p style={{ margin: 0, whiteSpace: 'nowrap', fontSize: '14px', marginTop: '50px' }}>Add Profile</p>
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
            <p style={{ margin: 0, whiteSpace: 'nowrap', fontSize: '14px', marginTop: '50px' }}>Verify ID & Bank</p>
          </div>
          <div style={{ width: '70%', height: '1px', backgroundColor: '#000' }}></div>
          <div
            style={{
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              border: '5px solid #D9D9D9',
              backgroundColor: currentStep >= 3 ? '#white' : '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <p style={{ margin: 0, whiteSpace: 'nowrap', fontSize: '14px', marginTop: '50px' }}>Add Product</p>
          </div>
        </Col>
        <Col xs={3} md={3}></Col>
      </Row>

      <Row>
        <Col xs={3} md={3}></Col>
        <Col xs={6} md={6}>
          <p style={{ marginTop: '50px', fontWeight: 'bold', fontSize: '18px' }}>ID & Bank Account Information</p>
          <p>Let us know about your bank information, don’t worry we’ll keep this information confidential.</p>

          <Form style={{ marginTop: '100px', position: 'relative' }} onSubmit={handleSubmit}>
            <Form.Group className="mb-2" style={{ marginTop: '-60px' }}>
              <Form.Label>Please enter your ID number</Form.Label>
              <Form.Control
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                style={{ borderRadius: '0px', borderWidth: '3px', height: '50px', width: '700px' }}
                isInvalid={!!errors.idNumber}
              />
              <Form.Control.Feedback type="invalid">{errors.idNumber}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <div style={{ marginTop: '40px' }}>
                <p>Verify Bank Account</p>
                <p style={{ fontSize: '12px', marginTop: '-14px' }}>
                  [Upload the Front Page for Bankbook or Mobile Banking screen shot]
                </p>
                <div
                  style={{
                    border: '2px dashed #000',
                    borderRadius: '5px',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    width: '49%',
                    height: '100%'
                  }}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {selectedFile ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <p style={{ marginRight: '10px' }}>{selectedFile.name}</p>
                      <Button variant="link" onClick={clearFile}>
                        <FaTimes />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Form.Label>
                        <img src={UploadImage} alt="Upload" />
                      </Form.Label>
                      <p>Click or Drag File Here</p>
                      {errors.selectedFile && <div className="invalid-feedback d-block">{errors.selectedFile}</div>}
                    </div>
                  )}
                </div>
              </div>
              <Form.Control type="file" onChange={handleFileChange} style={{ display: 'none' }} />
            </Form.Group>

            <Form.Group style={{ marginTop: '50px' }}>
              <Row className="mb-3">
                <Col xs={6} className="pe-2">
                  <Form.Control
                    type="text"
                    placeholder="Bank Name"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    style={{ borderRadius: '0px', borderWidth: '3px', height: '50px', width: 'calc(90% - 10px)' }}
                    isInvalid={!!errors.bankName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.bankName}</Form.Control.Feedback>
                </Col>
                <Col xs={6} className="ps-2">
                  <Form.Control
                    type="text"
                    placeholder="Holder Name"
                    name="holderName"
                    value={formData.holderName}
                    onChange={handleChange}
                    style={{ borderRadius: '0px', borderWidth: '3px', height: '50px', width: 'calc(90% - 10px)' }}
                    isInvalid={!!errors.holderName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.holderName}</Form.Control.Feedback>
                </Col>
              </Row>
              <Row className="mb-3" style={{ marginTop: '20px' }}>
                <Col xs={6} className="pe-2">
                  <Form.Control
                    type="text"
                    placeholder="Bank Code"
                    name="bankCode"
                    value={formData.bankCode}
                    onChange={handleChange}
                    style={{ borderRadius: '0px', borderWidth: '3px', height: '50px', width: 'calc(90% - 10px)' }}
                    isInvalid={!!errors.bankCode}
                  />
                  <Form.Control.Feedback type="invalid">{errors.bankCode}</Form.Control.Feedback>
                </Col>
                <Col xs={6} className="ps-2">
                  <Form.Control
                    type="text"
                    placeholder="Account Number"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    style={{ borderRadius: '0px', borderWidth: '3px', height: '50px', width: 'calc(90% - 10px)' }}
                    isInvalid={!!errors.accountNumber}
                  />
                  <Form.Control.Feedback type="invalid">{errors.accountNumber}</Form.Control.Feedback>
                </Col>
              </Row>
            </Form.Group>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
              <Button type="submit" style={{ backgroundColor: '#00BA29', height: '50px', width: '400px' }}>
                Next
              </Button>
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
        <Col xs={3} md={3}></Col>
      </Row>
    </div>
  );
};

export default Verifybank;
