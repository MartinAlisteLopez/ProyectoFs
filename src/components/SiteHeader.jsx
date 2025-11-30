import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthStore } from '../auth.store.js';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(() => AuthStore.current());
  const location = useLocation();

  useEffect(() => {
    // Cierra el menú al cambiar de ruta
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    AuthStore.logout();
    setUser(null);
    window.location.href = '/';
  };

  useEffect(() => {
    // Actualiza usuario al montar por si cambió la sesión
    setUser(AuthStore.current());
  }, []);

  return (
    <header className="header_section">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom_nav-container ">
          <Link className="navbar-brand" to="/">
            <span>Stroms Solutions</span>
          </Link>

          {user && (
            <div className="ml-auto d-none d-lg-block" id="userMenu">
              <span className="navbar-text mr-3" id="userName">Hola, {user.nombre}</span>
              <button className="btn btn-outline-light btn-sm" id="btnCerrarSesion" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          )}

          <button className="navbar-toggler ml-auto" type="button" aria-controls="navbarSupportedContent" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${open ? 'show' : ''}`} id="navbarSupportedContent">
            <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#about">Nosotros</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#services">Servicios</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#contact">Contacto</a>
                </li>
                {!user && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">Crear Cuenta</Link>
                    </li>
                  </>
                )}
                {user && user.rol === 'administrador' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Administrador</Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/products">Contratos</Link>
                </li>
              </ul>
            </div>
          </div>
          <form className="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
            <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit"></button>
          </form>
        </nav>
      </div>
    </header>
  );
}
