import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { Typography } from "@mui/material";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import AdminLayout from "./AdminLayout";

// Register chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState({
    buyers: 0,
    sellers: 0,
    products: 0,
  });

  const [orderData, setOrderData] = useState<any[]>([]);
  const [monthlyOrders, setMonthlyOrders] = useState<number[]>([]);
  const [sellersOrderCount, setSellersOrderCount] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const buyersResponse = await axios.get(
          "http://localhost:8080/admin/getBuyersCount"
        );
        const sellersResponse = await axios.get(
          "http://localhost:8080/admin/getSellersCount"
        );
        const productsResponse = await axios.get(
          "http://localhost:8080/admin/getProductsCount"
        );

        setData({
          buyers: buyersResponse.data.count,
          sellers: sellersResponse.data.count,
          products: productsResponse.data.count,
        });

        const orderResponse = await axios.get(
          "http://localhost:8080/admin/getOrdersDataByProduct"
        );
        setOrderData(orderResponse.data);

        const ordersResponseByDate = await axios.get(
          "http://localhost:8080/admin/getOrdersByDate"
        );
        const orders = ordersResponseByDate.data;

        const sellersOrderCountResponse = await axios.get(
          "http://localhost:8080/admin/getSellersOrderCount"
        );
        setSellersOrderCount(sellersOrderCountResponse.data);

        // Process order data to group by month
        const orderCountsByMonth = new Array(12).fill(0);

        orders.forEach((order: any) => {
          const orderDate = new Date(order.createdAt);
          const month = orderDate.getMonth(); // getMonth returns month index from 0 (January) to 11 (December)
          orderCountsByMonth[month] += 1;
        });

        setMonthlyOrders(orderCountsByMonth);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const generateShadesOfColor = (
    baseColor: string,
    count: number
  ): string[] => {
    const colors = [];
    const startLightness = 20; // Starting lightness
    const endLightness = 80; // Ending lightness

    // Extract hue and saturation from the base color (assumed to be in HSL format)
    const [hue, saturation] = [169, 39]; // HSL values for #49A596

    for (let i = 0; i < count; i++) {
      const lightness =
        startLightness + ((endLightness - startLightness) * i) / count;
      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }

    return colors;
  };

  const barChartData = {
    labels: sellersOrderCount.map((seller) => seller.store_name || 'Unnamed Store'),
    datasets: [
      {
        label: "Order Count",
        data: sellersOrderCount.map((seller) => seller.order_count), // Adjusted to match API response
        backgroundColor: generateShadesOfColor("#49A596", sellersOrderCount.length),
      },
    ],
  };
  
  const doughnutChartData = {
    labels: ["Buyers", "Sellers"],
    datasets: [
      {
        label: "Dataset 1",
        data: [data.buyers, data.sellers],
        backgroundColor: ["#2B635A", "#49A596"],
      },
    ],
  };

  const doughnutChartData2 = {
    labels: ["Buyers", "Sellers"],
    datasets: [
      {
        label: "Dataset 1",
        data: [data.buyers, data.sellers],
        backgroundColor: ["#2B635A", "#49A596"],
      },
    ],
  };

  const lineChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Orders",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        data: monthlyOrders,
      },
    ],
  };

  const pieChartData = {
    labels: orderData.map((order) => order.productName),
    datasets: [
      {
        label: "Order Count",
        data: orderData.map((order) => order._count._all),
        backgroundColor: generateShadesOfColor("#49A596", orderData.length),
      },
    ],
  };

  return (
    <AdminLayout>
      <Container>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", color: "#258544", margin: "20px 0" }}
        >
          Admin Dashboard
        </Typography>
        <Row>
          <Col md={6}>
          <Card style={{ height: "300px" }}>
              <Card.Body style={{ overflowX: "auto", position: "relative" }}>
                <Typography
                  variant="h6"
                  style={{
                    color:"#49A596",
                    position: "absolute",
                    left: "30px",
                    top: "20px",
                    zIndex: "10",
                    backgroundColor: "white",
                    padding: "5px 10px",
                    fontSize: "16px"
                  }}
                >
                  Top Sellers by Order Count
                </Typography>
                <div style={{ width: `${sellersOrderCount.length * 100}px`, paddingTop: "30px" }}>
                  <Bar
                    data={barChartData}
                    options={{
                      responsive: true,
                      plugins: {
                        // legend: { display: true },
                        title: { display: false } // Disable the default title
                      },
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ height: "300px" }}>
              <Card.Body>
                <Doughnut
                  data={doughnutChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: true },
                      title: { display: true, text: "Doughnut Chart" },
                    },
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ height: "300px" }}>
              <Card.Body>
                <Pie
                  data={pieChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: true },
                      title: { display: true, text: "Top Selling Products" },
                    },
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col md={8}>
            <Card style={{ height: "500px" }}>
              <Card.Body>
                <Line
                  data={lineChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: true },
                      title: { display: true, text: "All customers" },
                    },
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ height: "500px" }}>
              <Card.Body>
                <Doughnut
                  data={doughnutChartData2}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: true },
                      title: { display: true, text: "Doughnut Chart" },
                    },
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default AdminDashboard;
