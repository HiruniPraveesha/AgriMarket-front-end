import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import CreditCard from '../../assets/CreditCard.svg';
import Wallet from '../../assets/Wallet.svg';
import CashOnDelivery from '../../assets/COD.svg';
import Modal from 'react-bootstrap/Modal';
import CompeleteOrder from '../../assets/Completed.svg';
import MainHeader from '../../components/Header-main';
import MainFooter from "../../components/Footer-main";

function Payment() {
   
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePlaceOrder = () => {
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };
  
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);

  const handleShowForm1 = () => {
    setShowForm1(true);
    setShowForm2(false);
    setShowForm3(false);
    setSelectedButton(1);
  };

  const handleShowForm2 = () => {
    setShowForm1(false);
    setShowForm2(true);
    setShowForm3(false);
    setSelectedButton(2);
  };

  const handleShowForm3 = () => {
    setShowForm1(false);
    setShowForm2(false);
    setShowForm3(true);
    setSelectedButton(3);
  };

  

  return (
    <>
    <MainHeader/>
    <section className="h-100 gradient-custom">
      <Container className="py-5 h-100">
        <Row className="justify-content-center my-4">
          <Col md="8">
            <h5>Select Payment Method</h5>
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', padding:'20px'}}>
              
              <Button
                onClick={handleShowForm1}
                style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100px',
                height: '100px',
                backgroundColor:'#DFDEDC',
                margin: '0 10px',
                transform: selectedButton === 1 ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.3s ease-in-out',
                }} >
                <div style={{ marginBottom: '5px' }}>
                <Image src={CreditCard} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                </div>
                <div style={{ fontSize: '8px', color:'black' }}>Credit/Debit Card</div>
                </Button>


                <Button
                  onClick={handleShowForm2}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent:'center',
                    width: '100px',
                    height: '100px',
                    backgroundColor:'#DFDEDC',
                    margin: '0 10px',
                    transform: selectedButton === 2 ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.3s ease-in-out',
                  }} >
                  <div style={{ marginBottom: '10px' }}>
                    <Image src={Wallet} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                  </div>
                  <div style={{ fontSize: '8px', color:'black' }}>Wallet</div>
                </Button>

                <Button
                  onClick={handleShowForm3}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100px',
                    height: '100px',
                    justifyContent:'center',
                    backgroundColor:'#DFDEDC',
                    margin: '0 10px',
                    transform: selectedButton === 3 ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.3s ease-in-out',
                  }} >
                  <div style={{ marginBottom: '5px' }}>
                    <Image src={CashOnDelivery} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                  </div>
                  <div style={{ fontSize: '8px', color:'black' }}>Cash On Delivery</div>
                </Button>

              </div>

              {showForm1 && (
  <Container fluid className="py-5" style={{ backgroundImage: "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background3.webp)" }}>
    <Row className="d-flex justify-content-center">
      <Col md="10" lg="8" xl="5">
        <Card className="rounded-3">
          <Card.Body className="p-4">
            <div className="text-center mb-4">
              <h3>Settings</h3>
              <h6>Payment</h6>
            </div>
            <p className="fw-bold mb-4 pb-2">Saved cards:</p>
            <div className="d-flex flex-row align-items-center mb-4 pb-1">
              <img className="img-fluid" src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="Mastercard" />
              <div className="flex-fill mx-3">
                <div className="form-outline">
                  <Form.Control type="text" placeholder="**** **** **** 3193" readOnly />
                </div>
              </div>
              <a href="#!" className="text-decoration-none">Remove card</a>
            </div>
            <div className="d-flex flex-row align-items-center mb-4 pb-1">
              <img className="img-fluid" src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
              <div className="flex-fill mx-3">
                <div className="form-outline">
                  <Form.Control type="text" placeholder="**** **** **** 4296" readOnly />
                </div>
              </div>
              <a href="#!" className="text-decoration-none">Remove card</a>
            </div>
            <p className="fw-bold mb-4">Add new card:</p>
            <Form.Group className="mb-4">
              <Form.Label>Cardholder's Name</Form.Label>
              <Form.Control type="text" placeholder="Anna Doe" />
            </Form.Group>
            <Row className="mb-4">
              <Col md="7">
                <Form.Group>
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control type="text" placeholder="1234 5678 1234 5678" />
                </Form.Group>
              </Col>
              <Col md="3">
                <Form.Group>
                  <Form.Label>Expire</Form.Label>
                  <Form.Control type="text" placeholder="MM/YYYY" />
                </Form.Group>
              </Col>
              <Col md="2">
                <Form.Group>
                  <Form.Label>CVV</Form.Label>
                  <Form.Control type="password" placeholder="CVV" />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="success" size="lg" >
              Add card
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
)}


