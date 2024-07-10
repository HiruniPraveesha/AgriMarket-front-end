import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import UploadImage from "../../assets/uploadImage.svg";
import Back from "../../assets/Back.svg";
import HeaderSub from "../../components/Header-sub";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";



const Verifybank: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const { sellerId } = useParams<{ sellerId: string }>();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate: NavigateFunction | ((arg0: RegExp) => void) = useNavigate();
  const [selectedFile, setSelectedFile] = useState<{
    [key: string]: File | null;
  }>({
    idFront: null,
    idBack: null,
    bankDocument: null,
  });
  const [formData, setFormData] = useState({
    idNumber: "",
    bankName: "",
    holderName: "",
    bankCode: "",
    accountNumber: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile({ ...selectedFile, [field]: files[0] });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    field: string
  ) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFile({ ...selectedFile, [field]: files[0] });
    }
  };

  const clearFile = (field: string) => {
    setSelectedFile({ ...selectedFile, [field]: null });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCloseModal = () => setShowModal(false);
     const handleShowModal = (message: string) => {
    setModalMessage(message);
    setShowModal(true);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form...");
    // Form validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = "ID number is required";
    }
    if (!selectedFile.bankDocument) {
      newErrors.bankDocument = "Bank document is required";
    }
    if (!selectedFile.idFront) {
      newErrors.idFront = "ID front image is required";
    }
    if (!selectedFile.idBack) {
      newErrors.idBack = "ID back image is required";
    }
    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    }
    if (!formData.holderName.trim()) {
      newErrors.holderName = "Holder name is required";
    }
    if (!formData.bankCode.trim()) {
      newErrors.bankCode = "Bank code is required";
    }
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required";
    }
    setErrors(newErrors);

    // Validate ID number
    const idNumberRegex = /^(?:\d{12}|\d{9}V)$/;
    if (
      !formData.idNumber.trim() ||
      !idNumberRegex.test(formData.idNumber.trim())
    ) {
      newErrors.idNumber =
        "ID number must be 12 digits or 9 digits followed by 'V'";
    }
    
     // Proceed with submission if there are no errors
    if (Object.keys(newErrors).length === 0) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("sellerId", sellerId ?? ""); // Ensure sellerId is defined and correct
        if (selectedFile.idFront instanceof File) {
          formDataToSend.append("idFrontPhoto", selectedFile.idFront);
        }
        if (selectedFile.idBack instanceof File) {
          formDataToSend.append("idBackPhoto", selectedFile.idBack);
        }

        if (selectedFile.bankDocument instanceof File) {
          formDataToSend.append("bankBookPhoto", selectedFile.bankDocument);
        }
        formDataToSend.append("idNumber", formData.idNumber);
        formDataToSend.append("bankName", formData.bankName);
        formDataToSend.append("accountHolder", formData.holderName);
        formDataToSend.append("bankCode", formData.bankCode);
        formDataToSend.append("accountNumber", formData.accountNumber);

        const response = await axios.post(
          `http://localhost:8001/api/verify-bank/${sellerId}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Response from server:", response.data);
        handleShowModal("Registration is successfull!");
        // Handle success scenario (redirect, show success message, etc.)
        navigate("/AddProduct");
      } catch (error) {
        console.error("Error submitting form:", error);
        handleShowModal("Form can not be submitting");
        // Handle error scenario (show error message to user, retry option, etc.)
      }
    }
  };

  const handleClick = (field: string) => {
    const fileInput = document.getElementById(field) as HTMLInputElement;
    fileInput.click();
  };

  return (
    <div className="container">
      <div style={{ margin: "0 20%" }}>
        <HeaderSub />
      </div>
      <Row className="justify-content-between align-items-center">
        <Col xs={3} md={3}></Col>
        <Col
          xs={6}
          md={6}
          className="d-flex justify-content-between align-items-center"
        >
          {/* Step Progress Bar */}
          <div style={{ marginLeft: "20px" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                border: "5px solid #D9D9D9",
                backgroundColor: currentStep >= 1 ? "#white" : "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  whiteSpace: "nowrap",
                  fontSize: "14px",
                  marginTop: "50px",
                }}
              >
                Add Profile
              </p>
            </div>
          </div>
          <div
            style={{ width: "70%", height: "1px", backgroundColor: "#000" }}
          ></div>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              border: "5px solid #D9D9D9",
              backgroundColor: currentStep >= 2 ? "#00BA29" : "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                whiteSpace: "nowrap",
                fontSize: "14px",
                marginTop: "50px",
              }}
            >
              Verify ID & Bank Details
            </p>
          </div>
          <div
            style={{ width: "70%", height: "1px", backgroundColor: "#000" }}
          ></div>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              border: "5px solid #D9D9D9",
              backgroundColor: currentStep >= 3 ? "#white" : "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                whiteSpace: "nowrap",
                fontSize: "14px",
                marginTop: "50px",
              }}
            >
              Add Product
            </p>
          </div>
        </Col>
        <Col xs={3} md={3}></Col>
      </Row>

      <Row>
        <Col xs={3} md={3}></Col>
        <Col xs={6} md={6}>
          <p
            style={{ marginTop: "50px", fontWeight: "bold", fontSize: "18px" }}
          >
            ID & Bank Account Information
          </p>
          <p>
            Let us know about your bank information, don't worry we'll keep this
            information confidential.
          </p>

          <Form
            style={{ marginTop: "10px", position: "relative" }}
            onSubmit={handleSubmit}
          >
            {/* Verify Identification Card */}
            <div style={{ marginTop: "40px" }}>
              <p>Verify Identification Card</p>
              <Row>
                <Col xs={6} className="mb-3">
                  <div
                    style={{
                      border: "2px dashed #000",
                      borderRadius: "5px",
                      padding: "20px",
                      textAlign: "center",
                      cursor: "pointer",
                      height: "100%",
                    }}
                    onClick={() => handleClick("idFront")}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "idFront")}
                  >
                    {selectedFile.idFront ? (
                      <div style={{ display: "relative", alignItems: "center" }}>
                        <p style={{ marginRight: "10px" }}>
                        </p>
                        <img
                          src={URL.createObjectURL(selectedFile.idFront)}
                          alt="ID Front"
                          style={{ width: "25%", height: "25%",objectFit: "contain",
                          objectPosition: "center"}}
                        />
                        <FaTimes
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            cursor: "pointer",
                            color: "black",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            clearFile("idFront");
                          }}
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          src={UploadImage}
                          alt="Upload"
                          style={{ width: "auto", height: "auto" }}
                        />
                        <p>Front</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="idFront"
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange(e, "idFront")}
                    />
                  </div>
                  {errors.idFront && (
                    <p style={{ color: "red" }}>{errors.idFront}</p>
                  )}
                </Col>
                <Col xs={6} className="mb-3">
                  <div
                    style={{
                      border: "2px dashed #000",
                      borderRadius: "5px",
                      padding: "20px",
                      textAlign: "center",
                      cursor: "pointer",
                      height: "100%",
                    }}
                    onClick={() => handleClick("idBack")}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "idBack")}
                  >
                    {selectedFile.idBack ? (
                      <div style={{ display: "relative", alignItems: "center" }}>
                        <p style={{ marginRight: "10px" }}>
                        </p>
                        <img
                          src={URL.createObjectURL(selectedFile.idBack)}
                          alt="ID Back"
                          style={{ width: "25%", height: "25%",objectFit: "contain",
                          objectPosition: "center" }}
                        />
                        <FaTimes
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            cursor: "pointer",
                            color: "black",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            clearFile("idBack");
                          }}
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          src={UploadImage}
                          alt="Upload"
                          style={{ width: "auto", height: "auto" }}
                        />
                        <p>Back</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="idBack"
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange(e, "idBack")}
                    />
                  </div>
                  {errors.idBack && (
                    <p style={{ color: "red" }}>{errors.idBack}</p>
                  )}
                </Col>
              </Row>
            </div>

            <Form.Group className="mb-2" style={{ marginTop: "60px" }}>
              <Form.Label>Please enter your ID number</Form.Label>
              <Form.Control
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                style={{
                  borderRadius: "0px",
                  borderWidth: "3px",
                  height: "40px",
                  width: "600px",
                }}
                isInvalid={!!errors.idNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.idNumber}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Verify Bank Account */}
            <div style={{ marginTop: "40px" }}>
              <p>Verify Bank Account</p>
              <p style={{ fontSize: "12px", marginTop: "-14px" }}>
                [Upload the Front Page for Bankbook or Mobile Banking screen
                shot]
              </p>
              <div
                style={{
                  border: "2px dashed #000",
                  borderRadius: "5px",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  width: "49%",
                  height: "100%",
                }}
                onClick={() => handleClick("bankDocument")}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "bankDocument")}
              >
                {selectedFile.bankDocument ? (
                  <div style={{ display: "relative", alignItems: "center" }}>
                    <p style={{ marginRight: "10px" }}>
                      
                    </p>
                    <img
                          src={URL.createObjectURL(selectedFile.bankDocument)}
                          alt="Bank Document"
                          style={{ width: "25%", height: "25%" ,objectFit: "contain",
                          objectPosition: "center"}}
                        />
                      
                      </div>
                    ) : (
                      <div>
                        <img
                          src={UploadImage}
                          alt="Upload"
                          style={{ width: "auto", height: "auto" }}
                        />
                        <p>Bank Document</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="bankDocument"
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange(e, "bankDocument")}
                    />
                  </div>
                  {errors.bankDocument && (
                    <p style={{ color: "red" }}>{errors.bankDocument}</p>
                  )}
            </div>

            <Form.Group style={{ marginTop: "50px" }}>
              <p>Account Details</p>
              <Row className="mb-3">
                <Col xs={6} className="pe-2">
                  <Form.Control
                    type="text"
                    placeholder="Bank Name"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    style={{
                      borderRadius: "0px",
                      borderWidth: "3px",
                      height: "40px",
                      width: "calc(90% - 10px)",
                    }}
                    isInvalid={!!errors.bankName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.bankName}
                  </Form.Control.Feedback>
                </Col>
                <Col xs={6} className="ps-2">
                  <Form.Control
                    type="text"
                    placeholder="Holder Name"
                    name="holderName"
                    value={formData.holderName}
                    onChange={handleChange}
                    style={{
                      borderRadius: "0px",
                      borderWidth: "3px",
                      height: "40px",
                      width: "calc(90% - 10px)",
                    }}
                    isInvalid={!!errors.holderName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.holderName}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className="mb-3" style={{ marginTop: "20px" }}>
                <Col xs={6} className="pe-2">
                  <Form.Control
                    type="text"
                    placeholder="Bank Code"
                    name="bankCode"
                    value={formData.bankCode}
                    onChange={handleChange}
                    style={{
                      borderRadius: "0px",
                      borderWidth: "3px",
                      height: "40px",
                      width: "calc(90% - 10px)",
                    }}
                    isInvalid={!!errors.bankCode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.bankCode}
                  </Form.Control.Feedback>
                </Col>
                <Col xs={6} className="ps-2">
                  <Form.Control
                    type="text"
                    placeholder="Account Number"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    style={{
                      borderRadius: "0px",
                      borderWidth: "3px",
                      height: "40px",
                      width: "calc(90% - 10px)",
                    }}
                    isInvalid={!!errors.accountNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.accountNumber}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Form.Group>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "40px",
              }}
            >
              <Button
                type="submit"
                style={{
                  backgroundColor: "#00BA29",
                  height: "40px",
                  width: "200px",
                  border:"none"
                }}
              >
                Submit
              </Button>
            </div>
            <Link to="/stepProgressBar">
              <Button
                type="button"
                variant="light"
                style={{
                  height: "50px",
                  width: "150px",
                  position: "absolute",
                  right: "20px",
                  marginTop: "40px",
                }}
              >
                <img
                  src={Back}
                  alt="Back"
                  style={{ marginRight: "10px", height: "20px" }}
                />
                Back
              </Button>
            </Link>
          </Form>
        </Col>
        <Col xs={3} md={3}></Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} >
         <Modal.Header closeButton>
          <Modal.Title >Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontSize:"13px"}}>{modalMessage}</Modal.Body>
        <Modal.Footer >
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Verifybank;
