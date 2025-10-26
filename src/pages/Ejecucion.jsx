
import { useLocation, Link } from 'react-router-dom';

export default function Success() {
  const { state } = useLocation();
  return (
    <div className="text-center">
      <h1 className="h3">¡Compra exitosa! </h1>
      <p className="text-muted">Gracias {state?.name || 'cliente'} por tu compra.</p>
      <Link to="/" className="btn btn-primary">Volver a la tienda</Link>
    </div>
  );
}
