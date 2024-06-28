import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Header from "../components/Header-main";
import Footer from "../components/Footer-main";

const DisplayByCategory: React.FC<{}> = ({}) => {
  
  const [products, setProducts] = useState<any[]>([]); // Initialize products as an array
  const { categoryId } = useParams();

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the API endpoint
    fetch(`http://localhost:8000/products/category/${categoryId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched products:', data);
        // Update the state with the fetched products data
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [categoryId]);

  const [categoryname, setCategoryName] = useState<any>({});
 // Initialize products as an array

 useEffect(() => {
  fetch(`http://localhost:8000/categories/${categoryId}`)
    .then(response => response.json())
    .then(data => {
      console.log('Fetched categoryname:', data);
      setCategoryName(data); // Assuming data is an object containing category details
    })
    .catch(error => {
      console.error('Error fetching categoryname:', error);
    });
}, [categoryId]);

  return (
    <div>
      <Header />
      <Container className="mt-4" style={{ justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(to bottom, #E5F4D7, #F5FBEF, #DFFFC0,#F5FBEF)', border: '2px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '30px', padding: '20px' }}>
        <Row className="justify-content-md-center text-center">
          <Col>
            <h1 
            style={{ 
              fontFamily: 'Poppins', 
              color: '#484848', 
              justifyContent: 'center', 
              alignItems: 'center', padding: '3px', 
              backgroundClip: 'text', 
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                {categoryname.name}</h1>
          </Col>
        </Row>
        <Row className="mt-4 d-flex justify-content-center align-items-center">
          {products.map((product) => ( // Use products.map to iterate over the products array
            <Col key={product.product_id} xs={12} sm={6} md={6} lg={3} className="mb-4">
              <Card style={{ width: '100%', border: '2px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '20px' }}>
                <Card.Link href="#">
                  <div className="d-flex justify-content-center align-items-center">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      style={{ height: '70%', width: '70%', alignItems: 'center', border:'none' }}
                      onClick={(e) => { e.preventDefault(); }}
                    />
                  </div>
                </Card.Link>
                <Card.Body>
                  <Card.Text style={{ fontSize: '14px', lineHeight: '2' }}>
                    <span style={{ fontWeight: 'bold' }}>Rs.{product.price} - 1kg</span><br />
                    <span style={{ fontFamily: 'Sans-serif' }}>{product.name}</span><br />
                    <span style={{ fontFamily: 'Sans-serif' }}>{product.seller.store_name}</span><br />
                    <Button variant="primary"
                      style={{ backgroundColor: '#00BA29', border: 'none', fontSize: '12px' }}
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
      <Footer />
    </div>
  );
};

export default DisplayByCategory;
