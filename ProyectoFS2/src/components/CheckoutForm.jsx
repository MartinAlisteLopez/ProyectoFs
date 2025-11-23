import React, { useState } from 'react';

export default function CheckoutForm({ onSubmit = () => {}, items = [] }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!name.trim()) e.name = 'Nombre requerido';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Email inválido';
    if (!address.trim()) e.address = 'Dirección requerida';
    if (items.length === 0) e.items = 'No hay servicios en la factura';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit({ name, email, address });
  }

  return (
    <div>
      <h3>Checkout</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={name} onChange={e => setName(e.target.value)} />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={email} onChange={e => setEmail(e.target.value)} />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <textarea className={`form-control ${errors.address ? 'is-invalid' : ''}`} value={address} onChange={e => setAddress(e.target.value)} />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        {errors.items && <div className="alert alert-danger">{errors.items}</div>}

        <button className="btn btn-success" type="submit">Generar factura</button>
      </form>
    </div>
  );
}
