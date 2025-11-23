import React from 'react';
import ServiceCard from './ServiceCard';

const SERVICES = [
  { id: 1, name: 'Arreglo eléctrico', base: 30 },
  { id: 2, name: 'Instalación de luminarias', base: 50 },
  { id: 3, name: 'Reparación de grifería', base: 40 },
  { id: 4, name: 'Pintura de sala', base: 80 }
];

export default function ServiceList({ onAdd = () => {} }) {
  return (
    <div className="row">
      {SERVICES.map(s => (
        <div className="col-md-6 mb-3" key={s.id}>
          <ServiceCard service={s} onAdd={() => onAdd(s)} />
        </div>
      ))}
    </div>
  );
}
