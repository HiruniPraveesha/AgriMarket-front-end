import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderHistory from './pages/Buyer/OrderHistory';
import OrderDetails from './pages/Buyer/OrderDetails';
import BuyerProfile from './pages/Buyer/BuyerProfile';
import OngoingOrders from './pages/Buyer/OngoingOrders';
import ShoppingCart from './pages/Checkout/ShoppingCart';
import Checkout from './pages/Checkout/Checkout';
import Payment from './pages/Checkout/Payment';
import Wallet from './pages/Buyer/Wallet';
import SignUpBuyer from './pages/Login/SignUpBuyer';
import AddLogin from "./pages/Login/AddLogin";
import Verifybank from './pages/Login/VerifyBank';
import RechargeWallet from './pages/Buyer/RechargeWallet';
import AddProduct from './pages/Seller/AddProduct';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/buyer-profile" element={<BuyerProfile />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/order-details" element={<OrderDetails/>}/>
        <Route path="/ongoing-orders" element={<OngoingOrders/>} />
        <Route path='/shopping-cart' element={<ShoppingCart/>} />
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/wallet' element={<Wallet/>}/>
        <Route path='/signup-buyer' element={<SignUpBuyer/>}/>
        <Route path='/add-login' element={<AddLogin currentStep={1}/>}/>
        <Route path='/verify-bank' element={<Verifybank currentStep={2}/>}/>
        <Route path='/signup-buyer' element={<SignUpBuyer/>}/> 
        <Route path='/recharge-wallet' element={<RechargeWallet/>}/>
        <Route path='/add-product' element={<AddProduct/>}/>

      </Routes>
    </Router>
  );
}

export default App;