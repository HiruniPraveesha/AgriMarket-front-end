import React from "react";
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
  cartItems: CartItem[];
}

const CartNotification: React.FC<CartNotificationProps> = ({
  isVisible,
  onClose,
  cartItems,
}) => {
  const navigate = useNavigate();

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
                  <p className="mb-0">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          style={{
            width: "200px",
            height: "30px",
            fontSize: "12px",
            backgroundColor: "#01B928",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "15px",
          }}
          onClick={handleCheckout}
        >
          View Cart
        </Button>
      </div>
    </div>
  );
};

export default CartNotification;
