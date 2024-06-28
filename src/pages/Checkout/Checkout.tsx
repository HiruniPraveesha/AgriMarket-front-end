import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MainHeader from "../../components/Header-main";
import MainFooter from "../../components/Footer-main";
import Payment from "../Checkout/Payment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avacado from "../../assets/Avocado.png";

type CartItem = {
  name: string;
  quantity: number;
  price: number;
  store_name?: string;
  imageUrl?: string;
};

type Seller = {
  line1: string;
  line2: string;
  city: string;
};

export default function Checkout() {
  const [isPickup, setIsPickup] = useState(false);
  const [autoFill, setAutoFill] = useState(false);
  const [shippingCost, setShippingCost] = useState(0); // Initialize to 0
  const [selectedOption, setSelectedOption] = useState("flexRadioDefault1"); 
  const [sameStore, setSameStore] = useState(true); // New state for checking if all items are from the same store
  const [storeAddress, setStoreAddress] = useState<Seller | null>(null); // State for store address
  const [deliveryDetails, setDeliveryDetails] = useState({
    contactInfo: "",
    streetAddress: "",
    streetAddress2: "",
    city: "",
    postalCode: "",
    deliveryInstructions: "",
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      const items = JSON.parse(storedCart);
      setCartItems(items);
      checkSameStore(items);
    }
  }, []);

  useEffect(() => {
    if (sameStore && cartItems.length > 0) {
      fetchSellerAddress(cartItems[0].store_name);
    }
  }, [sameStore, cartItems]);

  const fetchSellerAddress = async (storeName?: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/get-seller-address`, {
        params: {
          storeName: storeName,
        },
      });
      console.log("Response from fetchSellerAddress:", response.data); // Log the response data
      const data = response.data;
      if (data) {
        setStoreAddress({
          line1: data.line1,
          line2: data.line2,
          city: data.city,
        });
      }
    } catch (error) {
      console.error("Error fetching seller's address:", error);
    }
  };
  

  const checkSameStore = (items: CartItem[]) => {
    if (items.length > 0) {
      const storeName = items[0].store_name;
      const allSameStore = items.every((item) => item.store_name === storeName);
      setSameStore(allSameStore);
      if (allSameStore) {
        // Fetch and set store address if all items are from the same store
        fetchSellerAddress(storeName);
      } else {
        setStoreAddress(null);
      }
    }
  };

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isPickupOption = e.target.id === "flexRadioDefault2";
    setIsPickup(isPickupOption);
    setShippingCost(isPickupOption ? 0 : 300); // Update shipping cost
    setSelectedOption(e.target.id); // Set selected option

    // Disable and clear address fields if pickup is selected
    if (isPickupOption) {
      setDeliveryDetails((prevDetails) => ({
        ...prevDetails,
        streetAddress: "",
        streetAddress2: "",
        city: "",
        postalCode: "",
        deliveryInstructions: "",
      }));
    }
  };

  const handleAutoFillChange = async () => {
    const shouldAutoFill = !autoFill;
    setAutoFill(shouldAutoFill);

    if (shouldAutoFill) {
      try {
        const response = await axios.get(
          "http://localhost:8000/get-delivery-details",
          {
            params: {
              id: 1, // Replace with actual user ID or logic to fetch user ID
            },
          }
        );
        const data = response.data.data;
        setDeliveryDetails({
          contactInfo: data.contactNo,
          streetAddress: isPickup ? "" : data.addresses[0].line1,
          streetAddress2: isPickup ? "" : data.addresses[0].line2,
          city: isPickup ? "" : data.addresses[0].city,
          postalCode: isPickup ? "" : "", // You need to add postalCode logic in backend and update here.
          deliveryInstructions: "", // You need to add delivery instructions logic in backend and update here.
        });
      } catch (error) {
        console.error("Error fetching delivery details:", error);
      }
    } else {
      // Clear all fields
      setDeliveryDetails({
        contactInfo: "",
        streetAddress: "",
        streetAddress2: "",
        city: "",
        postalCode: "",
        deliveryInstructions: "",
      });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryDetails({
      ...deliveryDetails,
      [name]: value,
    });
  };

  const calculateSubTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    setIsPickup(false);
    setShippingCost(300);
  }, []);
  
  

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
                              checked={autoFill}
                              onChange={handleAutoFillChange}
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
                                              checked={
                                                selectedOption === "flexRadioDefault1"
                                              }
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
                                              The delivery charge will be Rs. 300 for all locations.
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <p
                                              className="text-end mb-0"
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Rs.300
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
                                              disabled={!sameStore} // Disable if items are not from the same store
                                              checked={
                                                selectedOption === "flexRadioDefault2"
                                              }
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="flexRadioDefault2"
                                            >
                                              Pickup from Store
                                            </label>
                                            {sameStore ? (
                                              <p
                                                style={{
                                                  color: "#666666",
                                                  fontSize: "10px",
                                                }}
                                              >
                                                {storeAddress ? (
                                                  <>
                                                    <span>{storeAddress.line1}</span>,
                                                    <span>{storeAddress.line2}</span>,
                                                    <span>{storeAddress.city}</span>
                                                  </>
                                                ) : (
                                                  "Fetching store address..."
                                                )}
                                              </p>
                                            ) : (
                                              <p
                                                style={{
                                                  color: "red",
                                                  fontSize: "10px",
                                                }}
                                              >
                                                All items in the cart are not from the same store.
                                              </p>
                                            )}
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <p
                                              className="text-end mb-0"
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Rs.0
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
                              name="contactInfo"
                              value={deliveryDetails.contactInfo}
                              style={{ width: "100%", marginBottom: "8px" }}
                              onChange={handleInputChange}
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
                              name="streetAddress"
                              value={deliveryDetails.streetAddress}
                              style={{ width: "100%", marginBottom: "8px" }}
                              onChange={handleInputChange}
                            />
                            <Form.Control
                              disabled={isPickup}
                              type="text"
                              name="streetAddress2"
                              value={deliveryDetails.streetAddress2}
                              style={{ width: "100%", marginBottom: "18px" }}
                              onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Form.Label>
                            City
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            disabled={isPickup}
                            type="text"
                            name="city"
                            value={deliveryDetails.city}
                            style={{ width: "100%", marginBottom: "18px" }}
                            onChange={handleInputChange}
                          />

                          <Form.Group
                            className="mb-3"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Form.Label>
                              Postal Code
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              disabled={isPickup}
                              type="text"
                              name="postalCode"
                              value={deliveryDetails.postalCode}
                              style={{ width: "100%", marginBottom: "8px" }}
                              onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Form.Control
                              as="textarea"
                              name="deliveryInstructions"
                              placeholder="Add Delivery instructions here"
                              style={{
                                width: "100%",
                                marginBottom: "8px",
                                height: "100px",
                              }}
                              value={deliveryDetails.deliveryInstructions}
                              onChange={handleInputChange}
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
                            <h5 style={{ fontSize: "15px" }}>
                              {calculateTotalItems()} Items
                            </h5>
                          </Col>
                        </Row>
                        <hr />

                        <Card.Body>
                          {cartItems.map((item, index) => (
                            <Row
                              key={index}
                              className="align-items-center"
                              style={{
                                marginBottom: "15px",
                                marginTop: index === 0 ? "-15px" : "0",
                              }}
                            >
                              <Col xs="2" className="mb-4 mb-lg-0">
                                <div className="bg-image rounded hover-zoom hover-overlay">
                                  <img
                                    className="w-100"
                                    src={item.imageUrl || Avacado}
                                    alt={item.name}
                                    style={{
                                      maxWidth: "80px",
                                      border: "2px solid #ccc",
                                    }}
                                  />
                                </div>
                              </Col>
                              <Col xs="6" className="mb-4 mb-lg-0">
                                <div style={{ paddingRight: "5px" }}>
                                  <p style={{ fontSize: "12px", margin: "0" }}>
                                    {item.name}
                                  </p>
                                  <p style={{ fontSize: "10px", margin: "0" }}>
                                    Qty <span>{item.quantity}</span>
                                  </p>
                                  <p style={{ fontSize: "12px", margin: "0" }}>
                                    {item.store_name}{" "}
                                    {/* Add the store name if available */}
                                  </p>
                                </div>
                              </Col>
                              <Col xs="4" className="mb-4 mb-lg-0">
                                <strong>
                                  <p
                                    className="text-start text-md-center"
                                    style={{ fontSize: "12px" }}
                                  >
                                    Rs.{item.price * item.quantity}
                                  </p>
                                </strong>
                              </Col>
                            </Row>
                          ))}

                          <hr />

                          <div className="d-flex justify-content-between mb-2">
                            <h5 style={{ fontSize: "12px" }}>Sub-total</h5>
                            <h5 style={{ fontSize: "12px" }}>
                              Rs.{calculateSubTotal()}
                            </h5>
                          </div>

                          <div className="d-flex justify-content-between mb-2">
                            <h5 style={{ fontSize: "12px" }}>Shipping</h5>
                            <h5 style={{ fontSize: "12px" }}>
                              {`Rs.${shippingCost}`}
                            </h5>
                          </div>

                          <div className="d-flex justify-content-between mb-2">
                            <h5 style={{ fontSize: "12px" }}>
                              Promo code discount
                            </h5>
                            <h5 style={{ fontSize: "12px" }}>-Rs.0</h5>
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
                              {`Rs.${calculateSubTotal() + shippingCost}`}
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
