import React from "react";
import { Button, Card, Col, Container, Form, Image, Row, Tooltip } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Avacado from '../../assets/Avocado.png'

export default function Checkout() {
  return (
    <section className="h-100 gradient-custom">
      <Container className="py-5 h-100">
        <Row className="justify-content-center my-4">
          <Col md="8">
            
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Auto Fill" />
          </Form.Group>

          <hr/>

            <Form style={{fontSize:'12px'}}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address<span style={{color:'red'}}>*</span></Form.Label>
            <Form.Control type="email" />
            </Form.Group>

            <Row className="mb-3">
        <Form.Group as={Col} >
          <Form.Label>First Name<span style={{color:'red'}}>*</span></Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Last Name<span style={{color:'red'}}>*</span></Form.Label>
          <Form.Control type="texrt"/>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Label>Street Address<span style={{color:'red'}}>*</span></Form.Label>
      <Form.Control type="text" style={{ width:'80%' ,marginBottom: '8px' }} /> 
      <Form.Control type="text" style={{ width:'80%' ,marginBottom: '8px' }} /> 
      </Form.Group>

      <Form.Label>City<span style={{color:'red'}}>*</span></Form.Label>
      <Form.Select aria-label="Select city" style={{width:'80%' ,fontSize:'12px'}}>
      <option>Please select your city</option>
      <option value="1">Kandy</option>
      <option value="2">Colombo</option>
      <option value="3">Galle</option>
      <option value="3">Jaffna</option>
    </Form.Select>
     <p style={{fontSize:'10px', color:'#666', margin:'1%', marginBottom:'3%'}}>Please select the nearest city for the delivery fee.</p>

     <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Label>Zip/Postal Code<span style={{color:'red'}}>*</span></Form.Label>
      <Form.Control type="text" style={{ width:'80%' ,marginBottom: '8px' }} /> 
      </Form.Group>

      <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Label>Phone Number<span style={{color:'red'}}>*</span></Form.Label>
      <Form.Control type="text" style={{ width:'80%' ,marginBottom: '8px' }} /> 
      </Form.Group>

      <hr/>
      <Container>
    <Row>
        <Col md={10}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Delivery
                                </label>
                                <p style={{ color: '#666666', fontSize: '10px' }}>Price may vary depending on the item/destination.</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Pickup from store
                                </label>
                                <p style={{ color: '#666666', fontSize: '10px' }}><span>No.240, Katubedda, Moratuwa</span></p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Col>
        <Col md={2}>
            <div className="d-flex flex-column justify-content-between h-100">
                <div className="align-self-end">
                    <p className="text-end mb-0" style={{fontWeight:'bold'}}>Rs.400.00</p>
                </div>
                <div className="align-self-end">
                    <p className="text-end mb-0" style={{fontWeight:'bold'}}>Rs.0.00</p>
                </div>
            </div>
        </Col>
    </Row>
</Container>


      <Button variant="primary" type="submit" style={{backgroundColor:'#01B928', border:'5px', fontSize:'10px'}}>
         Place Order
      </Button>

    </Form>


          </Col>
          <Col md="1"></Col>
          <Col md="3">
          <Card className="mb-4" style={{ background: 'linear-gradient(to bottom, #DFFFC0, #FFFFFF)' }}>
          <h5 style={{ margin: '5%', fontSize: '15px' }}>Order Summary</h5>
          <hr className="my-1" />
          <p className="mb-0" style={{ fontSize: '8px', margin: '5%', color: '' }}>
          <span>1</span> item in cart
          </p>
          <Card.Body>
          <Row className="align-items-center">
          <Col xs="3" className="mb-4 mb-lg-0">
          <div className="bg-image rounded hover-zoom hover-overlay">
            <Image
              src={Avacado}
              className="w-100"
              style={{ maxWidth: "100px" }}
            />
          </div>
        </Col>
        <Col xs="5" className="mb-4 mb-lg-0">
        <div style={{ paddingRight: '5px' }}>
        <p style={{ fontSize: '10px', margin: '0' }}>Avocado - 1 Kg</p> 
        <p style={{ fontSize: '10px', margin: '0' }}>Qty <span>1</span></p> 
        </div>
        </Col>

        <Col xs="4" className="mb-4 mb-lg-0">
          <strong><p className="text-start text-md-center" style={{ fontSize: '10px' }}>Rs.450.00</p></strong>
        </Col>
      </Row>
    </Card.Body>
  </Card>
</Col>


        </Row>
      </Container>
    </section>
  );
}
