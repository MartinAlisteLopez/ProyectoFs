import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell.jsx';

export default function Blog1() {
  return (
    <PageShell>
      <section className="blog-hero">
        <div className="container">
          <p className="hero-kicker">Blog</p>
          <h2 className="hero-title">Precauciones al manipular aparatos electricos</h2>
          <div className="hero-underline"></div>
        </div>
      </section>

      <section className="layout_padding">
        <div className="container blog-detail">
          <div className="blog-actions">
            <Link className="btn btn-light" to="/blogs">← Volver a Blogs</Link>
          </div>

          <img className="img-fluid mb-4" src="/images/Aparato electrico.jpg" alt="Seguridad electrica" />

          <p>
            La electricidad es fundamental en la vida diaria, pero puede ser peligrosa si no se manipula
            correctamente. Conocer y aplicar medidas de seguridad protege a las personas y los equipos, tanto en el
            hogar como en el trabajo.
          </p>

          <h3 className="mt-4">Riesgos comunes</h3>
          <ul>
            <li>Descargas electricas.</li>
            <li>Incendios por cortocircuito.</li>
            <li>Danos a equipos o instalaciones.</li>
            <li>Lesiones personales graves o incluso mortales.</li>
          </ul>

          <h3 className="mt-4">Recomendaciones basicas de seguridad</h3>
          <ol>
            <li>Desconectar siempre la energia antes de manipular cualquier instalacion o equipo.</li>
            <li>Evitar el uso de aparatos electricos mojados o en ambientes humedos.</li>
            <li>No sobrecargar enchufes o alargadores.</li>
            <li>Utilizar herramientas aisladas y guantes dielectricos si es necesario.</li>
            <li>Revisar cables y enchufes en mal estado y reemplazarlos de inmediato.</li>
            <li>Consultar a un profesional certificado para instalaciones complejas.</li>
          </ol>

          <h3 className="mt-4">En el ambito laboral</h3>
          <p>
            Las empresas deben seguir normativas de seguridad electrica, capacitar al personal y contar con planes de
            emergencia. Cumplir con normas locales y las IEC reduce riesgos y asegura continuidad operacional.
          </p>

          <p className="mt-4">
            <strong>Conclusion:</strong> La prevencion y el conocimiento son los mejores aliados cuando se trata de
            electricidad. Aplicar estas recomendaciones puede salvar vidas y proteger tus equipos.
          </p>

          <div className="mt-4">
            <h5>¿Te interesa aprender mas?</h5>
            <ul>
              <li>
                <a href="https://www.sec.cl/" target="_blank" rel="noreferrer">
                  Superintendencia de Electricidad y Combustibles (SEC)
                </a>
              </li>
            </ul>
          </div>

          <div className="blog-actions mt-4">
            <Link className="btn btn-light" to="/blogs">← Volver a Blogs</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
