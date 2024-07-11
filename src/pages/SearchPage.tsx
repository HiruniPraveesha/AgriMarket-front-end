import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]); // Initialize products as an empty array
  const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products");
        console.log("Fetched products:", response.data);

        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data)
        ) {
          setProducts(response.data.data);
        } else {
          console.error("Invalid response structure:", response.data);
          setProducts([]); // Set products to an empty array if data is invalid
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Set products to an empty array if there's an error
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: any, quantity = 1) => {
    const buyerIdString = localStorage.getItem("sellerId");
    const buyerId = buyerIdString ? parseInt(buyerIdString) : null;

    if (buyerId === null) {
      console.error("Buyer ID is missing");
      setShowModal(true);
      return;
    }

    const currentCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    const updatedCart = [...currentCart, { ...product, quantity }];
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log("Item added to cart", product.product_id);
  };

  const handleAddToCartClick = (product: any) => {
    const buyerIdString = localStorage.getItem("sellerId");
    const buyerId = buyerIdString ? parseInt(buyerIdString) : null;

    if (buyerId === null) {
      console.error("Buyer ID is missing");
      setShowModal(true);
      return;
    }

    addToCart(product);
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.product_id]: true,
    }));
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Form
        className="d-flex justify-content-center mb-4"
        style={{ padding: "10px" }}
      >
        <Form.Control
          type="search"
          placeholder="Search products"
          className="me-2"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "50%",
            maxWidth: "600px",
            borderRadius: "20px",
          }}
        />
      </Form>
      <Container
        className="mt-4"
        style={{
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(to bottom, #FBFFF8, #F7F8F5, #F7FFEF,#FEFFFD)",
          borderRadius: "10px",
        }}
      >
        <Row>
          <Col>
            <h1
              className="text-center"
              style={{
                fontFamily: "Poppins",
                color: "#484848",
                justifyContent: "center",
                alignItems: "center",
                padding: "3px",
                marginRight: "auto",
                marginLeft: "auto",
                backgroundClip: "text",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              Products
            </h1>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-3">
          {products.map((product) => (
            <Col
              key={product.product_id}
              md={4}
              className="d-flex justify-content-center mb-4"
            >
              <Card
                className="shadow-sm"
                style={{
                  width: "18rem",
                  transition: "box-shadow 0.3s",
                  backgroundColor: "transparent",
                }}
              >
                <Card.Img
                  variant="top"
                  style={{ cursor: "pointer" }}
                  src={product.image1}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(product);
                    navigate(`/ItemDetails/${product.product_id}`);
                  }}
                />
                <Card.Body className="text-center">
                  <Card.Title style={{ fontSize: "15px" }}>
                    {product.name}
                  </Card.Title>
                  <Card.Text>Rs.{product.price}</Card.Text>
                  <Card.Text
                    style={{
                      fontFamily: "Sans-serif",
                      fontStyle: "italic",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/SellerProfile/${product.seller.seller_id}`);
                    }}
                  >
                    {product.seller.store_name}
                  </Card.Text>
                  <Button
                    variant="primary"
                    style={{
                      backgroundColor: "#00BA29",
                      border: "none",
                      fontSize: "12px",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCartClick(product);
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "1px 1px 2px 2px rgba(0, 0, 0, 0.2)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 3px 7px rgba(0, 0, 0, 0.1)")
                    }
                    disabled={!!addedToCart[product.product_id]}
                  >
                    {addedToCart[product.product_id]
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Authentication Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please log in or register to add items to your cart.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: "#00BA29", borderColor: "#00BA29" }}
            onClick={() => navigate("/signIn")}
          >
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductPage;
