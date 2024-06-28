import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ProgressBar,
} from "react-bootstrap";
import { Rate } from "antd";
import { Link } from "react-router-dom";

const ItemDetails: React.FC<{ productId: string }> = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [cardCount, setCardCount] = useState(1);
  const leftContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCardCount = () => {
      if (leftContentRef.current) {
        const leftContentHeight = leftContentRef.current.clientHeight;
        const cardHeight = 200; // Estimated height of each card including padding and margin
        const calculatedCardCount = Math.floor(leftContentHeight / cardHeight);
        setCardCount(calculatedCardCount);
      }
    };

    // Call initially and on window resize
    updateCardCount();
    window.addEventListener("resize", updateCardCount);

    return () => {
      window.removeEventListener("resize", updateCardCount);
    };
  }, []); // Empty dependency array ensures it runs only once after initial render

  const [product, setProduct] = useState<any>({});

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the API endpoint
    fetch(`http://localhost:8000/product/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched product:", data);
        // Update the state with the fetched product data
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [productId]); // Dependency array to re-fetch data when productId changes

  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    // Fetch reviews from the API
    fetch(`http://localhost:8000/reviews/${productId}`) // Ensure the correct endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched reviews:", data);
        setReviews(data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [productId]);

  const [ratingTotals, setRatingTotals] = useState<any>({
    rating1: 0,
    rating2: 0,
    rating3: 0,
    rating4: 0,
    rating5: 0,
  });

  useEffect(() => {
    // Make an HTTP GET request to fetch rating totals from the API endpoint
    fetch(`http://localhost:8000/reviews/${productId}/ratingTotals`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched rating totals:", data);
        // Update the state with the fetched rating totals
        setRatingTotals(data);
      })
      .catch((error) => {
        console.error("Error fetching rating totals:", error);
      });
  }, [productId]); // Dependency array to re-fetch data when productId changes

  const [reviewCount, setReviewCount] = useState<number>(0); // Assuming reviewCount is a number

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the API endpoint
    fetch(`http://localhost:8000/reviews/count/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched review count:", data.reviewCount);
        // Update the state with the fetched review count
        setReviewCount(data.reviewCount);
      })
      .catch((error) => {
        console.error("Error fetching review count:", error);
      });
  }, [productId]); // Dependency array to re-fetch data when productId changes

  const [moreProducts, setMoreProducts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch more products excluding the current one
    fetch(`http://localhost:8000/products/more/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched more products:", data);
        setMoreProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching more products:", error);
      });
  }, [productId, cardCount]);

  const incrementQuantity = () => {
    setQuantity(quantity + 0.5);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 0.5);
    }
  };

  const addToCart = () => {
    const currentCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    const updatedCart = [
      ...currentCart,
      { ...product, store_name: product.seller?.store_name, quantity },
    ];
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log("Item added to cart");
  };

  const buyNow = () => {
    console.log("Buying item now");
  };

  const addReviewAndRating = () => {
    console.log("Add Reviews and Rating button clicked");
  };

  const getProgressBar = (percentage: number | undefined) => (
    <ProgressBar
      now={percentage}
      variant="warning"
      style={{ height: "20px", borderRadius: "10px" }}
    />
  );

  return (
    <>
      <Container
        className="mt-4"
        fluid
        style={{ paddingLeft: "30px", paddingRight: "30px" }}
      >
        <Row>
          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <Card.Img
              variant="top"
              src={product.name}
              style={{ border: "1px solid", height: "85%", width: "55%" }}
            />
          </Col>
          <Col
            xs={12}
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <div>
              <Card.Body>
                <Card.Text style={{ fontSize: "16px", lineHeight: "2" }}>
                  <span
                    style={{ fontFamily: "Sans-serif", fontWeight: "bold" }}
                  >
                    {product.name}
                  </span>
                  <br />
                  <span style={{ fontFamily: "Sans-serif" }}>
                    Rs. {product.price}
                  </span>
                  <br />
                  <span style={{ fontFamily: "Sans-serif" }}>
                    {product.seller?.store_name}
                  </span>
                  <br />
                  <br />
                </Card.Text>
              </Card.Body>
              <div
                style={{
                  border: "2px solid #00BA29",
                  borderRadius: "19px",
                  display: "inline-block",
                  marginBottom: "10px",
                  marginTop: "0px",
                }}
              >
                <Button
                  variant="outline-primary"
                  onClick={decrementQuantity}
                  style={{
                    color: "#00BA29",
                    border: "none",
                    borderRight: "2px solid #00BA29",
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                    backgroundColor: "transparent",
                    paddingBottom: "8px",
                    fontWeight: "bold",
                  }}
                >
                  -
                </Button>
                <span className="mx-2" style={{ padding: "4px" }}>
                  {quantity}
                </span>
                <Button
                  variant="outline-primary"
                  onClick={incrementQuantity}
                  style={{
                    color: "#00BA29",
                    border: "none",
                    borderLeft: "2px solid #00BA29",
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0",
                    backgroundColor: "transparent",
                    paddingBottom: "8px",
                    fontWeight: "bold",
                  }}
                >
                  +
                </Button>
              </div>
              <div style={{ marginTop: "20px" }}>
                <Button
                  variant="outline-primary"
                  onClick={addToCart}
                  style={{
                    border: "none",
                    borderRadius: "19px",
                    backgroundColor: "#00BA29",
                    color: "white",
                    width: "120px",
                    fontWeight: "semi-bold",
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={buyNow}
                  style={{
                    border: "none",
                    borderRadius: "19px",
                    backgroundColor: "white",
                    color: "black",
                    width: "120px",
                    marginLeft: "5px",
                    fontWeight: "semi-bold",
                  }}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={12} md={6}>
            <h4 style={{ fontFamily: "Sans-serif" }}>Reviews & Ratings</h4>
            <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
              {product.rating}
            </h2>
            <Rate disabled defaultValue={4.5} />
            <h6 style={{ fontFamily: "Sans-serif" }}>
              {ratingTotals.totalRatingCount} Ratings & {reviewCount} Reviews
            </h6>
            <hr />
            {reviews.map((review, index) => (
              <div key={index}>
                <p style={{ fontWeight: "bold" }}>{review.user.name}</p>
                <Rate disabled defaultValue={review.rating} />
                <p>{review.comment}</p>
                <hr />
              </div>
            ))}
            <div>
              <Button
                variant="outline-primary"
                onClick={addReviewAndRating}
                style={{
                  border: "none",
                  borderRadius: "19px",
                  backgroundColor: "#00BA29",
                  color: "white",
                  width: "180px",
                  fontWeight: "semi-bold",
                }}
              >
                Add Review and Rating
              </Button>
            </div>
          </Col>
          <Col xs={12} md={6} ref={leftContentRef}>
            <h4 style={{ fontFamily: "Sans-serif" }}>More Products</h4>
            <Row>
              {moreProducts.slice(0, cardCount).map((moreProduct) => (
                <Col xs={12} md={6} key={moreProduct.id} className="mb-4">
                  <Card>
                    <Link
                      to={`/product/${moreProduct.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Card.Img
                        variant="top"
                        src={moreProduct.image}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <Card.Body>
                        <Card.Title>{moreProduct.name}</Card.Title>
                        <Card.Text>Rs. {moreProduct.price}</Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ItemDetails;
