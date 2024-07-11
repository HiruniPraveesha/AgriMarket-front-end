import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import AdminLayout from './AdminLayout';

// Register chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState({
    buyers: 0,
    sellers: 0,
    products: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const buyersResponse = await axios.get('http://localhost:8080/admin/getBuyersCount');
        const sellersResponse = await axios.get('http://localhost:8080/admin/getSellersCount');
        const productsResponse = await axios.get('http://localhost:8080/admin/getProductsCount');

        setData({
          buyers: buyersResponse.data.count,
          sellers: sellersResponse.data.count,
          products: productsResponse.data.count,
        });
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ['Buyers', 'Sellers', 'Products'],
    datasets: [
      {
        label: 'Count',
        data: [data.buyers, data.sellers, data.products],
        backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
      },
    ],
  };

  return (
    <AdminLayout>
      <Container>
        <Typography variant="h5" style={{ fontWeight: 'bold', color: '#258544', margin: '20px 0' }}>
          Admin Dashboard
        </Typography>
        <Row>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: true }, title: { display: true, text: 'Dashboard Summary' } } }} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default AdminDashboard;
