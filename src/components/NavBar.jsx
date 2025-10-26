
import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">Tienda React</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink to="/" end className="nav-link">Inicio</NavLink></li>
            <li className="nav-item"><NavLink to="/categories" className="nav-link">Categorías</NavLink></li>
            <li className="nav-item"><NavLink to="/offers" className="nav-link">Ofertas</NavLink></li>
            <li className="nav-item"><NavLink to="/admin" className="nav-link">Admin</NavLink></li>
          </ul>
          <div className="d-flex gap-2">
            <NavLink to="/cart" className="btn btn-outline-secondary">Carrito</NavLink>
            <NavLink to="/checkout" className="btn btn-primary">Checkout</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
