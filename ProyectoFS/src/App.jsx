import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ServiceList from './components/ServiceList';
import ServiceInvoice from './components/ServiceInvoice';
import CheckoutForm from './components/CheckoutForm';

export default function App() {
  const [invoiceItems, setInvoiceItems] = useState([]);

  function addService(service) {
    setInvoiceItems(prev => {
      const found = prev.find(s => s.id === service.id);
      if (found) return prev.map(s => s.id === service.id ? { ...s, qty: s.qty + 1 } : s);
      return [...prev, { ...service, qty: 1 }];
    });
  }

  function removeService(id) {
    setInvoiceItems(prev => prev.filter(s => s.id !== id));
  }

  function handleCheckout(data) {
    // En un caso real enviar a backend; aquí mostrar en consola
    console.log('Factura final', { customer: data, items: invoiceItems });
    setInvoiceItems([]);
    alert('Factura generada. Revisa la consola para detalles (ejemplo).');
  }

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div className="container">
          <Link className="navbar-brand" to="/">Servicios</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Listado</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/invoice">Factura ({invoiceItems.reduce((s,i)=>s+i.qty,0)})</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/checkout">Checkout</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<ServiceList onAdd={addService} />} />
          <Route path="/invoice" element={<ServiceInvoice items={invoiceItems} onRemove={removeService} />} />
          <Route path="/checkout" element={<CheckoutForm onSubmit={handleCheckout} items={invoiceItems} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
