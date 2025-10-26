
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataStore } from '../data.store.js';

export default function Cart() {
  const [, setForce] = useState(0); // simple re-render trigger
  const cart = DataStore.cartList();
  const products = DataStore.list();

  const rows = useMemo(() => cart.map(line => {
    const product = products.find(p => p.id === line.productId);
    return { ...line, product, total: (product?.price || 0) * line.qty };
  }), [cart, products]);

  const total = rows.reduce((sum, r) => sum + r.total, 0);

  return (
    <div>
      <h1 className="h3 mb-3">Carrito</h1>
      {rows.length === 0 ? <p>No hay productos en el carrito.</p> : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Total</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.productId}>
                  <td>{r.product?.name}</td>
                  <td>{r.qty}</td>
                  <td>{`$${Number(r.product?.price || 0).toFixed(2)}`}</td>
                  <td>{`$${Number(r.total || 0).toFixed(2)}`}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger"
                      onClick={() => { DataStore.cartRemove(r.productId); setForce(x=>x+1); }}>Quitar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-secondary" onClick={() => { DataStore.cartClear(); setForce(x=>x+1); }}>Vaciar</button>
            <div className="fw-bold">Total: {`$${Number(total || 0).toFixed(2)}`}</div>
          </div>
          <div className="mt-3 text-end">
            <Link to="/checkout" className="btn btn-primary">Continuar a Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}
