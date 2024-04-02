import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import MainHeader from '../../components/Header-main';
import MainFooter from "../../components/Footer-main";
import ProPic from "../../assets/ProPic.png";
import axios from "axios";

export default function Wallet() {
  const [showModal, setShowModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState("");

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleRecharge = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Here you can handle the recharge functionality, such as sending a request to the server
    console.log("Recharge amount:", rechargeAmount);
    // After handling the recharge, you can close the modal
    toggleModal();

    axios.post("http://localhost:8000/wallet")
  };

  return (
    <>
      <MainHeader />
      <div>
        <Container className="container py-5 h-100">
          <Row className="justify-content-center align-items-center h-100">
            <Col md="12" xl="4">
              <Card style={{ borderRadius: '15px' }}>
                <Card.Body className="text-center">
                  <div className="mt-3 mb-4">
                    <img src={ProPic} alt="Profile Picture" style={{ width: '200px', borderRadius: '50%' }} />
                  </div>
                  <h4>Nehan Perera</h4>
                  <p className="text-muted mb-4">Pereranehan51@gmail.com</p>

                  <div className="d-flex justify-content-between text-center mt-5 mb-2">
                    <div className="d-flex flex-grow-1 align-items-center flex-column">
                      <p className="mb-1 h5">{rechargeAmount}</p>
                      <p className="small text-muted mb-0">Wallets Balance</p>
                    </div>
                    
                    <div className="d-flex flex-grow-1 align-items-center flex-column">
                    <Button  onClick={handleRecharge} style={{ height: '27px', width: '27px', padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', backgroundColor:'#00BA29' }}>
                     +
                    </Button>
                    <p className="small text-muted mb-0">Recharge</p>
                    </div>

                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <MainFooter />
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Recharge Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRecharge}>
            <Form.Group controlId="rechargeAmount">
              <Form.Label>Recharge Amount:</Form.Label>
              <Form.Control type="text" value={rechargeAmount} onChange={(e) => setRechargeAmount(e.target.value)} />
            </Form.Group>
            <Button style={{backgroundColor:'#00BA29', marginRight:'3%', marginTop:'2%'}} type="submit">Recharge</Button>
            <Button variant="secondary" onClick={toggleModal} style={{marginTop:'2%'}}>Close</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
