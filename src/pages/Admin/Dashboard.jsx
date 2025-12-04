import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '../../data.store.js';
import { AuthStore } from '../../auth.store.js';

const emptyForm = { id: null, name: '', category: '', price: 0, stock: 0, onSale: false, description: '', image: '' };

export default function Dashboard() {
  const nav = useNavigate();
  useEffect(() => {
    const current = AuthStore.current();
    const roles = current?.roles || [];
    if (!current || (!roles.includes('ADMIN') && !roles.includes('admin') && !roles.includes('administrador'))) {
      nav('/login');
    }
  }, [nav]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState('');

  const filtered = useMemo(() => {
    if (!filter) return products;
    return products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) || p.category.toLowerCase().includes(filter.toLowerCase()));
  }, [products, filter]);

  const loadProducts = async () => {
    const data = await DataStore.fetchProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const saveProduct = async (e) => {
    e.preventDefault();
    if (form.id) {
      await DataStore.updateProduct(form.id, { ...form, price: Number(form.price), stock: Number(form.stock) });
    } else {
      await DataStore.createProduct({ ...form, price: Number(form.price), stock: Number(form.stock) });
    }
    await loadProducts();
    setForm(emptyForm);
  };

  const editProduct = (p) => setForm(p);

  const deleteProduct = async (id) => {
    await DataStore.deleteProduct(id);
    await loadProducts();
    if (form.id === id) setForm(emptyForm);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 mb-0">Panel Administrador</h1>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => { AuthStore.logout(); nav('/'); }}>Cerrar sesión</button>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input type="search" className="form-control w-auto" placeholder="Filtrar productos..." value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{form.id ? 'Editar producto' : 'Crear producto'}</h5>
              <form className="row g-2" onSubmit={saveProduct}>
                <div className="col-12">
                  <label className="form-label">Nombre</label>
                  <input className="form-control" value={form.name} required onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="col-12">
                  <label className="form-label">Categoría</label>
                  <input className="form-control" value={form.category} required onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
                <div className="col-6">
                  <label className="form-label">Precio</label>
                  <input type="number" min="0" className="form-control" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                  <div className="col-6">
                  <label className="form-label">Stock</label>
                  <input type="number" min="0" className="form-control" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                </div>
                <div className="col-12">
                  <label className="form-label">Imagen (URL)</label>
                  <input className="form-control" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/images/s-1.jpg" />
                </div>
                <div className="col-12">
                  <label className="form-label">Descripción</label>
                  <textarea className="form-control" rows="2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
                </div>
                <div className="col-12 form-check">
                  <input className="form-check-input" type="checkbox" id="onSale" checked={form.onSale} onChange={(e) => setForm({ ...form, onSale: e.target.checked })} />
                  <label className="form-check-label" htmlFor="onSale">En oferta</label>
                </div>
                <div className="col-12 d-flex gap-2">
                  <button className="btn btn-primary" type="submit">{form.id ? 'Actualizar' : 'Crear'}</button>
                  {form.id && <button type="button" className="btn btn-outline-secondary" onClick={() => setForm(emptyForm)}>Cancelar</button>}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Productos</h5>
              <div className="table-responsive" style={{ maxHeight: 420 }}>
                <table className="table table-sm align-middle">
                  <thead>
                    <tr><th>Nombre</th><th>Categoría</th><th>Precio</th><th></th></tr>
                  </thead>
                  <tbody>
                    {filtered.map(p => (
                      <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>${Number(p.price || 0).toLocaleString('es-CL')}</td>
                        <td className="text-end">
                          <button className="btn btn-link btn-sm" onClick={() => editProduct(p)}>Editar</button>
                          <button className="btn btn-link btn-sm text-danger" onClick={() => deleteProduct(p.id)}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan="4" className="text-center text-muted">Sin resultados</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
