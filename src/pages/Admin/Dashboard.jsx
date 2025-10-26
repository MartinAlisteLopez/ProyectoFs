
import { useState } from 'react';
import { DataStore } from '../../data.store.js';

export default function Dashboard() {
  const [items, setItems] = useState(DataStore.list());
  const [form, setForm] = useState({ name: '', category: '', price: 0, onSale: false });

  const refresh = () => setItems(DataStore.list());
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    DataStore.create({ ...form, price: Number(form.price) });
    setForm({ name: '', category: '', price: 0, onSale: false });
    refresh();
  };

  const handleDelete = (id) => { DataStore.remove(id); refresh(); };

  return (
    <div>
      <h1 className="h4 mb-3">Panel Administrativo</h1>

      <form className="row g-3" onSubmit={handleCreate}>
        <div className="col-md-4">
          <input required name="name" className="form-control" placeholder="Nombre" value={form.name} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <input required name="category" className="form-control" placeholder="Categoría" value={form.category} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <input required name="price" type="number" min="0" className="form-control" placeholder="Precio" value={form.price} onChange={handleChange} />
        </div>
        <div className="col-md-2 d-flex align-items-center gap-2">
          <div className="form-check">
            <input id="onSale" name="onSale" type="checkbox" className="form-check-input" checked={form.onSale} onChange={handleChange} />
            <label htmlFor="onSale" className="form-check-label">Oferta</label>
          </div>
          <button className="btn btn-success" type="submit">Crear</button>
        </div>
      </form>

      <div className="table-responsive mt-4">
        <table className="table table-hover align-middle">
          <thead><tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Oferta</th><th></th></tr></thead>
          <tbody>
            {items.map(p => (
            <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{`$${Number(p.price || 0).toFixed(2)}`}</td>
                <td>{p.onSale ? 'Sí' : 'No'}</td>
                <td><button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
