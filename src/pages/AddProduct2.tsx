import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState, useEffect, ChangeEvent } from "react";

export default function AddProduct() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch('http://localhost:8000/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
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
    // Implement submission logic here, including file upload
    if (selectedFile) {
      console.log('Form submitted with file:', selectedFile);
      // You can now handle file upload logic here
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <div style={{ padding: '5% 15% 5%' }}>
            <p className="fw-bold" style={{ fontSize: '20px', marginBottom: '-2px' }}>Add Your Product</p>
            <p className="mb-0" style={{ fontSize: '10px', color: 'gray' }}>Add a new product to your store</p>
            <hr />

            <Form style={{ fontSize: '12px' }} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                <Form.Label>PRODUCT NAME<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control type="text" style={{ width: '100%', marginBottom: '8px' }} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>CATEGORY<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Select aria-label="Select category" style={{ width: '100%', fontSize: '15px' }} value={selectedCategory} onChange={handleCategoryChange} required>
                  <option>Please select your Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', marginTop: '-15px' }}>
                <div style={{ flex: 1 }}>
                  <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
                    <Form.Label>QUANTITY<span style={{ color: 'red' }}>*</span></Form.Label>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <Form.Control type="number" style={{ width: 'calc(80% - 30px)', marginBottom: '8px' }} placeholder={(selectedCategory.toLowerCase() === 'fruits' || selectedCategory.toLowerCase() === 'vegetables' || selectedCategory.toLowerCase() === 'grains') ? 'Enter quantity in Kg' : 'Enter quantity'} required />
                      {(selectedCategory.toLowerCase() === 'fruits' || selectedCategory.toLowerCase() === 'vegetables' || selectedCategory.toLowerCase() === 'grains') && (
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
                      <Form.Control type="number" style={{ width: 'calc(80% - 30px)', marginBottom: '8px' }} placeholder={`Enter price in Rs`} required />
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
                  <Form.Control type="number" style={{ width: 'calc(80% - 30px)', marginBottom: '8px' }} placeholder={(selectedCategory.toLowerCase() === 'fruits' || selectedCategory.toLowerCase() === 'vegetables' || selectedCategory.toLowerCase() === 'grains') ? 'Enter quantity in Kg' : 'Enter quantity'} required />
                  {(selectedCategory.toLowerCase() === 'fruits' || selectedCategory.toLowerCase() === 'vegetables' || selectedCategory.toLowerCase() === 'grains') && (
                    <div style={{ marginLeft: '10px' }}>
                      <p style={{ fontSize: '18px' }}>Kg</p>
                    </div>
                  )}
                </div>
              </Form.Group>

              <div>
                <Form.Label>ADD PHOTO<span style={{ color: 'red' }}>*</span></Form.Label>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '150px',
                    height: '150px',
                    border: '2px solid green', // Solid border
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative'
                  }}>
                    <input type="file" id="fileUpload" onChange={handleFileChange} required hidden />
                    <label htmlFor="fileUpload" style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      {filePreview ? (
                        <img src={filePreview} alt="Preview" style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          position: 'absolute',
                          top: 0,
                          left: 0
                        }} />
                      ) : (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          height: '100%'
                        }}>
                          <span style={{ fontSize: '36px', color: 'green' }}>+</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: 'column', marginTop:'25px' }}>
                <Form.Label>ADD DESCRIPTION<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control 
                  as="textarea" 
                  style={{ width: '100%', marginBottom: '8px', height: '150px' }} 
                />
              </Form.Group>

              <div className="d-grid gap-2" style={{ display: 'flex', justifyContent: 'center' }}>
                <Button 
                  variant="primary" 
                  type="submit" 
                  style={{ 
                    backgroundColor: '#01B928', 
                    border: '5px', 
                    fontSize: '15px', 
                    fontWeight: 'bold', 
                    marginTop: '20px', 
                    width: '200px'  
                  }}>
                  Add Product
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
