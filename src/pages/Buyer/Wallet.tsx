import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Nav } from 'react-bootstrap';
import MainHeader from '../../components/Header-main';
import MainFooter from '../../components/Footer-main';
import Walletimg from '../../assets/wallet.jpg';
import axios from 'axios';

interface RewardHistoryItem {
  order_id: number;
  rewardPoints: number;
  createdAt: string;
}

interface PaymentHistoryItem {
  order_id: number;
  paymentAmount: number;
  createdAt: string;
}

export default function Wallet() {
  const [show, setShow] = useState(false);
  const [buyerDetails, setBuyerDetails] = useState<{ name: string; email: string }>({ name: '', email: '' });
  const [walletBalance, setWalletBalance] = useState<number | null>(null); // Update type to allow null
  const [rewardHistory, setRewardHistory] = useState<RewardHistoryItem[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null); // State for handling errors
  const [activeTab, setActiveTab] = useState<'earnings' | 'payment'>('earnings'); // State to manage active tab
  const [showCreateWallet, setShowCreateWallet] = useState(false); // State to manage wallet creation prompt

  useEffect(() => {
    const fetchBuyerDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get-buyer-details', { params: { id: 1 } });
        setBuyerDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching buyer details:', error);
        setError('Error fetching buyer details. Please try again later.');
      }
    };

    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get-wallet-balance', { params: { buyerId: 1 } });
        setWalletBalance(response.data.data.pointBalance);
        if (response.data.data.pointBalance === null) {
          setShowCreateWallet(true); // Prompt to create wallet if balance is null
        }
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
        setError('Error fetching wallet balance. Please try again later.');
      }
    };

    fetchBuyerDetails();
    fetchWalletBalance();
  }, []);

  const fetchRewardHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/reward-history', {
        params: { buyerId: 1 },
      });
      setRewardHistory(response.data.rewardHistory);
    } catch (error) {
      console.error('Error fetching reward history:', error);
      setError('Error fetching reward history. Please try again later.');
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/used-reward-points', {
        params: { buyerId: 1 },
      });
      setPaymentHistory(
        response.data.usedRewardHistory.map((history: any) => ({
          order_id: history.order_id,
          paymentAmount: history.rewardPoints, // Assuming used reward points represent payments
          createdAt: history.createdAt,
        }))
      );
    } catch (error) {
      console.error('Error fetching payment history:', error);
      setError('Error fetching payment history. Please try again later.');
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get-wallet-balance', { params: { buyerId: 1 } });
      if (response.data.data.pointBalance === null) {
        setShowCreateWallet(true);
      } else {
        fetchRewardHistory();
        setShow(true);
      }
    } catch (error) {
      console.error('Error checking wallet existence:', error);
      setError('Error checking wallet existence. Please try again later.');
    }
  };

  const handleTabChange = (tab: 'earnings' | 'payment') => {
    setActiveTab(tab);
    if (tab === 'payment') {
      fetchPaymentHistory();
    }
  };

  const handleCreateWallet = async () => {
    try {
      await axios.post('http://localhost:8000/createWallet', { buyerId: 1 });
      // Fetch the wallet balance after creating the wallet
      const response = await axios.get('http://localhost:8000/get-wallet-balance', { params: { buyerId: 1 } });
      setWalletBalance(response.data.data.pointBalance);
      setShowCreateWallet(false);
      setShow(true);
    } catch (error) {
      console.error('Error creating wallet:', error);
      setError('Error creating wallet. Please try again later.');
    }
  };

  return (
    <>
      <MainHeader />
      <div>
        <Container className="container py-5 h-100">
          <Row className="justify-content-center align-items-center h-100">
            <Col md="12" xl="4">
              <Card style={{ borderRadius: '15px' }}>
                <Card.Body className="text-center">
                  <div className="mt-3 mb-4">
                    <img
                      src={Walletimg}
                      alt="Profile Picture"
                      style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        marginTop: '-30px',
                      }}
                    />
                  </div>
                  <h4 style={{ marginTop: '-50px' }}>{buyerDetails.name}</h4>
                  <p className="text-muted mb-4">{buyerDetails.email}</p>

                  <div className="d-flex justify-content-around text-center mt-5 mb-2">
                    {walletBalance === null ? (
                      <Button
                        style={{ backgroundColor: '#00BA29' }}
                        onClick={() => setShowCreateWallet(true)}
                      >
                        Create Wallet
                      </Button>
                    ) : (
                      <>
                        <div className="d-flex flex-column align-items-center">
                          <p className="mb-1 h5">{walletBalance}</p>
                          <p className="small text-muted mb-0">Total Points</p>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                          <Button
                            style={{
                              height: '25px',
                              padding: '0 10px',
                              backgroundColor: '#00BA29',
                            }}
                            onClick={() => {
                              handleShow();
                              setActiveTab('earnings'); // Default tab to earnings on opening modal
                            }}
                          >
                            ...
                          </Button>
                          <p className="small text-muted mb-0">History</p>
                        </div>
                      </>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <MainFooter />

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ background: '#DFFFC0', borderBottom: 'none', borderRadius: '0px' }}>
          <Nav variant="tabs" defaultActiveKey="earnings" onSelect={(eventKey) => handleTabChange(eventKey as 'earnings' | 'payment')}>
            <Nav.Item>
              <Nav.Link eventKey="earnings">Earnings History</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="payment">Payment History</Nav.Link>
            </Nav.Item>
          </Nav>
        </Modal.Header>
        <Modal.Body
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, #DFFFC0, #FFFFFF)',
          }}
        >
          {error && <p className="text-danger mt-3">{error}</p>}
          {activeTab === 'earnings' && (
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Earnings</th>
                </tr>
              </thead>
              <tbody>
                {rewardHistory.map((history) => (
                  <tr key={history.order_id}>
                    <td>{new Date(history.createdAt).toLocaleDateString()}</td>
                    <td>#{history.order_id}</td>
                    <td>{history.rewardPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === 'payment' && (
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((history) => (
                  <tr key={history.order_id}>
                    <td>{new Date(history.createdAt).toLocaleDateString()}</td>
                    <td>#{history.order_id}</td>
                    <td>{history.paymentAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showCreateWallet} onHide={() => setShowCreateWallet(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to create a wallet?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateWallet(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleCreateWallet}>Create</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
