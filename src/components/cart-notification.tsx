import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartNotificationProps {
  isVisible: boolean;
  onClose: () => void;
}

const CartNotification: React.FC<CartNotificationProps> = ({
  isVisible,
  onClose,
}) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchCartProducts();
  }, []);

  useEffect(() => {
    const cartData = sessionStorage.getItem("cart");
    if (cartData) {
      const parsedCartData: CartItem[] = JSON.parse(cartData);
      setCartItems(parsedCartData);
      calculateSubtotal(parsedCartData);
      setTotalItems(
        parsedCartData.reduce((acc, product) => acc + product.quantity, 0)
      );
    } else {
      setCartItems([]);
      setSubtotal(0);
      setTotalItems(0);
    }
  }, [isVisible]);

  const fetchCartProducts = () => {
    try {
      const cartData = sessionStorage.getItem("cart");
      if (cartData) {
        const parsedCartData: CartItem[] = JSON.parse(cartData);
        setCartItems(parsedCartData);
        calculateSubtotal(parsedCartData);
        setTotalItems(
          parsedCartData.reduce((acc, product) => acc + product.quantity, 0)
        );
      } else {
        setCartItems([]);
        setSubtotal(0);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  const calculateSubtotal = (cartItems: CartItem[]) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setSubtotal(total);
  };

  const handleCheckout = () => {
    navigate("/shopping-cart");
  };

  return (
    <div
      className={`notification-bar ${isVisible ? "show" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "300px",
        height: "100vh",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transform: isVisible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease-in-out",
        zIndex: 1050,
        padding: "20px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Your Cart</h5>
        <button
          className="btn btn-link"
          onClick={onClose}
          style={{ color: "#00BA29" }}
        >
          <i className="bi bi-x" style={{ fontSize: "1.5rem" }}></i>{" "}
          {/* Bootstrap Icons cross */}
        </button>
      </div>
      <div>
        <p className="mb-0" style={{ marginTop: "-15px" }}>
          Total Items: {totalItems}
        </p>
        <hr />
        {cartItems.length === 0 ? (
          <p>Your cart is currently empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="row mb-3">
                <div className="col-8">
                  <p className="mb-0">
                    <strong>{item.name}</strong>
                  </p>
                  <p className="mb-0">Qty: {item.quantity}</p>
                </div>
                <div className="col-4 text-end">
                  <p className="mb-0">Rs.{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <hr style={{ marginBottom: "-15px" }} />

      <div className="d-flex justify-content-between align-items-center mt-4">
        <div>
          <p className="mb-0">Subtotal:</p>
        </div>
        <div className="text-end">
          <p className="mb-0">Rs.{subtotal}</p>
        </div>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          style={{
            width: "200px",
            height: "30px",
            fontSize: "12px",
            backgroundColor: "#01B928",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          View Shopping Cart
        </Button>
      </div>
    </div>
  );
};

export default CartNotification;
