import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import axios from "axios";
import Back from "../../assets/Back.svg";
import HeaderSub from "../../components/Header-sub";
import { useNavigate, Link } from "react-router-dom";

interface StepProgressBarProps {
  currentStep: number;
}
interface City {
  city_name: string | null | undefined;
  name: string;
}
interface FormData {
  storeName: string;
  email: string;
  phoneNumber: string;
  district: string;
  addressLine1: string;
  addressLine2: string;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep }) => {
  const navigate = useNavigate();
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [formData, setFormData] = useState<FormData>({
    storeName: "",
    email: "",
    phoneNumber: "",
    district: "",
    addressLine1: "",
    addressLine2: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [backendErrors, setBackendErrors] = useState<{ [key: string]: string }>(
    {}
  );

  const districts = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Moneragala",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get<City[]>("http://localhost:8001/cities");
      setCities(response.data); // Assuming response.data is an array of city objects { id: number, name: string }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setBackendErrors({ ...backendErrors, [name]: "" }); // Clear backend error on change
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCityChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setSelectedCity(value);
    // Clear error when city is selected
    setErrors({ ...errors, addressLine1: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form fields
    const newErrors: { [key: string]: string } = {};
    if (!formData.storeName.trim())
      newErrors.storeName = "Store name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?\d{8,14}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }
    if (!formData.district.trim()) newErrors.district = "District is required";
    if (!selectedCity.trim()) newErrors.addressLine1 = "City is required";
    if (!formData.addressLine2.trim())
      newErrors.addressLine2 = "Address line 2 is required";

    setErrors(newErrors);

    // If there are no errors, you can proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8080/completeSellerRegistration",
          formData,
          {
            withCredentials: true,
          }
        );

        // Handle successful response
        const sellerId = response.data.data.seller_id;
        console.log("Response:", response.data);

        navigate(`/Verifybank/${sellerId}`);

        // Reset form fields
        setFormData({
          storeName: "",
          email: "",
          phoneNumber: "",
          district: "",
          addressLine1: "",
          addressLine2: "",
        });
        setServerError(null); // Reset any previous server errors
        setBackendErrors({});
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Error:", err.response.data);
            if (err.response.status === 400) {
              const errorData = err.response.data;
              // Handle 'Phone number is already in use by another seller' error
              if (
                errorData.error ===
                "Phone number is already in use by another seller"
              ) {
                setBackendErrors({ phoneNumber: errorData.error });
              } else if (
                errorData.error ===
                "Entered email does not match the verified email"
              ) {
                setBackendErrors({ email: errorData.error });
              } else if (errorData.error === "Invalid input format") {
                setBackendErrors({ form: errorData.error });
              } else {
                setServerError("Server Error: Please try again later");
              }
            } else {
              setServerError("Server Error: Please try again later");
            }
          } else if (err.request) {
            console.error("Request Error:", err.request);
            setServerError("Request Error: Please try again later");
          } else {
            console.error("Error:", err.message);
            setServerError("Error: Please try again later");
          }
        } else {
          console.error("Unexpected Error:", err);
          setServerError("Unexpected Error: Please try again later");
        }
      }
    }
  };

  return (
    <div>
      <div style={{ margin: "0 20%" }}>
        <HeaderSub />
      </div>
      <div>
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
                  backgroundColor: currentStep >= 1 ? "#00BA29" : "#fff",
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
                backgroundColor: currentStep >= 3 ? "#00BA29" : "#fff",
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
                Dashboard
              </p>
            </div>
          </Col>
          <Col xs={3} md={3}></Col>
        </Row>
        <Row className="justify-content-between align-items-center">
          <Col md={3}></Col>
          <Col md={6}>
            {/* Form */}
            <Form
              style={{ marginTop: "100px", position: "relative" }}
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-2">
                <Form.Label>Enter Your Store Name</Form.Label>
                <Form.Control
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  style={{
                    borderRadius: "0px",
                    borderWidth: "2px",
                    height: "40px",
                  }}
                  isInvalid={!!errors.storeName}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.storeName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2" style={{ marginTop: "25px" }}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={formData.email}
                  style={{
                    borderRadius: "0px",
                    borderWidth: "2px",
                    height: "40px",
                  }}
                  isInvalid={!!errors.email}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
                {/* Backend email error */}
                {backendErrors.email && (
                  <div style={{ color: "red" }}>{backendErrors.email}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-2" style={{ marginTop: "25px" }}>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  style={{
                    borderRadius: "0px",
                    borderWidth: "2px",
                    height: "40px",
                  }}
                  isInvalid={!!errors.phoneNumber}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
                {/* Backend phone number error */}
                {backendErrors.phoneNumber && (
                  <div style={{ color: "red" }}>
                    {backendErrors.phoneNumber}
                  </div>
                )}
              </Form.Group>
              <Form.Group
                controlId="exampleForm.ControlSelect1"
                style={{ marginTop: "25px" }}
              >
                <Form.Label>Address</Form.Label>

                <Form.Select
                  name="district"
                  value={formData.district}
                  onChange={handleSelectChange}
                  style={{
                    marginBottom: "20px",
                    borderRadius: "0px",
                    borderWidth: "2px",
                    height: "auto",
                    maxHeight: "120px",
                    overflowY: "auto",
                    position: "relative",
                  }}
                  isInvalid={!!errors.district}
                >
                  <option>Select District</option>
                  {districts.map((district, index) => (
                    <option key={index}>{district}</option>
                  ))}
                </Form.Select>

                <Form.Group className="mb-3">
                  <Form.Label>Select City</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedCity || ""}
                    onChange={handleCityChange}
                    style={{
                      marginBottom: "20px",
                      borderRadius: "0px",
                      borderWidth: "2px",
                      height: "auto",
                      maxHeight: "120px",
                      overflowY: "auto",
                      position: "relative",
                    }}
                  >
                    <option disabled value="">
                      Select city
                    </option>
                    {cities.map((city) => (
                      <option key={city.city_name} value={city.city_name || ""}>
                        {city.city_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Control
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  placeholder="Enter Your address"
                  style={{
                    marginBottom: "25px",
                    borderRadius: "0px",
                    borderWidth: "2px",
                    height: "40px",
                  }}
                  isInvalid={!!errors.addressLine2}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "35px",
                }}
              >
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#00BA29",
                    height: "40px",
                    width: "200px",
                    border: "none",
                  }}
                >
                  Submit
                </Button>
              </div>
              <Link to="/signupSeller">
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
          <Col md={3}></Col>
        </Row>
      </div>
    </div>
  );
};

export default StepProgressBar;
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
