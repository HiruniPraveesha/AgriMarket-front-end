import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface OrderSuccessPopupProps {
  show: boolean;
  handleClose: () => void;
}

const OrderSuccessPopup: React.FC<OrderSuccessPopupProps> = ({
  show,
  handleClose,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header style={{ background: "#DFFFC0" }}></Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "linear-gradient(to bottom, #DFFFC0, #FFFFFF)",
        }}
      >
        <p style={{ fontWeight: "bold", marginTop: "13px" }}>
          ORDER IS CONFIRMED!
        </p>
        <p style={{ color: "#666666", fontSize: "12px", marginTop: "5px" }}>
          Your order has been successfully placed. Thank you for shopping with us!
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          style={{
            display: "block",
            margin: "auto",
            backgroundColor: "#01B928",
            borderColor: "#01B928",
          }}
        >
          Continue Shopping
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderSuccessPopup;
