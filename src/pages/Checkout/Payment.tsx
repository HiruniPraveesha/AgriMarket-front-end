import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
// import CardPayment from "../Checkout/credit-cart";
import OrderSuccessPopup from "../Checkout/pop-up-order";

type DeliveryDetails = {
  contactInfo: string;
  streetAddress: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  deliveryInstructions: string;
};

type Props = {
  deliveryDetails: DeliveryDetails;
};

const Payment: React.FC<Props> = ({ deliveryDetails }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(deliveryDetails);
  const [walletBalance, setWalletBalance] = useState<number | null>(null); // State for wallet balance
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setAddress(deliveryDetails);
  }, [deliveryDetails]);

  const isDeliveryDetailsValid = (method: string) => {
    const { contactInfo, streetAddress, city, postalCode } = address;
    if (method === "Cash") {
      return contactInfo;
    }
    return contactInfo && streetAddress && city && postalCode;
  };

  const handleSelect = (method: string) => {
    if (!isDeliveryDetailsValid(method)) {
      setErrorMessage(
        "Please fill in all required details before selecting a payment method."
      );
      return;
    }
    setErrorMessage("");
    setSelectedMethod(method);
  };

  const handleClose = () => setShowSuccess(false);

  const handlePlaceOrder = async () => {
    if (!isDeliveryDetailsValid(selectedMethod)) {
      setErrorMessage(
        "Please fill in all required details before placing the order."
      );
      return;
    }

    setLoading(true);

    try {
      const cartData = JSON.parse(sessionStorage.getItem("cart") || "[]");
      const usedRewardPoints = Number(sessionStorage.getItem("reward") || "0");

      const deliveryAddress =
        selectedMethod === "Cash"
          ? "Pickup from store"
          : `${address.streetAddress}, ${address.streetAddress2}, ${address.city}, ${address.postalCode}`;

      const products = cartData.map((item: any) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        sellerId: item.seller.seller_id,
        deliveryAddress: deliveryAddress,
        storeAddress: `${item.seller.line1}, ${item.seller.line2} ${item.seller.city}`,
      }));

      const response = await fetch("http://localhost:8080/placeOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyerId: "1", // Replace with actual buyerId if available
          products: products,
          usedRewardPoints: usedRewardPoints,
          deliveryInstructions: address.deliveryInstructions,
          deliverycontactNo: address.contactInfo,
          isPickup: selectedMethod === "Cash",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const responseData = await response.json();
      console.log("Order placed successfully:", responseData);

      sessionStorage.setItem("cart", JSON.stringify([]));
      sessionStorage.removeItem("reward");

      setWalletBalance(responseData.walletBalance); // Update wallet balance
      setShowSuccess(true);
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error: show error message or retry logic
    } finally {
      setLoading(false);
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
                      <div className="mt-3">{/* <CardPayment /> */}</div>
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
                        <p style={{ fontSize: "12px" }}>
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
                          {loading ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                style={{ marginRight: "5px" }}
                              />
                              Placing Order...
                            </>
                          ) : (
                            "Place Order"
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </Form>
                {errorMessage && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "10px",
                      fontSize: "11px",
                    }}
                  >
                    {errorMessage}
                  </p>
                )}
              </Card.Body>
            </Card>
          </Row>
          {walletBalance !== null && (
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
                  <p>Wallet Balance: {walletBalance}</p>
                </Card.Body>
              </Card>
            </Row>
          )}
        </Container>
      </section>
      <OrderSuccessPopup show={showSuccess} handleClose={handleClose} />
    </>
  );
};

export default Payment;
