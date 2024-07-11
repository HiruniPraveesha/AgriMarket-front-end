import React from 'react';
import { Card, Container, Row, Col, Button, Image } from 'react-bootstrap';
import Location from '../../assets/location.svg';
import Document from '../../assets/Document.svg';
import Avocado from '../../assets/Avocado.png';
import MainHeader from '../../components/Header-main';
import Footer2 from '../../components/Footer-main';

export default function OrderDetails() {
  return (
    <>
      <MainHeader />
      <section className="h-100 gradient-custom" style={{ backgroundColor: "white" }}>
        <Container className="py-5 h-100">
          <Row className="justify-content-center align-items-center h-100">
            <Col lg="10" xl="8">
              <Card style={{ borderRadius: "10px" }}>
                <Card.Header className="px-4 py-3" style={{ fontSize: "1.5rem" }}>
                  <h5 className="text-muted mb-0">Completed</h5>
                </Card.Header>

                <Card.Body className="p-4">
                  <Card className="shadow-0 border mb-4">
                    <Card.Body>
                      <Row>
                        <Col md="6" className="d-flex align-items-center">
                          <Image src={Location} alt="Location" style={{ marginRight: "10px" }} />
                          <div>
                            <p className="mb-0">Pawan Dhanapala</p>
                            <p className="mb-0">0764707720</p>
                            <p className="mb-0">No.50/B, Dambawela Road, Ampitiya</p>
                            <p className="mb-0">Kandy, Central, Sri Lanka, 20160</p>
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="d-flex align-items-center">
                            <Image src={Document} alt="Document" style={{ marginRight: "10px" }} />
                            <div>
                              <p className="text-muted mb-0">Order No: <span style={{ color: "black" }}>#3113</span></p>
                              <p className="text-muted mb-0">Order placed on: <span style={{ color: "black" }}> Sep 22, 2023</span></p>
                              <p className="text-muted mb-0">Payment method: <span style={{ color: "black" }}> Credit/Debit card</span></p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: 1 }} />

                      <Row className="align-items-center">
                        <div className="text-left mb-4">
                          <a href="link_to_store" target="_blank" rel="noopener noreferrer" className="btn" style={{ color: '#00BA29' }}>Visit Store &gt;</a>
                        </div>

                        <Col md="2">
                          <Image src={Avocado} fluid alt="Avocado" />
                        </Col>

                        <Col md="8">
                          <div className="d-flex flex-column">
                            <h6 className="mb-2 text-muted">Product Name: <span style={{ color: "black" }}>Avocado - 1Kg</span></h6>
                            <p className="text-muted mb-1">Qty:<span style={{ color: "black" }}> 1</span></p>
                            <p className="text-muted mb-1">Price: <span style={{ color: "black" }}>Rs.350.00</span></p>
                          </div>
                        </Col>

                        <Col md="2">
                          <div className="d-flex flex-column">
                            <Button className="btn-sm mb-2" style={{ backgroundColor: '#00BA29', color: 'white', borderRadius: '20px' }}>Add to Cart</Button>
                            <Button className="btn-sm" variant="outline-dark" style={{ borderRadius: '20px' }}>Feedback</Button>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>

                  {/* Rest of your code */}
                </Card.Body>
                <Card.Footer className="px-4 py-3" style={{ fontSize: "1.5rem" }}>
                  <h5 className="text-muted mb-0 d-flex justify-content-end" style={{ fontSize: "0.9rem" }}>
                    <span>Total paid:</span> <span className="ms-2">Rs.470.00</span>
                  </h5>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer2 />
    </>
  );
}
