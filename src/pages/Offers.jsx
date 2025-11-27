import { useMemo } from 'react';
import { DataStore } from '../data.store.js';
import ProductCard from '../components/ProductCard.jsx';
import PageShell from '../components/PageShell.jsx';

export default function Offers() {
  const items = useMemo(() => DataStore.listOffers(), []);

  const handleAdd = (p) => {
    DataStore.cartAdd(p.id, 1);
    alert(`Agregado: ${p.name}`);
  };

  return (
    <PageShell>
      <div className="container py-4">
        <h1 className="h4 mb-3">Ofertas</h1>
        {items.length === 0 ? <p>No hay productos en oferta.</p> : (
          <div className="row g-3">
            {items.map(p => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
                <ProductCard product={p} onAdd={handleAdd} />
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
