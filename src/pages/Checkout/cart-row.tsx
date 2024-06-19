import React, { useState, useEffect } from "react";
import { Row, Col, Image, Button, Form } from "react-bootstrap";
import DeleteImage from "../../assets/Delete.svg"; // Adjust path as per your actual structure
import axios from "axios";

interface CartItemProps {
  name: string;
  image: string;
  price: number;
  store_name: string;
  qty: number;
  quantityLimit: number; // Quantity limit received from backend
  onQtyChange: (newQty: number) => void;
  onDelete: () => void;
  productId: number; // Add productId prop
  buyerId: number; // Add buyerId prop
}

const CartItem: React.FC<CartItemProps> = ({
  name,
  image,
  price,
  store_name,
  qty,
  quantityLimit,
  onQtyChange,
  onDelete,
  productId,
  buyerId,
}) => {
  const [subtotal, setSubtotal] = useState(qty * price);

  useEffect(() => {
    setSubtotal(qty * price);
  }, [qty, price]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = parseInt(e.target.value, 10);
    if (!isNaN(newQty)) {
      onQtyChange(newQty);
    }
  };

  const handleQuantityIncrement = () => {
    const newQty = qty + 1;
    if (newQty <= quantityLimit) {
      onQtyChange(newQty);
    }
  };

  const handleQuantityDecrement = () => {
    if (qty > 0) {
      onQtyChange(qty - 1);
    }
  };

  const handleDelete = async () => {
    try {
      // Send a POST request to the backend to remove the product from the cart
      await axios.post("http://localhost:8000/remove-product-from-cart", {
        buyerId,
        productId,
      });
      onDelete(); // Call the onDelete callback passed from the parent component to update the UI
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  return (
    <Row className="mb-4 d-flex justify-content-between align-items-center">
      <Col md="5" lg="5" xl="5">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src={image}
            className="rounded-3"
            style={{ height: "80px", width: "80px" }}
          />
          <div
            style={{
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "13px", marginBottom: "5px" }}>
              {name}
            </span>
            <span style={{ fontSize: "10px" }}>{store_name}</span>
          </div>
        </div>
      </Col>

      <Col md="2" lg="2" xl="2" className="d-flex align-items-center">
        <p className="mb-0" style={{ fontSize: "15px" }}>
          Rs.<span>{price}</span>
        </p>
      </Col>

      <Col md="2" lg="2" xl="2">
        <Button
          variant="link"
          className="px-2"
          onClick={handleQuantityDecrement}
          disabled={qty <= 0}
        >
          <i className="fas fa-minus" />
        </Button>

        <Form.Control
          type="number"
          min="0"
          value={qty}
          size="sm"
          style={{ width: "60px" }}
          onChange={handleQuantityChange}
        />

        <Button
          variant="link"
          className="px-2"
          onClick={handleQuantityIncrement}
          disabled={qty >= quantityLimit}
        >
          <i className="fas fa-plus" />
        </Button>
      </Col>

      <Col md="2" lg="2" xl="2">
        <p className="mb-0" style={{ fontSize: "15px" }}>
          Rs.{subtotal}
        </p>
      </Col>

      <Col md="1" lg="1" xl="1">
        <button
          style={{
            border: "none",
            padding: 0,
            backgroundColor: "transparent",
            cursor: "pointer",
            outline: "none",
          }}
          onClick={handleDelete}
        >
          <Image src={DeleteImage} fluid className="rounded-3" alt="Delete" />
        </button>
      </Col>
    </Row>
  );
};

export default CartItem;
