
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '../data.store.js';

export default function Checkout() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', delivery: 'standard'
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasItems = DataStore.cartList().length > 0;
    if (!hasItems) return nav('/failure');

    DataStore.cartClear();
    nav('/success', { state: { ...form } });
  };

  return (
    <div className="row">
      <div className="col-12 col-lg-8">
        <h1 className="h3 mb-3">Checkout</h1>
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
        <div className="alert alert-info">Si has iniciado sesión, tus datos se completarán automáticamente (futuro).</div>
      </div>
    </div>
  );
}
