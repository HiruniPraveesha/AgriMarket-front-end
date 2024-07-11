import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import axios from "axios";
import { Typography } from "@mui/material";
import AdminLayout from "./AdminLayout"; // Adjust the import path accordingly
import More from "../assets/more.svg";
import Photo from "../../assets/ProPic.png";

interface BuyerRowProps {
  buyer_id: number;
  email: string;
  contactNo: string;
  name: string;
  address: string;
  onDelete: (id: number) => void;
}

// Helper function to format the ID
const formatBuyerId = (id: number): string => {
  return `B${id.toString().padStart(3, "0")}`;
};

const BuyerRow: React.FC<BuyerRowProps> = ({
  buyer_id,
  email,
  contactNo,
  name,
  address,
  onDelete,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    onDelete(buyer_id);
  };

  return (
    <>
      <Row className="mb-4 d-flex justify-content-between align-items-center">
        <Col md="1" lg="1" xl="1">
          <p className="mb-0" style={{ fontSize: "10px" }}>
            {formatBuyerId(buyer_id)}
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
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
              <strong>Name:</strong> {name}
            </p>
          </Col>
          <Col md={{ span: 6 }} style={{ fontSize: "10px" }}>
            <p>
              <strong>Address:</strong> {address}
            </p>
          </Col>
        </Row>
      )}
      <hr style={{ marginTop: "-17px" }} />
    </>
  );
};

const Buyers: React.FC = () => {
  const [buyers, setBuyers] = useState<BuyerRowProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/getAllBuyers"
        );
        setBuyers(response.data.data);
      } catch (err) {
        setError("Failed to fetch buyers");
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/admin/deleteBuyer/${id}`);
      setBuyers(buyers.filter((buyer) => buyer.buyer_id !== id));
    } catch (err) {
      console.error("Failed to delete buyer", err);
    }
  };

  const filteredBuyers = buyers.filter(
    (buyer) =>
      buyer.email.toLowerCase().includes(search.toLowerCase()) ||
      buyer.contactNo.includes(search)
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
          Manage Buyers
        </Typography>
        <Row className="justify-content-center mb-4">
          <Col md="6">
            <FormControl
              type="text"
              placeholder="Search buyers by email or contact"
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
              <Col md="1" lg="1" xl="1">
                <h6 style={{ fontSize: "10px" }}>Buyer ID</h6>
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
            {filteredBuyers.map((buyer) => (
              <BuyerRow
                key={buyer.buyer_id}
                buyer_id={buyer.buyer_id}
                email={buyer.email}
                contactNo={buyer.contactNo}
                name={buyer.name}
                address={buyer.address}
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

export default Buyers;
