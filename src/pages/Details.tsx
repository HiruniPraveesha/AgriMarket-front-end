import React, { useState } from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import Carrot from "../assets/Carrot.png";
import BasicRating from '../components/BasicRating';

interface ItemDetailsProps {
  item: {
    imageUrl: string;
    name: string;
    description: string;
    price: number;
    // Add more properties as needed
  };
}

const ItemCard: React.FC<ItemDetailsProps> = ({ item }) => {
  return (
    <Card style={{ marginBottom: '10px' }}>
      <Card.Link href="#">
      <Card.Img variant="top" src={item.imageUrl} />
      </Card.Link>
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Button variant="primary" 
        style={{ 
          backgroundColor: '#00BA29', 
          border: 'none', 
          fontSize: '12px' // Adjust the font size here
        }}
         onMouseOver={(e) => (e.currentTarget.style.boxShadow = '1px 1px 2px 2px rgba(0, 0, 0, 0.2)')}
         onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 3px 7px rgba(0, 0, 0, 0.1)')} 
        >Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

const ItemDetails: React.FC<ItemDetailsProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    // Add logic to add item to cart
    console.log("Item added to cart");
  };

  const buyNow = () => {
    // Add logic to proceed with buying the item
    console.log("Buying item now");
  };

  // Sample data for item cards
  const items = [
    { imageUrl: Carrot, name: 'Item 1', description: 'Description', price: 10 },
    { imageUrl: Carrot, name: 'Item 2', description: 'Description', price: 20 },
    // Add more items as needed
  ];

  return (
    <>
    <Container fluid className="mt-4">
  <Row>
    <Col xs={12} md={6} className="d-flex justify-content-center align-items-center">
      <Image src={Carrot} alt={item.name} fluid className="border border-dark" />
    </Col>
    <Col xs={12} md={6} className="d-flex align-items-center">
      <div>
        <div>
          <h2>Carrot {item.name}</h2>
          <p>RS. 700.00 {item.price}</p>
          <p>1kg {item.description}</p>
          <p>Sachee Stores {item.description}</p>
        </div>
        <div style={{ border: `2px solid #00BA29`, borderRadius:'19px', display: 'inline-block', marginBottom: '10px' }}>
                <Button variant="outline-primary" onClick={decrementQuantity} style={{ color: '#00BA29', border: 'none', borderRight: '2px solid #00BA29', borderTopRightRadius: '0', borderBottomRightRadius: '0', backgroundColor: 'transparent', paddingBottom: '8px', fontWeight: 'bold' }}>-</Button>
                <span className="mx-2" style={{ padding: '4px' }}>{quantity}</span>
                <Button variant="outline-primary" onClick={incrementQuantity} style={{ color: '#00BA29', border: 'none', borderLeft: '2px solid #00BA29',borderTopLeftRadius: '0', borderBottomLeftRadius: '0', backgroundColor: 'transparent', paddingBottom: '8px', fontWeight: 'bold' }}>+</Button>
              </div>
              <div style={{ marginTop: '20px' }}>
                <Button variant="outline-primary" onClick={addToCart} style={{ border:'none', borderRadius: '19px', backgroundColor: '#00BA29', color: 'white', width: '120px', fontWeight: 'semi-bold' }}>Add to Cart</Button>
                <Button variant="outline-primary" onClick={buyNow} style={{ border:'none', borderRadius: '19px', backgroundColor: '#00BA29', color: 'white', marginLeft: '10px', width: '120px', fontWeight: 'semi-bold' }}>Buy Now</Button>
              </div>
      </div>
    </Col>
  </Row>
</Container>



      <div className="mt-4 ml-4" style={{ paddingLeft:'0', backgroundColor: '#F5F5F5' }}>
        <h3 style={{ fontSize: '16px', padding: '5px', margin: '0', marginLeft: '20px' }}>Reviews and Ratings</h3>
        
      </div>
      <Col xs={{ span: 3, offset: 9 }} className="mr-auto" style={{ marginTop: '20px', paddingRight: '20px', backgroundColor: '#F5F5F5' }}>
        <div style={{ backgroundColor: '#F5F5F5', padding: '20px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <h3 style={{ fontSize: '16px', margin: '0', textAlign: 'center', marginBottom: '20px' }}>More Products</h3>
          {items.map((item, index) => (
            <ItemCard key={index} item={item} />
          ))}
        </div>
      </Col>
    </>
  );
};

export default ItemDetails;