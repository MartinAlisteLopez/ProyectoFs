import { useMemo, useState } from 'react';
import { DataStore } from '../data.store.js';
import ProductCard from '../components/ProductCard.jsx';
import PageShell from '../components/PageShell.jsx';

export default function Categories() {
  const [query, setQuery] = useState('');
  const products = useMemo(() => DataStore.list(), []);

  const filtered = useMemo(() => {
    if (!query) return products;
    return DataStore.search(query);
  }, [products, query]);

  const grouped = useMemo(() => {
    return filtered.reduce((acc, p) => {
      (acc[p.category] ||= []).push(p);
      return acc;
    }, {});
  }, [filtered]);

  const handleAdd = (product) => {
    DataStore.cartAdd(product.id, 1);
    alert(`Agregado: ${product.name}`);
  };

  return (
    <PageShell>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="h4 mb-0">Categorías</h1>
          <input
            type="search"
            className="form-control w-auto"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {Object.keys(grouped).length === 0 && <p>No hay productos.</p>}

        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="mb-4">
            <h2 className="h5 mb-3">{cat}</h2>
            <div className="row g-3">
              {items.map(p => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
                  <ProductCard product={p} onAdd={handleAdd} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
