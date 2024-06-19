import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Logo from "../assets/Logo1.png";

const RevenueChart = () => {
  const data = [
    { date: "2024-01-01", revenue: 1000 },
    { date: "2024-01-02", revenue: 1500 },
    { date: "2024-01-03", revenue: 1200 },
    // Add more data points as needed
  ];

  const mainContentStyle = {
    padding: "20px",
  };

  const scrollingListStyle: React.CSSProperties = {
    maxHeight: "350px",
    overflowY: "auto" as "auto" | "scroll" | "visible" | "hidden" | undefined, // Union type including undefined
    backgroundColor: "#ddd",
    padding: "15px",
  };

  const listItemStyle = {
    marginBottom: "10px",
    padding: "10px",
  };

  // Example data for the table
  const data1 = [
    {
      OrderNo: 1,
      Date: "2024-04-10",
      Customer: "John Doe",
      Amount: "$100",
      Status: "Pending",
    },
    {
      OrderNo: 3,
      Date: "2024-04-11",
      Customer: "Jane Smith",
      Amount: "$150",
      Status: "Completed",
    },
    {
      OrderNo: 4,
      Date: "2024-04-11",
      Customer: "Jane Smith",
      Amount: "$150",
      Status: "Completed",
    },
    {
      OrderNo: 5,
      Date: "2024-04-11",
      Customer: "Jane Smith",
      Amount: "$150",
      Status: "Completed",
    },
    {
      OrderNo: 6,
      Date: "2024-04-11",
      Customer: "Jane Smith",
      Amount: "$150",
      Status: "Completed",
    },
    {
      OrderNo: 7,
      Date: "2024-04-11",
      Customer: "Jane Smith",
      Amount: "$150",
      Status: "Completed",
    },
    // Add more data rows as needed
  ];

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-light sidebar">
          <div className="p-3">
            <div className="mb-4 mt-2">
              <a href="#">
                <img
                  src={Logo}
                  style={{ height: "90px", width: "75px" }}
                  alt="Logo"
                />
              </a>
            </div>
            <div className="mb-5">
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "black" }}
              >
                Dashboard
              </a>
            </div>
            <div className="mb-5">
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "black" }}
              >
                My Products
              </a>
            </div>
            <div className="mb-5">
              {" "}
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "black" }}
              >
                Calendar
              </a>
            </div>
            <div className="mb-5">
              {" "}
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "black" }}
              >
                Settings
              </a>
            </div>
            <div className="mb-5">
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "black" }}
              >
                Discounts
              </a>
            </div>
            <div className="mb-5">
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "black" }}
              >
                Profile
              </a>
            </div>
            <div className="mb-5">
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "black" }}
              >
                Analytics
              </a>
            </div>
            <div>
              {" "}
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "black" }}
              >
                Sign Out
              </a>
            </div>
          </div>
        </Col>
        <Col className="col-md-10" style={mainContentStyle}>
          <Row className="p-3">
            <Col className="col-md-7">
              <Card className="p-3">
                <Card.Body>
                  <Card.Title>Revenue Chart</Card.Title>
                  <LineChart width={600} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                  </LineChart>
                </Card.Body>
              </Card>
            </Col>
            <Col md={1}></Col>
            <Col md={2}>
              <Row>
                <Card>
                  <Card.Body>
                    <Card.Title>Customers</Card.Title>
                    <Card.Text>Hi</Card.Text>
                  </Card.Body>
                </Card>
              </Row>
              <Row className="mt-5">
                <Card>
                  <Card.Body>
                    <Card.Title>New Orders</Card.Title>
                    <Card.Text>Hi</Card.Text>
                  </Card.Body>
                </Card>
              </Row>
            </Col>
            <Col md={2}></Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <div>Item List</div>
              <Card>
                <Card.Body style={scrollingListStyle}>
                  <Card.Title>
                    <div className="row">
                      <div className="col">OrderNo</div>
                      <div className="col">Date</div>
                      <div className="col">Customer</div>
                      <div className="col">Amount</div>
                      <div className="col">Status</div>
                    </div>
                  </Card.Title>
                  {data1.map((item, index) => (
                    <Card key={index} style={{ marginBottom: "10px" }}>
                      <Card.Body>
                        <div className="row">
                          <div className="col">{item.OrderNo}</div>
                          <div className="col">{item.Date}</div>
                          <div className="col">{item.Customer}</div>
                          <div className="col">{item.Amount}</div>
                          <div className="col">{item.Status}</div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <div>Item List</div>
              <Card>
                <Card.Body style={scrollingListStyle}>
                  <Card.Title>
                    <div className="row">
                      <div className="col">OrderNo</div>
                      <div className="col">Date</div>
                      <div className="col">Customer</div>
                      <div className="col">Amount</div>
                      <div className="col">Status</div>
                    </div>
                  </Card.Title>
                  {data1.map((item, index) => (
                    <Card key={index} style={{ marginBottom: "10px" }}>
                      <Card.Body>
                        <div className="row">
                          <div className="col">{item.OrderNo}</div>
                          <div className="col">{item.Date}</div>
                          <div className="col">{item.Customer}</div>
                          <div className="col">{item.Amount}</div>
                          <div className="col">{item.Status}</div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RevenueChart;
