import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap";
import { useState, ChangeEvent, useEffect, Key } from "react";
import axios from "axios";
import Sidebar from "../components/Seller-side-bar";

export default function AddProduct() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [categories, setCategories] = useState<{
      category_id: Key | null | undefined; id: string, name: string }[]>([]);
  const [products, setProducts] = useState<{
      product_id: Key | null | undefined; id: string, name: string 
}[]>([]);

  const sellerId = localStorage.getItem("sellerId");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCategory && sellerId) {
        try {
          const response = await axios.get(`http://localhost:8000/products/${sellerId}/${selectedCategory}`);
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();
  }, [selectedCategory, sellerId]);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    console.log("Selected Category:", selectedValue);
  };

  const handleProductChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedProductId = event.target.value;
    setSelectedProduct(selectedProductId);
    console.log("Selected Product ID:", selectedProductId);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      setModalMessage("Please select an image file to upload.");
      setShowModal(true);
      return;
    }
  
    const mySeller = localStorage.getItem("sellerId");
  
    if (!mySeller) {
      console.error('Seller ID not found in localStorage.');
      return;
    }
  
    const form = new FormData();
    form.append('category', selectedCategory);
    form.append('product', selectedProduct);
    form.append('image', selectedFile);
    form.append('message', message);
    form.append('sellerId', mySeller); // Set sellerId from localStorage directly
    form.append('productId', selectedProduct);
    form.append('categoryId', selectedCategory);
  
    try {
      const response = await axios.post('http://localhost:8000/create-notification', form);
      setModalMessage('Notification added successfully');
      setShowModal(true);
      console.log('Notification added:', response.data);
    } catch (error) {
      console.error('Error adding notification:', error);
      setModalMessage('Failed to add notification');
      setShowModal(true);
    }
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
    // Optionally, reset form fields or any other state related to the modal here
  };
  

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="order-first" style={{ background: '#eaeaea', padding: '0' }}>
          <Sidebar defaultSelected="My Products" />
        </Col>

        <Col>
          <div style={{ padding: '5% 15% 5%' }}>
            <p className="fw-bold" style={{ fontSize: '20px', marginBottom: '-2px' }}>Add Your Notification</p>
            <p className="mb-0" style={{ fontSize: '10px', color: 'gray' }}>You can give notifications to your customers from here.</p>
            <p className="mb-0" style={{ fontSize: '10px', color: 'gray' }}>Select your product, add the message you want, and submit!</p>
            <hr />

            <Form style={{ fontSize: '12px' }} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                <Form.Label>CATEGORY<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Select
                  aria-label="Select category"
                  style={{ width: '100%', fontSize: '15px' }}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="" disabled>Please select your Category</option>
                  {categories.map(category => (
                    <option key={category.category_id} value={category.category_id?.toString()}>{category.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                <Form.Label>PRODUCT<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Select
                  aria-label="Select product"
                  style={{ width: '100%', fontSize: '15px' }}
                  value={selectedProduct}
                  onChange={handleProductChange}
                  required
                >
                  <option value="" disabled>Please select your Product</option>
                  {products.map(product => (
                    <option key={product.product_id} value={product.product_id?.toString()}>{product.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>PRODUCT IMAGE<span style={{ color: 'red' }}>*</span></Form.Label>
                <p>Add files in type of jpeg, jpg, png.</p>
                <p>Width = 271 px, Height = 186 px</p>
                <div className="image-rectangle" style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                  <div style={{ position: 'relative', width: '120px', height: '120px', border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                    {filePreview ? (
                      <img src={filePreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div>
                        <label htmlFor="file-input" style={{ position: 'absolute', inset: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                          <span style={{ fontSize: '48px', color: 'gray' }}>+</span>
                        </label>
                        <input
                          type="file"
                          id="file-input"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="message">
                <Form.Label>MESSAGE<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control
                  as="textarea"
                  value={message}
                  onChange={handleMessageChange}
                  style={{ height: '100px' }}
                  required
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                style={{ backgroundColor: '#F5F5F5', border: '1px solid black', borderRadius: '6px', color: "black", fontWeight: "semi-bold" }}
              >
                Add Notification
              </Button>
            </Form>
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Notification</Modal.Title>
              </Modal.Header>
              <Modal.Body>{modalMessage}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
