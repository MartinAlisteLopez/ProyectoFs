
import { useMemo } from 'react';
import { DataStore } from '../data.store.js';

export default function Categories() {
  const products = DataStore.list();
  const byCategory = useMemo(() => {
    return products.reduce((acc, p) => {
      (acc[p.category] ||= []).push(p);
      return acc;
    }, {});
  }, [products]);

  return (
    <div>
      <h1 className="h3 mb-3">Categorías</h1>
      {Object.entries(byCategory).map(([cat, items]) => (
        <div key={cat} className="mb-4">
          <h2 className="h5">{cat}</h2>
          <ul className="list-group">
            {items.map(p => (
            <li key={p.id} className="list-group-item d-flex justify-content-between">
                <span>{p.name}</span>
                <span className="fw-bold">{`$${Number(p.price || 0).toFixed(2)}`}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
