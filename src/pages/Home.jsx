import { useEffect, useState } from 'react';
import SiteHeader from '../components/SiteHeader.jsx';

const slides = [
  {
    id: 'soluciones',
    title: ['Stroms', 'Solutions'],
    highlight: 'Eléctricos',
    text: 'Instalación y reparación eléctrica a la puerta de tu casa o negocio. ¡Contáctanos hoy mismo!',
    image: '/images/logo.png',
    alt: 'Stroms Solutions logo'
  },
  {
    id: 'blogs',
    title: ['Stroms', 'Solutions'],
    highlight: 'Blogs',
    text: 'Lee nuestros blogs y mantente informado sobre las últimas tendencias y consejos en el mundo de la electricidad.',
    image: '/images/index-blog-img.png',
    alt: 'Blog destacado'
  },
  {
    id: 'servicios',
    title: ['Stroms', 'Solutions'],
    highlight: 'Servicios',
    text: 'Servicios eléctricos profesionales y confiables para tu hogar o negocio. ¡Contáctanos hoy mismo!',
    image: '/images/slider-img.jpg',
    alt: 'Servicios eléctricos'
  }
];

const services = [
  { id: 'instalaciones', title: 'Instalaciones', text: 'De todo tipo de sistemas eléctricos.', image: '/images/s-1.jpg' },
  { id: 'cableado', title: 'Cableado en tubos', text: 'Para instalaciones seguras y eficientes.', image: '/images/s-2.jpg' },
  { id: 'reparaciones', title: 'Reparaciones', text: 'De todo tipo de electrodomésticos.', image: '/images/s-3.jpg' },
  { id: 'paneles', title: 'Paneles Solares', text: 'Instalación y mantenimiento.', image: '/images/solar-panel.png' }
];

