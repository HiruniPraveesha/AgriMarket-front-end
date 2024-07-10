import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState, useEffect, ChangeEvent } from "react";
import Sidebar from "../components/Seller-side-bar";
import axios from "axios";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
}

export default function AddNotification() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);
  const [sellerId, setSellerId] = useState(
    localStorage.getItem("sellerId") || ""
  );
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Fetch categories when component mounts
    axios
      .get("http://localhost:8000/Category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch products when selected category changes
    if (selectedCategory) {
      axios
        .get(`http://localhost:8000/productsCal/seller/${sellerId}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [selectedCategory, sellerId]);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setSelectedProduct(""); // Reset selected product when category changes
  };

  const handleProductChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("categoryId", selectedCategory);
    formData.append("productId", selectedProduct);
    formData.append("message", message);
    formData.append("sellerId", sellerId);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    axios
      .post("http://localhost:8000/addNotifications", formData)
      .then((response) => {
        console.log("Notification saved successfully:", response.data);
        // Handle success (e.g., show success message)
      })
      .catch((error) => {
        console.error("Error saving notification:", error);
        // Handle error (e.g., show error message)
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <Sidebar defaultSelected="defaultValue" />
        </Col>
        <Col md={10}>
          <div style={{ padding: "5% 15% 5%" }}>
            <p
              className="fw-bold"
              style={{ fontSize: "20px", marginBottom: "-2px" }}
            >
              Add Your Notification
            </p>
            <p className="mb-0" style={{ fontSize: "15px", color: "gray" }}>
              You can give notifications to your customers from here.
            </p>
            <p>Select your product add the message you want and submit!</p>
            <hr />

            <Form style={{ fontSize: "12px" }} onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>
                  CATEGORY <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select
                  aria-label="Select category"
                  style={{ width: "100%", fontSize: "15px" }}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Please select your Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  PRODUCT <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select
                  aria-label="Select product"
                  style={{ width: "100%", fontSize: "15px" }}
                  value={selectedProduct}
                  onChange={handleProductChange}
                  required
                >
                  <option value="">Please select your Product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div>
                <Form.Label>
                  ADD PHOTO
                  {/* <span style={{ color: "red" }}>*</span> */}
                </Form.Label>
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    border: "2px solid green",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <input
                    type="file"
                    id="fileUpload"
                    onChange={handleFileChange}
                    // required
                    hidden
                  />
                  <label
                    htmlFor="fileUpload"
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {filePreview ? (
                      <img
                        src={filePreview}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <span style={{ fontSize: "36px", color: "green" }}>
                          +
                        </span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>
                  ADD YOUR MESSAGE <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  style={{
                    width: "100%",
                    marginBottom: "8px",
                    height: "150px",
                  }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </Form.Group>

              <div
                className="d-grid gap-2"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    backgroundColor: "#01B928",
                    border: "5px",
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginTop: "20px",
                    width: "200px",
                  }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
