import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Logo from "../../assets/Logo.png";
import More from "../../assets/more.svg";
import Photo from "../../assets/ProPic.png";

// Define the types for the SellerRow component's props
interface SellerRowProps {
  id: number;
  storeName: string;
  email: string;
  contact: string;
}

// SellerRow Component
const SellerRow: React.FC<SellerRowProps> = ({ id, storeName, email, contact }) => {
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

        <Col md="2" lg="2" xl="2">
          <p className="mb-0" style={{ fontSize: "10px" }}>
            {storeName}
          </p>
        </Col>

        <Col md="4" lg="4" xl="4" className="d-flex align-items-center">
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
            Do you want to remove this Seller from the system.
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

// Sellers Component
const Sellers: React.FC = () => {
  const sellersData = [
    { id: 1, storeName: "Store One", email: "pawankanchana99@gmail.com", contact: "0764707720" },
    { id: 2, storeName: "Store Two", email: "johndoe@example.com", contact: "0712345678" },
    // Add more seller data as needed
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
        Manage Sellers
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
              <h6 style={{ fontSize: "10px" }}>Seller ID</h6>
            </Col>

            <Col md="2" lg="2" xl="2">
              <h6 style={{ fontSize: "10px" }}>Store Name</h6>
            </Col>

            <Col md="4" lg="4" xl="4">
              <h6 style={{ fontSize: "10px" }}>Email</h6>
            </Col>

            <Col md="3" lg="3" xl="3" className="d-flex align-items-center">
              <h6 style={{ fontSize: "10px" }}>Contact Info</h6>
            </Col>

            <Col md="1" lg="1" xl="1"></Col>
          </Row>

          <hr style={{ marginTop: "-20px" }} />

          {sellersData.map((seller) => (
            <SellerRow
              key={seller.id}
              id={seller.id}
              storeName={seller.storeName}
              email={seller.email}
              contact={seller.contact}
            />
          ))}
        </Col>

        <Col md="3"></Col>
      </Row>
    </Container>
  );
};

export default Sellers;
