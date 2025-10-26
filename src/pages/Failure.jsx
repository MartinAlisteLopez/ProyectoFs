
import { Link } from 'react-router-dom';

export default function Failure() {
  return (
    <div className="text-center">
      <h1 className="h3">Pago rechazado </h1>
      <p className="text-muted">No se pudo procesar el pago. Intenta nuevamente.</p>
      <div className="d-flex gap-2 justify-content-center">
        <Link to="/checkout" className="btn btn-outline-secondary">Volver al checkout</Link>
        <Link to="/" className="btn btn-primary">Ir a la tienda</Link>
      </div>
    </div>
  );
}
