import React, { useState } from 'react';

export default function ServiceCard({ service, onAdd = () => {} }) {
  const [notes, setNotes] = useState('');

  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{service.name}</h5>
        <p className="card-text">Costo base: ${service.base}</p>
        <div className="mb-2">
          <label className="form-label">Notas / requerimientos</label>
          <input className="form-control" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Ej: necesito cambio de foco" />
        </div>
        <div className="mt-auto d-flex justify-content-between">
          <button className="btn btn-primary" onClick={() => onAdd({ ...service, notes })}>Agregar</button>
          <small className="text-muted align-self-center">Incluye mano de obra</small>
        </div>
      </div>
    </div>
  );
}
