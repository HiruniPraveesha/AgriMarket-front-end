import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Item1 from "../assets/Carrot.png";
import Header from "../components/Header-main";
import Footer from "../components/Footer-main";

// Mock data array
const mockProducts = [
  { id: 1, name: 'Carrot - 1 Kg', price: 700, store: 'Sachee Stores', image: Item1 },
  { id: 2, name: 'Apple - 1 Kg', price: 1200, store: 'Fruit Hub', image: Item1 },
  { id: 3, name: 'Banana - 1 Dozen', price: 300, store: 'Fresh Farm', image: Item1 },
  { id: 4, name: 'Grapes - 1 Kg', price: 900, store: 'Grape Vine', image: Item1 },
  { id: 5, name: 'Mango - 1 Kg', price: 1500, store: 'Tropical Delight', image: Item1 },
  { id: 6, name: 'Orange - 1 Kg', price: 800, store: 'Citrus World', image: Item1 },
  { id: 7, name: 'Pineapple - 1 Pc', price: 600, store: 'Tropical Delight', image: Item1 },
  { id: 8, name: 'Strawberry - 1 Box', price: 400, store: 'Berry Farm', image: Item1 },
  // Add more products as needed
];

// Functional Component for Home Page
const Home: React.FC = () => {
  return (
    <div>
        <Header />
      <Container className="mt-4" 
        style={{ 
          justifyContent: 'center', 
          alignItems: 'center', 
          background: 'linear-gradient(to bottom, #E5F4D7, #F5FBEF, #DFFFC0,#F5FBEF)', 
          border: '2px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', 
          borderRadius: '30px', 
          padding: '20px' }}>
        <Row className="justify-content-md-center text-center">
          <Col>
            <h1
              style={{ 
                fontFamily: 'Poppins',
                color: '#484848',
                justifyContent: 'center', 
                alignItems: 'center',  
                padding: '3px',
                backgroundClip: 'text',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >Fruits</h1>
          </Col>
        </Row>
        <Row className="mt-4 d-flex justify-content-center align-items-center">
          {mockProducts.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={6} lg={3} className="mb-4">
              <Card style={{ width: '100%', border: '2px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '20px' }}>
                <Card.Link href="#">
                  <div className="d-flex justify-content-center align-items-center">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      style={{ height: '70%', width: '70%', alignItems: 'center' }}
                      onClick={(e) => { e.preventDefault(); }}
                    />
                  </div>
                </Card.Link>
                <Card.Body>
                  <Card.Text style={{ fontSize: '14px', lineHeight: '2' }}>
                    <span style={{ fontWeight: 'bold' }}>Rs.{product.price}</span><br />
                    <span style={{ fontFamily: 'Sans-serif' }}>{product.name}</span><br />
                    <span style={{ fontStyle: 'italic', color: '#555' }}>{product.store}</span><br />
                    <Button variant="primary" 
                      style={{ 
                        backgroundColor: '#00BA29', 
                        border: 'none', 
                        fontSize: '12px' // Adjust the font size here
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.boxShadow = '1px 1px 2px 2px rgba(0, 0, 0, 0.2)')}
                      onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 3px 7px rgba(0, 0, 0, 0.1)')} 
                    >Add to Cart
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
