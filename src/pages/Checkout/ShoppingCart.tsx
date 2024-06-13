import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Avocado from '../../assets/Avocado.png';
import Delete from '../../assets/Delete.svg';
import MainHeader from "../../components/Header-main";
import MainFooter from "../../components/Footer-main";
import { useNavigate } from 'react-router-dom';

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
                                    <Col md='7' lg="7" xl='7'>
                                        <div className="p-1">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h2 className="mb-0 text-black" style={{ fontWeight: '600', fontSize:'20px'}}>
                                                    Shopping Cart
                                                </h2>
                                            </div>

                                            <Row className="mb-4 d-flex justify-content-between align-items-center"
                                            style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: 'gray'}}>

                                            <Col md="5" lg="5" xl="5">
                                            <h6 style={{ fontSize: 'inherit'}}>
                                            Item
                                            </h6>
                                            </Col>

                                            <Col md="2" lg="2" xl="2">
                                            <h6 style={{ fontSize: 'inherit'}}>
                                            Price
                                            </h6>
                                            </Col>

                                            <Col md="2" lg="2" xl="2" className="d-flex align-items-center">
                                            <h6 style={{ fontSize: 'inherit'}}>
                                            Qty
                                            </h6>
                                            </Col>

                                            <Col md="2" lg="2" xl="2">
                                            <h6 style={{ fontSize: 'inherit'}}>
                                            Subtotal
                                            </h6>
                                            </Col>

                                            <Col md="1" lg="1" xl="1">
                                            </Col>
                                            </Row>

                                            <hr style={{ marginTop: '-15px'}}/>

                                            <Row className="mb-4 d-flex justify-content-between align-items-center">

                                                <Col md="5" lg="5" xl="5">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Image src={Avocado} fluid className="rounded-3" alt="Avocado - 1 Kg" style={{ height: '80px', width: '80px' }} />
                                                <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontSize: '13px', marginBottom: '5px' }}>Avocado - 1 Kg</span>
                                                    <span style={{ fontSize: '10px' }}>ABC Store</span>
                                                </div>
                                                </div>

                                                </Col>

                                                <Col md="2" lg="2" xl="2" className="d-flex align-items-center">
                                                    <p className="mb-0" style={{fontSize:'15px'}}>
                                                        Rs.450
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
                                                        Rs.450
                                                    </p>
                                                </Col>

                                                <Col md="1" lg="1" xl="1">
                                                    <Image src={Delete} fluid className="rounded-3" alt="Delete" />
                                                </Col>
                                            </Row>

                                            <Row className="mb-4 d-flex justify-content-between align-items-center">

                                                <Col md="5" lg="5" xl="5">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Image src={Avocado} fluid className="rounded-3" alt="Avocado - 1 Kg" style={{ height: '80px', width: '80px' }} />
                                                <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontSize: '13px', marginBottom: '5px' }}>Avocado - 1 Kg</span>
                                                    <span style={{ fontSize: '10px' }}>ABC Store</span>
                                                </div>
                                                </div>
                                                </Col>

                                                <Col md="2" lg="2" xl="2" className="d-flex align-items-center">
                                                    <p className="mb-0" style={{fontSize:'15px'}}>
                                                        Rs.450
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
                                                        Rs.450
                                                    </p>
                                                </Col>

                                                <Col md="1" lg="1" xl="1">
                                                    <Image src={Delete} fluid className="rounded-3" alt="Delete" />
                                                </Col>
                                            </Row>

                                            <hr style={{ marginBottom: '-20px'}}/>

                                            <div className="pt-5 d-flex justify-content-between">

                                            <Button variant="white" style={{ borderRadius: '50px', 
                                                    borderColor: '#01B928', 
                                                    color: 'white', 
                                                    backgroundColor:'#01B928'}} className="btn-sm mx-2">
                                                    <i className="fas fa-long-arrow-alt-left me-2" /> Continue Shopping
                                                </Button>

                                                <Button variant="white" 
                                                style={{ borderRadius: '50px', 
                                                borderColor: '#A2A6B0', 
                                                color: '#A2A6B0' 
                                                }} className="btn-sm mx-2">
                                                    <i className="fas fa-long-arrow-alt-left me-2" /> Clear Shopping Cart
                                                </Button>
                                                
                                            </div>

                                        </div>
                                    </Col>

                                    <Col lg='1'></Col>
                                    
                                    <Col lg="4">
                                        <div className="p-4 bg-green" style={{ background: 'linear-gradient(to right, #FFFFFF, #DFFFC0)', border: '1px solid #01B928' }}>
                                           
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <h5 className="mb-2" style={{ fontSize: '15px', color: 'gray', display:'inline' }}>
                                                        2 items
                                                    </h5>
                                                </div>
                                                <div>
                                                    <h3>Rs.450</h3>
                                                </div>
                                            </div>


                                            <hr/>

                                            <h5 className="mb-2" style={{ fontSize: '13px' }}>
                                                Enter promo code
                                            </h5>

                                            <div className="mb-3 d-flex align-items-center">
                                                <Form.Control size="sm" style={{ width: '150px', fontSize: '15px', marginRight: '15px' }} />
                                                <Button variant="primary" size="sm" style={{ padding: '0.2rem 0.8rem', fontSize: '12px', backgroundColor: '#01B928' }}>
                                                Apply</Button>
                                            </div>


                                            <hr style={{ marginTop: '30px'}} />

                                            <div className="d-flex justify-content-between mb-2">
                                                <h5 style={{ fontSize: '15px' }}>
                                                    Sub-total
                                                </h5>
                                                <h5 style={{ fontSize: '15px' }}>Rs.500</h5>
                                            </div>

                                            <div className="d-flex justify-content-between mb-2">
                                                <h5 style={{ fontSize: '12px' }}>
                                                    Promo code discount
                                                </h5>
                                                <h5 style={{ fontSize: '12px' }}>-Rs.50</h5>
                                            </div>

                                            <div className="d-flex justify-content-between mb-2">
                                                <h5 style={{ fontSize: '12px' }}>
                                                    Order total
                                                </h5>
                                                <h5 style={{ fontSize: '12px' }}>Rs.450</h5>
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button style={{ width: '200px', height: '40px', fontSize: '15px',
                                                 backgroundColor: '#01B928', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                                 marginTop:'15px'}} onClick={useNavigate}>
                                                Proceed to Checkout
                                            </Button>
                                            </div>

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
