import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, ProgressBar, Button, Modal } from 'react-bootstrap';
import { Rate } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header-main";
import Footer from "../components/Footer-main";
import axios from 'axios';

const ItemDetails: React.FC<{}> = () => {
  const [quantity, setQuantity] = useState(1);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const [cardCount] = useState(5);
  const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>({});
  const myBuyer = localStorage.getItem("sellerId");
  const { productId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>({});
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [location]);

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the API endpoint
    axios.get(`http://localhost:8080/product/${productId}`)
      .then(response => {
        console.log('Fetched product:', response.data);
        // Update the state with the fetched product data
        setProduct(response.data);
        setMainImage(response.data.image1); // Set the main image
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [productId]);

  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    // Fetch reviews from the API
    axios.get(`http://localhost:8080/reviews/${productId}`)
      .then(response => {
        console.log('Fetched reviews:', response.data);
        setReviews(response.data);
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
    axios.get(`http://localhost:8080/reviews/${productId}/ratingTotals`)
      .then(response => {
        console.log('Fetched rating totals:', response.data);
        // Update the state with the fetched rating totals
        setRatingTotals(response.data);
      })
      .catch(error => {
        console.error('Error fetching rating totals:', error);
      });
  }, [productId]);// Dependency array to re-fetch data when productId changes

  // Function to calculate the percentage of high ratings
  const calculateHighRatingPercentage = () => {
    const { rating1, rating2, rating3, rating4, rating5 } = ratingTotals;
    const totalRatings = rating1 + rating2 + rating3 + rating4 + rating5;
    const highRatings = rating4 + rating5;
    console.log('Total Ratings:', totalRatings);
    console.log('High Ratings:', highRatings);
    return totalRatings === 0 ? 0 : (highRatings / totalRatings) * 5;
  };

  const getRatingDescription = () => {
    const highRatingPercentage = calculateHighRatingPercentage();
    if (highRatingPercentage === 0) {
      return 'Not rated as 4 star or 5 star';
    } else if (highRatingPercentage >= 4) {
      return 'Very Good';
    } else if (highRatingPercentage >= 3) {
      return 'Good';
    } else if (highRatingPercentage == 2.5) {
      return 'Neutral';
    } else if (highRatingPercentage < 2.5) {
      return 'Bad';
    }else {
      return 'Very Bad';
    }
  };

 
  const [reviewCount, setReviewCount] = useState<number>(0); // Assuming reviewCount is a number

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the API endpoint
    fetch(`http://localhost:8080/reviews/count/${productId}`)
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
    // Fetch more products excluding the current one, limited by cardCount
    axios.get(`http://localhost:8080/products/more/${productId}?limit=${cardCount}`)
      .then(response => {
        console.log('Fetched more products:', response.data);
        setMoreProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching more products:', error);
      });
  }, [productId, cardCount]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const getProgressBar = (percentage: number | undefined) => (
    <ProgressBar
      now={percentage}
      variant="warning"
      style={{ height: '10px', borderRadius: '10px'}}
    />
  );

  const addToCart = (product: any, quantity: number) => {
    const currentCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const updatedCart = [...currentCart, { ...product, quantity }];
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log("Item added to cart", product.product_id);
  };

  const handleAddToCartClick = (product: any, quantity = 1) => {
    if (!myBuyer) {
      setShowModal(true);
    } else {
      addToCart(product, quantity);
      setAddedToCart(prevState => ({ ...prevState, [product.product_id]: true }));
    }
  };

  const buyNow = (product: any, quantity: number) => {
    const currentCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const updatedCart = [...currentCart, { ...product, quantity }];
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log("Item added to cart", product.product_id);
  };

  const handleBuyNowClick = (product: any, quantity = 1) => {
    if (!myBuyer) {
      setShowModal(true);
    } else {
      buyNow(product, quantity);
      navigate(`//${product.product_id}`);
    }
  };

  const handleAddReviewsClick = () => {
    if (!myBuyer) {
      // Show modal or alert to login/register
      setShowModal(true);
    } else {
      // Proceed to add reviews and ratings page
      console.log(product);
      navigate(`/ReviewRating/${product.product_id}`);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const images = [product.image1, product.image2, product.image3, product.image4];

  return (
    <>
    <Header />
    <Container style={{ marginTop: '20px' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={9} style={{ height: 'auto', display: 'flex', padding: 0 , flexWrap: 'wrap'}}>
          <Col xs={12} md={8} style={{padding: '10px' }}>
            <Card.Img
              variant="top"
              src={mainImage}
              style={{ border: '1px solid', height: '55%', width: '55%', marginBottom: '10px' }}
            />
            <div className="d-flex">
              {images.map((image, index) => (
                <Card.Img
                  key={index}
                  src={image}
                  onClick={() => setMainImage(image)}
                  style={{
                    cursor: 'pointer',
                    border: mainImage === image ? '2px solid #00BA29' : '1px solid',
                    height: '75px',
                    width: '75px',
                    margin: '5px',
                  }}
                />
              ))}
            </div>
          </Col>
          <Col xs={12} md={4} style={{ padding: '10px', order: 1  }}>
            <Card.Body style={{ paddingBottom: '25px'}}>
              <Card.Title style={{ fontSize: '25px', fontFamily: 'Sans-serif', fontWeight: 'bold' }}>
                {product.name}
              </Card.Title>
              <br/>
              <Card.Text>Rs.{product.price} {([1, 2, 3].includes(product.categoryId)) ? 'per kg' : ''}</Card.Text>
              <Card.Text
                style={{ fontFamily: 'Sans-serif', fontStyle: 'italic', cursor: 'pointer' }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/SellerProfile/${product.seller?.seller_id}`);
                }}
              >
                {product.seller?.store_name}
              </Card.Text>
              <Card.Text>Description: {product.description}</Card.Text>
            </Card.Body>
            <div style={{ border: '2px solid #00BA29', borderRadius: '19px', display: 'inline-block', marginBottom: '10px', marginTop: '0px' }}>
              <Button
                variant="outline-primary"
                onClick={decrementQuantity}
                style={{
                  color: '#00BA29',
                  border: 'none',
                  borderRight: '2px solid #00BA29',
                  borderTopRightRadius: '0',
                  borderBottomRightRadius: '0',
                  backgroundColor: 'transparent',
                  paddingBottom: '8px',
                  fontWeight: 'bold'
                }}
              >
                -
              </Button>
              <span className="mx-2" style={{ padding: '4px' }}>{quantity}</span>
              <Button
                variant="outline-primary"
                onClick={incrementQuantity}
                style={{
                  color: '#00BA29',
                  border: 'none',
                  borderLeft: '2px solid #00BA29',
                  borderTopLeftRadius: '0',
                  borderBottomLeftRadius: '0',
                  backgroundColor: 'transparent',
                  paddingBottom: '8px',
                  fontWeight: 'bold'
                }}
              >
                +
              </Button>
            </div>
            <div className="mt-4">
              <Button 
                variant="outline-primary"
                onMouseOver={(e) => (e.currentTarget.style.boxShadow = '1px 1px 2px 2px rgba(0, 0, 0, 0.2)')}
                onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 3px 7px rgba(0, 0, 0, 0.1)')}
                style={{
                  border: 'none',
                  margin: 'auto',
                  borderRadius: '19px',
                  backgroundColor: '#00BA29',
                  color: 'white', 
                  width: '120px',
                  fontSize: '12px',
                  fontWeight: 'semi-bold',
                  marginRight: '15px',
                  padding: '5px'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCartClick(product, quantity);
                }}
                disabled={!!addedToCart[product.product_id]}
              >
                {addedToCart[product.product_id] ? 'Added to Cart' : 'Add to Cart'}
              </Button>

              <Button
                variant="outline-primary"
                style={{
                  border: 'none',
                  borderRadius: '19px',
                  backgroundColor: '#00BA29',
                  color: 'white', 
                  width: '120px',
                  fontSize: '12px',
                  padding: '5px',
                  fontWeight: 'semi-bold'
                }}onClick={(e) => {
                  e.preventDefault();
                  handleBuyNowClick(product, quantity);
                }}
                
              >
                Buy Now
              </Button>
            </div>
          </Col>
        </Col>
      </Row>

      <Row className="justify-content-center" style={{ marginTop: '10px' }}>
        <Col xs={12} style={{ textAlign: 'center', position: 'relative', padding: 0 }}>
        <div className="mt-4 ml-4" style={{ paddingLeft: '0', backgroundColor: '#F5F5F5' }}>
          <h3 style={{ fontSize: '16px', padding: '5px', margin: '0', marginLeft: '20px' }}>Reviews and Ratings</h3>
        </div>
        </Col>
      </Row>

      <Row className="justify-content-center" style={{ marginTop: '10px' }}>
  <Col xs={12} md={10} style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
    <Col xs={12} md={8} style={{ display: 'flex', flexDirection: 'column', padding: 0 }} ref={leftContentRef}>
      <Col xs={12} style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
        <Col xs={4} style={{ width: '30%', backgroundColor: '', height: 'auto', borderRight: '2px solid #F5F5F5' }}>
          <p style={{ fontSize: '22px' }}>{calculateHighRatingPercentage().toFixed(1)}<span> <p style={{ fontSize: '15px', color: 'white', backgroundColor: '#fadb14', display: 'inline-block', padding: '1px' }}>{getRatingDescription()}</p></span></p>
          <Rate allowHalf value={calculateHighRatingPercentage()} disabled />
          <div>
            <p style={{ backgroundColor: '#F5F5F5', display: 'inline-block' }}>{ratingTotals.rating1 + ratingTotals.rating2 + ratingTotals.rating3 + ratingTotals.rating4 + ratingTotals.rating5}</p>
          </div>
        </Col>
        <Col xs={8} style={{ width: '50%', height: 'auto' }}>
          <div style={{ padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span><Rate disabled defaultValue={5} /></span>
              <div style={{ flex: 1, marginLeft: '10px' }}>
                {getProgressBar((ratingTotals.rating5 / reviewCount) * 100)}
              </div>
              <span style={{ marginLeft: '15px' }}>{ratingTotals.rating5}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <span><Rate disabled defaultValue={4} /></span>
              <div style={{ flex: 1, marginLeft: '10px' }}>
                {getProgressBar((ratingTotals.rating4 / reviewCount) * 100)}
              </div>
              <span style={{ marginLeft: '15px' }}>{ratingTotals.rating4}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <span><Rate disabled defaultValue={3} /></span>
              <div style={{ flex: 1, marginLeft: '10px' }}>
                {getProgressBar((ratingTotals.rating3 / reviewCount) * 100)}
              </div>
              <span style={{ marginLeft: '15px' }}>{ratingTotals.rating3}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <span><Rate disabled defaultValue={2} /></span>
              <div style={{ flex: 1, marginLeft: '10px' }}>
                {getProgressBar((ratingTotals.rating2 / reviewCount) * 100)}
              </div>
              <span style={{ marginLeft: '15px' }}>{ratingTotals.rating2}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <span><Rate disabled defaultValue={1} /></span>
              <div style={{ flex: 1, marginLeft: '10px' }}>
                {getProgressBar((ratingTotals.rating1 / reviewCount) * 100)}
              </div>
              <span style={{ marginLeft: '15px' }}>{ratingTotals.rating1}</span>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="outline-primary"
                style={{
                  border: 'none',
                  borderRadius: '19px',
                  backgroundColor: '#00BA29',
                  color: 'white',
                  width: '200px',
                  fontWeight: 'semi-bold',
                  fontSize: '13px'
                }}
                onClick={handleAddReviewsClick}
              >
                Add Reviews and Ratings
              </Button>
            </div>
          </div>
        </Col>
      </Col>
      <Col xs={12} style={{ padding: '10px' }}>
        <div>
          <ul className="ml-4" style={{ padding: '10px', listStyleType: 'none', fontSize: '14px' }}>
            {reviews.map((review, index) => (
              <li key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px', position: 'relative' }}>
                <div>
                  <Rate disabled defaultValue={review.rating} />
                  <span style={{ position: 'absolute', top: 0, right: 0, color: '#808080' }}>{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <p>{review.buyer.name}</p>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      </Col>
    </Col>
    <Col xs={12} md={4} className="d-flex justify-content-center" style={{ marginTop: '10px' }}>
      <div style={{ background: 'linear-gradient(to bottom, #FBFFF8, #F7F8F5, #F7FFEF, #FEFFFD)', width: '100%', padding: '20px', borderRadius: '10px' }}>
        <h5
          style={{
            fontFamily: 'Poppins',
            color: '#484848',
            padding: '10px',
            backgroundClip: 'text',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          More Products
        </h5>
        <Row className="justify-content-center">
          {moreProducts.map((product, index) => (
            <Col key={index} xs={12} sm={6} md={6} lg={12} className="mb-4">
              <Card className="shadow-sm" style={{  transition: 'box-shadow 0.3s', backgroundColor: 'transparent' }}>
                <Card.Img
                  variant="top"
                  style={{ cursor: 'pointer' }}
                  src={product.image1}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(product);
                    navigate(`/ItemDetails/${product.product_id}`);
                  }}
                />
                <Card.Body className="text-center">
                  <Card.Title style={{ fontSize: '15px' }}>{product.name}</Card.Title>
                  <Card.Text>Rs.{product.price}</Card.Text>
                  <Card.Text>{product.seller.store_name}</Card.Text>
                  <Button
                    variant="primary"
                    style={{
                      backgroundColor: '#00BA29',
                      border: 'none',
                      fontSize: '12px'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCartClick(product, 1);
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.boxShadow = '1px 1px 2px 2px rgba(0, 0, 0, 0.2)')}
                    onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 3px 7px rgba(0, 0, 0, 0.1)')}
                    disabled={!!addedToCart[product.product_id]}
                  >
                    {addedToCart[product.product_id] ? 'Added to Cart' : 'Add to Cart'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Col>
  </Col>
</Row>

    </Container>
    {/* Modal for Login/Register */}
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
          <Button variant="primary" style={{backgroundColor: '#00BA29', borderColor: '#00BA29'}} onClick={() => navigate('/SignIn')}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
};

export default ItemDetails;
