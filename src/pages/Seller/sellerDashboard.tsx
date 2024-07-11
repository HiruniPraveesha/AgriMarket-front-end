import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import Logo from "../../assets/Logo1.png";
import { PieChart, Pie, Cell } from "recharts";
import SellerLayout from "./SellerLayout";
import BackGroundImage from "../../assets/sellerDb.jpg";

interface Product {
  name: string;
  price: number;
}

interface Buyer {
  email: string;
}

interface Order {
  order_id: number;
  buyer: Buyer;
  product: Product;
  createdAt: string;
  Amount: number;
}

const SellerDashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productSalesData, setProductSalesData] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const sellerId = localStorage.getItem("sellerId"); // Replace with the actual seller ID you want to use

  useEffect(() => {
    fetchOrderCount();
    fetchOrders();
    fetchproductCount();
  });

  const fetchOrderCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/orders/count/${sellerId}`
      );
      const data = await response.json();
      setOrderCount(data.orderCount);
    } catch (error) {
      console.error("Error fetching customer count:", error);
    }
  };

  useEffect(() => {
    fetchCustomerCount();
    fetchProductSalesData();
  }, []);

  const fetchCustomerCount = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/orders/customers/count"
      );
      const data = await response.json();
      setCustomerCount(data.customerCount);
    } catch (error) {
      console.error("Error fetching customer count:", error);
    }
  };
  const fetchproductCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/seller/productCount/${sellerId}`
      );
      const data = await response.json();
      setProductCount(data.productCount);
    } catch (error) {
      console.error("Error fetching customer count:", error);
    }
  };

  const fetchProductSalesData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/orders/sales/${sellerId}`
      );
      const data = await response.json();
      console.log(data);
      setProductSalesData(data);
    } catch (error) {
      console.error("Error fetching product sales data:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/orders/seller/${sellerId}`
      );
      const data = await response.json();
      setOrdersData(data);
      calculateTotalRevenue(data); // Calculate total revenue after fetching orders
    } catch (error) {
      console.error("Error fetching orders data:", error);
    }
  };

  const calculateTotalRevenue = (orders: Order[]) => {
    const total = orders.reduce((acc, order) => acc + order.Amount, 0);
    setTotalRevenue(total);
  };

  const mainContentStyle = {
    padding: "20px",
  };

  const scrollingListStyle: React.CSSProperties = {
    maxHeight: "350px",
    overflowY: "auto" as "auto" | "scroll" | "visible" | "hidden" | undefined,
    backgroundColor: "rgba(136,255,95, 0.0)",
    padding: "15px",
  };

  const COLORS = ["#20DC24", "#19B01C", "#117B13", "#0A490B"];

  return (
    <SellerLayout>
      <Container fluid>
        <Row style={{ paddingLeft: "100px" }}>
          <h1 style={{ color: "#117B13" }}>Seller Dashboard</h1>

          <Col className="col-md-10" style={mainContentStyle}>
            <Row className="p-3">
              <Col className="col-md-3">
                <Card style={{ backgroundColor: "#20DC24", color: "white" }}>
                  <Card.Body
                    style={{ transition: "background-color 0.3s ease" }}
                    className="cardBody"
                  >
                    <Card.Title style={{ fontSize: "16px" }}>
                      Customers
                    </Card.Title>
                    <Card.Text style={{ fontSize: "25px" }}>
                      {customerCount}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="col-md-3">
                <Card style={{ backgroundColor: "#19B01C", color: "white" }}>
                  <Card.Body>
                    <Card.Title style={{ fontSize: "16px" }}>
                      Products
                    </Card.Title>
                    <Card.Text style={{ fontSize: "25px" }}>
                      {productCount}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="col-md-3">
                <Card style={{ backgroundColor: "#117B13", color: "white" }}>
                  <Card.Body>
                    <Card.Title style={{ fontSize: "16px" }}>
                      Total Orders
                    </Card.Title>
                    <Card.Text style={{ fontSize: "25px" }}>
                      {orderCount}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="col-md-3">
                <Card style={{ backgroundColor: "#0A490B", color: "white" }}>
                  <Card.Body>
                    <Card.Title style={{ fontSize: "16px" }}>
                      Revenue
                    </Card.Title>
                    <Card.Text style={{ fontSize: "25px" }}>
                      ${totalRevenue.toFixed(2)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row style={{ height: "60px" }}></Row>
            <Row>
              <Col md={5}>
                <Card
                  style={{
                    width: "400px",
                    height: "360px",
                    marginLeft: "00px",
                    paddingLeft: "50px",
                    backgroundColor: "rgba(136,255,95, 0.3)",
                  }}
                >
                  <br></br>
                  <Card.Title style={{ fontSize: "20px", marginLeft: "90px" }}>
                    Total Sales
                  </Card.Title>
                  <PieChart width={300} height={300}>
                    <Pie
                      data={productSalesData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#00C49F"
                      label
                    >
                      {productSalesData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </Card>
              </Col>
              <Col md={2}></Col>
              <Col md={5}>
                <Card
                  style={{
                    width: "400px",
                    height: "360px",
                    marginLeft: "10px",
                    backgroundColor: "rgba(136,255,95, 0.3)",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Orders by Month</Card.Title>
                    <BarChart width={320} height={300} data={ordersData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="orders" fill="#00C49F" />
                    </BarChart>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Card
                className="p-3"
                style={{ backgroundColor: "rgba(136,255,95, 0.3)" }}
              >
                <Card.Title>
                  <div className="row">
                    <div className="col-3">OrderNo</div>
                    <div className="col-3">Date</div>
                    <div className="col-3">Customer</div>
                    <div className="col-3">Amount</div>
                  </div>
                </Card.Title>
                <Card.Body style={scrollingListStyle}>
                  {ordersData.map((order) => (
                    <Card
                      key={order.order_id}
                      style={{
                        marginBottom: "10px",
                        backgroundColor:
                          "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(204, 255, 204, 0.5))",
                      }}
                    >
                      <Card.Body
                        style={{
                          background:
                            "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(204, 255, 204, 0.5))",
                        }}
                      >
                        <div className="row">
                          <div className="col-3">{order.order_id}</div>
                          <div className="col-3">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                          <div className="col-3">{order.buyer.email}</div>
                          <div className="col-1"></div>
                          <div className="col-2">{order.Amount}</div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    </SellerLayout>
  );
};

export default SellerDashboard;
