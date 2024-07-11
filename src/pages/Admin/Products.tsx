import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import More from "../assets/more.svg";
import Photo from "../../assets/ProPic.png";
import AdminLayout from "./AdminLayout";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Define the types for the ProductRow component's props
interface ProductRowProps {
  product_id: number;
  name: string;
  sellerId: number;
  store_name: string;
  quantity: number;
  onDelete: (id: number) => void;
}

// ProductRow Component
const formatBuyerId = (id: number): string => {
  return `P${id.toString().padStart(3, "0")}`;
};

const ProductRow: React.FC<ProductRowProps> = ({
  sellerId,
  product_id,
  name,
  quantity,
  store_name,
  onDelete,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleSelected = () => {
    setSelected(!selected);
  };

  const handleDelete = () => {
    onDelete(product_id);
  };

  return (
    <>
      <Row
        className={`mb-4 d-flex justify-content-between align-items-center ${
          selected ? "bg-light" : ""
        }`}
        style={{ marginTop: "-10px" }}
      >
        <Col md="1" lg="1" xl="1">
          <p className="mb-0" style={{ fontSize: "10px", marginLeft: "16px" }}>
            {formatBuyerId(product_id)}
          </p>
        </Col>

        <Col md="1" lg="1" xl="1">
          <div
            style={{
              position: "relative",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              src={Photo}
              alt="Photo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            />
          </div>
        </Col>
        <Col md={1}></Col>

        <Col md="3" lg="5" xl="5" className="d-flex align-items-center">
          <p className="mb-0" style={{ fontSize: "10px" }}>
            {name}
          </p>
        </Col>

        <Col md="3" lg="3" xl="3" className="d-flex align-items-center">
          <p className="mb-0" style={{ fontSize: "10px" }}>
            {sellerId}
          </p>
        </Col>

        <Col md="1" lg="1" xl="1">
          <DropdownButton id="dropdown-basic-button" variant="light" title="">
            <Dropdown.Item
              onClick={toggleExpanded}
              style={{ fontSize: "10px" }}
            >
              View Details
            </Dropdown.Item>
            <Dropdown.Item onClick={handleDelete} style={{ fontSize: "10px" }}>
              Remove Product
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      {expanded && (
        <Row className="mb-3">
          <Col md={{ span: 2, offset: 2 }} style={{ fontSize: "10px" }}>
            <p>
              <strong>Store Name:</strong> {store_name}
            </p>
          </Col>
          <Col md={{ span: 6 }} style={{ fontSize: "10px" }}>
            <p>
              <strong>Quantity:</strong> {quantity}
            </p>
          </Col>
        </Row>
      )}

      <hr style={{ marginTop: "-17px" }} />
    </>
  );
};

// Products Component
const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductRowProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products");
        // Map the backend response to include store_name at the top level
        const productData = response.data.data.map((product: any) => ({
          ...product,
          store_name: product.seller.store_name,
        }));
        setProducts(productData);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/admin/deleteProduct/${id}`);
      setProducts(products.filter((product) => product.product_id !== id));
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      (product.store_name &&
        product.store_name.toLowerCase().includes(search.toLowerCase())) ||
      (product.name &&
        product.name.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <AdminLayout>
      <Container>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", color: "#258544", marginLeft: "280px" }}
        >
          Manage Products
        </Typography>

        <Row className="justify-content-center mb-4">
          <Col md="6">
            <FormControl
              type="text"
              placeholder="Search products by name or store"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ marginTop: "20px", fontSize: "10px" }}
            />
          </Col>
        </Row>

        <Row>
          <Col md="10">
            <Row
              className="mb-4 d-flex justify-content-between align-items-center"
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "gray",
              }}
            >
              <Col md="1" lg="2" xl="2">
                <h6 style={{ fontSize: "10px" }}>Product ID</h6>
              </Col>

              <Col md="1" lg="1" xl="1"></Col>

              <Col md="5" lg="5" xl="5">
                <h6 style={{ fontSize: "10px" }}>Product Name</h6>
              </Col>

              <Col md="3" lg="3" xl="3" className="d-flex align-items-center">
                <h6 style={{ fontSize: "10px" }}>Seller ID</h6>
              </Col>

              <Col md="1" lg="1" xl="1"></Col>
            </Row>

            <hr style={{ marginTop: "-20px" }} />

            {filteredProducts.map((product) => (
              <ProductRow
                key={product.product_id}
                product_id={product.product_id}
                sellerId={product.sellerId}
                name={product.name}
                quantity={product.quantity}
                store_name={product.store_name}
                onDelete={handleDelete}
              />
            ))}
          </Col>

          <Col md="3"></Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default Products;