const workSteps = [
  { id: 'solicita', title: 'Solicita tu servicio', image: '/images/w-1.png' },
  { id: 'tecnico', title: 'Enviamos un técnico', image: '/images/w-2.png' },
  { id: 'confirma', title: 'Confirmamos el trabajo', image: '/images/w-3.png' },
  { id: 'completado', title: 'Servicio completado', image: '/images/w-4.png' }
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide(i => (i + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, []);

  // Activa animaciones al hacer scroll
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal'));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const changeSlide = (delta) => {
    setActiveSlide(i => {
      const next = i + delta;
      if (next < 0) return slides.length - 1;
      if (next >= slides.length) return 0;
      return next;
    });
  };

  return (
    <div>
      <div className="hero_area" id="top">
        <SiteHeader />

        <section className="slider_section position-relative reveal visible">
          <div className="carousel slide">
            <div className="carousel-inner">
              {slides.map((slide, idx) => (
                <div className={`carousel-item ${idx === activeSlide ? 'active' : ''}`} key={slide.id}>
                  <div className="slider_item-box layout_padding2">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="img-box">
                            <div>
                              <img src={slide.image} alt={slide.alt} />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="detail-box">
                            <div>
                              <h1>
                                {slide.title[0]} <br />
                                {slide.title[1]} <br />
                                <span>{slide.highlight}</span>
                              </h1>
                              <p>{slide.text}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="container">
            <div className="slider_nav-box">
              <div className="btn-box">
                <a href="#blogs">
                  Leer más
                </a>
                <hr />
              </div>
              <div className="custom_carousel-control">
                <button
                  className="carousel-control-prev carousel-control-btn"
                  onClick={() => changeSlide(-1)}
                  aria-label="Anterior"
                >
                  ‹
                </button>
                <button
                  className="carousel-control-next carousel-control-btn"
                  onClick={() => changeSlide(1)}
                  aria-label="Siguiente"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="bg">
        <section className="about_section layout_padding reveal" id="about">
          <div className="container">
            <div className="custom_heading-container">
              <h3>SOBRE NOSOTROS</h3>
            </div>
            <p className="layout_padding2-top">
              La historia de Stroms Solutions comenzó hace más de una década, cuando un grupo de técnicos eléctricos
              apasionados decidió unir sus conocimientos y experiencia para crear una empresa que ofreciera servicios
              eléctricos de alta calidad y confiabilidad.
            </p>
            <div className="img-box layout_padding2">
              <img src="/images/about-img.jpg" alt="Sobre nosotros" />
            </div>
            <p className="layout_padding2-bottom">
              Te invitamos a leer más sobre nuestra historia, misión y valores. Descubre cómo Stroms Solutions se ha
              convertido en una empresa de confianza para miles de clientes que buscan soluciones eléctricas
              profesionales y eficientes.
            </p>
          </div>
          <div className="container">
            <div className="btn-box">
              <a href="#about">
                Leer más
              </a>
              <hr />
            </div>
          </div>
        </section>

        <section className="service_section layout_padding-bottom reveal" id="services">
          <div className="container">
            <div className="custom_heading-container">
              <h3>NUESTROS SERVICIOS</h3>
            </div>
            <p>
              Ofrecemos una amplia gama de servicios eléctricos, desde instalaciones y reparaciones hasta mantenimiento
              preventivo y soluciones personalizadas.
            </p>
            <div className="service_container">
              <div className="row">
                {services.map((s, idx) => (
                  <div className="col-md-3" key={s.id}>
                    <div className={`box b-${idx + 1}`}>
                      <div className="img-box">
                        <img src={s.image} alt={s.title} />
                      </div>
                      <div className="detail-box">
                        <h6>{s.title}</h6>
                        <p>{s.text}</p>
                        <div className="btn-box">
                          <a href="#services">Leer más</a>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="work_section layout_padding reveal" id="products">
          <div className="container">
            <div className="custom_heading-container">
              <h3>COMO FUNCIONAMOS</h3>
            </div>
          </div>
          <div className="work_container">
            {workSteps.map(step => (
              <div className={`box b-${step.id}`} key={step.id}>
                <div className="img-box">
                  <img src={step.image} alt={step.title} />
                </div>
                <div className="name">
                  <h6>{step.title}</h6>
                </div>
              </div>
            ))}
          </div>
          <div className="container">
            <div className="btn-box">
              <a href="#services">
                Leer más
              </a>
              <hr />
            </div>
          </div>
        </section>

        <section className="contact_section layout_padding reveal" id="contact">
          <div className="custom_heading-container">
            <h3>Contáctanos</h3>
          </div>
          <div className="container layout_padding2-top">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <form>
                  <div>
                    <input type="text" placeholder="NOMBRE" />
                  </div>
                  <div>
                    <input type="email" placeholder="CORREO ELECTRÓNICO" />
                  </div>
                  <div>
                    <input type="text" placeholder="NÚMERO DE TELÉFONO" />
                  </div>
                  <div>
                    <select defaultValue="">
                      <option value="" disabled>TIPO DE SERVICIO</option>
                      <option value="instalacion">Instalación</option>
                      <option value="reparacion">Reparación</option>
                      <option value="mantencion">Mantención</option>
                    </select>
                  </div>
                  <div>
                    <input type="text" className="message-box" placeholder="MENSAJE" />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="button">
                      ENVIAR
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="client_section layout_padding-bottom reveal" id="blogs">
          <div className="container">
            <div className="custom_heading-container">
              <h3>Qué dicen los clientes</h3>
            </div>
            <div className="layout_padding2-top">
              <div className="client_container">
                <div className="detail-box">
                  <p>
                    Los llamé para una reparación de emergencia en mi hogar y llegaron rápidamente. El técnico fue
                    profesional y resolvió el problema en poco tiempo. Los precios fueron razonables. ¡Muy recomendable!
                  </p>
                </div>
                <div className="client_id">
                  <div className="img-box">
                    <img src="/images/client.png" alt="Cliente" />
                  </div>
                  <div className="name">
                    <h5>Juan Pérez</h5>
                    <h6>Cliente</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="info_section layout_padding reveal">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="info-logo">
                  <h2>Stroms Solutions</h2>
                  <p>
                    Empresa con largo recorrido y experiencia en el sector de las reparaciones y la instalación de
                    servicios eléctricos, a gran y pequeña escala.
                  </p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-nav">
                  <h4>Navegación</h4>
                  <ul>
                    <li><a href="#top">Inicio</a></li>
                    <li><a href="#about">Nosotros</a></li>
                    <li><a href="#services">Servicios</a></li>
                    <li><a href="#contact">Contacto</a></li>
                    <li><a href="#login">Iniciar Sesión</a></li>
                    <li><a href="#signup">Crear Cuenta</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-contact">
                  <h4>Información de contacto</h4>
                  <div className="location">
                    <h6>Dirección Corporativa:</h6>
                    <a href="https://maps.google.com/?q=Alvarez+2336+Vi%C3%B1a+del+Mar" target="_blank" rel="noreferrer">
                      <img src="/images/location.png" alt="" />
                      <span>Álvarez 2336, Viña del Mar</span>
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
                  <h4>Descubre más sobre nosotros</h4>
                  <ul>
                    <li><a href="#services">Certificaciones</a></li>
                    <li><a href="#blogs">Blogs</a></li>
                    <li><a href="#about">Nuestra historia</a></li>
                    <li><a href="#contact">Contáctanos</a></li>
                  </ul>
                  <div className="social-box">
                    <a href="#"><img src="/images/facebook.png" alt="Facebook" /></a>
                    <a href="#"><img src="/images/twitter.png" alt="Twitter" /></a>
                    <a href="#"><img src="/images/google-plus.png" alt="Google Plus" /></a>
                    <a href="#"><img src="/images/linkedin.png" alt="LinkedIn" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-fluid footer_section">
          <p>
            Copyright © 2025 Todos los derechos reservados por
            {' '}
            <a href="https://html.design/">Stroms Solutions</a>
          </p>
        </section>
      </div>
    </div>
  );
}
