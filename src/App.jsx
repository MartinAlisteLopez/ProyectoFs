import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Categories from './pages/Categories.jsx';
import Offers from './pages/Offers.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Success from './pages/Success.jsx';
import Failure from './pages/Failure.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Products from './pages/Products.jsx';
import Invoice from './pages/Invoice.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
