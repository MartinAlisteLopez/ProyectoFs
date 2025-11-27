import React from 'react';

function calcItemTotal(item) {
  // Ejemplo de desglose: costo trabajo (base), materiales (10% del base o especificado), otros (fijo)
  const trabajo = item.base * item.qty;
  const materiales = item.materialsCost != null ? item.materialsCost : Math.round(item.base * 0.1) * item.qty;
  const otros = item.otherCost != null ? item.otherCost : 0;
  const total = trabajo + materiales + otros;
  return { trabajo, materiales, otros, total };
}

export default function ServiceInvoice({ items = [], onRemove = () => {} }) {
  const rows = items.map(it => ({ ...it, breakdown: calcItemTotal(it) }));
  const grand = rows.reduce((s, r) => s + r.breakdown.total, 0);

  return (
    <div>
      <h3>Factura - Resumen de Servicios</h3>
      {rows.length === 0 && <div className="alert alert-info">No hay servicios agregados.</div>}
      {rows.length > 0 && (
        <div>
          <ul className="list-group">
            {rows.map(r => (
              <li key={r.id} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>{r.name}</strong> <small className="text-muted">x{r.qty}</small>
                    {r.notes && <div className="text-muted">Notas: {r.notes}</div>}
                    <div>Trabajo: ${r.breakdown.trabajo}</div>
                    <div>Materiales: ${r.breakdown.materiales}</div>
                    <div>Otros: ${r.breakdown.otros}</div>
                  </div>
                  <div className="text-end">
                    <div className="invoice-total">Total: ${r.breakdown.total}</div>
                    <button className="btn btn-sm btn-danger mt-2" onClick={() => onRemove(r.id)}>Eliminar</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <h5>Total factura: ${grand}</h5>
          </div>
        </div>
      )}
    </div>
  );
}
