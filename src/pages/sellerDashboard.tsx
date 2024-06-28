import React, { useState, useEffect} from "react";
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
import Logo from "../assets/Logo1.png";
import { PieChart, Pie,  Cell } from "recharts";
import '../styles.css';


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
  const [totalRevenue, setTotalRevenue] = useState(0); 
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const sellerId = localStorage.getItem("sellerId"); // Replace with the actual seller ID you want to use

  useEffect(() => {
    fetchOrderCount();
    fetchOrders();
  });

  const fetchOrderCount = async () => {
    try {
      const response = await fetch(`http://localhost:8080/orders/count/${sellerId}`);
      const data = await response.json();
      setOrderCount(data.orderCount);
    } catch (error) {
      console.error('Error fetching customer count:', error);
    }
  };

  useEffect(() => {
    fetchCustomerCount();
    fetchProductSalesData();
  }, []);

  const fetchCustomerCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/orders/customers/count');
      const data = await response.json();
      setCustomerCount(data.customerCount);
    } catch (error) {
      console.error('Error fetching customer count:', error);
    }
  };

  const fetchProductSalesData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/orders/sales/${sellerId}`);
      const data = await response.json();
      console.log(data);
      setProductSalesData(data);
    } catch (error) {
      console.error('Error fetching product sales data:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:8080/orders/seller/${sellerId}`);
      const data = await response.json();
      setOrdersData(data);
      calculateTotalRevenue(data); // Calculate total revenue after fetching orders
    } catch (error) {
      console.error('Error fetching orders data:', error);
    }
  };

  // const fetchOrderCountBySellerId = async (sellerId) => {
  //   try {
  //     const response = await fetch(`/orders/count/${sellerId}`);
  //     const data = await response.json();
  //     return data.orderCount;
  //   } catch (error) {
  //     console.error('Error fetching order count:', error);
  //     return null;
  //   }
  // };

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
    backgroundColor: "#ffffff",
    padding: "15px",
  };



  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
                style={{ color: selectedMenuItem === "Dashboard" ? "blue" : "black", fontWeight: selectedMenuItem === "Dashboard" ? "bold" : "normal" }}
                onClick={() => setSelectedMenuItem("Dashboard")}
              >
                Dashboard
              </a>
            </div>
            <div className="mb-5">
              <a
                href="#"
                className="text-decoration-none"
                // style={{ color: "black"}}
                
              >
                My Products
              </a>
            </div>
            <div className="mb-5">
              {" "}
              <a
                href="#"
                className="text-decoration-none"
                // style={{ color: "black" }}
              >
                Calendar
              </a>
            </div>
            <div className="mb-5">
              {" "}
              <a
                href="#"
                className="text-decoration-none"
                // style={{ color: "black" }}
              >
                Settings
              </a>
            </div>
            <div className="mb-5">
              <a
                href="#"
                className="text-decoration-none"
                // style={{ color: "black" }}
              >
                Discounts
              </a>
            </div>
            <div className="mb-5">
              <a
                href="#"
                className="text-decoration-none"
                // style={{ color: "black" }}
              >
                Profile
              </a>
            </div>
            <div className="mb-5">
              <a
                href="#"
                className="text-decoration-none"
                // style={{ color: "black" }}
              >
                Analytics
              </a>
            </div>
            <div>
              {" "}
              <a
                href="#"
                className="text-decoration-none"
                // style={{ color: "black" }}
              >
                Sign Out
              </a>
            </div>
          </div>
        </Col>
        <Col className="col-md-10" style={mainContentStyle}>
          <Row className="p-3">
            <Col className="col-md-3">
              <Card style={{backgroundColor:"#FFCCCC"}}>
                <Card.Body style={{ transition: "background-color 0.3s ease" }} className="cardBody">
                  
                  <Card.Title style={{ fontSize: "16px"}}>Customers</Card.Title>
                  <Card.Text style={{ fontSize: "25px" }}>{customerCount}</Card.Text>
                  <Card.Link href="#" style={{marginLeft: "145px"}}>More</Card.Link>                    
                  
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-md-3">
              <Card style={{backgroundColor:"#CCFFCC"}}> 
                <Card.Body>
                  <Card.Title style={{ fontSize: "16px" }}>Site Views</Card.Title>
                  <Card.Text style={{ fontSize: "25px" }}>5000</Card.Text>
                  <Card.Link href="#" style={{marginLeft: "145px"}}>More</Card.Link>                    
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-md-3">
              <Card style={{backgroundColor:"#CCFFE5"}}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "16px" }}>Total Orders</Card.Title>
                  <Card.Text style={{ fontSize: "25px" }}>{orderCount}</Card.Text>
                  <Card.Link href="#" style={{marginLeft: "145px"}}>More</Card.Link>                    
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-md-3">
              <Card style={{backgroundColor:"#CCCCFF"}}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "16px" }}>Revenue</Card.Title>
                  <Card.Text style={{ fontSize: "25px" }}>${totalRevenue.toFixed(2)}</Card.Text> 
                  <Card.Link href="#" style={{marginLeft: "145px"}}>More</Card.Link>                    
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row style={{height:"60px"}}></Row>
          <Row>
            <Col md={10}>
            <Card style={{width:"450px",height:"460px", marginLeft:"300px"}}>
              <br></br>
              <Card.Title style={{ fontSize: "20px" , marginLeft:"10px"}}>Total Sales</Card.Title>
          <PieChart width={400} height={400}>
            <Pie
              data={productSalesData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {productSalesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          </Card>
          </Col>
          {/* <Col md={5}> */}
  {/* <Card style={{width:"550px",height:"460px" }}>
    <Card.Body>
      <Card.Title>Orders by Month</Card.Title> */}
      {/* <BarChart width={500} height={400} data={ordersByMonthData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="orders" fill="#8884d8" />
      </BarChart> */}
    {/* </Card.Body>
  </Card> */}
{/* </Col> */}


          </Row>
          <br></br>
          <Row>
          <Card className="p-3" style={{backgroundColor: "#ffffff" }}>
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
                    <Card key={order.order_id} style={{ marginBottom: "10px", backgroundColor: "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(204, 255, 204, 0.5))" }}>
                      <Card.Body style={{
                        background: 'linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(204, 255, 204, 0.5))'
                      }}>
                        <div className="row">
                          <div className="col-3">{order.order_id}</div>
                          <div className="col-3">{new Date(order.createdAt).toLocaleDateString()}</div>
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
  );
};

export default SellerDashboard;
