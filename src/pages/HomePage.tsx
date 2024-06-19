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
import Item1 from "../assets/Carrot.png";
import ExampleCarouselImage from "../assets/Offers.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Functional Component for Home Page
const Home: React.FC = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/categories")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        setCategories(response.data);
      });
  }, []);

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the API endpoint
    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data);
        // Update the state with the fetched products data
        setProducts(data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
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
    } else if (type === "openNewWindow") {
      window.open("https://example.com", "_blank");
    }
  };
  // Function to generate custom buttons with text and image
  const generateButton = (text: string, image: string, link: string) => (
    <Col md={3} key={text}>
      <Link to={link} style={{ textDecoration: "none" }}>
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
            (e.currentTarget.style.boxShadow = "0 2px 15px rgba(0, 0, 0, 0.4)")
          }
        >
          <img
            src={image}
            alt={text}
            style={{ height: "30px", padding: "5px" }}
          />
          {text}
        </Button>
      </Link>
    </Col>
  );

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
                  onClick={() => handleButtonClick("openNewWindow")}
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
          {/* Mapping categories to generate buttons with links */}
          {categories.map((category, index) =>
            generateButton(
              category,
              [FruitImage, VegeImage, GrainImage, OtherImage][index],
              `/${category}`
            )
          )}
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
              Featured Products
            </h1>
          </Col>
        </Row>
        {/*Product list*/}
        <Row className="mt-4 d-flex justify-content-center align-items-center">
          {products.map((product) => (
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
                      src={product.image} // Use the image from the fetched product data
                      style={{
                        height: "70%",
                        width: "70%",
                        alignItems: "center",
                      }}
                      onClick={(e) => {
                        e.preventDefault();

                        // Add any custom functionality you want here
                      }}
                    />
                  </div>
                </Card.Link>
                <Card.Body>
                  <Card.Text style={{ fontSize: "14px", lineHeight: "2" }}>
                    <span style={{ fontWeight: "bold" }}>{product.name}</span>
                    <br /> {/* Use the name from the fetched product data */}
                    <span style={{ fontFamily: "Sans-serif" }}>
                      Rs. {product.price} - 1kg
                    </span>
                    <br /> {/* Use the price from the fetched product data */}
                    <span style={{ fontFamily: "Sans-serif" }}>
                      {product.seller.store_name}
                    </span>
                    <br />
                    <Button
                      variant="primary"
                      style={{
                        backgroundColor: "#00BA29",
                        border: "none",
                        fontSize: "12px", // Adjust the font size here
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
                      Add to Cart
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
              Recommended Products
            </h1>
          </Col>
        </Row>
        <Row className="mt-4 d-flex justify-content-center align-items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <Col key={index} xs={12} sm={6} md={6} lg={3} className="mb-4">
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
                      src={Item1}
                      style={{
                        height: "70%",
                        width: "70%",
                        alignItems: "center",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        // Add any custom functionality you want here
                      }}
                    />
                  </div>
                </Card.Link>
                <Card.Body>
                  <Card.Text style={{ fontSize: "14px", lineHeight: "2" }}>
                    <span style={{ fontWeight: "bold" }}>Rs.700.00</span>
                    <br />
                    <span style={{ fontFamily: "Sans-serif" }}>
                      Carrot - 1 Kg
                    </span>
                    <br />
                    <span style={{ fontStyle: "italic", color: "#555" }}>
                      Sachee Stores
                    </span>
                    <br />
                    <Button
                      variant="primary"
                      style={{
                        backgroundColor: "#00BA29",
                        border: "none",
                        fontSize: "12px", // Adjust the font size here
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
                      Add to Cart
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
