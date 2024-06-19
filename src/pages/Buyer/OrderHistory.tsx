import Table from 'react-bootstrap/Table';
import More from "../../assets/more.svg"; 
import MainHeader from '../../components/Header-main';
import Footer2 from '../../components/Footer-main';
import { Link } from "react-router-dom";

function OrderHistory() {
  return (
    <>
    <MainHeader/>
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
            <th style={{ width: '15%', textAlign: 'center' }}>Order Status</th>
            <th style={{ width: '5%', textAlign: 'center' }}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ textAlign: 'center' }}>#1234</td>
            <td style={{ textAlign: 'center' }}>20/01/2025</td>
            <td style={{ textAlign: 'center' }}>Carrot - 2Kg</td>
            <td style={{ textAlign: 'center' }}>Nehan Perera</td>
            <td style={{ textAlign: 'center' }}>Rs.245.00</td>
            <td style={{ textAlign: 'center', color: '#00BA29'}}>completed</td>
            <td style={{ textAlign: 'center' }}><Link to ="/order-details"><img src={More} alt="More" style={{ width: '20px', height: '20px', transform: 'rotate(-90deg)' }} /></Link></td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}>#2345</td>
            <td style={{ textAlign: 'center' }}>20/12/2024</td>
            <td style={{ textAlign: 'center' }}>Beans - 1Kg</td>
            <td style={{ textAlign: 'center' }}>Hiruni Perera</td>
            <td style={{ textAlign: 'center' }}>Rs.120.00</td>
            <td style={{ textAlign: 'center' , color: 'red'}}>Pending</td>
            <td style={{ textAlign: 'center' }}><Link to ="/order-details"><img src={More} alt="More" style={{ width: '20px', height: '20px', transform: 'rotate(-90deg)' }} /></Link></td>
          </tr>
        </tbody>
      </Table>
    </div>
    <Footer2/>
    </>
  );
}

export default OrderHistory;
