import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import CardPayment from "../Checkout/credit-cart";
import OrderSuccessPopup from "../Checkout/pop-up-order"; // Adjust the path as per your project structure

function Payment() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [address, setAddress] = useState({
    street1: "",
    street2: "",
    city: "",
    postalCode: "",
  });

  const handleSelect = (method: React.SetStateAction<string>) => {
    setSelectedMethod(method);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleClose = () => setShowSuccess(false);

  const handlePlaceOrder = async () => {
    try {
      // Retrieve cart data from session storage
      const cartData = JSON.parse(sessionStorage.getItem("cart") || "[]");

      // Example of sending cart data to the backend
      const response = await fetch("http://localhost:8000/placeOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyerId: "1", // Replace with actual buyerId
          products: cartData.map(
            (item: {
              product_id: any;
              quantity: any;
              seller: { line1: any; line2: any; city: any };
            }) => ({
              product_id: item.product_id,
              quantity: item.quantity,
              deliveryAddress: ``,
              storeAddress: `${item.seller.line1}, ${item.seller.line2} ${item.seller.city}`, // Example: Construct store address
            })
          ),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const responseData = await response.json();
      console.log("Order placed successfully:", responseData);

      // Reset the cart in session storage
      sessionStorage.setItem("cart", JSON.stringify([]));

      // Show success popup
      setShowSuccess(true);
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error: show error message or retry logic
    }
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

  return (
    <>
      <section className="h-100 gradient-custom">
        <Container>
          <Row className="justify-content-center">
            <Card
              style={{
                background: "white",
                border: "1px solid #01B928",
                marginBottom: "15px",
                fontSize: "13px",
              }}
            >
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "15px",
                    marginBottom: "21px",
                    fontWeight: "bold",
                  }}
                >
                  Select payment method
                </Card.Title>
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
                      ...(selectedMethod === "Cash" ? selectedStyle : {}),
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
                        <p style={{fontSize:'12px'}}>
                          Pay with cash upon delivery or pick up from store.
                        </p>
                        <Button
                          type="button"
                          style={{
                            backgroundColor: "#00BA29",
                            fontWeight: "bold",
                          }}
                          onClick={handlePlaceOrder}
                        >
                          Place Order
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
      <OrderSuccessPopup show={showSuccess} handleClose={handleClose} />
    </>
  );
}

export default Payment;
