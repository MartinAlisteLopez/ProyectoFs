import { useLocation, Link } from 'react-router-dom';
import PageShell from '../components/PageShell.jsx';

export default function Success() {
  const { state } = useLocation();
  const name = state?.name || 'Cliente';

  return (
    <PageShell>
      <div className="container py-5 text-center">
        <img src="/images/success.png" alt="Pago exitoso" width="160" className="mb-3" onError={(e) => { e.target.style.display = 'none'; }} />
        <h1 className="h3 mb-3">¡Pago exitoso!</h1>
        <p>Gracias por tu compra, {name}. Hemos recibido tu pedido.</p>
        <Link className="btn btn-primary" to="/">Volver al inicio</Link>
      </div>
    </PageShell>
  );
}
