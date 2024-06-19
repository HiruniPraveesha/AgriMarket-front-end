import { useState, useEffect, ChangeEvent } from "react";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MainHeader from "../../components/Header-main";
import MainFooter from "../../components/Footer-main";
import Payment from "../Checkout/Payment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartItem from "../Checkout/cart-row";
import Avacado from "../../assets/Avocado.png";

export default function Checkout() {
  const [isPickup, setIsPickup] = useState(false);

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "flexRadioDefault2") {
      setIsPickup(true);
    } else {
      setIsPickup(false);
    }
  };

  return (
    <>
      <MainHeader />
      <section className="h-100 h-custom" style={{ backgroundColor: "white" }}>
        <div className="py-5 h-100">
          <Row className="justify-content-center align-items-center h-100 w-100">
            <Col lg="8">
              <Card
                className="card-registration card-registration-2"
                style={{ border: "0px" }}
              >
                <Card.Body className="p-0">
                  <Row className="g-0">
                    <Col md="6" lg="6" xl="6">
                      <div className="p-1">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h2
                            className="mb-0 text-black"
                            style={{ fontWeight: "600", fontSize: "20px" }}
                          >
                            Shipping Details
                          </h2>
                          <Form.Group
                            className="mb-0 d-flex align-items-center"
                            controlId="formBasicCheckbox"
                          >
                            <Form.Check
                              type="checkbox"
                              label="Auto Fill"
                              className="ms-auto"
                            />
                          </Form.Group>
                        </div>

                        <hr style={{ marginTop: "-30px" }} />

                        <Row>
                          <Col>
                            <table style={{ width: "100%" }}>
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="form-check d-flex align-items-center">
                                      <Row className="w-100">
                                        <Col md={9}>
                                          <div>
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="flexRadioDefault1"
                                              onChange={handleOptionChange}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="flexRadioDefault1"
                                            >
                                              Delivery
                                            </label>
                                            <p
                                              style={{
                                                color: "#666666",
                                                fontSize: "10px",
                                              }}
                                            >
                                              Price may vary depending on the
                                              item/destination.
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <p
                                              className="text-end mb-0"
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Rs.300.00
                                            </p>
                                          </div>
                                        </Col>
                                      </Row>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="form-check d-flex align-items-center">
                                      <Row className="w-100">
                                        <Col md={9}>
                                          <div>
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="flexRadioDefault2"
                                              onChange={handleOptionChange}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="flexRadioDefault2"
                                            >
                                              Pickup from Store
                                            </label>
                                            <p
                                              style={{
                                                color: "#666666",
                                                fontSize: "10px",
                                              }}
                                            >
                                              <span>
                                                No.240, Katubedda, Moratuwa
                                              </span>
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <p
                                              className="text-end mb-0"
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Rs.0.00
                                            </p>
                                          </div>
                                        </Col>
                                      </Row>
                                    </div>
                                  </td>
                                </tr>
                                <p style={{ fontSize: "9px" }}>
                                  <span>Please note:</span> You can only select{" "}
                                  <span style={{ fontWeight: "bold" }}>
                                    Pick Up from Store
                                  </span>{" "}
                                  if all items in your cart are from the same
                                  store.
                                </p>
                              </tbody>
                            </table>
                          </Col>
                        </Row>

                        <hr style={{ marginTop: "5px" }} />

                        <Form style={{ fontSize: "12px" }}>
                          <Form.Group
                            className="mb-3"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Form.Label>
                              Contact Info
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              style={{ width: "100%", marginBottom: "8px" }}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Form.Label>
                              Street Address
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              disabled={isPickup}
                              type="text"
                              style={{ width: "100%", marginBottom: "8px" }}
                            />
                            <Form.Control
                              disabled={isPickup}
                              type="text"
                              style={{ width: "100%", marginBottom: "8px" }}
                            />
                          </Form.Group>

                          <Form.Label>
                            City<span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            disabled={isPickup}
                            type="text"
                            style={{ width: "100%", marginBottom: "18px" }}
                          />

                          <Form.Group
                            className="mb-3"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Form.Label>
                              Zip/Postal Code
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              disabled={isPickup}
                              type="text"
                              style={{ width: "100%", marginBottom: "8px" }}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Form.Control
                              as="textarea"
                              placeholder="Add Delivery instructions here"
                              style={{
                                width: "100%",
                                marginBottom: "8px",
                                height: "100px",
                              }}
                            />
                          </Form.Group>
                        </Form>
                      </div>
                    </Col>

                    <Col lg="1"></Col>

                    <Col md="5">
                      <Card
                        className="p-4 bg-green"
                        style={{
                          background:
                            "linear-gradient(to bottom, #DFFFC0, #FFFFFF)",
                          border: "1px solid #01B928",
                          marginBottom: "15px",
                        }}
                      >
                        <Row>
                          <Col xs={6}>
                            <h5
                              style={{ fontSize: "15px", fontWeight: "bold" }}
                            >
                              Order Summary
                            </h5>
                          </Col>
                          <Col xs={6} className="text-end">
                            <h5 style={{ fontSize: "15px" }}>2 Items</h5>
                          </Col>
                        </Row>
                        <hr />

                        <Card.Body>
                          <Row
                            className="align-items-center"
                            style={{ marginBottom: "15px", marginTop: "-15px" }}
                          >
                            <Col xs="2" className="mb-4 mb-lg-0">
                              <div className="bg-image rounded hover-zoom hover-overlay">
                                <img
                                  src={Avacado}
                                  className="w-100"
                                  style={{ maxWidth: "80px" }}
                                />
                              </div>
                            </Col>
                            <Col xs="6" className="mb-4 mb-lg-0">
                              <div style={{ paddingRight: "5px" }}>
                                <p style={{ fontSize: "12px", margin: "0" }}>
                                  Avocado - 1 Kg
                                </p>
                                <p style={{ fontSize: "10px", margin: "0" }}>
                                  Qty <span>1</span>
                                </p>
                                <p style={{ fontSize: "12px", margin: "0" }}>
                                  ABC Store
                                </p>
                              </div>
                            </Col>
                            <Col xs="4" className="mb-4 mb-lg-0">
                              <strong>
                                <p
                                  className="text-start text-md-center"
                                  style={{ fontSize: "12px" }}
                                >
                                  Rs.450
                                </p>
                              </strong>
                            </Col>
                          </Row>

                          <Row className="align-items-center">
                            <Col xs="2" className="mb-4 mb-lg-0">
                              <div className="bg-image rounded hover-zoom hover-overlay">
                                <img
                                  src={Avacado}
                                  className="w-100"
                                  style={{ maxWidth: "80px" }}
                                />
                              </div>
                            </Col>
                            <Col xs="6" className="mb-4 mb-lg-0">
                              <div style={{ paddingRight: "5px" }}>
                                <p style={{ fontSize: "12px", margin: "0" }}>
                                  Avocado - 1 Kg
                                </p>
                                <p style={{ fontSize: "10px", margin: "0" }}>
                                  Qty <span>1</span>
                                </p>
                                <p style={{ fontSize: "12px", margin: "0" }}>
                                  ABC Store
                                </p>
                              </div>
                            </Col>
                            <Col xs="4" className="mb-4 mb-lg-0">
                              <strong>
                                <p
                                  className="text-start text-md-center"
                                  style={{ fontSize: "12px" }}
                                >
                                  Rs.450
                                </p>
                              </strong>
                            </Col>
                          </Row>

                          <hr />

                          <div className="d-flex justify-content-between mb-2">
                            <h5 style={{ fontSize: "12px" }}>Sub-total</h5>
                            <h5 style={{ fontSize: "12px" }}>Rs.500</h5>
                          </div>

                          <div className="d-flex justify-content-between mb-2">
                            <h5 style={{ fontSize: "12px" }}>Shipping</h5>
                            <h5 style={{ fontSize: "12px" }}>Rs.300</h5>
                          </div>

                          <div className="d-flex justify-content-between mb-2">
                            <h5 style={{ fontSize: "12px" }}>
                              Promo code discount
                            </h5>
                            <h5 style={{ fontSize: "12px" }}>-Rs.50</h5>
                          </div>

                          <hr />

                          <div className="d-flex justify-content-between mb-2">
                            <h5 style={{ fontSize: "20px" }}>Total</h5>
                            <h5
                              style={{
                                fontSize: "30px",
                                marginBottom: "-5px",
                                fontWeight: "bold",
                              }}
                            >
                              Rs.750
                            </h5>
                          </div>
                        </Card.Body>
                      </Card>

                      <Payment />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
      <MainFooter />
    </>
  );
}
