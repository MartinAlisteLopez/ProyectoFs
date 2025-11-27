import SiteHeader from '../components/SiteHeader.jsx';
import InfoSection from '../components/InfoSection.jsx';
import FooterSection from '../components/FooterSection.jsx';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthStore } from '../auth.store.js';

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ correo: '', contrasena: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = AuthStore.login(form.correo.trim(), form.contrasena);
      setError('');
      nav(user.rol === 'administrador' ? '/admin' : '/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <div className="hero_area">
        <SiteHeader />
      </div>

      <section className="contact_section layout_padding">
        <div className="container">
          <div className="custom_heading-container">
            <h3>Iniciar Sesión</h3>
          </div>
          <div className="row">
            <div className="col-md-6 mx-auto">
              {error && <div className="alert alert-danger">{error}</div>}
              <form id="formularioLogin" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input type="email" id="correoLogin" name="correo" placeholder="Correo electrónico" required value={form.correo} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <input type="password" id="contrasenaLogin" name="contrasena" placeholder="Contraseña" required value={form.contrasena} onChange={handleChange} />
                </div>
                <div className="d-flex justify-content-center ">
                  <button type="submit">INICIAR SESIÓN</button>
                </div>
                <div className="text-center mt-3">
                  <p>¿No tienes una cuenta? <Link to="/signup">Regístrate aquí</Link></p>
                </div>
              </form>
              <div className="alert alert-info mt-3">
                Admin: admin@duoc.cl / admin123
              </div>
            </div>
          </div>
        </div>
      </section>

      <InfoSection />
      <FooterSection />
    </div>
  );
}
