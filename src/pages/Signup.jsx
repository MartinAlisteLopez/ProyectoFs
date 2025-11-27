import SiteHeader from '../components/SiteHeader.jsx';
import InfoSection from '../components/InfoSection.jsx';
import FooterSection from '../components/FooterSection.jsx';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthStore } from '../auth.store.js';
import { regionesYComunas } from '../regions.js';

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    run: '', nombre: '', apellidos: '', fechaNacimiento: '', region: '', comuna: '', direccion: '', correo: '', contrasena: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      AuthStore.register(form);
      setError('');
      nav('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  const comunas = form.region ? regionesYComunas[form.region] || [] : [];

  return (
    <div>
      <div className="hero_area">
        <SiteHeader />
      </div>

      <section className="contact_section layout_padding">
        <div className="container">
          <div className="custom_heading-container">
            <h3>Crear Cuenta</h3>
          </div>
          <div className="row">
            <div className="col-md-8 mx-auto">
              {error && <div className="alert alert-danger">{error}</div>}
              <form id="formularioRegistro" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input type="text" id="run" name="run" placeholder="RUN" required value={form.run} onChange={handleChange} />
                  </div>
                  <div className="form-group col-md-6">
                    <input type="text" id="fechaNacimiento" name="fechaNacimiento" placeholder="DD/MM/AAAA" value={form.fechaNacimiento} onChange={handleChange} />
                    <small style={{ fontSize: 12, color: '#666' }}>Opcional</small>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input type="text" id="nombre" name="nombre" placeholder="Nombre" required value={form.nombre} onChange={handleChange} />
                  </div>
                  <div className="form-group col-md-6">
                    <input type="text" id="apellidos" name="apellidos" placeholder="Apellidos" required value={form.apellidos} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <select id="region" name="region" required value={form.region} onChange={handleChange}>
                      <option value="" disabled>Seleccione una región</option>
                      {Object.keys(regionesYComunas).map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <select id="comuna" name="comuna" required value={form.comuna} onChange={handleChange} disabled={!form.region}>
                      <option value="" disabled>{form.region ? 'Seleccione una comuna' : 'Primero seleccione una región'}</option>
                      {comunas.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <input type="text" id="direccion" name="direccion" placeholder="Dirección" required value={form.direccion} onChange={handleChange} />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input type="email" id="correo" name="correo" placeholder="Correo electrónico" required value={form.correo} onChange={handleChange} />
                  </div>
                  <div className="form-group col-md-6">
                    <input type="password" id="contrasena" name="contrasena" placeholder="Contraseña" required value={form.contrasena} onChange={handleChange} />
                  </div>
                </div>
                <div className="d-flex justify-content-center ">
                  <button type="submit">CREAR CUENTA</button>
                </div>
                <div className="text-center mt-3">
                  <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <InfoSection />
      <FooterSection />
    </div>
  );
}
