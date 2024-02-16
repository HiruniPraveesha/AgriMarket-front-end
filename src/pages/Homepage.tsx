import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Container, Col, Row, Carousel, Card } from 'react-bootstrap';
import Header from "../components/Header-main";
import Footer from "../components/Footer-main";
import Image1 from "../assets/HomePage1.png";
import Image2 from "../assets/HomePage2.png";
import FruitImage from "../assets/Fruits.png";
import VegeImage from "../assets/Vegetables.png";
import GrainImage from "../assets/Grains.png";
import OtherImage from "../assets/Other.png";
import ExampleCarouselImage from '../assets/Offers.png';
import Item1 from "../assets/Carrot.png";

const HomePage = () => {
  

  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'white',
    fontFamily: 'Inter',
    color: 'black',
    transition: 'box-shadow 0.3s',
    fontWeight: 'bold',
    borderRadius: '7px',
    border: 'none',
    boxShadow: '0 2px 15px rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '50px',
    fontSize: '14px',
    marginBottom: '15px',
  };
  
  const buttonImageStyle: React.CSSProperties = {
    height: '30px',
    padding: '5px',
  };
  


  return (
    <div>
      <Header />
      <div
      className="container-fluid"
      style={{ backgroundColor: "#DFFFC0", paddingLeft: 0, paddingRight: 0 }}
    >
      <div className="row">
        <div className="col-md-4" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <img src={Image1} alt="Fruit" style={{ maxWidth: "100%" }} />
        </div>
        <div
          className="col-md-4"
          style={{
            marginTop: "120px",
            paddingLeft: "18px",
            paddingRight: 0,
            textAlign: "left",
          }}
        >
          <h2
            style={{
              fontFamily: 'Sansita',
    letterSpacing: '3px',
    fontSize: '5rem',
    fontStyle: 'italic',
    fontWeight: 'bold',
    background: 'linear-gradient(180deg, #032004 8.13%, #18C01F 62.1%, #00FF0B 73.6%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
            }}
          >
            AgriMarket
          </h2>
          <p style={{ fontFamily: 'Inika',
    fontWeight: 'bold',
    color: '#00BA29',
    letterSpacing: '1px', }}>100% Healthy and Affordable</p>
          <p style={{ color: '#00BA29',
    fontSize: '28px',
    fontWeight: 'bold',
    letterSpacing: '1px', }}>
            <strong>Organic Products</strong>
          </p>
          <p style={{ fontFamily: 'Inika',
    color: '#00BA29',
    fontWeight: 'bold',
    letterSpacing: '1px', }}>Small Charges, Big Difference</p>
          <div>
          <Button
    variant="primary"
    type="submit"
    style={{
      backgroundColor: '#00BA29',
      fontWeight: 'bold',
      fontSize: '11px',
      border: 'none',
      borderRadius: '3px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '145px', // Add a specific width to the button
      height: '50px'
    }}
    onMouseOver={(e) => (e.currentTarget.style.boxShadow = '2px 2px 3px 3px rgba(0, 0, 0, 0.2)')}
    onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)')}
    >
    Shop Now
  </Button>
  <Button
    variant="primary"
    type="submit"
    style={{
      backgroundColor: '#00BA29',
      fontSize: '11px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '3px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '145px',
      height: '50px', // Add the same specific width to the second button
      marginLeft: '20px', // Add margin to the second button
    }}
    onMouseOver={(e) => (e.currentTarget.style.boxShadow = '2px 2px 3px 3px rgba(0, 0, 0, 0.2)')}
    onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)')}
    >
      
    Become a Seller
  </Button>
          </div>
        </div>
        <div className="col-md-4" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <img
            src={Image2}
            alt="Girl"
            style={{ maxWidth: "100%", marginTop: "140px" }}
          />
        </div>
      </div>
    </div>
      <Container fluid>
        <Row className="d-flex justify-content-evenly mt-4 mb-4">
          <Col md={2}>
            <Button
              variant="outline-primary"
              style={buttonStyle}
              onMouseOver={(e) => (e.currentTarget.style.boxShadow = '2px 2px 3px 3px rgba(0, 0, 0, 0.1)')}
    onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.4)')}
            >
              <img src={FruitImage} alt="Fruits" style={buttonImageStyle} />
              Fruits
            </Button>
          </Col>
          <Col md={2}>
            <Button
              variant="outline-primary"
              style={buttonStyle}
              onMouseOver={(e) => (e.currentTarget.style.boxShadow = '2px 2px 3px 3px rgba(0, 0, 0, 0.1)')}
    onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.4)')}
            >
              <img src={VegeImage} alt="Vegetables" style={buttonImageStyle} />
              Vegetables
            </Button>
          </Col>
          <Col md={2}>
            <Button
              variant="outline-primary"
              style={buttonStyle}
              onMouseOver={(e) => (e.currentTarget.style.boxShadow = '2px 2px 3px 3px rgba(0, 0, 0, 0.1)')}
    onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.4)')}
            >
              <img src={GrainImage} alt="Grains" style={buttonImageStyle} />
              Grains
            </Button>
          </Col>
          <Col md={2}>
            <Button
              variant="outline-primary"
              style={buttonStyle}
              onMouseOver={(e) => (e.currentTarget.style.boxShadow = '2px 2px 3px 3px rgba(0, 0, 0, 0.1)')}
    onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.4)')}
            >
              <img src={OtherImage} alt="Other" style={buttonImageStyle} />
              Other
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className="mt-4" 
      style={{ 
      justifyContent: 'center', 
      alignItems: 'center', 
      background: 'linear-gradient(to bottom, #E5F4D7, #F5FBEF, #DFFFC0,#F5FBEF)', 
      border: '2px',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', 
      borderRadius: '30px', 
      padding: '20px' }}>
  <Row className="justify-content-md-center">
    <Col md="auto">
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
      >Featured Products</h1>
    </Col>
  </Row>
  <Row className="mt-4 d-flex justify-content-center align-items-center">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
      <Col key={index} xs={12} sm={6} md={6} lg={3} className="mb-4">
        <Card style={{ width: '100%',border: '2px',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '20px' }}>
        <Card.Link href="#">
          <Card.Img variant="top"
            src={Item1}
            onClick={(e) => {
              e.preventDefault(); // Prevents the default link behavior
              // Add any custom functionality you want here
            }} /></Card.Link>
          <Card.Body >
          <Card.Text style={{ fontSize: '14px', lineHeight: '1.5' }}>
                    <span style={{ fontWeight: 'bold' }}>Rs.700.00</span><br />
                    <span style={{ fontFamily: 'Sans-serif' }}>Carrot - 1 Kg</span><br />
                    <span style={{ fontStyle: 'italic', color: '#555' }}>Sachee Stores</span>
                  </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>
      <Carousel>
        <Carousel.Item>
          <img alt="First slide" src={ExampleCarouselImage} style={{ width: '100%', maxHeight: '500px' }} />
        </Carousel.Item>
        <Carousel.Item>
          <img alt="Second slide" src={ExampleCarouselImage} style={{ width: '100%', maxHeight: '500px' }} />
        </Carousel.Item>
        <Carousel.Item>
          <img alt="Third slide" src={ExampleCarouselImage} style={{ width: '100%', maxHeight: '500px' }} />
        </Carousel.Item>
      </Carousel>

      <Container className="mt-4" 
      style={{ 
      justifyContent: 'center', 
      alignItems: 'center', 
      background: 'linear-gradient(to bottom, #E5F4D7, #F5FBEF, #DFFFC0,#F5FBEF)', 
      border: '2px',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', 
      borderRadius: '30px', 
      padding: '20px' }}>
  <Row className="justify-content-md-center">
    <Col md="auto">
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
      >Recommended Products</h1>
    </Col>
  </Row>
  <Row className="mt-4 d-flex justify-content-center align-items-center">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
      <Col key={index} xs={12} sm={6} md={6} lg={3} className="mb-4">
        <Card style={{ width: '100%',border: '2px',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '20px' }}>
        <Card.Link href="#">
          <Card.Img variant="top"
            src={Item1}
            onClick={(e) => {
              e.preventDefault(); // Prevents the default link behavior
              // Add any custom functionality you want here
            }} /></Card.Link>
          <Card.Body >
          <Card.Text style={{ fontSize: '14px', lineHeight: '1.5' }}>
                    <span style={{ fontWeight: 'bold' }}>Rs.700.00</span><br />
                    <span style={{ fontFamily: 'Sans-serif' }}>Carrot - 1 Kg</span><br />
                    <span style={{ fontStyle: 'italic', color: '#555' }}>Sachee Stores</span>
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

export default HomePage;