{showForm2 && (
  <Form style={{ margin: '0 5%', backgroundColor: '#f0f0f0' }}>
    <div className="row">
      <div className="col-md-6">
        <Form.Group controlId="form2">
          <Form.Label style={{ fontWeight: 'bold', margin:'0 10%', marginTop:'20px' }}>Wallet Balance</Form.Label>
          <p style={{ fontSize: '40px', margin:'0 10%', fontWeight:'bold'}}>Rs.3450</p>
        </Form.Group>
      </div>
      <div className="col-md-6">
       <Form.Label style={{ fontWeight: 'bold', margin:'0 10%', marginTop:'20px' }}>Recharge</Form.Label> 
      </div>
    </div>
    <Button style={{ backgroundColor: '#01B928', color: 'white' }} onClick={handlePlaceOrder}>Place Order</Button>
  </Form>
)}



              {showForm3 && (
                <Form style={{margin:'10px'}}>
                  <p style={{fontSize:'12px'}}>Make the payment in cash to the courier agent at the time of delivery.</p>
                <Button style={{ backgroundColor: '#01B928', color: 'white' }} onClick={handlePlaceOrder}>Place Order</Button>
              </Form>
              
              )}



              {/* Bootstrap Modal for confirmation */}
      <Modal show={showConfirmation} onHide={handleCloseConfirmation} centered >
        <Modal.Header closeButton style={{ background: '#DFFFC0' }}>
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(to bottom, #DFFFC0, #FFFFFF)' }} >
        <img src={CompeleteOrder} style={{ height: '74px', width: '388px', alignSelf: 'center' }} alt="Complete Order" />
        <p style={{fontWeight:'bold', marginTop:'13px'}}>ORDER IS CONFIRMED !</p>
        <p style={{color:'#666666', fontSize:'12px', marginTop:'5px'}}>Thank you so much for your order.</p>
        </Modal.Body>

        <Modal.Footer>
        <Button 
  variant="secondary" 
  onClick={handleCloseConfirmation} 
  style={{
    display: 'block',
    margin: 'auto',
    backgroundColor: '#01B928',
    borderColor: '#01B928'
  }}
>
  Check Status
</Button>

        </Modal.Footer>
      </Modal>
            </div>
          </Col>

          <Col md="1"></Col>

          <Col md="3">
            <Card className="mb-4" style={{ background: 'linear-gradient(to bottom, #DFFFC0, #FFFFFF)' }}>
              <h5 style={{ margin: '5%', fontSize: '15px' }}>Order Summary</h5>
              <hr className="my-1" />
              <Card.Body>
                <Row>
                  <Col md="9">
                    <p className="mb-0" style={{ fontSize: '7px', margin: '0%', color: '' }}>
                      Subtotal (<span>2</span> Items and shipping fee included )
                    </p>
                  </Col>
                  <Col md="3">
                    <strong><p className="text-start text-md-center" style={{ fontSize: '8px' }}>Rs.450.00</p></strong>
                  </Col>
                </Row>

                <Row >
                  <Col md="7" className="mb-4 mb-lg-0">
                    Total Amount
                  </Col>
                  <Col md="5" className="mb-4 mb-lg-0">
                    <strong><p style={{ fontSize: '15px', textAlign: 'end', color: '#00BA29' }}>Rs.450.00</p></strong>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
    <MainFooter/>
    </>
  );
}

export default Payment;
