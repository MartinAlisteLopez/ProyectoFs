import { useMemo, useState } from 'react';
import PageShell from '../components/PageShell.jsx';
import { QuoteStore } from '../quote.store.js';

export default function Invoice() {
  const [items, setItems] = useState(() => QuoteStore.getItems());

  const total = useMemo(() => items.reduce((sum, it) => sum + (Number(it.price || 0) * (it.qty || 1)), 0), [items]);

  const updateQty = (id, qty) => {
    const next = items.map(it => it.id === id ? { ...it, qty } : it);
    setItems(next);
    QuoteStore.setItems(next);
  };

  const clear = () => {
    QuoteStore.clear();
    setItems([]);
  };

  return (
    <PageShell>
      <section className="contact_section layout_padding">
        <div className="container">
          <div className="custom_heading-container">
            <h3>Factura / Contrato</h3>
          </div>
          {items.length === 0 ? (
            <p className="text-center">No hay materiales seleccionados.</p>
          ) : (
            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr><th>Material</th><th>Categoría</th><th>Cantidad</th><th>Precio</th><th>Total</th></tr>
                    </thead>
                    <tbody>
                      {items.map(it => (
                        <tr key={it.id}>
                          <td>{it.name}</td>
                          <td>{it.category}</td>
                          <td style={{ maxWidth: 120 }}>
                            <input
                              type="number"
                              min="1"
                              className="form-control form-control-sm"
                              value={it.qty || 1}
                              onChange={(e) => updateQty(it.id, Number(e.target.value))}
                            />
                          </td>
                          <td>${Number(it.price || 0).toLocaleString('es-CL')}</td>
                          <td>${Number((it.price || 0) * (it.qty || 1)).toLocaleString('es-CL')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button className="btn btn-outline-secondary" onClick={clear}>Limpiar</button>
                  <div className="fw-bold h5 mb-0">Total: ${Number(total || 0).toLocaleString('es-CL')}</div>
                </div>
                <div className="alert alert-secondary mt-3">
                  Esta factura es referencial para el trabajo solicitado; no se realiza pago en línea.
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
