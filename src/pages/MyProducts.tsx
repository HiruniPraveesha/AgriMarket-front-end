import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Item1 from "../assets/Farmer.png"
import Header from "../components/Header-main";
import Footer from "../components/Footer-main";
import Sidebar from '../components/Seller-side-bar';

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
const MyProducts: React.FC = () => {
  return (
    <div style={{
      background: 'linear-gradient(to bottom, #E5F4D7, #F5FBEF)',
      minHeight: '100vh',
      paddingTop: '20px'
    }}>
      {/* <Header /> */}
      <Container fluid className="mt-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <Row style={{ width: '100%' }}>
          <Col md={2} className="order-first" style={{ background: '#eaeaea', padding: '0' }}>
            <Sidebar defaultSelected="My Products" />
          </Col>
          <Col md={10} style={{
            // background: '#fff',
            // borderRadius: '20px',
            background: 'linear-gradient(to bottom, #E5F4D7, #F5FBEF)',
            // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: '20px'
            }}>
              <Button variant="success" style={{
                width: '200px',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '10px'
              }}>Add Product</Button>
              <Button variant="secondary" style={{
                width: '200px',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '10px'
              }}>Manage Products</Button>
              <Button variant="info" style={{
                width: '200px',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '10px'
              }}>Add notifications</Button>
            </div>
            <h4 style={{
              fontSize: '24px',
              marginBottom: '20px',
              textAlign: 'left'
            }}>Currently Selling Products....</h4>
            <Row className="mt-4" style={{ display: 'flex', flexWrap: 'wrap'}}>
              {mockProducts.map((product) => (
                <Col key={product.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
                  <Card style={{
                    width: '100%',
                    border: '2px solid #eaeaea',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    padding: '10px',
                    textAlign: 'center'
                  }}>
                    <Card.Link href="#">
                      <div className="d-flex justify-content-center align-items-center">
                        <Card.Img
                          variant="top"
                          src={product.image}
                          style={{ height: '100px', width: 'auto' }}
                          onClick={(e) => { e.preventDefault(); }}
                        />
                      </div>
                    </Card.Link>
                    <Card.Body>
                      <Card.Text style={{ fontSize: '12px', lineHeight: '1.5' }}>
                        <span style={{ fontWeight: 'bold' }}>Rs.{product.price}</span><br />
                        <span style={{ fontFamily: 'Sans-serif' }}>{product.name}</span><br />
                        <span style={{ fontStyle: 'italic', color: '#555' }}>{product.store}</span><br />
                        <Button variant="primary"
                          style={{
                            backgroundColor: '#00BA29',
                            border: 'none',
                            fontSize: '12px',
                            marginTop: '10px',
                            boxShadow: '0 3px 7px rgba(0, 0, 0, 0.1)',
                            transition: 'box-shadow 0.3s ease'
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
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default MyProducts;
