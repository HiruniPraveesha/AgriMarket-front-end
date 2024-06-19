import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Logo from "../../assets/Logo.png";
import More from "../../assets/more.svg";
import Photo from "../../assets/ProPic.png";

// Define the types for the BuyerRow component's props
interface BuyerRowProps {
  id: number;
  email: string;
  contact: string;
}

// BuyerRow Component
const BuyerRow: React.FC<BuyerRowProps> = ({ id, email, contact }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Row
        className="mb-4 d-flex justify-content-between align-items-center"
        style={{ marginTop: "-10px" }}
      >
        <Col md="2" lg="2" xl="2">
          <p className="mb-0" style={{ fontSize: "10px", marginLeft: "16px" }}>
            {id}
          </p>
        </Col>

        <Col md="1" lg="1" xl="1">
          <div
            style={{
              position: "relative",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              src={Photo}
              alt="Photo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            />
          </div>
        </Col>

        <Col md="5" lg="5" xl="5" className="d-flex align-items-center">
          <p className="mb-0" style={{ fontSize: "10px" }}>
            {email}
          </p>
        </Col>

        <Col md="3" lg="3" xl="3" className="d-flex align-items-center">
          <p className="mb-0" style={{ fontSize: "10px" }}>
            {contact}
          </p>
        </Col>

        <Col md="1" lg="1" xl="1">
          <Button
            variant="light"
            className="rounded-3"
            style={{
              backgroundColor: "transparent",
              border: "none",
              padding: 0,
            }}
            onClick={toggleExpanded}
          >
            <img
              src={More}
              alt="More"
              style={{
                width: "15px",
                height: "15px",
                objectFit: "contain",
              }}
            />
          </Button>
        </Col>
      </Row>

      {expanded && (
        <Row className="mb-3">
          <Col md={{ span: 9, offset: 3 }} style={{ fontSize: "10px" }}>
            Do you want to remove this Buyer from the system.
            <button style={{ marginBottom: "10px", marginLeft: "20px" }}>
              Remove
            </button>
          </Col>
        </Row>
      )}

      <hr style={{ marginTop: "-17px" }} />
    </>
  );
};

// Buyers Component
const Buyers: React.FC = () => {
  const buyersData = [
    { id: 1, email: "pawankanchana99@gmail.com", contact: "0764707720" },
    { id: 2, email: "johndoe@example.com", contact: "0712345678" },
    // Add more buyer data as needed
  ];

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="auto" className="text-center mb-4">
          <a href="#">
            <img
              src={Logo}
              style={{ height: "110px", width: "130px" }}
              alt="Logo"
            />
          </a>
        </Col>
      </Row>

      <p style={{ fontSize: "15px", fontWeight: "bold", marginLeft: "280px" }}>
        Manage Buyers
      </p>
      <hr
        style={{
          marginTop: "-10px",
          marginBottom: "50px",
          width: "60%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <Row>
        <Col md="3"></Col>

        <Col md="6">
          <Row
            className="mb-4 d-flex justify-content-between align-items-center"
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "gray",
            }}
          >
            <Col md="2" lg="2" xl="2">
              <h6 style={{ fontSize: "10px" }}>Buyer ID</h6>
            </Col>

            <Col md="1" lg="1" xl="1"></Col>

            <Col md="5" lg="5" xl="5">
              <h6 style={{ fontSize: "10px" }}>Email</h6>
            </Col>

            <Col md="3" lg="3" xl="3" className="d-flex align-items-center">
              <h6 style={{ fontSize: "10px" }}>Contact Info</h6>
            </Col>

            <Col md="1" lg="1" xl="1"></Col>
          </Row>

          <hr style={{ marginTop: "-20px" }} />

          {buyersData.map((buyer) => (
            <BuyerRow
              key={buyer.id}
              id={buyer.id}
              email={buyer.email}
              contact={buyer.contact}
            />
          ))}
        </Col>

        <Col md="3"></Col>
      </Row>
    </Container>
  );
};

export default Buyers;
