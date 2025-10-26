
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import Categories from './pages/Categorias.jsx';
import Offers from './pages/Ofertas.jsx';
import Cart from './pages/Carrito.jsx';
import Checkout from './pages/Checkout.jsx';
import Success from './pages/Ejecucion.jsx';
import Failure from './pages/Failure.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';

export default function App() {
  return (
    <div>
      <NavBar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}
