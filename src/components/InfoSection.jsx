export default function InfoSection() {
  return (
    <section className="info_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="info-logo">
              <h2>Stroms Solutions</h2>
              <p>
                Es una empresa con largo recorrido y experiencia en el sector de las reparaciones y la instalación de servicios eléctricos, a gran y pequeña escala.
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="info-nav">
              <h4>Navegación</h4>
              <ul>
                <li><a href="/#top">Inicio</a></li>
                <li><a href="/#about">Nosotros</a></li>
                <li><a href="/#services">Servicios</a></li>
                <li><a href="/#contact">Contacto</a></li>
                <li><a href="/login">Iniciar Sesión</a></li>
                <li><a href="/signup">Crear Cuenta</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <div className="info-contact">
              <h4>Información de contacto</h4>
              <div className="location">
                <h6>Dirección Corporativa:</h6>
                <a href="">
                  <img src="/images/location.png" alt="" />
                  <span>Álvarez 2336, Viña del Mar</span>
                </a>
              </div>
              <div className="call">
                <h6>Servicio al Cliente:</h6>
                <a href="">
                  <img src="/images/telephone.png" alt="" />
                  <span>( +569 12345678 )</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="discover">
              <h4>Descubre más sobre nosotros</h4>
              <ul>
                <li><a href="">Certificaciones</a></li>
                <li><a href="">Blogs</a></li>
                <li><a href="/#about">Nuestra historia</a></li>
                <li><a href="/#contact">Contáctanos</a></li>
              </ul>
              <div className="social-box">
                <a href=""><img src="/images/facebook.png" alt="" /></a>
                <a href=""><img src="/images/twitter.png" alt="" /></a>
                <a href=""><img src="/images/google-plus.png" alt="" /></a>
                <a href=""><img src="/images/linkedin.png" alt="" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
