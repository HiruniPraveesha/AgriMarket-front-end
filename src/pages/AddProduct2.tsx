import React, { useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Dropdown from 'react-bootstrap/Dropdown';

interface ProductFormValues {
  productName: string;
  description: string;
  price: number;
  category: string;
  images: File[];
}

const AddProduct: React.FC = () => {
  const [productForm, setProductForm] = useState<ProductFormValues>({
    productName: '',
    description: '',
    price: 0,
    category: '',
    images: [],
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      setProductForm((prevForm) => ({
        ...prevForm,
        images: [...prevForm.images, ...acceptedFiles],
      }));
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(productForm);
    // Add logic to handle form submission, e.g., send to API
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <h1 style={{fontSize:'25px', marginBottom: '50px'}}>Product Information</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
            <Form.Group controlId="productName">
              <Form.Label style={{fontSize:'15px'}}>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={productForm.productName}
                onChange={handleChange}
                required
                style={{fontSize:'10px'}}
              />
            </Form.Group>
          </Col>
          
        </Row>
        <br/><br/>
        <Row>
          <Col md={6}>
            <Form.Group controlId="category">
              <Form.Label style={{fontSize:'15px'}}>Category</Form.Label>
              <Form.Select
                name="category"
                value={productForm.category}
                onChange={handleChange}
                required
                aria-aria-label='Default select example'
                style={{fontSize:'10px'}}
              >
                <option value="" >Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                <option value="home">Home & Kitchen</option>
                {/* Add more categories as needed */}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <br/><br/>
        <Row>
          <Col md={12}>
            <Form.Group controlId="description">
              <Form.Label style={{fontSize:'15px'}}>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={productForm.description}
                onChange={handleChange}
                required
                style={{fontSize:'10px'}}
              />
            </Form.Group>
          </Col>
        </Row>
        <br/><br/>
        
        <Row>
          <Col md={12}>
          <Form.Label style={{fontSize:'15px'}}>Images</Form.Label>
          <div style={{width:'80%'}}>
            <Form.Group style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:'space-between'


            }} controlId="images">

              <Col md={2}>

              <div {...getRootProps({ className: 'dropzone' })} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center',height:'150px' }}>
                <input {...getInputProps()} />
                {/* <p>Drag & drop some files here, or click to select files</p> */}
                <div>
                {productForm.images.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`preview ${index}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '0px' }}
                  />
                ))}
              </div>
              </div>
              
              
              </Col>
              <Col md={2}>

              <div {...getRootProps({ className: 'dropzone' })} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center',height:'150px' }}>
                <input {...getInputProps()} />
                {/* <p>Drag & drop some files here, or click to select files</p> */}
                <div>
                {productForm.images.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`preview ${index}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '10px' }}
                  />
                ))}
              </div>
              </div>
              
              
              </Col>
              <Col md={2}>

              <div {...getRootProps({ className: 'dropzone' })} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center',height:'150px' }}>
                <input {...getInputProps()} />
                {/* <p>Drag & drop some files here, or click to select files</p> */}
                <div>
                {productForm.images.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`preview ${index}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '10px' }}
                  />
                ))}
              </div>
              </div>
              
              
              </Col>
              <Col md={2}>

              <div {...getRootProps({ className: 'dropzone' })} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center',height:'150px' }}>
                <input {...getInputProps()} />
                {/* <p>Drag & drop some files here, or click to select files</p> */}
                
              <div>
                {productForm.images.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`preview ${index}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '10px' }}
                  />
                ))}
              </div>
              </div>
              
              </Col>
            </Form.Group>
            </div>
          </Col>
        </Row>
        <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
