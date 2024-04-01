import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProPic from '../../assets/ProPic.png';
import MainHeader from '../../components/Header-main';
import MainFooter from '../../components/Footer-main';
import { Link } from "react-router-dom";

export default function BuyerProfile() {
    const [email] = useState('Nehanperera123@gmail.com');
    const [contactNumber, setContactNumber] = useState('0764091213');
    const [userName, setUserName] = useState('John Doe');
    const [newUserName, setNewUserName] = useState(userName);
    const [newProfilePicture, setNewProfilePicture] = useState(ProPic);
    const [showContactNumberModal, setShowContactNumberModal] = useState(false);
    const [showUserNameModal, setShowUserNameModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [newAddressLine1, setNewAddressLine1] = useState('125/1, Katubedda');
    const [newAddressLine2, setNewAddressLine2] = useState('Moratuwa');
    const [newAddressLine3] = useState('');
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);
    const [city, setCity] = useState('Kandy');
    const [newCity, setNewCity] = useState(city);
    const [showCityModal, setShowCityModal] = useState(false);

    const handleEditContactNumber = () => {
        setShowContactNumberModal(true);
    };

    const handleSaveContactNumber = () => {
        setContactNumber(contactNumber);
        setShowContactNumberModal(false);
    };

    const handleEditUserName = () => {
        setNewUserName(userName);
        setShowUserNameModal(true);
    };

    const handleSaveUserName = () => {
        setUserName(newUserName);
        setShowUserNameModal(false);
    };

    const handleChangePassword = () => {
        setShowChangePasswordModal(true);
    };

    const handleCloseChangePasswordModal = () => {
        setShowChangePasswordModal(false);
    };

    const handleSaveAddress = () => {
        setShowAddressModal(false);
    };

    const handleChangeAddress = () => {
        setShowAddressModal(true);
    };

    const handleEditProfilePicture = () => {
        setShowProfilePictureModal(true);
    };

    const handleSaveProfilePicture = () => {
        setNewProfilePicture(newProfilePicture);
        setShowProfilePictureModal(false);
    };

    const handleChangeCity = () => {
        setShowCityModal(true);
    };

    const handleSaveCity = () => {
        setCity(newCity);
        setShowCityModal(false);
    };

    return (
        <>
            <MainHeader />
            <section className="h-100 gradient-custom" style={{ margin: '0 20%' }}>
                <Container className="py-5 h-100">
                    <Row>
                        <Col className="justify-content-center my-4" md="5">
                            <p style={{ fontSize: '17px', fontWeight: 'bold' }}>My Profile</p>
                            <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>Edit your Account Information</p>
                            <hr style={{ marginBottom: '5px', marginTop: '0' }} />
                            <Row>
                                <Col>
                                    <Form style={{ fontSize: '11px' }}>
                                        <Form.Group>
                                            <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Contact Information</p>
                                            <p style={{ color: '#666666', marginBottom: '1px' }}>
                                                <span>{email}</span>
                                            </p>
                                            <p></p>
                                        </Form.Group>

                                        <Form.Group>
                                            <p style={{ color: '#666666', marginBottom: '1px' }}>
                                                <span>{contactNumber}</span>
                                            </p>
                                            <Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '15px' }} onClick={handleEditContactNumber}>Edit</Button>
                                        </Form.Group>
                                        <Modal show={showContactNumberModal} onHide={() => setShowContactNumberModal(false)} style={{ fontSize: '12px' }}>
                                            <Modal.Header closeButton>
                                                <Modal.Title style={{ fontSize: '12px' }}>Edit Contact Number</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form.Group>
                                                    <Form.Label>New Contact Number</Form.Label>
                                                    <Form.Control type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} style={{ fontSize: '12px' }} />
                                                </Form.Group>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => setShowContactNumberModal(false)} style={{ fontSize: '12px' }}>Cancel</Button>
                                                <Button onClick={handleSaveContactNumber} style={{ fontSize: '12px', backgroundColor: '#00BA29' }}>Save Changes</Button>
                                            </Modal.Footer>
                                        </Modal>

                                        <Form.Group>
                                            <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Edit Username</p>
                                            <p style={{ color: '#666666', marginBottom: '1px' }} />
                                            <Form.Group>
                                                <p style={{ color: '#666666', marginBottom: '1px' }}>
                                                    <span>{userName}</span>
                                                </p>
                                                <Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '15px' }} onClick={handleEditUserName}>Edit</Button>
                                            </Form.Group>
                                            <Modal show={showUserNameModal} onHide={() => setShowUserNameModal(false)} style={{ fontSize: '12px' }}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title style={{ fontSize: '12px' }}>Edit User Name</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form.Group>
                                                        <Form.Label>New User Name</Form.Label>
                                                        <Form.Control type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} style={{ fontSize: '12px' }} />
                                                    </Form.Group>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={() => setShowUserNameModal(false)} style={{ fontSize: '12px' }}>Cancel</Button>
                                                    <Button variant="primary" onClick={handleSaveUserName} style={{ fontSize: '12px', backgroundColor: '#00BA29' }}>Save Changes</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Form.Group>
                                    </Form>
                                </Col>

                                <Col>
                                    <p style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: '11px' }}>Profile Picture</p>
                                    <img src={newProfilePicture} style={{ width: '80px', height: '80px' }} alt="Profile" />
                                    <Form.Group>
                                        <Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '15px' }} onClick={handleEditProfilePicture}>Edit</Button>
                                    </Form.Group>
                                    <Modal show={showProfilePictureModal} onHide={() => setShowProfilePictureModal(false)} style={{ fontSize: '12px' }}>
                                        <Modal.Header closeButton>
                                            <Modal.Title style={{ fontSize: '12px' }}>Change Profile Picture</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form.Group>
                                                <Form.Label>Select New Profile Picture</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        if (e.target.files) {
                                                            setNewProfilePicture(URL.createObjectURL(e.target.files[0]));
                                                        }
                                                    }}
                                                    style={{ fontSize: '12px' }}
                                                />
                                            </Form.Group>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => setShowProfilePictureModal(false)} style={{ fontSize: '12px' }}>Cancel</Button>
                                            <Button onClick={handleSaveProfilePicture} style={{ fontSize: '12px', backgroundColor: '#00BA29' }}>Save Changes</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Col>
                            </Row>

                            <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>Secure your password</p>
                            <hr style={{ marginBottom: '5px', marginTop: '0' }} />
                            <Row>
                                <Form.Group>
                                    <Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '15px' }} onClick={handleChangePassword}>Change Password</Button>
                                </Form.Group>
                                <Modal show={showChangePasswordModal} onHide={handleCloseChangePasswordModal} style={{ fontSize: '12px' }}>
                                    <Modal.Header closeButton>
                                        <Modal.Title style={{ fontSize: '12px' }}>Change Password</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Group controlId="formCurrentPassword">
                                            <Form.Label>Current Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter current password" style={{ fontSize: '12px', marginBottom: '5px' }} />
                                        </Form.Group>
                                        <Form.Group controlId="formNewPassword">
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter new password" style={{ fontSize: '12px', marginBottom: '5px' }} />
                                        </Form.Group>
                                        <Form.Group controlId="formConfirmPassword">
                                            <Form.Label>Confirm New Password</Form.Label>
                                            <Form.Control type="password" placeholder="Confirm new password" style={{ fontSize: '12px' }} />
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseChangePasswordModal} style={{ fontSize: '12px' }}>Cancel</Button>
                                        <Button variant="primary" style={{ fontSize: '12px', backgroundColor: '#00BA29' }}>Save Changes</Button>
                                    </Modal.Footer>
                                </Modal>
                            </Row>

                            <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>View your Shopping cart</p>
                    <hr style={{ marginBottom: '5px', marginTop: '0' }}/>
                    <Row>
                    <Form.Group>
                        <Link to ="/shopping-cart"><Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '15px' }}>Shopping Cart</Button></Link>
                        </Form.Group>
                    </Row>
                    <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>Manage Addresses</p>
                    <hr style={{ marginBottom: '5px', marginTop: '0' }}/>

                    <Row>
                    <Form.Group>
                    <p style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: '11px' }}>City</p>
                    <p style={{ color: '#666666', marginBottom: '1px', fontSize:'12px' }}>
                    <span>{city}</span>
                    </p>
                    <Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '15px' }} onClick={handleChangeCity}>Edit</Button>
                    </Form.Group>
