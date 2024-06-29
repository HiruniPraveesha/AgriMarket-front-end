import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Card, Carousel } from "react-bootstrap";
import Header from "../components/Header-main";
import Footer from "../components/Footer-main";
import Image1 from "../assets/HomePage1.png";
import Image2 from "../assets/HomePage2.png";
import FruitImage from "../assets/Fruits.png";
import VegeImage from "../assets/Vegetables.png";
import GrainImage from "../assets/Grains.png";
import OtherImage from "../assets/Other.png";
import ExampleCarouselImage from "../assets/Offers.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Functional Component for Home Page
const Home: React.FC = () => {
  const navigate = useNavigate();
  // Scroll to top when route changes
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [location]);

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        // Handle error state or logging as per your application's needs
      });
  }, []);
  // Empty dependency array to run effect only once
  const [products, setProducts] = useState<any[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        const products = response.data.data;
        setProducts(products);

        // Divide the products into featured and recommended lists
        const half = Math.ceil(products.length / 2);
        setFeaturedProducts(products.slice(0, half));
        setRecommendedProducts(products.slice(half));
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // useRef hook to reference the first container element
  const firstContainerRef = useRef<HTMLDivElement>(null);
  // Function to handle button click events
  const handleButtonClick = (type: string) => {
    if (type === "scroll") {
      const scrollAmount = 10; // Adjust the scroll amount as needed
      const firstContainerHeight = firstContainerRef.current?.clientHeight;

      if (firstContainerHeight) {
        window.scrollTo({
          top: firstContainerHeight + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const [cart, setCart] = useState<{ [key: string]: boolean }>({});
  const handleAddToCart = (productId: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: true,
    }));
    // Add any additional logic for adding to cart (e.g., API call)
  };

  return (
    <div>
      <Header />
      <Container
        fluid
        className="p-0 bg-light"
        ref={firstContainerRef}
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#DFFFC0",
          overflow: "hidden",
        }}
      >
        <Row className="m-0">
          <Col md={3} className="p-0" style={{ backgroundColor: "#DFFFC0" }}>
            <img src={Image1} alt="Image1" className="w-100" />
          </Col>
          <Col
            md={5}
            className="p-0 d-md-flex align-items-center"
            style={{ backgroundColor: "#DFFFC0" }}
          >
            <div className="text-center text-md-start p-3">
              <p
                className="text-uppercase fw-bold"
                style={{
                  fontFamily: "Sansita",
                  letterSpacing: "3px",
                  fontSize: "3rem",
                  fontStyle: "italic",
                  fontWeight: "bold",
                  background:
                    "linear-gradient(180deg, #032004 8.13%, #18C01F 62.1%, #00FF0B 73.6%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                AgriMarket
              </p>
              <p
                className="text-success"
                style={{
                  fontFamily: "Inika",
                  fontWeight: "bold",
                  color: "#00BA29",
                  letterSpacing: "1px",
                }}
              >
                100% Healthy and Affordable
              </p>
              <p
                className="text-success fw-bold"
                style={{
                  color: "#00BA29",
                  fontSize: "28px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                Organic Products
              </p>
              <p
                className="text-success"
                style={{
                  fontFamily: "Inika",
                  color: "#00BA29",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                Small Charges, Big Difference
              </p>
              <div className="mt-4">
                <Button
                  variant="primary"
                  className="me-2"
                  style={{
                    backgroundColor: "#00BA29",
                    fontWeight: "bold",
                    fontSize: "11px",
                    border: "none",
                    borderRadius: "3px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    width: "145px",
                    height: "50px",
                    marginRight: "10px", // Add this line to adjust the right margin
                    marginBottom: "10px", // Add this line to adjust the bottom margin in smaller screens
                  }}
                  onClick={() => handleButtonClick("scroll")}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "1px 1px 2px 2px rgba(0, 0, 0, 0.2)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 3px 7px rgba(0, 0, 0, 0.1)")
                  }
                >
                  Shop Now
                </Button>
                <Link to="/BecomeASeller">
                  <Button
                    variant="success"
                    style={{
                      backgroundColor: "#00BA29",
                      fontSize: "11px",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "3px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      width: "145px",
                      height: "50px",
                      marginBottom: "10px", // Add this line to adjust the bottom margin in smaller screens
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
                    Become a Seller
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
          <Col md={4} className="p-0" style={{ backgroundColor: "#DFFFC0" }}>
            <img
              src={Image2}
              alt="Image2"
              className="w-100"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                marginTop: "50px",
              }}
            />
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <Row className="d-flex justify-content-evenly mt-4 mb-4">
          {categories.map((category) => (
            <Col md={3} key={category.category_id}>
              <Button
                variant="outline-primary"
                className="btn-custom"
                style={{
                  backgroundColor: "white",
                  fontFamily: "Inter",
                  color: "black",
                  transition: "box-shadow 0.3s",
                  fontWeight: "bold",
                  borderRadius: "7px",
                  border: "none",
                  boxShadow: "0 2px 15px rgba(0, 0, 0, 0.4)",
                  width: "100%",
                  height: "50px",
                  fontSize: "16px",
                  marginBottom: "15px",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "2px 2px 3px 3px rgba(0, 0, 0, 0.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 2px 15px rgba(0, 0, 0, 0.4)")
                }
                onClick={(e) => {
                  e.preventDefault();

                  navigate(`/Fruits/${category.category_id}`);
                }}
              >
                <img
                  src={
                    [FruitImage, VegeImage, GrainImage, OtherImage][
                      category.category_id - 1
                    ]
                  }
                  alt={category.name}
                  style={{ height: "30px", padding: "5px" }}
                />
                {category.name}
              </Button>
            </Col>
          ))}
        </Row>
      </Container>

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
        {"/Product list/"}
        <Row className="mt-4 d-flex justify-content-center align-items-center">
          {featuredProducts.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={6} lg={3} className="mb-4">
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
                      src={product.image}
                      //src={Item1}
                      style={{
                        height: "70%",
                        width: "70%",
                        alignItems: "center",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(product);
                        navigate(`/ItemDetails/${product.product_id}`);
                      }}
                    />
                  </div>
                </Card.Link>
                <Card.Body>
                  <Card.Text style={{ fontSize: "14px", lineHeight: "2" }}>
                    <span style={{ fontWeight: "bold" }}>{product.name}</span>
                    <br />
                    <span style={{ fontFamily: "Sans-serif" }}>
                      Rs. {product.price} - 1kg
                    </span>
                    <br />

                    <span
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
                    </span>
                    <br />
                    <Button
                      style={{
                        backgroundColor: "#00BA29",
                        border: "none",
                        fontSize: "12px",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.boxShadow =
                          "1px 1px 2px 2px rgba(0, 0, 0, 0.2)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.boxShadow =
                          "0 3px 7px rgba(0, 0, 0, 0.1)")
                      }
                      variant={cart[product.product_id] ? "success" : "primary"}
                      disabled={cart[product.product_id]}
                      onClick={() => handleAddToCart(product.product_id)}
                    >
                      {cart[product.product_id]
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Carousel style={{ paddingBottom: "20px", paddingTop: "20px" }}>
        <Carousel.Item>
          <img
            alt="First slide"
            src={ExampleCarouselImage}
            style={{ width: "100%", maxHeight: "500px" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt="Second slide"
            src={ExampleCarouselImage}
            style={{ width: "100%", maxHeight: "500px" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt="Third slide"
            src={ExampleCarouselImage}
            style={{ width: "100%", maxHeight: "500px" }}
          />
        </Carousel.Item>
      </Carousel>

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
          {recommendedProducts.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={6} lg={3} className="mb-4">
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
                      src={product.image}
                      //src={Item1}
                      style={{
                        height: "70%",
                        width: "70%",
                        alignItems: "center",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(product);
                        navigate(`/ItemDetails/${product.product_id}`);
                      }}
                    />
                  </div>
                </Card.Link>
                <Card.Body>
                  <Card.Text style={{ fontSize: "14px", lineHeight: "2" }}>
                    <span style={{ fontWeight: "bold" }}>{product.name}</span>
                    <br />
                    <span style={{ fontFamily: "Sans-serif" }}>
                      Rs. {product.price} - 1kg
                    </span>
                    <br />

                    <span
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
                    </span>
                    <br />
                    <Button
                      style={{
                        backgroundColor: "#00BA29",
                        border: "none",
                        fontSize: "12px",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.boxShadow =
                          "1px 1px 2px 2px rgba(0, 0, 0, 0.2)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.boxShadow =
                          "0 3px 7px rgba(0, 0, 0, 0.1)")
                      }
                      variant={cart[product.product_id] ? "success" : "primary"}
                      disabled={cart[product.product_id]}
                      onClick={() => handleAddToCart(product.product_id)}
                    >
                      {cart[product.product_id]
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
