import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ProPic from "../../assets/ProPic.png";
import MainHeader from "../../components/Header-main";
import MainFooter from "../../components/Footer-main";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BuyerProfile() {
  const [buyerId, setSellerId] = useState(
    localStorage.getItem("sellerId") || ""
  );
  const [contactNumber, setContactNumber] = useState("");
  const [newcontactNumber, setNewContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
  const [showContactNumberModal, setShowContactNumberModal] = useState(false);
  const [showUserNameModal, setShowUserNameModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [newAddressLine1, setNewAddressLine1] = useState("");
  const [newAddressLine2, setNewAddressLine2] = useState("");
  const [newPostalcode, setNewPostalcode] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);
  const [city, setCity] = useState("");
  const [newCity, setNewCity] = useState(city);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  //const [buyerAddress, setBuyerAddress] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);
  useEffect(() => {
    fetchAddressData();
  }, []);

  const fetchUserData = () => {
    axios
      .get(`http://localhost:8080/buyer/${buyerId}`)
      .then((response) => {
        const { contactNo, email, profilePhoto } = response.data;
        setContactNumber(contactNo);
        setEmail(email);

        setNewProfilePicture(profilePhoto || ProPic); // Use default profile picture if none exists
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const fetchAddressData = () => {
    axios
      .get(`http://localhost:8080/buyer/address/${buyerId}`)
      .then((response) => {
        const { city, line1, line2 } = response.data;
        setCity(city);
        setNewAddressLine1(line1);
        setNewAddressLine2(line2);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (message: string) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const handleEditContactNumber = () => {
    setShowContactNumberModal(true);
  };

  const handleSaveContactNumber = () => {
    const phonenumregex = /^\d{10}$/;
    if (!phonenumregex.test(newcontactNumber)) {
      handleShowModal("please enter valid phone number");
      return;
    }
    // Update contact number logic
    axios
      .put(`http://localhost:8080/buyer/contact/${buyerId}`, {
        contactNo: newcontactNumber,
      })
      .then((response) => {
        console.log("Contact number updated successfully:", response.data);
        setContactNumber(newcontactNumber);
        setShowContactNumberModal(false);
      })
      .catch((error) => {
        console.error("Error updating contact number:", error);
        // Handle error - Display an error message to the user, if needed
      });
  };

  const handleEditEmail = () => {
    setNewEmail(email);
    setShowUserNameModal(true);
  };

  const handleSaveEmail = () => {
    // Update email logic here
    axios
      .put(`http://localhost:8080/buyer/email/${buyerId}`, { email: newEmail })
      .then((response) => {
        console.log("Email updated successfully:", response.data);
        setEmail(newEmail);
        setShowUserNameModal(false);
      })
      .catch((error) => {
        console.error("Error updating email:", error);
        // Handle error - Display an error message to the user, if needed
      });
  };

  const handleChangePassword = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  const handleSavePassword = () => {
    if (newPassword !== confirmNewPassword) {
      handleShowModal("New passwords do not match.");
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[!@#])(?=.*[a-z])(?=.*[A-Z]).{7,}$/;

    if (!passwordRegex.test(newPassword)) {
      handleShowModal(
        "Password must contain at least 7 characters, including one uppercase letter, one lowercase letter, one number, and one special character(!,@,#)."
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      handleShowModal("New passwords do not match.");
      return;
    }
    axios
      .put(`http://localhost:8080/buyer/password/${buyerId}`, {
        currentPassword,
        newPassword,
      })
      .then((response) => {
        console.log("Password updated successfully:", response.data);
        setShowChangePasswordModal(false);
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        handleShowModal(
          "Error updating password. Please check your current password and try again."
        );
      });
  };

  const handleSaveAddress = () => {
    axios
      .put(`http://localhost:8080/buyer/address/${buyerId}`, {
        addressLine1: newAddressLine1,
        addressLine2: newAddressLine2,
        postalCode: newPostalcode,
      })
      .then((response) => {
        console.log("Address updated successfully:", response.data);
        fetchUserData(); // Refresh user data to show the updated address
      })
      .catch((error) => {
        console.error("Error updating address:", error);
      });

    setShowAddressModal(false);
  };

  const handleChangeAddress = () => {
    setShowAddressModal(true);
  };

  const handleEditProfilePicture = () => {
    setShowProfilePictureModal(true);
  };

  const handleSaveProfilePicture = async () => {
    if (!newProfilePicture) {
      console.error("No profile picture selected.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", newProfilePicture); // Assuming newProfilePicture is a File object

    try {
      const response = await axios.put(
        `http://localhost:8080/buyer/profile/photo/${buyerId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct content type for FormData
          },
        }
      );
      console.log("Profile photo updated successfully:", response.data);
      // Optionally update state or perform any UI updates on success
    } catch (error) {
      console.error("Error updating profile photo:", error);
      // Handle error - Display an error message to the user, if needed
    }

    setShowProfilePictureModal(false);
  };

  const handleChangeCity = () => {
    setShowCityModal(true);
  };

  const handleSaveCity = () => {
    axios
      .put(`http://localhost:8080/buyer/city/${buyerId}`, { city: newCity })
      .then((response) => {
        console.log("City updated successfully:", response.data);
        setCity(newCity);
        setShowCityModal(false);
      })
      .catch((error) => {
        console.error("Error updating city:", error);
      });
  };

  return (
    <>
      <MainHeader />
      <section className="h-100 gradient-custom" style={{ margin: "0 20%" }}>
        <Container className="py-5 h-100">
          <Row>
            <Col className="justify-content-center my-4" md="5">
              <p style={{ fontSize: "17px", fontWeight: "bold" }}>My Profile</p>
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
                      <p style={{ color: "#666666", marginBottom: "1px" }} />
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
                              value={newcontactNumber}
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
                    </Form.Group>

                    <Form.Group>
                      <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
                        Email Address
                      </p>
                      <p style={{ color: "#666666", marginBottom: "1px" }} />
                      <Form.Group>
                        <p style={{ color: "#666666", marginBottom: "1px" }}>
                          <span>{email}</span>
                        </p>
                        <Button
                          variant="link"
                          style={{
                            padding: "0",
                            color: "#00BA29",
                            fontSize: "11px",
                            marginBottom: "15px",
                          }}
                          onClick={handleEditEmail}
                        >
                          Edit
                        </Button>
                      </Form.Group>
                      <Modal
                        show={showUserNameModal}
                        onHide={() => setShowUserNameModal(false)}
                        style={{ fontSize: "12px" }}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title style={{ fontSize: "12px" }}>
                            Edit Email Address
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form.Group>
                            <Form.Label>New Email Address</Form.Label>
                            <Form.Control
                              type="text"
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                              style={{ fontSize: "12px" }}
                            />
                          </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() => setShowUserNameModal(false)}
                            style={{ fontSize: "12px" }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            onClick={handleSaveEmail}
                            style={{
                              fontSize: "12px",
                              backgroundColor: "#00BA29",
                            }}
                          >
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Form.Group>
                  </Form>
                </Col>

                <Col>
                  <p
                    style={{
                      marginBottom: "8px",
                      fontWeight: "bold",
                      fontSize: "11px",
                      paddingLeft: "14px",
                    }}
                  >
                    Profile Picture
                  </p>
                  <img
                    src={
                      newProfilePicture
                        ? typeof newProfilePicture === "string"
                          ? newProfilePicture
                          : URL.createObjectURL(newProfilePicture)
                        : ProPic
                    }
                    alt="Profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  />
                  <Form.Group>
                    <Button
                      variant="link"
                      style={{
                        padding: "0",
                        color: "#00BA29",
                        fontSize: "11px",
                        marginBottom: "15px",
                        marginLeft: "37px",
                      }}
                      onClick={handleEditProfilePicture}
                    >
                      Edit
                    </Button>
                  </Form.Group>
                  <Modal
                    show={showProfilePictureModal}
                    onHide={() => setShowProfilePictureModal(false)}
                    style={{ fontSize: "12px" }}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title style={{ fontSize: "12px" }}>
                        Change Profile Picture
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Group>
                        <Form.Label>Select New Profile Picture</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (e.target.files) {
                              setNewProfilePicture(e.target.files[0]);
                            }
                          }}
                          style={{ fontSize: "12px" }}
                        />
                      </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => setShowProfilePictureModal(false)}
                        style={{ fontSize: "12px" }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSaveProfilePicture}
                        style={{ fontSize: "12px", backgroundColor: "#00BA29" }}
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
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
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          value={currentPassword}
                          placeholder="Enter current password"
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          style={{ fontSize: "12px", marginBottom: "5px" }}
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          {showPassword ? (
                            <AiOutlineEyeInvisible />
                          ) : (
                            <AiOutlineEye />
                          )}
                        </span>
                      </div>
                    </Form.Group>
                    <Form.Group controlId="formNewPassword">
                      <Form.Label>New Password</Form.Label>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          style={{ fontSize: "12px", marginBottom: "5px" }}
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          {showPassword ? (
                            <AiOutlineEyeInvisible />
                          ) : (
                            <AiOutlineEye />
                          )}
                        </span>
                      </div>
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                      <Form.Label>Confirm New Password</Form.Label>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                          placeholder="Confirm new password"
                          style={{ fontSize: "12px" }}
                        />
                        <span
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          {showConfirmPassword ? (
                            <AiOutlineEyeInvisible />
                          ) : (
                            <AiOutlineEye />
                          )}
                        </span>
                      </div>
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
                      onClick={handleSavePassword}
                      style={{ fontSize: "12px", backgroundColor: "#00BA29" }}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Row>

              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                View your Shopping cart
              </p>
              <hr style={{ marginBottom: "5px", marginTop: "0" }} />
              <Row>
                <Form.Group>
                  <Link to="/shopping-cart">
                    <Button
                      variant="link"
                      style={{
                        padding: "0",
                        color: "#00BA29",
                        fontSize: "11px",
                        marginBottom: "15px",
                      }}
                    >
                      Shopping Cart
                    </Button>
                  </Link>
                </Form.Group>
              </Row>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Manage Addresses
              </p>
              <hr style={{ marginBottom: "5px", marginTop: "0" }} />

              <Row>
                <Form.Group>
                  <p
                    style={{
                      marginBottom: "5px",
                      fontWeight: "bold",
                      fontSize: "11px",
                    }}
                  >
                    City
                  </p>
                  <p
                    style={{
                      color: "#666666",
                      marginBottom: "1px",
                      fontSize: "12px",
                    }}
                  >
                    <span>{city}</span>
                  </p>
                  <Button
                    variant="link"
                    style={{
                      padding: "0",
                      color: "#00BA29",
                      fontSize: "11px",
                      marginBottom: "15px",
                    }}
                    onClick={handleChangeCity}
                  >
                    Edit
                  </Button>
                </Form.Group>
                <Modal
                  show={showCityModal}
                  onHide={() => setShowCityModal(false)}
                  style={{ fontSize: "12px" }}
                >
                  <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "12px" }}>
                      Change City
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group>
                      <Form.Label>New City</Form.Label>
                      <Form.Control
                        type="text"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        style={{ fontSize: "12px" }}
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowCityModal(false)}
                      style={{ fontSize: "12px" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveCity}
                      style={{ fontSize: "12px", backgroundColor: "#00BA29" }}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Row>
              <Row>
                <p
                  style={{
                    marginBottom: "5px",
                    fontWeight: "bold",
                    fontSize: "11px",
                  }}
                >
                  Current Address
                </p>
                <p
                  style={{
                    marginBottom: "5px",
                    fontSize: "12px",
                    color: "#666666",
                  }}
                >
                  {newAddressLine1} , {newAddressLine2}
                </p>
                <Form.Group>
                  <Button
                    variant="link"
                    style={{
                      padding: "0",
                      color: "#00BA29",
                      fontSize: "11px",
                      marginBottom: "15px",
                    }}
                    onClick={handleChangeAddress}
                  >
                    Change Address
                  </Button>
                </Form.Group>

                <Modal
                  show={showAddressModal}
                  onHide={() => setShowAddressModal(false)}
                  style={{ fontSize: "12px" }}
                >
                  <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "12px" }}>
                      Edit Address
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group>
                      <Form.Label>New Address Line 1</Form.Label>
                      <Form.Control
                        type="text"
                        value={newAddressLine1}
                        onChange={(e) => setNewAddressLine1(e.target.value)}
                        style={{ fontSize: "12px", marginBottom: "5px" }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>New Address Line 2</Form.Label>
                      <Form.Control
                        type="text"
                        value={newAddressLine2}
                        onChange={(e) => setNewAddressLine2(e.target.value)}
                        style={{ fontSize: "12px", marginBottom: "5px" }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control
                        type="text"
                        value={newPostalcode}
                        onChange={(e) => setNewPostalcode(e.target.value)}
                        style={{ fontSize: "12px", marginBottom: "5px" }}
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowAddressModal(false)}
                      style={{ fontSize: "12px" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleSaveAddress}
                      style={{ fontSize: "12px", backgroundColor: "#00BA29" }}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Row>
            </Col>
            <Col md="2"></Col>
            <Col className="justify-content-center my-4" md="5">
              <p style={{ fontSize: "17px", fontWeight: "bold" }}>My Orders</p>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                View your order history
              </p>
              <hr style={{ marginBottom: "5px", marginTop: "0" }} />
              <Row>
                <Form.Group>
                  <Link to="/order-history">
                    <Button
                      variant="link"
                      style={{
                        padding: "0",
                        color: "#00BA29",
                        fontSize: "11px",
                        marginBottom: "50px",
                      }}
                    >
                      View your past orders
                    </Button>
                  </Link>
                </Form.Group>
              </Row>

              <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                Billing Information
              </p>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Wallet
              </p>
              <hr style={{ marginBottom: "5px", marginTop: "0" }} />
              <Row>
                <Form.Group>
                  <Link to="/wallet">
                    <Button
                      variant="link"
                      style={{
                        padding: "0",
                        color: "#00BA29",
                        fontSize: "11px",
                        marginBottom: "20px",
                      }}
                    >
                      View your wallet{" "}
                    </Button>
                  </Link>
                </Form.Group>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "13px" }}>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <MainFooter />
    </>
  );
}
