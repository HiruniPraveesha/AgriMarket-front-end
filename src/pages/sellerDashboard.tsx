import React, { useState } from "react";
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



const SellerDashboard = () => {


  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const mainContentStyle = {
    padding: "20px",
  };


 


  const scrollingListStyle: React.CSSProperties = {
    maxHeight: "350px",
    overflowY: "auto" as "auto" | "scroll" | "visible" | "hidden" | undefined, 
    backgroundColor: "#ffffff",
    padding: "15px",
  };

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

  ];

  const productSalesData = [
    { name: "Product A", value: 400 },
    { name: "Product B", value: 300 },
    { name: "Product C", value: 200 },
    { name: "Product D", value: 100 },
  ];
  const ordersByMonthData = [
   
    { month: "Aug", orders: 10 },
    { month: "Sep", orders: 60 },
    { month: "Oct", orders: 25},
    { month: "Nov", orders: 20 },
    { month: "Dec", orders: 75 },
  ];

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
                  <Card.Text style={{ fontSize: "25px" }}>152</Card.Text>
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
                  <Card.Text style={{ fontSize: "25px" }}>354</Card.Text>
                  <Card.Link href="#" style={{marginLeft: "145px"}}>More</Card.Link>                    
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-md-3">
              <Card style={{backgroundColor:"#CCCCFF"}}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "16px" }}>Revenue</Card.Title>
                  <Card.Text style={{ fontSize: "25px" }}>Rs.2000</Card.Text>
                  <Card.Link href="#" style={{marginLeft: "145px"}}>More</Card.Link>                    
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row style={{height:"60px"}}></Row>
          <Row>
            <Col md={5}>
            <Card style={{width:"450px",height:"460px"}}>
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
          <Col md={5}>
  <Card style={{width:"550px",height:"460px" }}>
    <Card.Body>
      <Card.Title>Orders by Month</Card.Title>
      <BarChart width={500} height={400} data={ordersByMonthData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="orders" fill="#8884d8" />
      </BarChart>
    </Card.Body>
  </Card>
</Col>


          </Row>
          <br></br>
          <Row>
          <Card className="p-3" style={{backgroundColor: "#ffffff" }}>
            <Card.Title>
      <div className="row">
        <div className="col" custom-background>OrderNo</div>
        <div className="col">Date</div>
        <div className="col">Customer</div>
        <div className="col">Amount</div>
        <div className="col">Status</div>
      </div>
    </Card.Title>
  <Card.Body style={scrollingListStyle}>
    
    {data1.map((item, index) => (
      <Card key={index} style={{ marginBottom: "10px" , backgroundColor: "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(204, 255, 204, 0.5))" }}>
        <Card.Body style={{
              background: 'linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(204, 255, 204, 0.5))'
            }}>
          <div className="row">
            <div className="col" >{item.OrderNo} </div>
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

          </Row>
        </Col>
        
          
        
      </Row>
    </Container>
  );
};

export default SellerDashboard;
