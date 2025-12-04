import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader.jsx';
import InfoSection from '../components/InfoSection.jsx';
import FooterSection from '../components/FooterSection.jsx';
import { DataStore } from '../data.store.js';
import { QuoteStore } from '../quote.store.js';

export default function Products() {
  const [items, setItems] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    DataStore.fetchProducts()
      .then(setItems)
      .catch(() => setItems(DataStore.listCached()));
  }, []);

  const contratar = (product) => {
    QuoteStore.setItems([{ ...product, qty: 1 }]);
    nav('/invoice');
  };

  return (
    <div>
      <div className="hero_area">
        <SiteHeader />
      </div>

      <section className="service_section layout_padding-bottom">
        <div className="container">
          <div className="custom_heading-container mb-4">
            <h3>CONTRATOS</h3>
          </div>
          <p className="mb-4">Catálogo de servicios y materiales que utilizaremos en tus trabajos. No hay compra en línea, solo contratación.</p>
          <div className="row">
            {items.length === 0 && (
              <div className="col-12 text-center"><p>No hay productos disponibles.</p></div>
            )}
            {items.map((p, idx) => (
              <div className="col-md-4 mb-4" key={p.id || idx}>
                <div className="card h-100">
                  {p.image && <img src={p.image} className="card-img-top" alt={p.name} style={{ height: 200, objectFit: 'cover' }} />}
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description || 'Sin descripción'}</p>
                    <p className="card-text"><strong>Categoría:</strong> {p.category}</p>
                    <p className="card-text"><strong>Precio referencial:</strong> ${Number(p.price || 0).toLocaleString('es-CL')}</p>
                    <p className="card-text"><small className="text-muted">ID: {p.id}</small></p>
                    <div className="alert alert-secondary mb-2 p-2 text-center">Contrato de servicio con materiales incluidos.</div>
                    <button className="btn btn-success w-100" onClick={() => contratar(p)}>Contratar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InfoSection />
      <FooterSection />
    </div>
  );
}
