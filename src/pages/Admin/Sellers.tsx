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

// Define the types for the SellerRow component's props
interface SellerRowProps {
  seller_id: number;
  email: string;
  contactNo: string;
  store_name: string;
  onDelete: (id: number) => void;
}

// SellerRow Component

const formatBuyerId = (id: number): string => {
  return `S${id.toString().padStart(3, "0")}`;
};

const SellerRow: React.FC<SellerRowProps> = ({
  seller_id,
  email,
  contactNo,
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
    onDelete(seller_id);
  };

  return (
    <>
      <Row
        className={`mb-4 d-flex justify-content-between align-items-center ${
          selected ? "bg-light" : ""
        }`}
        style={{ marginTop: "-10px" }}
      >
        {/* <Col md="1" lg="1" xl="1">
          <input type="checkbox" checked={selected} onChange={toggleSelected} />
        </Col> */}

        <Col md="1" lg="1" xl="1">
          <p className="mb-0" style={{ fontSize: "10px", marginLeft: "16px" }}>
            {formatBuyerId(seller_id)}
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

        <Col md="5" lg="5" xl="5" className="d-flex align-items-center">
          <p className="mb-0" style={{ fontSize: "10px" }}>
            {email}
          </p>
        </Col>

        <Col md="3" lg="3" xl="3" className="d-flex align-items-center">
          <p className="mb-0" style={{ fontSize: "10px" }}>
            {contactNo}
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
              Remove Buyer
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      {expanded && (
        <Row className="mb-3">
          <Col md={{ span: 2, offset: 2 }} style={{ fontSize: "10px" }}>
            <p>
              <strong>Name:</strong> {store_name}
            </p>
          </Col>
          <Col md={{ span: 6 }} style={{ fontSize: "10px" }}>
            <p>
              <strong>Address:</strong> {email}
            </p>
          </Col>
        </Row>
      )}

      <hr style={{ marginTop: "-17px" }} />
    </>
  );
};

// Sellers Component
const Sellers: React.FC = () => {
  const [sellers, setSellers] = useState<SellerRowProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/getAllSellers"
        );
        setSellers(response.data.data);
      } catch (err) {
        setError("Failed to fetch sellers");
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/admin/deleteBuyer/${id}`);
      setSellers(sellers.filter((buyer) => buyer.seller_id !== id));
    } catch (err) {
      console.error("Failed to delete buyer", err);
    }
  };

  const filteredSellers = sellers.filter(
    (seller) =>
      seller.email.toLowerCase().includes(search.toLowerCase()) ||
      seller.contactNo.toLowerCase().includes(search.toLowerCase())
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
          Manage Sellers
        </Typography>
        {/* <hr style={{ marginTop: '-10px', marginBottom: '20px', width: '60%', marginLeft: 'auto', marginRight: 'auto' }} /> */}

        <Row className="justify-content-center mb-4">
          <Col md="6">
            <FormControl
              type="text"
              placeholder="Search sellers by email or contact"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ marginTop: "20px", fontSize: "10px" }}
            />
          </Col>
        </Row>

        <Row>
          {/* <Col md="3"></Col> */}

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
                <h6 style={{ fontSize: "10px" }}>Seller ID</h6>
              </Col>

              <Col md="1" lg="1" xl="1"></Col>

              <Col md="5" lg="5" xl="5">
                <h6 style={{ fontSize: "10px" }}>Email</h6>
              </Col>

              <Col md="3" lg="3" xl="3" className="d-flex align-items-center">
                <h6 style={{ fontSize: "10px" }}>Contact Info</h6>
              </Col>

              <Col md="1" lg="1" xl="1"></Col>
            </Row>

            <hr style={{ marginTop: "-20px" }} />

            {filteredSellers.map((seller) => (
              <SellerRow
                key={seller.seller_id}
                seller_id={seller.seller_id}
                email={seller.email}
                contactNo={seller.contactNo}
                store_name={seller.store_name}
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

export default Sellers;
