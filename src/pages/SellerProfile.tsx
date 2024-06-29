import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import Header from "../components/Header-main";
import Footer from "../components/Footer-main";
import ProfileImage from "../assets/ProPic.png"; // Add a placeholder image for the seller profile
import Item1 from "../assets/carrot.jpeg"; // Add a placeholder image for the products
import { useNavigate, useParams } from "react-router-dom";

const SellerProfile: React.FC = () => {
  const navigate = useNavigate();
  const { sellerId } = useParams<{ sellerId: string }>();
  const [seller, setSeller] = useState<any>({});
  const [products, setProducts] = useState<any[]>([]);
  const [productCount, setProductCount] = useState<number>(0);
  const [showProducts, setShowProducts] = useState<boolean>(false);

  useEffect(() => {
    // Fetch seller details
    fetch(`http://localhost:8000/api/seller/details?sellerId=${sellerId}`) // Assuming sellerId is 1
      .then((response) => response.json())
      .then((data) => {
        console.log("Seller Data:", data); // Add this line to debug the received data
        setSeller(data);
      })
      .catch((error) => console.error("Error fetching seller details:", error));
  }, [sellerId]);

  const handleShowProducts = () => {
    fetch(`http://localhost:8000/api/seller/products?sellerId=${sellerId}`) // Adjust sellerId as needed
      .then((response) => response.json())
      .then((data) => {
        const productsWithRatings = data.map(
          (product: { review: string | any[] }) => ({
            ...product,
            rating:
              product.review && product.review.length > 0
                ? product.review[0].rating
                : "N/A", // Assuming you want to show the first rating found
          })
        );
        setProducts(productsWithRatings);
        setProductCount(productsWithRatings.length);
        setShowProducts(true);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  return (
    <div>
      <Header />
      <Container fluid className="p-4 bg-light" style={{ minHeight: "80vh" }}>
        <Row>
          <Col md={3} className="d-flex flex-column align-items-center">
            <img
              src={seller.profilePic || ProfileImage} // Use seller's profile picture if available, otherwise use placeholder
              alt="Seller Profile"
              className="rounded-circle"
              style={{ width: "150px", height: "150px", marginTop: "80px" }}
            />
          </Col>
          <Col md={9} className="d-flex flex-column justify-content-center">
            <Card
              className="mt-4"
              style={{
                width: "80%",
                border: "2px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                borderRadius: "10px",
                padding: "20px",
                margin: "10px",
                background:
                  "linear-gradient(to bottom, #E5F4D7, #F5FBEF, #DFFFC0,#F5FBEF)",
              }}
            >
              <Card.Body>
                <Card.Title style={{ padding: "0 0 30px 0", fontSize: "30px" }}>
                  {seller.store_name}
                </Card.Title>
                <Card.Text>
                  <p>
                    <strong>Address:</strong> {seller.line2}
                  </p>
                  <p>
                    <strong>Phone:</strong> {seller.contactNo}
                  </p>
                  <p>
                    <strong>Email:</strong> {seller.email}
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
            <div
              className="mt-3 d-flex justify-content-center"
              style={{ marginRight: "160px", position: "relative" }}
            >
              <Button
                variant="primary"
                className="me-2"
                onClick={handleShowProducts}
                style={{
                  backgroundColor: "#00BA29",
                  border: "none",
                  fontWeight: "bold",
                  borderRadius: "3px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  position: "relative", // Add relative positioning to the button
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "1px 1px 2px 2px rgba(0, 0, 0, 0.2)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 3px 7px rgba(0, 0, 0, 0.1)")
                }
              >
                Show Products
                {productCount > 0 && (
                  <Badge
                    pill
                    style={{
                      backgroundColor: "blue",
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                    }}
                  >
                    {productCount}
                  </Badge>
                )}
              </Button>
            </div>
          </Col>
        </Row>

        {showProducts && (
          <Container
            className="mt-4"
            style={{
              justifyContent: "center",
              alignItems: "center",
              background:
                "linear-gradient(to bottom, #E5F4D7, #F5FBEF, #DFFFC0,#F5FBEF)",
              border: "2px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              borderRadius: "30px",
              padding: "20px",
            }}
          >
            <Row className="justify-content-md-center">
              <Col md="auto">
                <h1
                  style={{
                    fontFamily: "Poppins",
                    color: "#484848",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "3px",
                    backgroundClip: "text",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Products
                </h1>
              </Col>
            </Row>
            <Row className="mt-4 d-flex justify-content-center align-items-center">
              {products.map((product) => (
                <Col
                  key={product.product_id}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={3}
                  className="mb-4"
                >
                  <Card
                    style={{
                      width: "100%",
                      border: "2px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                      borderRadius: "10px",
                      padding: "20px",
                    }}
                  >
                    <Card.Link href="#">
                      <div className="d-flex justify-content-center align-items-center">
                        <Card.Img
                          variant="top"
                          src={Item1} // Placeholder image
                          style={{
                            height: "70%",
                            width: "70%",
                            alignItems: "center",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/ItemDetails/${product.product_id}`);
                          }}
                        />
                      </div>
                    </Card.Link>
                    <Card.Body>
                      <Card.Text style={{ fontSize: "14px", lineHeight: "2" }}>
                        <span style={{ fontWeight: "bold" }}>
                          {product.name}
                        </span>
                        <br />
                        <span style={{ fontFamily: "Sans-serif" }}>
                          Rs. {product.price} - 1kg
                        </span>
                        <br />
                        <span style={{ fontSize: "12px", color: "#6c757d" }}>
                          Rating: {product.rating}
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default SellerProfile;
