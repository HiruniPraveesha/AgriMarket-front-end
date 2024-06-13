import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Avacado from '../../assets/Avocado.png';
import MainHeader from "../../components/Header-main";
import MainFooter from "../../components/Footer-main";
import { useState, ChangeEvent } from "react";


export default function Checkout() {
  const [isPickup, setIsPickup] = useState(false);

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'flexRadioDefault2') {
      setIsPickup(true);
    } else {
      setIsPickup(false);
    }
  };

  return (
    <>
      <MainHeader />
      <section className="h-100 gradient-custom">
        <Container className="py-5 h-100">
          <Row className="justify-content-center my-4">
            <Col md="6">
              <Row className="d-flex align-items-center justify-content-between">
                <Col md={4}>
                  <p className="fw-bold mb-0" style={{fontSize:'18px'}}>Shipping details</p>
                </Col>
                <Col md={2}>
                  <Form.Group className="mb-0 d-flex align-items-center" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Auto Fill" className="ms-auto" />
                  </Form.Group>
                </Col>
              </Row>

              <hr />

              <Container>
                  <Row>
                    <Col>
                      <table style={{ width: '100%' }}>
                        <tbody>
                          <tr>
                            <td>
                              <div className="form-check d-flex align-items-center">
                                <Row className="w-100">
                                  <Col md={10}>
                                    <div>
                                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={handleOptionChange} />
                                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Delivery
                                      </label>
                                      <p style={{ color: '#666666', fontSize: '10px' }}>Price may vary depending on the item/destination.</p>
                                    </div>
                                  </Col>
                                  <Col md={2}>
                                    <div>
                                      <p className="text-end mb-0" style={{ fontWeight: 'bold' }}>Rs.300.00</p>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="form-check d-flex align-items-center">
                                <Row className="w-100">
                                  <Col md={10}>
                                    <div>
                                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={handleOptionChange} />
                                      <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Pickup from Store
                                      </label>
                                      <p style={{ color: '#666666', fontSize: '10px' }}><span>No.240, Katubedda, Moratuwa</span></p>
                                    </div>
                                  </Col>
                                  <Col md={2}>
                                    <div>
                                      <p className="text-end mb-0" style={{ fontWeight: 'bold' }}>Rs.0.00</p>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </td>
                          </tr>
                          <p style={{ fontSize: '12px' }}>
                            <span>Please note:</span> You can only select <span style={{ fontWeight: 'bold'}}> 
                              Pick Up from Store</span> if all items in your cart are from the same store.
                          </p>
                          </tbody>
                      </table>
                    </Col>
                  </Row>
                </Container>


             <hr style={{  marginTop: '2px',marginBottom:'25px' }} />


              <Form style={{ fontSize: '12px' }}>
                <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                  <Form.Label>Contact Info<span style={{ color: 'red' }}>*</span></Form.Label>
                  <Form.Control type="text" style={{ width: '100%', marginBottom: '8px' }} />
                </Form.Group>

                <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                  <Form.Label>Street Address<span style={{ color: 'red' }}>*</span></Form.Label>
                  <Form.Control disabled={isPickup} type="text" style={{ width: '100%', marginBottom: '8px' }} />
                  <Form.Control disabled={isPickup} type="text" style={{ width: '100%', marginBottom: '8px' }} />
                </Form.Group>

                <Form.Label>City<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Select aria-label="Select city" style={{ width: '100%', fontSize: '15px' }} disabled={isPickup}>
                  <option>Please select your city</option>
                  <option value="1">Colombo</option>
                  <option value="2">Gampaha</option>
                  <option value="3">Kalutara</option>
                  <option value="4">Kandy</option>
                  <option value="5">Matale</option>
                  <option value="6">Nuwara Eliya</option>
                  <option value="7">Galle</option>
                  <option value="8">Matara</option>
                  <option value="9">Hambantota</option>
                  <option value="10">Jaffna</option>
                  <option value="11">Kilinochchi</option>
                  <option value="12">Mannar</option>
                  <option value="13">Vavuniya</option>
                  <option value="14">Mullaitivu</option>
                  <option value="15">Batticaloa</option>
                  <option value="16">Ampara</option>
                  <option value="17">Trincomalee</option>
                  <option value="18">Kurunegala</option>
                  <option value="19">Puttalam</option>
                  <option value="20">Anuradhapura</option>
                  <option value="21">Polonnaruwa</option>
                  <option value="22">Badulla</option>
                  <option value="23">Monaragala</option>
                  <option value="24">Ratnapura</option>
                  <option value="25">Kegalle</option>
                </Form.Select>
                <p style={{ fontSize: '10px', color: '#666', margin: '1%', marginBottom: '3%' }}>Please select the nearest city for the delivery fee.</p>

                <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                  <Form.Label>Zip/Postal Code<span style={{ color: 'red' }}>*</span></Form.Label>
                  <Form.Control disabled={isPickup} type="text" style={{ width: '100%', marginBottom: '8px' }} />
                </Form.Group>

                <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                <Form.Control 
                  as="textarea" 
                  placeholder="Add Delivery instructions here" 
                  style={{ width: '100%', marginBottom: '8px', height: '100px' }} 
                />
              </Form.Group>


                <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit" style={{ backgroundColor: '#01B928', border: '5px', fontSize: '20px', width:'300px', height:'50px',
                   fontWeight:'bold', marginTop:'15px' }}>
                  Place Order
                </Button>
                </div>
              </Form>
            </Col>

            <Col md="1"></Col>

            <Col md="5">

              <Card className="p-4 bg-green" style={{ background: 'linear-gradient(to bottom, #DFFFC0, #FFFFFF)', border: '1px solid #01B928'}}>
                <Row>
                  <Col xs={6}>
                    <h5 style={{ fontSize: '15px', fontWeight: 'bold' }}>Order Summary</h5>
                  </Col>
                  <Col xs={6} className="text-end">
                    <h5 style={{ fontSize: '15px' }}>2 Items</h5>
                  </Col>
                </Row>
                <hr />

                <Card.Body>
                  <Row className="align-items-center" style={{marginBottom:'7px'}}>
                    <Col xs="3" className="mb-4 mb-lg-0">
                      <div className="bg-image rounded hover-zoom hover-overlay">
                        <Image
                          src={Avacado}
                          className="w-100"
                          style={{ maxWidth: "80px" }}
                        />
                      </div>
                    </Col>
                    <Col xs="5" className="mb-4 mb-lg-0">
                      <div style={{ paddingRight: '5px' }}>
                        <p style={{ fontSize: '13px', margin: '0' }}>Avocado - 1 Kg</p>
                        <p style={{ fontSize: '12px', margin: '0' }}>Qty <span>1</span></p>
                        <p style={{ fontSize: '12px', margin: '0' }}>ABC Store</p>
                      </div>
                    </Col>
                    <Col xs="4" className="mb-4 mb-lg-0">
                      <strong><p className="text-start text-md-center" style={{ fontSize: '12px' }}>Rs.450</p></strong>
                    </Col>
                  </Row>
                  
                  <Row className="align-items-center">
                    <Col xs="3" className="mb-4 mb-lg-0">
                      <div className="bg-image rounded hover-zoom hover-overlay">
                        <Image
                          src={Avacado}
                          className="w-100"
                          style={{ maxWidth: "80px" }}
                        />
                      </div>
                    </Col>
                    <Col xs="5" className="mb-4 mb-lg-0">
                      <div style={{ paddingRight: '5px' }}>
                        <p style={{ fontSize: '13px', margin: '0' }}>Avocado - 1 Kg</p>
                        <p style={{ fontSize: '12px', margin: '0' }}>Qty <span>1</span></p>
                        <p style={{ fontSize: '12px', margin: '0' }}>ABC Store</p>
                      </div>
                    </Col>
                    <Col xs="4" className="mb-4 mb-lg-0">
                      <strong><p className="text-start text-md-center" style={{ fontSize: '12px' }}>Rs.450</p></strong>
                    </Col>
                  </Row>
                  
                  <hr/>
                  
                  <div className="d-flex justify-content-between mb-2">
                      <h5 style={{ fontSize: '12px' }}>
                          Sub-total
                      </h5>
                      <h5 style={{ fontSize: '15px' }}>Rs.500</h5>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                      <h5 style={{ fontSize: '12px' }}>
                      Shipping 
                      </h5>
                      <h5 style={{ fontSize: '15px' }}>Rs.300</h5>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                      <h5 style={{ fontSize: '12px' }}>
                      Promo code discount
                      </h5>
                      <h5 style={{ fontSize: '15px' }}>-Rs.50</h5>
                  </div>

                  <hr/>
 
                  <div className="d-flex justify-content-between mb-2">
                      <h5 style={{ fontSize: '20px' }}>
                      Total
                      </h5>
                      <h5 style={{ fontSize: '30px', marginBottom:'-5px', fontWeight:'bold' }}>Rs.750</h5>
                  </div>
                  
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <MainFooter />
    </>
  );
}
