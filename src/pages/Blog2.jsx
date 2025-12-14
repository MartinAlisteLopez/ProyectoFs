import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell.jsx';

export default function Blog2() {
  return (
    <PageShell>
      <section className="blog-hero">
        <div className="container">
          <p className="hero-kicker">Blog</p>
          <h2 className="hero-title">Tendencias en el mundo electrico 2025</h2>
          <div className="hero-underline"></div>
        </div>
      </section>

      <section className="layout_padding">
        <div className="container blog-detail">
          <div className="blog-actions">
            <Link className="btn btn-light" to="/blogs">← Volver a Blogs</Link>
          </div>

          <img className="img-fluid mb-4" src="/images/Tendencia electrica.jpg" alt="Tendencias electricas" />

          <p>
            El mundo de la electricidad esta evolucionando con avances que cambian como producimos y consumimos energia.
            En 2025 destacan la generacion distribuida, la movilidad electrica y la automatizacion del hogar, impulsando
            eficiencia y sostenibilidad.
          </p>

          <h3 className="mt-4">Energia solar y almacenamiento</h3>
          <p>
            La baja de costos en paneles y baterias permite que hogares y empresas adopten sistemas solares con
            almacenamiento para respaldos y ahorro en la noche o cortes de luz.
          </p>

          <h3 className="mt-4">Movilidad electrica</h3>
          <p>
            Vehiculos electricos con mayor autonomia, infraestructura de carga accesible y carga bidireccional (V2G)
            posicionan al transporte electrico como actor clave en la red.
          </p>

          <h3 className="mt-4">Automatizacion del hogar</h3>
          <p>
            Domotica y dispositivos inteligentes optimizan el consumo: iluminacion automatica, termostatos y control por
            voz reducen la demanda y mejoran la experiencia.
          </p>

          <h3 className="mt-4">Sostenibilidad como eje</h3>
          <p>
            Las redes inteligentes y la adopcion de renovables permiten un modelo energetico mas limpio, conectado y
            autonomo, con medicion inteligente y menor impacto ambiental.
          </p>

          <p className="mt-4">
            <strong>Conclusion:</strong> 2025 consolida la transicion energetica: tecnologia + conciencia ecologica
            impulsan un sistema mas eficiente y sostenible.
          </p>

          <div className="blog-actions mt-4">
            <Link className="btn btn-light" to="/blogs">← Volver a Blogs</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
