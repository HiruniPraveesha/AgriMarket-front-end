import React from "react";
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Avocado from '../../assets/Avocado.png';
import Delete from '../../assets/Delete.svg';
import MainHeader from "../../components/Header-main";
import MainFooter from "../../components/Footer-main";

const ShoppingCart = () => {
    return (
        <>
        <MainHeader/>
        <section className="h-100" style={{ backgroundColor: 'white' }}>
            <div className="py-5 h-100">
                <Row className="justify-content-center align-items-center h-100 w-100">
                    <Col lg="8">
                        <Card className="card-registration card-registration-2" style={{ border: '0px' }}>
                            <Card.Body className="p-0">
                                <Row className="g-0">
                                    <Col lg="8">
                                        <div className="p-1">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h2 className="mb-0 text-black" style={{ fontWeight: '600', fontSize:'20px'}}>
                                                    Shopping Cart
                                                </h2>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="item1" name="item1" />
                                                <label htmlFor="item1" style={{margin:'10px'}}> SELECT ALL </label>
                                            </div>

                                            <hr className="my-4" />

                                            <Row className="mb-4 d-flex justify-content-between align-items-center">
                                                <Col md="1" lg="1" xl="1" className="text-end">
                                                </Col>
                                                <Col md="4" lg="4" xl="4">
                                                    <h6 className="text-black mb-0">
                                                        Item
                                                    </h6>
                                                </Col>
                                                <Col md="2" lg="2" xl="2">
                                                    <h6 className="text-black mb-0">
                                                        Price
                                                    </h6>
                                                </Col>
                                                <Col md="2" lg="2" xl="2" className="d-flex align-items-center">
                                                    <h6 className="text-black mb-0">
                                                        Qty
                                                    </h6>
                                                </Col>
                                                <Col md="2" lg="2" xl="2" >
                                                    <h6 className="text-black mb-0">
                                                        Subtotal
                                                    </h6>
                                                </Col>
                                                <Col md="1" lg="1" xl="1" >
                                                </Col>
                                            </Row>

                                            <hr className="my-4" />

                                            <Row className="mb-4 d-flex justify-content-between align-items-center">
                                                <Col md="1" lg="1" xl="1">
                                                    <input type="checkbox" id="item1" name="item1" />
                                                </Col>
                                                <Col md="4" lg="4" xl="4">
                                                    <div>
                                                        <Image src={Avocado} fluid className="rounded-3" alt="Avocado - 1 Kg" style={{height:'60px', width:'60px'}} />
                                                        <span style={{ margin: '20px', fontSize: '12px' }}>Avocado - 1 Kg</span>
                                                    </div>
                                                </Col>

                                                <Col md="2" lg="2" xl="2" className="d-flex align-items-center">
                                                    <p className="mb-0" style={{fontSize:'15px'}}>
                                                        Rs.450.00
                                                    </p>
                                                </Col>

                                                <Col md="2" lg="2" xl="2" >
                                                    <Button variant="link" className="px-2">
                                                        <i className="fas fa-minus" />
                                                    </Button>

                                                    <Form.Control type="number" min="0" defaultValue={1} size="sm" style={{width:'60px'}}/>

                                                    <Button variant="link" className="px-2">
                                                        <i className="fas fa-plus" />
                                                    </Button>
                                                </Col>

                                                <Col md="2" lg="2" xl="2" >
                                                    <p className="mb-0" style={{fontSize:'15px'}}>
                                                        Rs.450.00
                                                    </p>
                                                </Col>

                                                <Col md="1" lg="1" xl="1">
                                                    <Image src={Delete} fluid className="rounded-3" alt="Delete" />
                                                </Col>
                                            </Row>

                                            <hr className="my-4" />

                                            <div className="pt-5 d-flex justify-content-between">
                                                <Button variant="white" style={{ borderRadius: '50px', borderColor: '#A2A6B0', color: '#A2A6B0' }} className="btn-sm mx-2">
                                                    <i className="fas fa-long-arrow-alt-left me-2" /> Continue Shopping
                                                </Button>
                                                <Button variant="white" style={{ borderRadius: '50px', borderColor: '#01B928', color: 'white', backgroundColor:'#01B928'}} className="btn-sm mx-2">
                                                    <i className="fas fa-long-arrow-alt-left me-2" /> Clear Shopping Cart
                                                </Button>
                                                <Button variant="white" style={{ borderRadius: '50px', borderColor: '#01B928', color: 'white', backgroundColor:'#01B928'}} className="btn-sm mx-2">
                                                    <i className="fas fa-long-arrow-alt-left me-2" /> Update Shopping Cart
                                                </Button>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col lg="1"></Col>
                                    
                                    <Col lg="3">
    <div className="p-4 bg-green border rounded" style={{ background: 'linear-gradient(to bottom, #DFFFC0, #FFFFFF)' }}>
        <h3 className="fw-bold mb-3 mt-2 pt-1" style={{ fontSize: '15px' }}>
            Summary
        </h3>
        <h6 className="mb-2 mt-2 pt-1" style={{ fontSize: '13px', marginBottom: '3px' }}>
            <strong>Estimate Shipping</strong>
        </h6>
        <p className="mb-2" style={{ fontSize: '12px', marginBottom: '5px' }}>
            Enter your destination to get a shipping estimate.
        </p>

        <div className="d-flex justify-content-between mb-2">
            <h6 style={{ fontSize: '13px', marginBottom: '3px' }}>
                Current Address
            </h6>
        </div>

        <div className="mb-2" style={{ fontSize: '12px' }}>
            No.150, Katubedda, Moratuwa
        </div>

        <div className="d-flex justify-content-between mb-2">
        <div>
    <button className="btn btn-link" style={{ padding: '0.1rem 0.2rem', fontSize: '10px', textDecoration: 'underline' }}>Edit</button>
</div>

        </div>

        <h5 className="mb-2" style={{ fontSize: '13px' }}>
            Enter promo code
        </h5>

        <div className="mb-3">
            <Form.Control size="sm" style={{ width: '130px', fontSize: '10px' }} />
            <Button variant="primary" size="sm" style={{ padding: '0.1rem 0.6rem', fontSize: '10px', backgroundColor: '#01B928' }}>Apply</Button>
        </div>

        <hr className="my-3" />

        <div className="d-flex justify-content-between mb-2">
            <h5 style={{ fontSize: '12px' }}>
                Sub-total
            </h5>
            <h5 style={{ fontSize: '12px' }}>Rs.450.00</h5>
        </div>

        <div className="d-flex justify-content-between mb-2">
            <h5 style={{ fontSize: '12px' }}>
                Shipping
            </h5>
            <h5 style={{ fontSize: '12px' }}>Rs.100.00</h5>
        </div>

        <div className="d-flex justify-content-between mb-2">
            <h5 style={{ fontSize: '12px' }}>
                Promo code discount
            </h5>
            <h5 style={{ fontSize: '12px' }}>Rs.50.00</h5>
        </div>

        <div className="d-flex justify-content-between mb-2">
            <h5 style={{ fontSize: '14px' }}>
                Order total
            </h5>
            <h5 style={{ fontSize: '14px' }}>Rs.500.00</h5>
        </div>

        <Button style={{ width: '200px', height: '30px', fontSize: '12px', backgroundColor: '#01B928' }}>
            Proceed to Checkout
        </Button>
    </div>
</Col>


                         </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </section>
        <MainFooter/>
        </>
    );
}

export default ShoppingCart;
