import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header-main";
import Footer from "../components/Footer-main";
import axios from 'axios';

const DisplayByCategory: React.FC<{}> = ({}) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [categoryname, setCategoryName] = useState<any>({});
  const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>({});
  const [showModal, setShowModal] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/products/category/${categoryId}`)
      .then(response => {
        console.log('Fetched products:', response.data);
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    axios.get(`http://localhost:8000/categories/${categoryId}`)
      .then(response => {
        console.log('Fetched category name:', response.data);
        setCategoryName(response.data);
      })
      .catch(error => {
        console.error('Error fetching category name:', error);
      });
  }, [categoryId]);

  const addToCart = (product: any, quantity = 1) => {
    const buyerIdString = localStorage.getItem("sellerId");
    const buyerId = buyerIdString ? parseInt(buyerIdString) : null;

    if (buyerId === null) {
      console.error('Buyer ID is missing');
      setShowModal(true);
      return;
    }

    const currentCart = JSON.parse(sessionStorage.getItem('cart') || '{}');
    if (currentCart[product.product_id]) {
      currentCart[product.product_id] += quantity;
    } else {
      currentCart[product.product_id] = quantity;
    }
    sessionStorage.setItem('cart', JSON.stringify(currentCart));

    console.log("Item added to cart");
  };

  const handleAddToCartClick = (product: any) => {
    const buyerIdString = localStorage.getItem("sellerId");
    const buyerId = buyerIdString ? parseInt(buyerIdString) : null;

    if (buyerId === null) {
      console.error('Buyer ID is missing');
      setShowModal(true);
      return;
    }

    addToCart(product);
    setAddedToCart(prevState => ({ ...prevState, [product.product_id]: true }));
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Header />
      <Container className="mt-4"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to bottom, #FBFFF8, #F7F8F5, #F7FFEF,#FEFFFD)',
          borderRadius: '10px'
        }}>
        <Row>
          <Col>
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
            }}>
                {categoryname.name}
            </h1>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-3">
          {products.map((product) => (
            <Col key={product.product_id} md={4} className="d-flex justify-content-center mb-4">
              <Card className="shadow-sm" style={{ width: '18rem', transition: 'box-shadow 0.3s', backgroundColor: 'transparent' }}>
                <Card.Img variant="top" 
                style={{cursor: 'pointer' }}
                src={product.image1}
                onClick={(e) => {e.preventDefault();
                    console.log(product);
                    navigate(`/ItemDetails/${product.product_id}`); 
                  }} />
                <Card.Body className="text-center">
                  <Card.Title style={{ fontSize: '15px' }}>{product.name}</Card.Title>
                  <Card.Text>Rs.{product.price}</Card.Text>
                  <Card.Text style={{ fontFamily: 'Sans-serif', fontStyle:'italic', cursor: 'pointer' }}
                   onClick={(e) => {
                    e.preventDefault();
                    navigate(`/SellerProfile/${product.seller.seller_id}`);
                    }}
                  >{product.seller.store_name}
                  </Card.Text>
                  <Button 
                    variant="primary"
                    style={{
                      backgroundColor: '#00BA29',
                      border: 'none',
                      fontSize: '12px'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCartClick(product);
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
      </Container>
      <Footer />
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
          <Button variant="primary" onClick={() => navigate('/SignIn')}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DisplayByCategory;
