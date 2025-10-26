
import { DataStore } from '../data.store.js';

export default function Offers() {
  const items = DataStore.list().filter(p => p.onSale);

  return (
    <div>
      <h1 className="h3 mb-3">Ofertas</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr><th>Producto</th><th>Categoría</th><th>Precio</th></tr>
          </thead>
          <tbody>
            {items.map(p => (
            <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{`$${Number(p.price || 0).toFixed(2)}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
