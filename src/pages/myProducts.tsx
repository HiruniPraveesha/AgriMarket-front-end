import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Modal, ProgressBar } from 'react-bootstrap';
import { Rate } from 'antd';
import { Link } from "react-router-dom";
import addProduct from '../assets/addProducts.png';
import addNotification from '../assets/addNotifications.png';
import manageProducts from '../assets/manageProducts.png';
import axios from 'axios';

const MyProducts: React.FC<{}> = () => {
  const [products, setProducts] = useState<any[]>([]); // Use 'any' type for flexibility
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [ratingTotals, setRatingTotals] = useState<any>({
    rating1: 0,
    rating2: 0,
    rating3: 0,
    rating4: 0,
    rating5: 0,
  });
  const [reviewCount, setReviewCount] = useState<number>(0);
  const myBuyer = localStorage.getItem("sellerId");

  useEffect(() => {
    axios.get(`http://localhost:8000/products/seller/${myBuyer}`)
      .then(response => {
        console.log('Fetched products:', response.data);
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [myBuyer]);

  const handleShowModal = (product: any) => {
    setSelectedProduct(product);
    setShowModal(true);
    fetchProductReviews(product.product_id);
    fetchRatingTotals(product.product_id);
    fetchReviewCount(product.product_id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setReviews([]);
    setRatingTotals({
      rating1: 0,
      rating2: 0,
      rating3: 0,
      rating4: 0,
      rating5: 0,
    });
    setReviewCount(0);
  };

  const fetchProductReviews = (productId: number) => {
    axios.get(`http://localhost:8000/reviews/${productId}`)
      .then(response => {
        console.log('Fetched reviews:', response.data);
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  };

  const fetchRatingTotals = (productId: number) => {
    axios.get(`http://localhost:8000/reviews/${productId}/ratingTotals`)
      .then(response => {
        console.log('Fetched rating totals:', response.data);
        setRatingTotals(response.data);
      })
      .catch(error => {
        console.error('Error fetching rating totals:', error);
      });
  };

  const fetchReviewCount = (productId: number) => {
    axios.get(`http://localhost:8000/reviews/count/${productId}`)
      .then(response => {
        console.log('Fetched review count:', response.data);
        setReviewCount(response.data.reviewCount);
      })
      .catch(error => {
        console.error('Error fetching review count:', error);
      });
  };

  const calculateHighRatingPercentage = () => {
    const { rating1, rating2, rating3, rating4, rating5 } = ratingTotals;
    const totalRatings = rating1 + rating2 + rating3 + rating4 + rating5;
    const highRatings = rating4 + rating5;
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
    } else {
      return 'Very Bad';
    }
  };

  const getProgressBar = (percentage: number | undefined) => (
    <ProgressBar
      now={percentage}
      variant="warning"
      style={{ height: '10px', borderRadius: '10px' }}
    />
  );

  return (
    <Container>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={3}>
          <Link to="/AddYourProducts" style={{ textDecoration: 'none' }}>
            <Button variant="primary" className="mb-3 w-100 d-flex align-items-center justify-content-center" 
              style={{ backgroundColor: '#E7E7E7', border: 'none', color: 'black', padding: '18px', textDecoration: 'none' }}>
              <img src={addProduct} alt="Add Products" style={{ width: '20px', marginRight: '10px' }} />
              Add Products
            </Button>
            </Link>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={3}>
          <Link to="/ManageYourProducts" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" className="mb-3 w-100 d-flex align-items-center justify-content-center"
              style={{ backgroundColor: '#E7E7E7', border: 'none', color: 'black', padding: '18px' }}>
              <img src={manageProducts} alt="Manage Products" style={{ width: '20px', marginRight: '10px' }} />
              Manage Products
            </Button>
            </Link>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={3}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="success" className="mb-3 w-100 d-flex align-items-center justify-content-center"
              style={{ backgroundColor: '#E7E7E7', border: 'none', color: 'black', padding: '18px' }}>
              <img src={addNotification} alt="Add Notifications" style={{ width: '20px', marginRight: '10px' }} />
              Add Notifications
            </Button>
            </Link>
          </Col>
        </Row>
      </Container>
      <Container
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to bottom, #FBFFF8, #F7F8F5, #F7FFEF,#FEFFFD)',
          borderRadius: '10px'
        }}>
        <Row className="justify-content-center mt-5" style={{ fontSize: '20px', marginBottom: '-2px' }}>
          <Col md={8}>
          <h1 className="text-center"
              style={{ 
                fontFamily: 'Poppins',
                color: '#484848',
                justifyContent: 'center', 
                alignItems: 'center',  
                padding: '3px',
                marginRight: 'auto',
                marginLeft: 'auto',
                backgroundClip: 'text',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >My Products</h1>
          </Col>
        </Row>

        <Row className="justify-content-center mt-3">
          {products.map(product => (
            <Col key={product.product_id} md={4} className="d-flex justify-content-center mb-4">
              <Card className="shadow-sm" style={{ width: '18rem', transition: 'box-shadow 0.3s', backgroundColor: 'transparent' }}>
                <Card.Img variant="top"
                  style={{ cursor: 'pointer' }}
                  src={product.image1} />
                <Card.Body className="text-center">
                  <Card.Title style={{ fontSize: '15px' }}>{product.name}</Card.Title>
                  <Card.Text>Rs.{product.price}</Card.Text>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>{new Date(product.createdAt).toLocaleDateString()}</Card.Text>
                  <Button
                    variant="primary"
                    style={{
                      backgroundColor: '#00BA29',
                      border: 'none',
                      fontSize: '12px'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.boxShadow = '1px 1px 2px 2px rgba(0, 0, 0, 0.2)')}
                    onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 3px 7px rgba(0, 0, 0, 0.1)')}
                    onClick={() => handleShowModal(product)}
                  >Reviews and Ratings
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reviews and Ratings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Row>
              <Col xs={12} style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
                <Col xs={4} style={{ width: '30%', height: 'auto', borderRight: '2px solid #F5F5F5' }}>
                  <p style={{ fontSize: '22px' }}>{calculateHighRatingPercentage().toFixed(1)}
                    <span>
                      <p style={{ fontSize: '15px', color: 'white', backgroundColor: '#fadb14', display: 'inline-block', padding: '1px' }}>{getRatingDescription()}</p>
                    </span>
                  </p>
                  <Rate allowHalf value={calculateHighRatingPercentage()} disabled/>
                  <p style={{ fontSize: '12px', color: '#767577' }}>{reviewCount} ratings and reviews</p>
                </Col>
                <Col xs={8} style={{ width: '65%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Row style={{ alignItems: 'center', padding: '1px' }}>
                    <Col xs={3} style={{ textAlign: 'left', fontSize: '12px' }}>5 star</Col>
                    <Col xs={6}>{getProgressBar(ratingTotals.rating5)}</Col>
                    <Col xs={3} style={{ textAlign: 'right', fontSize: '12px' }}>{ratingTotals.rating5}</Col>
                  </Row>
                  <Row style={{ alignItems: 'center', padding: '1px' }}>
                    <Col xs={3} style={{ textAlign: 'left', fontSize: '12px' }}>4 star</Col>
                    <Col xs={6}>{getProgressBar(ratingTotals.rating4)}</Col>
                    <Col xs={3} style={{ textAlign: 'right', fontSize: '12px' }}>{ratingTotals.rating4}</Col>
                  </Row>
                  <Row style={{ alignItems: 'center', padding: '1px' }}>
                    <Col xs={3} style={{ textAlign: 'left', fontSize: '12px' }}>3 star</Col>
                    <Col xs={6}>{getProgressBar(ratingTotals.rating3)}</Col>
                    <Col xs={3} style={{ textAlign: 'right', fontSize: '12px' }}>{ratingTotals.rating3}</Col>
                  </Row>
                  <Row style={{ alignItems: 'center', padding: '1px' }}>
                    <Col xs={3} style={{ textAlign: 'left', fontSize: '12px' }}>2 star</Col>
                    <Col xs={6}>{getProgressBar(ratingTotals.rating2)}</Col>
                    <Col xs={3} style={{ textAlign: 'right', fontSize: '12px' }}>{ratingTotals.rating2}</Col>
                  </Row>
                  <Row style={{ alignItems: 'center', padding: '1px' }}>
                    <Col xs={3} style={{ textAlign: 'left', fontSize: '12px' }}>1 star</Col>
                    <Col xs={6}>{getProgressBar(ratingTotals.rating1)}</Col>
                    <Col xs={3} style={{ textAlign: 'right', fontSize: '12px' }}>{ratingTotals.rating1}</Col>
                  </Row>
                </Col>
              </Col>
              <div>
                <ul className="ml-4" style={{ padding: '10px', listStyleType: 'none', fontSize: '14px' }}>
                {reviews.map((review, index) => (
                    <li key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px', position: 'relative' }}>
                    <div>
                        <Rate disabled defaultValue={review.rating} />
                        <span style={{ position: 'absolute', top: 0, right: 0, color: '#808080'}}>{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p>{review.buyer.name}</p>
                    <p>{review.comment}</p>
                    </li>
                ))}
                </ul>
            </div>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyProducts;
