import { useLocation, Link } from 'react-router-dom';
import PageShell from '../components/PageShell.jsx';

export default function Failure() {
  const { state } = useLocation();

  return (
    <PageShell>
      <div className="container py-5 text-center">
        <img src="/images/failure.png" alt="Pago fallido" width="160" className="mb-3" onError={(e) => { e.target.style.display = 'none'; }} />
        <h1 className="h3 mb-3">No se pudo procesar el pago</h1>
        <p>{state?.reason || 'Inténtalo nuevamente o revisa los datos ingresados.'}</p>
        <div className="d-flex justify-content-center gap-2">
          <Link className="btn btn-outline-secondary" to="/cart">Volver al carrito</Link>
          <Link className="btn btn-primary" to="/checkout">Ir a Checkout</Link>
        </div>
      </div>
    </PageShell>
  );
}
