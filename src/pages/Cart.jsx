import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataStore } from '../data.store.js';
import PageShell from '../components/PageShell.jsx';

export default function Cart() {
  const [, force] = useState(0); // trigger re-render
  const cart = DataStore.cartList();
  const [products, setProducts] = useState(DataStore.listCached());

  useEffect(() => {
    DataStore.fetchProducts()
      .then(setProducts)
      .catch(() => setProducts(DataStore.listCached()));
  }, []);

  const rows = useMemo(() => cart.map(line => {
    const product = products.find(p => p.id === line.productId);
    return { ...line, product, total: (product?.price || 0) * line.qty };
  }), [cart, products]);

  const total = rows.reduce((sum, r) => sum + r.total, 0);

  const updateQty = (productId, qty) => {
    DataStore.cartUpdateQty(productId, qty);
    force(x => x + 1);
  };

  return (
    <PageShell>
      <div className="container py-4">
        <h1 className="h4 mb-3">Carrito</h1>
        {rows.length === 0 ? <p>No hay productos en el carrito.</p> : (
          <>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Total</th><th></th></tr>
                </thead>
                <tbody>
                  {rows.map(r => (
                    <tr key={r.productId}>
                      <td>{r.product?.name}</td>
                      <td style={{ maxWidth: 120 }}>
                        <input
                          type="number"
                          min="1"
                          className="form-control form-control-sm"
                          value={r.qty}
                          onChange={(e) => updateQty(r.productId, Number(e.target.value))}
                        />
                      </td>
                      <td>${Number(r.product?.price || 0).toLocaleString('es-CL')}</td>
                      <td>${Number(r.total || 0).toLocaleString('es-CL')}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => { DataStore.cartRemove(r.productId); force(x=>x+1); }}>Quitar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-outline-secondary" onClick={() => { DataStore.cartClear(); force(x=>x+1); }}>Vaciar</button>
              <div className="fw-bold">Total: ${Number(total || 0).toLocaleString('es-CL')}</div>
            </div>
            <div className="mt-3 text-end">
              <Link to="/checkout" className="btn btn-primary">Continuar a Checkout</Link>
            </div>
          </>
        )}
      </div>
    </PageShell>
  );
}
