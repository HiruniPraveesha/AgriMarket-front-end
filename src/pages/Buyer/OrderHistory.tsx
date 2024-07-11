import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import More from '../../assets/more.svg';
import MainHeader from '../../components/Header-main';
import Footer2 from '../../components/Footer-main';
import React from 'react';

interface Order {
  orderId: number;
  orderedDate: string;
  products: {
    name: string;
    quantity: number;
  }[];
  totalAmount?: number;
  deliveryAddress?: string;
  pickupAddress?: string;
}

function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/order-history?buyerId=1');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const { orders } = await response.json();
        setOrders(orders);
      } catch (error) {
        setError('Error fetching orders');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleMoreClick = (orderId: number) => {
    setExpandedRow(expandedRow === orderId ? null : orderId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
              <th style={{ width: '15%', textAlign: 'center' }}>Total</th>
              <th style={{ width: '5%', textAlign: 'center' }}></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.orderId}>
                <tr>
                  <td style={{ textAlign: 'center' }}>{`#${order.orderId}`}</td>
                  <td style={{ textAlign: 'center' }}>{new Date(order.orderedDate).toLocaleDateString()}</td>
                  <td style={{ textAlign: 'center' }}>
                    {order.totalAmount !== undefined ? `Rs.${order.totalAmount}` : 'N/A'}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <img
                      src={More}
                      alt="More"
                      style={{ width: '20px', height: '20px', transform: 'rotate(-90deg)', cursor: 'pointer' }}
                      onClick={() => handleMoreClick(order.orderId)}
                    />
                  </td>
                </tr>
                {expandedRow === order.orderId && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f9f9f9' }}>
                      <Table bordered style={{ marginBottom: '10px' }}>
                        <thead>
                          <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.products.map((product, index) => (
                            <tr key={index}>
                              <td>{product.name}</td>
                              <td>{product.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      {order.deliveryAddress === 'Pickup from store' ? (
                        <div>
                          <p><strong>Pick up address:</strong> {order.pickupAddress}</p>
                        </div>
                      ) : (
                        <div>
                          <p><strong>Shipping Address:</strong> {order.deliveryAddress}</p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer2 />
    </>
  );
}

export default OrderHistory;
