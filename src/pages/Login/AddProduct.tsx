import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Back from '../../assets/Back.svg';
import AddProd from '../../assets/AddProduct.svg';
import HeaderSub from "../../components/Header-sub";

interface StepProgressBarProps {
  currentStep: number;
}

const AddProduct: React.FC<StepProgressBarProps> = ({ currentStep }) => {
  return (
    <div > 
      <div style={{margin:'0 20%'}}><HeaderSub/></div>
      <Row className="justify-content-between align-items-center">
        <Col xs={3} md={3}></Col>
        <Col xs={6} md={6} className="d-flex justify-content-between align-items-center">
          {/* Step Progress Bar */}
          {/* Step 1 */}
          <div style={{ marginLeft: '20px' }}>
            <div
              style={{
                width: '25px',
                height: '25px',
                borderRadius: '50%',
                border: '5px solid #D9D9D9',
                backgroundColor: currentStep >= 1 ? 'white' : '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <p style={{ margin: 0, whiteSpace: 'nowrap', fontSize: '14px', marginTop: '50px' }}>Add Profile</p>
            </div>
          </div>
          {/* Step 2 */}
          <div style={{ width: '70%', height: '1px', backgroundColor: '#000' }}></div>
          <div
            style={{
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              border: '5px solid #D9D9D9',
              backgroundColor: currentStep >= 2 ? 'white' : '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <p style={{ margin: 0, whiteSpace: 'nowrap', fontSize: '14px', marginTop: '50px' }}>Verify ID & Bank</p>
          </div>
          {/* Step 3 */}
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
            }}>
            <p style={{ margin: 0, whiteSpace: 'nowrap', fontSize: '14px', marginTop: '50px' }}>Add Product</p>
          </div>
        </Col>
        <Col xs={3} md={3}></Col>
      </Row>
      <Row className="justify-content-between align-items-center">
        <Col md={3}></Col>
        <Col md={6}>
          {/* Form */}
          <Form style={{ marginTop: '100px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={AddProd} alt="Add Product" style={{ height: '75px', width: '75px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
              <Button type="submit" style={{ backgroundColor: '#00BA29', height: '50px', width: '400px' }}>
                Add New Product
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '35px' }}>
              <Button type="submit" style={{ backgroundColor: '#00BA29', height: '50px', width: '400px' }}>
                Bulk Upload Products
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '35px' }}>
              <Button type="submit" style={{ backgroundColor: '#00BA29', height: '50px', width: '400px' }}>
                Manage Products
              </Button>
            </div>
            <Button type="button" variant="light" style={{ height: '50px', width: '150px', position: 'absolute', right: '20px', marginTop: '40px' }}>
              <img src={Back} alt="Back" style={{ marginRight: '10px', height: '20px' }} />
              Back
            </Button>
          </Form>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
};

export default AddProduct;