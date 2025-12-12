import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '../data.store.js';
import PageShell from '../components/PageShell.jsx';

export default function Checkout() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', delivery: 'standard'
  });
  const [products, setProducts] = useState(DataStore.listCached());

  useEffect(() => {
    DataStore.fetchProducts()
      .then(setProducts)
      .catch(() => setProducts(DataStore.listCached()));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasItems = DataStore.cartList().length > 0;
    if (!hasItems) return nav('/failure', { state: { reason: 'No hay productos en el carrito.' } });

    try {
      await DataStore.createOrder(DataStore.cartList().map(line => {
        const p = products.find(x => x.id === line.productId);
        return { ...p, qty: line.qty };
      }));
      nav('/success', { state: { ...form } });
    } catch (err) {
      nav('/failure', { state: { reason: 'No se pudo enviar la orden.' } });
    }
  };

  return (
    <PageShell>
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-lg-8">
            <h1 className="h4 mb-3">Checkout</h1>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input name="name" className="form-control" required value={form.name} onChange={handleChange}/>
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input name="email" type="email" className="form-control" required value={form.email} onChange={handleChange}/>
              </div>
              <div className="col-12">
                <label className="form-label">Dirección</label>
                <input name="address" className="form-control" required value={form.address} onChange={handleChange}/>
              </div>
              <div className="col-md-6">
                <label className="form-label">Ciudad</label>
                <input name="city" className="form-control" required value={form.city} onChange={handleChange}/>
              </div>
              <div className="col-md-6">
                <label className="form-label">Entrega</label>
                <select name="delivery" className="form-select" value={form.delivery} onChange={handleChange}>
                  <option value="standard">Estándar</option>
                  <option value="express">Express</option>
                </select>
              </div>
              <div className="col-12 text-end">
                <button className="btn btn-primary" type="submit">Pagar</button>
              </div>
            </form>
          </div>
          <div className="col-12 col-lg-4">
            <div className="alert alert-info">
              Si has iniciado sesión, tus datos se completarán automáticamente (feature futuro).
            </div>
            <div className="card">
              <div className="card-body">
                <h6 className="card-title">Resumen</h6>
                <ul className="list-unstyled mb-0">
                {DataStore.cartList().map(line => {
                  const p = products.find(x => x.id === line.productId);
                  return <li key={line.productId}>{line.qty}x {p?.name}</li>;
                })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
