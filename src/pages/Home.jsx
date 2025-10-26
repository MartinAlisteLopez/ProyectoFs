
import { useEffect, useState } from 'react';
import { DataStore } from '../data.store.js';
import ProductCard from '../components/CarroProductos.jsx';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(DataStore.list());
  }, []);

  const handleAdd = (p) => {
    DataStore.cartAdd(p.id);
    alert(`Agregado: ${p.name}`);
  };

  return (
    <div>
      <h1 className="h3 mb-3">Tienda</h1>
      <div className="row g-3">
        {products.map(p => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
            <ProductCard product={p} onAdd={handleAdd} />
          </div>
        ))}
      </div>
    </div>
  );
}
