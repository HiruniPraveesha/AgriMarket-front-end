import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import More from '../../assets/more.svg';
import MainHeader from '../../components/Header-main';
import Footer2 from '../../components/Footer-main';
import { Link } from 'react-router-dom';

interface Order {
  orderId: number;
  orderedDate: string;
  product: {
    name: string;
    quantity: string;
  };
  seller: {
    store_name: string;
  };
  totalAmount: number;
}

function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace with actual API endpoint
        const response = await fetch('http://localhost:8000/order-history?buyerId=1');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const ordersData = await response.json();
        if (Array.isArray(ordersData)) {
          setOrders(ordersData);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Handle error, e.g., show error message
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <MainHeader />
      <div style={{ margin: '0 20%' }}>
        <div>
          <p style={{ fontSize: '17px', fontWeight: 'bold', marginTop: '50px' }}>Order History</p>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th style={{ width: '10%', textAlign: 'center' }}>Order No</th>
              <th style={{ width: '15%', textAlign: 'center' }}>Ordered Date</th>
              <th style={{ width: '20%', textAlign: 'center' }}>Product</th>
              <th style={{ width: '20%', textAlign: 'center' }}>Seller</th>
              <th style={{ width: '15%', textAlign: 'center' }}>Total</th>
              <th style={{ width: '5%', textAlign: 'center' }}></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td style={{ textAlign: 'center' }}>{`#${order.orderId}`}</td>
                <td style={{ textAlign: 'center' }}>{order.orderedDate}</td>
                <td style={{ textAlign: 'center' }}>{`${order.product.name} - ${order.product.quantity}`}</td>
                <td style={{ textAlign: 'center' }}>{order.seller.store_name}</td>
                <td style={{ textAlign: 'center' }}>{`Rs.${order.totalAmount.toFixed(2)}`}</td>
                <td style={{ textAlign: 'center' }}>
                  <Link to="/order-details">
                    <img src={More} alt="More" style={{ width: '20px', height: '20px', transform: 'rotate(-90deg)' }} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer2 />
    </>
  );
}

export default OrderHistory;
