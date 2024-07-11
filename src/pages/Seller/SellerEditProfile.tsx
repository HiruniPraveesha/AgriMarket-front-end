import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import SellerLayout from "./SellerLayout";

export default function SellerEditProfile() {
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [newContactNumber, setNewContactNumber] = useState(contactNumber);
  const [userName, setUserName] = useState("");
  const [newUserName, setNewUserName] = useState(userName);
  const [showContactNumberModal, setShowContactNumberModal] = useState(false);
  const [showUserNameModal, setShowUserNameModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [newAddressLine1, setNewAddressLine1] = useState("");
  const [newAddressLine2, setNewAddressLine2] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [city, setCity] = useState("");
  const [newCity, setNewCity] = useState(city);
  const [district, setDistrict] = useState("");
  const [newDistrict, setNewDistrict] = useState(district);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showDistrictModal, setShowDistrictModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const id = 1;

  const getSellerDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/get-seller-details,
        {
          params: { id },
        }`
      );
      const { data } = response.data;
      setEmail(data.email);
      setContactNumber(data.contactNo);
      setUserName(data.store_name);
      setNewAddressLine1(data.line1);
      setNewAddressLine2(data.line2);
      setCity(data.city);
      setDistrict(data.district);
    } catch (error) {
      console.error("Error fetching seller details:", error);
    }
  };

  const handleEditContactNumber = () => {
    setNewContactNumber(contactNumber);
    setShowContactNumberModal(true);
  };

  const handleSaveContactNumber = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/change-contact-number",
        {
          id,
          newContactNumber,
        }
      );

      if (response.status === 200) {
        setContactNumber(newContactNumber);
        setShowContactNumberModal(false);
      } else {
        alert("Failed to update contact number");
      }
    } catch (error) {
      console.error("Error updating contact number:", error);
    }
  };

  const handleChangePassword = () => {
    setShowChangePasswordModal(true);
  };
  const handleSavePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/change-password",
        {
          id,
          currentPassword,
          newPassword,
          confirmPassword,
        }
      );

      if (response.status === 200) {
        alert("Password changed successfully");
        handleCloseChangePasswordModal();
      } else {
        alert("Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password");
    }
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  useEffect(() => {
    getSellerDetails();
  }, []);

  return (
    <>
      <SellerLayout>
        <section className="h-100 gradient-custom" style={{ margin: "0 20%" }}>
          <Container className="py-5 h-100">
            <Row>
              <Col style={{ marginLeft: "30%", marginRight: "20%" }}>
                <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                  My Profile
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  Edit your Account Information
                </p>
                <hr style={{ marginBottom: "5px", marginTop: "0" }} />
                <Row>
                  <Col>
                    <Form style={{ fontSize: "11px" }}>
                      <Form.Group>
                        <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
                          Contact Information
                        </p>
                        <p style={{ color: "#666666", marginBottom: "1px" }}>
                          <span>{email}</span>
                        </p>
                        <p></p>
                      </Form.Group>

                      <Form.Group>
                        <p style={{ color: "#666666", marginBottom: "1px" }}>
                          <span>{contactNumber}</span>
                        </p>
                        <Button
                          variant="link"
                          style={{
                            padding: "0",
                            color: "#00BA29",
                            fontSize: "11px",
                            marginBottom: "15px",
                          }}
                          onClick={handleEditContactNumber}
                        >
                          Edit
                        </Button>
                      </Form.Group>

                      <Modal
                        show={showContactNumberModal}
                        onHide={() => setShowContactNumberModal(false)}
                        style={{ fontSize: "12px" }}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title style={{ fontSize: "12px" }}>
                            Edit Contact Number
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form.Group>
                            <Form.Label>New Contact Number</Form.Label>
                            <Form.Control
                              type="text"
                              value={newContactNumber}
                              onChange={(e) =>
                                setNewContactNumber(e.target.value)
                              }
                              style={{ fontSize: "12px" }}
                            />
                          </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() => setShowContactNumberModal(false)}
                            style={{ fontSize: "12px" }}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSaveContactNumber}
                            style={{
                              fontSize: "12px",
                              backgroundColor: "#00BA29",
                            }}
                          >
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>

                      <Form.Group>
                        <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
                          Store Name
                        </p>
                        <p style={{ color: "#666666", marginBottom: "1px" }} />
                        <Form.Group>
                          <p
                            style={{
                              color: "#666666",
                              marginBottom: "15px",
                              marginTop: "-5px",
                            }}
                          >
                            <span>{userName}</span>
                          </p>
                        </Form.Group>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>

                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  Secure your password
                </p>
                <hr style={{ marginBottom: "5px", marginTop: "0" }} />
                <Row>
                  <Form.Group>
                    <Button
                      variant="link"
                      style={{
                        padding: "0",
                        color: "#00BA29",
                        fontSize: "11px",
                        marginBottom: "15px",
                      }}
                      onClick={handleChangePassword}
                    >
                      Change Password
                    </Button>
                  </Form.Group>
                  <Modal
                    show={showChangePasswordModal}
                    onHide={handleCloseChangePasswordModal}
                    style={{ fontSize: "12px" }}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title style={{ fontSize: "12px" }}>
                        Change Password
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Group controlId="formCurrentPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter current password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          style={{ fontSize: "12px", marginBottom: "5px" }}
                        />
                      </Form.Group>
                      <Form.Group controlId="formNewPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          style={{ fontSize: "12px", marginBottom: "5px" }}
                        />
                      </Form.Group>
                      <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          style={{ fontSize: "12px" }}
                        />
                      </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={handleCloseChangePasswordModal}
                        style={{ fontSize: "12px" }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleSavePassword}
                        style={{
                          fontSize: "12px",
                          backgroundColor: "#00BA29",
                        }}
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      marginBottom: "5px",
                    }}
                  >
                    Store Address
                  </p>
                  <hr style={{ marginBottom: "5px", marginTop: "0" }} />

                  <Form style={{ fontSize: "11px" }}>
                    <Form.Group>
                      <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
                        City
                      </p>
                      <p style={{ color: "#666666", marginBottom: "15px" }}>
                        <span>{city}</span>
                      </p>
                    </Form.Group>

                    <Form.Group>
                      <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
                        District
                      </p>
                      <p style={{ color: "#666666", marginBottom: "15px" }}>
                        <span>{district}</span>
                      </p>
                    </Form.Group>

                    <Form.Group>
                      <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
                        Address
                      </p>
                      <p style={{ color: "#666666", marginBottom: "1px" }}>
                        <span>{newAddressLine1},</span>
                      </p>
                      <p style={{ color: "#666666", marginBottom: "15px" }}>
                        <span>{newAddressLine2}</span>
                      </p>
                    </Form.Group>
                  </Form>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </SellerLayout>
    </>
  );
}