<Modal show={showCityModal} onHide={() => setShowCityModal(false)} style={{ fontSize: '12px' }}>
    <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: '12px' }}>Change City</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form.Group>
            <Form.Label>New City</Form.Label>
            <Form.Control type="text" value={newCity} onChange={(e) => setNewCity(e.target.value)} style={{ fontSize: '12px' }} />
        </Form.Group>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowCityModal(false)} style={{ fontSize: '12px' }}>Cancel</Button>
        <Button onClick={handleSaveCity} style={{ fontSize: '12px', backgroundColor: '#00BA29' }}>Save Changes</Button>
    </Modal.Footer>
</Modal>


                    </Row>
                    <Row>
                    <p style={{ marginBottom: '5px', fontWeight: 'bold', fontSize:'11px' }}>Current Address</p>
                    <p style={{ marginBottom: '5px', fontSize: '12px', color: '#666666' }}>
                    {newAddressLine1}, {newAddressLine2}, {newAddressLine3}
                    </p>   
                    <Form.Group>
                    <Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '15px' }} 
                    onClick={handleChangeAddress}>Change Address</Button>
                    </Form.Group>

                    <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)} style={{ fontSize: '12px' }}>
                    <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: '12px' }}>Edit Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form.Group>
                    <Form.Label>New Address Line 1</Form.Label>
                    <Form.Control type="text" value={newAddressLine1} onChange={(e) => setNewAddressLine1(e.target.value)} style={{ fontSize: '12px', marginBottom:'5px' }} />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>New Address Line 2</Form.Label>
                    <Form.Control type="text" value={newAddressLine2} onChange={(e) => setNewAddressLine2(e.target.value)} style={{ fontSize: '12px', marginBottom:'5px' }} />
                    </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddressModal(false)} style={{ fontSize: '12px' }}>Cancel</Button>
                    <Button variant="primary" onClick={handleSaveAddress} style={{ fontSize: '12px', backgroundColor: '#00BA29' }}>Save Changes</Button>
                    </Modal.Footer>
                    </Modal>
                    </Row>


                    </Col>
                <Col md="2"></Col>
                <Col  className="justify-content-center my-4" md="5">
                    <p style={{ fontSize: '17px', fontWeight: 'bold' }}>My Orders</p>
                    <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>Track your Orders</p>
                    <hr style={{ marginBottom: '5px', marginTop: '0' }} />
                    <Row>
                    <Form.Group>
                        <Link to="/ongoing-orders">
                        <Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '20px' }}>
                            View your ongoing Orders</Button></Link>
                        </Form.Group>
                    </Row>

                    <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>View your order history</p>
                    <hr style={{ marginBottom: '5px', marginTop: '0' }} />
                    <Row>
                    <Form.Group>
                        <Link to="/order-history">
                        <Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '50px' }}>
                        View your past orders</Button></Link>
                        </Form.Group>
                    </Row>

                    
                    <p style={{ fontSize: '17px', fontWeight: 'bold' }}>Billing Information</p>
                    <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>Wallet</p>
                    <hr style={{ marginBottom: '5px', marginTop: '0' }} />
                    <Row>
                        <Form.Group>
                            <Link to="/wallet">
                    <Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '20px' }}>
                    View your wallet </Button></Link>
                        </Form.Group>
                    </Row>
                    <Row>
                    <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>Credit or Debit Card</p>
                    </Row>
                </Col>
                    </Row>
                </Container>
            </section>
            <MainFooter />
        </>
    );
}
