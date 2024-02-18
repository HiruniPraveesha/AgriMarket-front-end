import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row,} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProPic from '../../assets/ProPic.png';

export default function BuyerProfile() {
    const [email, setEmail] = useState('Nehanperera123@gmail.com');
    const [contactNumber, setContactNumber] = useState('0764091213');
    const [userName, setUserName] = useState('John Doe');
    const [newUserName, setNewUserName] = useState(userName);
    const [newEmail, setNewEmail] = useState('');
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showContactNumberModal, setShowContactNumberModal] = useState(false);
    const [showUserNameModal, setShowUserNameModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [newAddressLine1, setNewAddressLine1] = useState('125/1, Katubedda');
    const [newAddressLine2, setNewAddressLine2] = useState('Moratuwa');
    const [newAddressLine3, setNewAddressLine3] = useState('');
    const [showAddressModal, setShowAddressModal] = useState(false);

    const handleEditemail = () => {
        setNewEmail(email); // Initialize new email with current email
        setShowEmailModal(true);
    };

    const handleSaveemail = () => {
        setEmail(newEmail);
        setShowEmailModal(false);
    };

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
        // Handle saving address changes here
        setShowAddressModal(false);
    };
    
    const handleChangeAddress = () => {
        setShowAddressModal(true);
    };
    


    return (
        <section className="h-100 gradient-custom">
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
                                    <Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '10px' }} onClick={handleEditemail}>Edit</Button>
                                </Form.Group>
                                <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)} style={{ fontSize: '12px' }}>
                                    <Modal.Header closeButton>
                                        <Modal.Title style={{ fontSize: '12px' }}>Edit Email</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Group>
                                            <Form.Label>New Email</Form.Label>
                                            <Form.Control type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} style={{ fontSize: '12px' }} />
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowEmailModal(false)} style={{ fontSize: '12px' }}>Cancel</Button>
                                        <Button variant="primary" onClick={handleSaveemail} style={{ fontSize: '12px', backgroundColor: '#00BA29' }}>Save Changes</Button>
                                    </Modal.Footer>
                                </Modal>
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
                                        <Button variant="primary" onClick={handleSaveContactNumber} style={{ fontSize: '12px', backgroundColor: '#00BA29' }}>Save Changes</Button>
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
                        {/* Profile picture */}
                        <p style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: '11px' }}>Profile Picture</p>
                        <img src={ProPic} style={{width: '80px', height: '80px'}}></img>
                        <Form.Group>
                    <Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '15px' }} >Edit</Button>
                    </Form.Group>
                        </Col>
                    </Row>
                    <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>Secure your password</p>
                    <hr style={{ marginBottom: '5px', marginTop: '0' }} />
                    <Row>
                        <Form.Group>
                        <Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '15px' }} onClick={handleChangePassword}>Change Password</Button>
                        </Form.Group>
                    <Modal show={showChangePasswordModal} onHide={handleCloseChangePasswordModal} style={{fontSize:'12px'}}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: '12px' }}>Change Password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formCurrentPassword">
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter current password" style={{ fontSize: '12px', marginBottom:'5px' }} />
                            </Form.Group>
                            <Form.Group controlId="formNewPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter new password" style={{ fontSize: '12px', marginBottom:'5px' }} />
                            </Form.Group>
                            <Form.Group controlId="formConfirmPassword">
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm new password" style={{ fontSize: '12px' }} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseChangePasswordModal} style={{fontSize:'12px'}}>Cancel</Button>
                            <Button variant="primary" style={{ fontSize: '12px', backgroundColor: '#00BA29' }}>Save Changes</Button>
                        </Modal.Footer>
                    </Modal>
                     </Row>
                     <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>View your Shopping cart</p>
                    <hr style={{ marginBottom: '5px', marginTop: '0' }}/>
                    <Row>
                    <Form.Group>
                        <Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '15px' }}>Shopping Cart</Button>
                        </Form.Group>
                    </Row>
                    <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>Manage Addresses</p>
                    <hr style={{ marginBottom: '5px', marginTop: '0' }}/>
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
                    <Form.Group>
                    <Form.Label>New Address Line 3</Form.Label>
                    <Form.Control type="text" value={newAddressLine3} onChange={(e) => setNewAddressLine3(e.target.value)} style={{ fontSize: '12px', marginBottom:'5px' }} />
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
                        <Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '20px' }}>
                            View your ongoing Orders</Button>
                        </Form.Group>
                    </Row>

                    <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>View your order history</p>
                    <hr style={{ marginBottom: '5px', marginTop: '0' }} />
                    <Row>
                    <Form.Group>
                        <Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '50px' }}>
                        View your past orders</Button>
                        </Form.Group>
                    </Row>

                    
                    <p style={{ fontSize: '17px', fontWeight: 'bold' }}>Billing Information</p>
                    <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>Wallet</p>
                    <hr style={{ marginBottom: '5px', marginTop: '0' }} />
                    <Row>
                        <Form.Group>
                    <Button variant="link" style={{ padding: '0', color: '#00BA29', fontSize: '11px', marginBottom: '20px' }}>
                    View your wallet </Button>
                        </Form.Group>
                    </Row>
                    <Row>
                    <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>Credit or Debit Card</p>
                    </Row>
                </Col>
                </Row>
            </Container>
        </section>
    );
}
