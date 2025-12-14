import PageShell from '../components/PageShell.jsx';

export default function Contact() {
  return (
    <PageShell>
      <section className="blog-hero">
        <div className="container">
          <p className="hero-kicker">Leer mas</p>
          <h2 className="hero-title">Contactanos</h2>
          <div className="hero-underline"></div>
        </div>
      </section>

      <section className="layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-6 mx-auto">
              <form className="contact-form">
                <input type="text" placeholder="NOMBRE" />
                <input type="email" placeholder="CORREO ELECTRONICO" />
                <input type="text" placeholder="NUMERO DE TELEFONO" />
                <select defaultValue="">
                  <option value="" disabled>TIPO DE SERVICIO</option>
                  <option value="instalacion">Instalacion</option>
                  <option value="reparacion">Reparacion</option>
                  <option value="mantencion">Mantencion</option>
                </select>
                <textarea rows="4" placeholder="MENSAJE"></textarea>
                <div className="d-flex justify-content-center">
                  <button type="button" className="btn btn-primary px-5">ENVIAR</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
