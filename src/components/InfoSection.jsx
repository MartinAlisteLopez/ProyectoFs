export default function InfoSection() {
  return (
    <section className="info_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="info-logo">
              <h2>Stroms Solutions</h2>
              <p>
                Empresa con largo recorrido y experiencia en reparaciones e instalaciones electricas,
                a gran y pequena escala.
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="info-nav">
              <h4>Navegacion</h4>
              <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/about">Nosotros</a></li>
                <li><a href="/services">Servicios</a></li>
                <li><a href="/contact">Contacto</a></li>
                <li><a href="/blogs">Blogs</a></li>
                <li><a href="/products">Contratos</a></li>
                <li><a href="/login">Iniciar Sesion</a></li>
                <li><a href="/signup">Crear Cuenta</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <div className="info-contact">
              <h4>Informacion de contacto</h4>
              <div className="location">
                <h6>Direccion Corporativa:</h6>
                <a href="#">
                  <img src="/images/location.png" alt="" />
                  <span>Alvarez 2336, Vina del Mar</span>
                </a>
              </div>
              <div className="call">
                <h6>Servicio al Cliente:</h6>
                <a href="tel:+56912345678">
                  <img src="/images/telephone.png" alt="" />
                  <span>( +569 12345678 )</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="discover">
              <h4>Descubre mas sobre nosotros</h4>
              <ul>
                <li><a href="/services">Certificaciones</a></li>
                <li><a href="/blogs">Blogs</a></li>
                <li><a href="/about">Nuestra historia</a></li>
                <li><a href="/contact">Contactanos</a></li>
              </ul>
              <div className="social-box">
                <a href="#"><img src="/images/facebook.png" alt="" /></a>
                <a href="#"><img src="/images/twitter.png" alt="" /></a>
                <a href="#"><img src="/images/google-plus.png" alt="" /></a>
                <a href="#"><img src="/images/linkedin.png" alt="" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
