import PageShell from '../components/PageShell.jsx';

const services = [
  { id: 'sec', title: 'Certificacion SEC', desc: 'Certificacion profesional de instalaciones electricas.', image: '/images/Sec.jpg' },
  { id: 'domicilio', title: 'Instalacion domiciliaria', desc: 'Instalaciones electricas seguras en tu hogar.', image: '/images/5.jpg' },
  { id: 'fallas', title: 'Fallas y reparaciones', desc: 'Reparacion rapida y efectiva en tu domicilio.', image: '/images/frames-for-your-heart-iOLHAIaxpDA-unsplash.jpg' },
  { id: 'mantenciones', title: 'Mantenciones', desc: 'Mantenimiento preventivo y correctivo para empresa o hogar.', image: '/images/raze-solar-GXLPLG3_Vf4-unsplash.jpg' },
  { id: 'paneles', title: 'Instalacion de paneles solares', desc: 'Diseño e instalacion de sistemas solares certificados.', image: '/images/panel-solar.jpeg' },
  { id: 'tubos', title: 'Cableado en tubos', desc: 'Canalizacion segura y ordenada para circuitos electricos.', image: '/images/cable-electrico.webp' },
  { id: '24_7', title: 'Servicio electrico 24/7', desc: 'Atencion de emergencias electricas a toda hora.', image: '/images/24.7.jpg' },
  { id: 'certificado', title: 'Electricista certificado', desc: 'Trabajo seguro y garantizado por profesionales.', image: '/images/Domicilio.jpg' },
  { id: 'iluminacion', title: 'Iluminacion interior y exterior', desc: 'Diseno e instalacion de sistemas de iluminacion.', image: '/images/Luminica.jpg' },
  { id: 'articulos', title: 'Instalacion de articulos', desc: 'Instalamos artefactos electricos en casa u oficina.', image: '/images/roger-starnes-sr-VUuBpG5avLY-unsplash.jpg' },
  { id: 'automatizacion', title: 'Automatizacion residencial', desc: 'Modernizacion con domotica para tu hogar.', image: '/images/Automatizacion.jpg' }
];

export default function Services() {
  return (
    <PageShell>
      <section className="blog-hero">
        <div className="container">
          <p className="hero-kicker">Servicios</p>
          <h2 className="hero-title">Servicios especializados</h2>
          <div className="hero-underline"></div>
        </div>
      </section>

      <section className="layout_padding">
        <div className="container">
          <div className="row">
            {services.map((service, idx) => (
              <div className="col-md-6 col-lg-4 layout_padding2-bottom" key={service.id}>
                <div className="service-card h-100">
                  <div className="img-box">
                    <img src={service.image} alt={service.title} />
                  </div>
                  <div className="detail-box">
                    <h6>{service.title}</h6>
                    <p>{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
