import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import CardPayment from "../Checkout/credit-cart";

function Payment() {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleSelect = (method: React.SetStateAction<string>) => {
    setSelectedMethod(method);
  };

  const baseStyle = {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "20px",
    marginBottom: "20px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const selectedStyle = {
    backgroundColor: "#e9ecef",
    borderColor: "#007bff",
  };

  const hoverStyle = {
    backgroundColor: "#f9f9f9",
  };

  return (
    <>
      <section className="h-100 gradient-custom">
        <Container>
          <Row className="justify-content-center">
            <Card
            style={{
              background: 'white',
              border: "1px solid #01B928",
              marginBottom: "15px",
              fontSize:'13px'
            }}
            >
              <Card.Body>
                <Card.Title style={{fontSize:'14px', marginBottom:'21px'}}>Select payment method</Card.Title>
                <Form>
                  <div
                    style={{
                      ...baseStyle,
                      ...(selectedMethod === "Credit Card"
                        ? selectedStyle
                        : {}),
                    }}
                    onClick={() => handleSelect("Credit Card")}
                  >
                    <Form.Check
                      type="radio"
                      id="creditCard"
                      name="paymentMethod"
                      label="Pay with Credit Card"
                      value="Credit Card"
                      checked={selectedMethod === "Credit Card"}
                      onChange={() => handleSelect("Credit Card")}
                    />
                    {selectedMethod === "Credit Card" && (
                      <div className="mt-3">
                        <CardPayment />
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      ...baseStyle,
                      ...(selectedMethod === "Wallet" ? selectedStyle : {}),
                    }}
                    onClick={() => handleSelect("Wallet")}
                  >
                    <Form.Check
                      type="radio"
                      id="wallet"
                      name="paymentMethod"
                      label="Pay with Wallet"
                      value="Wallet"
                      checked={selectedMethod === "Wallet"}
                      onChange={() => handleSelect("Wallet")}
                    />
                    {selectedMethod === "Wallet" && (
                      <div className="mt-3">
                        <Form.Group controlId="walletNumber">
                          <Form.Label>Wallet Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter wallet number"
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Pay
                        </Button>
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      ...baseStyle,
                      ...(selectedMethod === "Cash"
                        ? selectedStyle
                        : {}),
                    }}
                    onClick={() => handleSelect("Cash")}
                  >
                    <Form.Check
                      type="radio"
                      id="cashOnDelivery"
                      name="paymentMethod"
                      label="Pay with Cash"
                      value="Cash on Delivery"
                      checked={selectedMethod === "Cash"}
                      onChange={() => handleSelect("Cash")}
                    />
                    {selectedMethod === "Cash" && (
                      <div className="mt-3">
                        <Form.Group controlId="deliveryAddress">
                          <Form.Label>Delivery Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter delivery address"
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Confirm Order
                        </Button>
                      </div>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Payment;
