import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap";
import { useState, useEffect, ChangeEvent } from "react";
import axios, { AxiosError } from 'axios';
import Sidebar from "../components/Seller-side-bar";

export default function AddProduct() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>(Array(4).fill(null));
  const [filePreviews, setFilePreviews] = useState<string[]>(Array(4).fill(''));
  const [productAdded, setProductAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const mySeller = localStorage.getItem("sellerId");
  const [formData, setFormData] = useState({
    sellerName: '',
    productName: '',
    categoryId: '',
    quantity: '',
    price: '',
    quantityLimit: '',
    description: ''
  });

  useEffect(() => {
    fetchCategories();
    if (mySeller) {
      fetchSellerDetails(mySeller);
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSellerDetails = async (sellerId: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/sellers/${mySeller}`);
      const sellerData = response.data;
      setFormData(prevState => ({
        ...prevState,
        sellerName: sellerData.store_name
      }));
    } catch (error) {
      console.error('Error fetching seller details:', error);
    }
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    setFormData(prevState => ({
      ...prevState,
      categoryId: categoryId
    }));
  };

  const validateImageFile = async (file: File): Promise<boolean> => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return false;
    }
  
    // Check image dimensions
    return new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width === 271 && img.height === 186) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
      img.src = URL.createObjectURL(file);
    });
  };
  

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Validate file type and dimensions
      const isValid = await validateImageFile(file);
      if (!isValid) {
        setModalMessage("Please select an image with dimensions 271x186 and file type JPEG, JPG, or PNG.");
        setShowModal(true);
        return;
      }
      const updatedFiles = [...selectedFiles];
      updatedFiles[index] = file;
      setSelectedFiles(updatedFiles);

      const updatedPreviews = [...filePreviews];
      updatedPreviews[index] = URL.createObjectURL(file);
      setFilePreviews(updatedPreviews);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedFiles.some(file => file === null)) {
      setModalMessage("Please select all four image files to upload.");
      setShowModal(true);
      return;
    }

    const form = new FormData();
    selectedFiles.forEach((file, index) => {
      if (file) {
        form.append(`image${index + 1}`, file);
      }
    });
    form.append('name', formData.productName);
    form.append('price', formData.price);
    form.append('description', formData.description);
    form.append('categoryId', selectedCategory);
    form.append('sellerName', formData.sellerName);
    form.append('quantity', formData.quantity);
    form.append('quantityLimit', formData.quantityLimit);

    try {
      const response = await axios.post('http://localhost:8080/add-product', form);
      console.log('Product added successfully:', response.data);
      setModalMessage('Product added successfully');
      setProductAdded(true);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response) {
          console.error('Error adding product:', axiosError.response.data);
          setModalMessage(`Error adding product: ${axiosError.response.data.error}`);
        } else {
          console.error('Network Error:', axiosError.message);
          setModalMessage('Network Error: Please check your network connection.');
        }
      } else {
        console.error('Error:', error.message);
        setModalMessage('Error adding product');
      }
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="order-first" style={{ background: '#eaeaea', padding: '0' }}>
          <Sidebar defaultSelected="My Products" />
        </Col>

        <Col>
          <div style={{ padding: '5% 15% 5%' }}>
            <p className="fw-bold" style={{ fontSize: '20px', marginBottom: '-2px' }}>Add Your Product</p>
            <p className="mb-0" style={{ fontSize: '10px', color: 'gray' }}>Add a new product to your store</p>
            <hr />

            <Form style={{ fontSize: '12px' }} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                <Form.Label>SELLER NAME<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="sellerName"
                  style={{ width: '100%', marginBottom: '8px' }}
                  value={formData.sellerName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                <Form.Label>PRODUCT NAME<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  style={{ width: '100%', marginBottom: '8px' }}
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

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
                    <option key={category.category_id} value={category.category_id}>{category.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', marginTop: '-15px' }}>
                <div style={{ flex: 1 }}>
                  <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
                    <Form.Label>QUANTITY<span style={{ color: 'red' }}>*</span></Form.Label>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <Form.Control
                        type="number"
                        name="quantity"
                        style={{ width: 'calc(80% - 30px)', marginBottom: '8px' }}
                        placeholder={(selectedCategory === '1' || selectedCategory === '2' || selectedCategory === '3') ? 'Enter quantity in Kg' : 'Enter quantity'}
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                      />
                      {(selectedCategory === '1' || selectedCategory === '2' || selectedCategory === '3') && (
                        <div style={{ marginLeft: '10px' }}>
                          <p style={{ fontSize: '18px' }}>Kg</p>
                        </div>
                      )}
                    </div>
                  </Form.Group>
                </div>

                <div style={{ flex: 1 }}>
                  <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
                    <Form.Label>PRICE PER UNIT<span style={{ color: 'red' }}>*</span></Form.Label>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                      <Form.Control
                        type="text"
                        name="price"
                        style={{ width: 'calc(80% - 30px)', marginBottom: '8px' }}
                        placeholder="Enter price in Rs"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                      <div style={{ marginLeft: '10px' }}>
                        <p style={{ fontSize: '20px' }}>Rs</p>
                      </div>
                    </div>
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
                <Form.Label>QUANTITY PER LIMIT<span style={{ color: 'red' }}>*</span></Form.Label>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <Form.Control
                    type="number"
                    name="quantityLimit"
                    style={{ width: 'calc(80% - 30px)', marginBottom: '8px' }}
                    placeholder={(selectedCategory === '1' || selectedCategory === '2' || selectedCategory === '3') ? 'Enter quantity in Kg' : 'Enter quantity'}
                    value={formData.quantityLimit}
                    onChange={handleInputChange}
                    required
                  />
                  {(selectedCategory === '1' || selectedCategory === '2' || selectedCategory === '3') && (
                    <div style={{ marginLeft: '10px' }}>
                      <p style={{ fontSize: '18px' }}>Kg</p>
                    </div>
                  )}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>PRODUCT IMAGES<span style={{ color: 'red' }}>*</span></Form.Label>
                <p>Add files in type of jpeg, jpg, png.</p>
                <p>Width = 271 px, Height = 186 px</p>
                <div className="image-rectangle" style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                  {filePreviews.map((preview, index) => (
                    <div key={index} style={{ position: 'relative', width: '120px', height: '120px', border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                      {preview ? (
                        <img src={preview} alt={`preview-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div>
                          <label htmlFor={`file-input-${index}`} style={{ position: 'absolute', inset: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                            <span style={{ fontSize: '48px', color: 'gray' }}>+</span>
                          </label>
                          <input
                            type="file"
                            id={`file-input-${index}`}
                            onChange={(e) => handleFileChange(e, index)}
                            style={{ display: 'none' }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>DESCRIPTION<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  style={{ height: '100px' }}
                  required
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                style={{ backgroundColor: '#F5F5F5', border: '1px solid black', borderRadius: '6px', color: "black", fontWeight: "semi-bold" }}
                disabled={productAdded} // Disable button if product was already added
              >
                {productAdded ? "Added" : "Add Product"}
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