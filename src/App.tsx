import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderHistory from './pages/Buyer/OrderHistory';
import OrderDetails from './pages/Buyer/OrderDetails';
import BuyerProfile from './pages/Buyer/BuyerProfile';
import OngoingOrders from './pages/Buyer/OngoingOrders';
import ShoppingCart from './pages/Checkout/ShoppingCart';
import Checkout from './pages/Checkout/Checkout';
import Wallet from './pages/Buyer/Wallet';
import SignUpBuyer from './pages/Login/SignUpBuyer';
import AddLogin from "./pages/Login/AddLogin";
import Verifybank from './pages/Login/VerifyBank';
import RechargeWallet from './pages/Buyer/RechargeWallet';
import AddProduct from './pages/Seller/AddProduct';
import Sidebar from './components/Seller-side-bar';
import AdminLogin from './pages/Admin/Admin-login';
import Dashboard from './pages/Admin/Dashboard';
import AdminNavigation from './components/Admin-bar';
import Buyers from './pages/Admin/Buyers';
import Sellers from './pages/Admin/Sellers';
import Products from './pages/Admin/Products';


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
        <Route path='/wallet' element={<Wallet/>}/>
        <Route path='/signup-buyer' element={<SignUpBuyer/>}/>
        <Route path='/add-login' element={<AddLogin currentStep={1}/>}/>
        <Route path='/verify-bank' element={<Verifybank currentStep={2}/>}/>
        <Route path='/signup-buyer' element={<SignUpBuyer/>}/> 
        <Route path='/recharge-wallet' element={<RechargeWallet/>}/>
        <Route path='/add-product' element={<AddProduct/>}/>
        <Route path='/seller-dashboard' element={<Sidebar/>}/>
        <Route path='/admin-page' element={<AdminNavigation/>}/>
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path='/admin-dashboard' element={<Dashboard/>}/>
        <Route path='/admin-buyers' element={<Buyers/>}/>
        <Route path='/admin-sellers' element={<Sellers/>}/>
        <Route path='/admin-products' element={<Products/>}/>

      </Routes>
    </Router>
  );
}

export default App;