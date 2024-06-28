import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Logo from "../../assets/Logo.png";
import More from "../../assets/more.svg";

// Define the types for the ProductRow component's props
interface ProductRowProps {
  productId: number;
  productName: string;
  sellerId: number;
  sellerContact: string;
}

// ProductRow Component
const ProductRow: React.FC<ProductRowProps> = ({ productId, productName, sellerId, sellerContact }) => {
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
            {productId}
          </p>
        </Col>

        <Col md="2" lg="2" xl="2">
          <p className="mb-0" style={{ fontSize: "10px" }}>
            {productName}
          </p>
        </Col>

        <Col md="3" lg="3" xl="3" className="d-flex align-items-center">
          <p className="mb-0" style={{ fontSize: "10px" }}>
            {sellerId}
          </p>
        </Col>

        <Col md="3" lg="3" xl="3" className="d-flex align-items-center">
          <p className="mb-0" style={{ fontSize: "10px" }}>
            {sellerContact}
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
            Do you want to remove this product from the system.
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

// Products Component
const Products: React.FC = () => {
  const productsData = [
    { productId: 1, productName: "Product One", sellerId: 101, sellerContact: "0764707720" },
    { productId: 2, productName: "Product Two", sellerId: 102, sellerContact: "0712345678" },
    // Add more product data as needed
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
        Manage Products
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
              <h6 style={{ fontSize: "10px" }}>Product ID</h6>
            </Col>

            <Col md="2" lg="2" xl="2">
              <h6 style={{ fontSize: "10px" }}>Product Name</h6>
            </Col>

            <Col md="3" lg="3" xl="3">
              <h6 style={{ fontSize: "10px" }}>Seller ID</h6>
            </Col>

            <Col md="3" lg="3" xl="3" className="d-flex align-items-center">
              <h6 style={{ fontSize: "10px" }}>Seller Contact Info</h6>
            </Col>

            <Col md="1" lg="1" xl="1"></Col>
          </Row>

          <hr style={{ marginTop: "-20px" }} />

          {productsData.map((product) => (
            <ProductRow
              key={product.productId}
              productId={product.productId}
              productName={product.productName}
              sellerId={product.sellerId}
              sellerContact={product.sellerContact}
            />
          ))}
        </Col>

        <Col md="3"></Col>
      </Row>
    </Container>
  );
};

export default Products;
