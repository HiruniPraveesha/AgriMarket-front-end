import React, { useEffect, useState } from 'react';
import { Container, Dropdown, Modal, Button, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';

const ManageProductPage: React.FC<{}> = ({}) => {
  const { sellerId } = useParams();

  const [products, setProducts] = useState<any[]>([]); // Initialize products as an array
  const [showRemoveModal, setShowRemoveModal] = useState(false); // State to control remove confirmation modal visibility
  const [showRemovedModal, setShowRemovedModal] = useState(false); // State to control product removed modal visibility
  const [showEditModal, setShowEditModal] = useState(false); // State to control edit modal visibility
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null); // State to store selected product ID
  const [editProduct, setEditProduct] = useState<any>({ id: '', name: '', price: 0 }); // State to store edited product details
  const [showUpdatedModal, setShowUpdatedModal] = useState(false);
  const storeName = products.length > 0 ? products[0].store_name : 'Store';

  
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8000/products/seller/1`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [sellerId]);
  
  
  const updateProduct = async (productId: number, updatedProduct: any) => {
    try {
      const response = await fetch(`http://localhost:8000/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error(`Failed to update product with ID ${productId}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  

  const deleteProduct = async (productId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product with ID ${productId}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const handleEdit = (productId: number, productName: string, productPrice: number, productDescription: string) => {
    console.log(`Edit product with ID: ${productId}`);
    // Set up the initial state for the edit modal
    setEditProduct({ id: productId, name: productName, price: productPrice, description: productDescription });
    setShowEditModal(true); // Show edit modal
  };

  const handleEditConfirmation = async () => {
    const updatedProductData = {
      categoryId: editProduct.categoryId,
      name: editProduct.name,
      price: editProduct.price,
      description: editProduct.description,
      sellerId: editProduct.sellerId,
      quantity: editProduct.quantity,
      quantityLimit: editProduct.quantityLimit,
    };

    try {
      const updatedProduct = await updateProduct(editProduct.id, updatedProductData);

      // Update products state to reflect edit (assuming an optimistic update)
      const updatedProducts = products.map((product) => {
        if (product.product_id === editProduct.id) {
          return { ...product, ...updatedProduct };
        }
        return product;
      });
      setProducts(updatedProducts);
      setShowEditModal(false); // Close edit modal
      setShowUpdatedModal(true); // Show product updated modal
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };


  const handleModalClose = () => {
    setShowRemoveModal(false); // Close remove confirmation modal
    setShowRemovedModal(false); // Close product removed modal
    setShowEditModal(false); // Close edit modal
    setShowUpdatedModal(false); // Close product updated modal
  };

  const handleRemove = (productId: number) => {
    console.log(`Remove product with ID: ${productId}`);
    setSelectedProductId(productId); // Set selected product ID
    setShowRemoveModal(true); // Show remove confirmation modal
  };

  const handleRemoveConfirmation = async () => {
    if (selectedProductId !== null) {
      try {
        await deleteProduct(selectedProductId);

        // Update products state to reflect removal (assuming an optimistic update)
        const updatedProducts = products.filter((product) => product.product_id !== selectedProductId);
        setProducts(updatedProducts);
        setShowRemoveModal(false); // Close remove confirmation modal
        setShowRemovedModal(true); // Show product removed modal
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    } else {
      console.error('No product selected for removal.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" >
      <div className="container" style={{ margin: '12px' }}>
        <p className="fw-bold" style={{ fontSize: '20px', margin: '12px' }}>Manage Products</p>
        <p style={{ fontSize: '15px', fontStyle: "blod", margin: '12px' }}>{storeName}</p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Category Name</th>
              <th>Existing Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.name}</td>
                <td>{product.category.name}</td>
                <td>Rs.{product.price}</td>
                <td>{product.description}</td>
                <td style={{ position: 'relative' }}>
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id={`dropdown-${product.product_id}`} style={{ border: 'none', paddingBottom: '5px' }}>
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ zIndex: 9999 }}>
                      <Dropdown.Item onClick={() => handleEdit(product.product_id, product.name, product.price, product.description)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleRemove(product.product_id)}>Remove</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Remove Confirmation Modal */}
        <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProductId && (
              <p>Do you want to remove the item {selectedProductId}?</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowRemoveModal(false)}>
              No
            </Button>
            <Button variant="secondary" onClick={handleRemoveConfirmation}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Product Removed Modal */}
        <Modal show={showRemovedModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Product Removed</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>The product has been successfully removed.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Product Updated Modal */}
        <Modal show={showUpdatedModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Product Updated</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>The product has been successfully updated.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Product ID:</Form.Label>
              <Form.Control type="text" value={editProduct.id} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Product Name:</Form.Label>
              <Form.Control type="text" value={editProduct.name} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Current Price:</Form.Label>
              <Form.Control type="text" value={`Rs.${editProduct.price}`} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Current Description:</Form.Label>
              <Form.Control type="text" value={editProduct.description} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>New Price:</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>New Description:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={handleEditConfirmation}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default ManageProductPage;
