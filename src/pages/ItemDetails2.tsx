import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Card, ProgressBar } from 'react-bootstrap';
import { Rate } from 'antd';
//import Carrot from "../assets/Carrot.png";
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
    window.addEventListener('resize', updateCardCount);

    return () => {
      window.removeEventListener('resize', updateCardCount);
    };
  }, []); // Empty dependency array ensures it runs only once after initial render

  const [product, setProduct] = useState<any>({});

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the API endpoint
    fetch(`http://localhost:8000/product/${productId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched product:', data);
        // Update the state with the fetched product data
        setProduct(data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [productId]); // Dependency array to re-fetch data when productId changes

  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    // Fetch reviews from the API
    fetch(`http://localhost:8000/reviews/${productId}`) // Ensure the correct endpoint
      .then(response => response.json())
      .then(data => {
        console.log('Fetched reviews:', data);
        setReviews(data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
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
      .then(response => response.json())
      .then(data => {
        console.log('Fetched rating totals:', data);
        // Update the state with the fetched rating totals
        setRatingTotals(data);
      })
      .catch(error => {
        console.error('Error fetching rating totals:', error);
      });
  }, [productId]); // Dependency array to re-fetch data when productId changes

  const [reviewCount, setReviewCount] = useState<number>(0); // Assuming reviewCount is a number

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the API endpoint
    fetch(`http://localhost:8000/reviews/count/${productId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched review count:', data.reviewCount);
        // Update the state with the fetched review count
        setReviewCount(data.reviewCount);
      })
      .catch(error => {
        console.error('Error fetching review count:', error);
      });
  }, [productId]); // Dependency array to re-fetch data when productId changes

  const [moreProducts, setMoreProducts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch more products excluding the current one
    fetch(`http://localhost:8000/products/more/${productId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched more products:', data);
        setMoreProducts(data);
      })
      .catch(error => {
        console.error('Error fetching more products:', error);
      });
  }, [productId,cardCount]);

  const incrementQuantity = () => {
    setQuantity(quantity + 0.5);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 0.5);
    }
  };

  const addToCart = () => {
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
      style={{ height: '20px', borderRadius: '10px' }}
    />
  );

  return (
    <>
      <Container className="mt-4" fluid style={{ paddingLeft: '30px', paddingRight: '30px' }}>
        <Row>
          <Col xs={12} md={6} className="d-flex justify-content-center align-items-center">
            <Card.Img
              variant="top"
              src={product.name}
              style={{ border: '1px solid', height: '85%', width: '55%' }}
            />
          </Col>
          <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
            <div>
            <Card.Body>
                <Card.Text style={{ fontSize: '16px', lineHeight: '2' }}>
                  <span style={{ fontFamily: 'Sans-serif', fontWeight: 'bold' }}>{product.name}</span><br />
                  <span style={{ fontFamily: 'Sans-serif' }}>Rs. {product.price}</span><br />
                  <span style={{ fontFamily: 'Sans-serif' }}>{product.seller?.store_name}</span><br /><br />
                </Card.Text>
              </Card.Body>
              <div style={{ border: '2px solid #00BA29', borderRadius: '19px', display: 'inline-block', marginBottom: '10px', marginTop: '0px' }}>
                <Button variant="outline-primary" onClick={decrementQuantity} style={{ color: '#00BA29', border: 'none', borderRight: '2px solid #00BA29', borderTopRightRadius: '0', borderBottomRightRadius: '0', backgroundColor: 'transparent', paddingBottom: '8px', fontWeight: 'bold' }}>-</Button>
                <span className="mx-2" style={{ padding: '4px' }}>{quantity}</span>
                <Button variant="outline-primary" onClick={incrementQuantity} style={{ color: '#00BA29', border: 'none', borderLeft: '2px solid #00BA29', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', backgroundColor: 'transparent', paddingBottom: '8px', fontWeight: 'bold' }}>+</Button>
              </div>
              <div style={{ marginTop: '20px' }}>
                <Button variant="outline-primary" onClick={addToCart}
                  style={{
                    border: 'none',
                    borderRadius: '19px',
                    backgroundColor: '#00BA29',
                    color: 'white', width: '120px',
                    fontWeight: 'semi-bold'
                  }}>
                  Add to Cart
                </Button>
                <Button variant="outline-primary" onClick={buyNow}
                  style={{
                    border: 'none',
                    borderRadius: '19px',
                    backgroundColor: '#00BA29',
                    color: 'white',
                    marginLeft: '10px',
                    width: '120px',
                    fontWeight: 'semi-bold'
                  }}>
                  Buy Now
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid className="mt-4" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
        <div className="mt-4 ml-4" style={{ paddingLeft: '0', backgroundColor: '#F5F5F5' }}>
          <h3 style={{ fontSize: '16px', padding: '5px', margin: '0', marginLeft: '20px' }}>Reviews and Ratings</h3>
        </div>
      </Container>
      <Container fluid className="mt-4" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
        <Row noGutters>
          <Col xs={12} md={9} style={{ backgroundColor: 'white', padding: '20px' }} ref={leftContentRef}>
            {/* Left content goes here */}
            
            <div className="ml-4" style={{ padding: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span><Rate disabled defaultValue={5} /></span>
                <div style={{ flex: 3, marginLeft: '10px' }}>
                {getProgressBar((ratingTotals.rating5 / reviewCount) * 100)}
                </div>
                <span style={{ marginLeft: '10px' }}>{ratingTotals.rating5}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <span><Rate disabled defaultValue={4} /></span>
                <div style={{ flex: 3, marginLeft: '10px' }}>
                  {getProgressBar((ratingTotals.rating4 / reviewCount) * 100)}
                </div>
                <span style={{ marginLeft: '10px' }}>{ratingTotals.rating4}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <span><Rate disabled defaultValue={3} /></span>
                <div style={{ flex: 3, marginLeft: '10px' }}>
                  {getProgressBar((ratingTotals.rating3 / reviewCount) * 100)}
                </div>
                <span style={{ marginLeft: '10px' }}>{ratingTotals.rating3}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <span><Rate disabled defaultValue={2} /></span>
                <div style={{ flex: 3, marginLeft: '10px' }}>
                  {getProgressBar((ratingTotals.rating2 / reviewCount) * 100)}
                </div>
                <span style={{ marginLeft: '10px' }}>{ratingTotals.rating2}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <span><Rate disabled defaultValue={1} /></span>
                <div style={{ flex: 3, marginLeft: '10px' }}>
                  {getProgressBar((ratingTotals.rating1 / reviewCount) * 100)}
                </div>
                <span style={{ marginLeft: '10px' }}>{ratingTotals.rating1}</span>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Link to="/ReviewRating">
                  <Button variant="outline-primary" onClick={addReviewAndRating}
                    style={{
                      border: 'none',
                      borderRadius: '19px',
                      backgroundColor: '#00BA29',
                      color: 'white',
                      width: '200px',
                      fontWeight: 'semi-bold',
                      fontSize: '15px'
                    }}>
                    Add Reviews and Rating
                  </Button>
                </Link>
              </div>

              <ul className="ml-4" style={{ padding: '10px' }}>
              {reviews.map((review, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <p><Rate disabled defaultValue={review.rating} /> {review.buyer.name}</p> {/* Assuming 'name' is the property of buyer */}
                  <p>Date: {new Date(review.createdAt).toLocaleDateString()}</p>
                  <p>{review.comment} </p>
                </li>
              ))}
            </ul>
            </div>
          </Col>
          <Col xs={12} md={3} style={{ backgroundColor: '#D3D3D3', padding: '20px' }}>
            <div className="d-flex flex-column align-items-center">
              <h5>More Products</h5>
              <Row>
              {moreProducts.map((product, index) => (
                <Col key={index} xs={12} sm={6} md={6} lg={12} className="mb-4">
                  <Card style={{ width: '100%', border: '2px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '20px' }}>
                    <Card.Link href="#">
                      <div className="d-flex justify-content-center align-items-center">
                        <Card.Img
                          variant="top"
                          src={product.image}
                          style={{ height: '70%', width: '70%', alignItems: 'center' }}
                          onClick={(e) => {
                            e.preventDefault();
                            // Add any custom functionality you want here
                          }}
                        />
                      </div>
                    </Card.Link>
                    <Card.Body>
                      <Card.Text style={{ fontSize: '14px', lineHeight: '1.5' }}>
                        <span style={{ fontWeight: 'bold' }}>Rs. {product.price}</span><br />
                        <span style={{ fontFamily: 'Sans-serif' }}>{product.name}</span><br />
                        <span style={{ fontFamily: 'Sans-serif' }}>{product.seller.store_name}</span>
                      </Card.Text>
                      <Button
                        variant="primary"
                        style={{ backgroundColor: '#00BA29', border: 'none', fontSize: '12px' }}
                        onMouseOver={(e) => (e.currentTarget.style.boxShadow = '1px 1px 2px 2px rgba(0, 0, 0, 0.2)')}
                        onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 3px 7px rgba(0, 0, 0, 0.1)')}
                        onClick={() => console.log(`Added product ${index} to cart`)}
                      >
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ItemDetails;
