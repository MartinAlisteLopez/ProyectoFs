import PageShell from '../components/PageShell.jsx';

export default function About() {
  return (
    <PageShell>
      <section className="about_section layout_padding">
        <div className="container">
          <div className="custom_heading-container">
            <h3>SOBRE NOSOTROS</h3>
          </div>
          <p className="layout_padding2-top">
            Stroms Solutions nacio hace mas de una decada, cuando un equipo de tecnicos decidio ofrecer
            servicios electricos confiables para hogares y empresas. Hoy seguimos creciendo con la misma
            mision: seguridad, rapidez y calidad en cada trabajo.
          </p>
          <div className="img-box layout_padding2">
            <img src="/images/about-img.jpg" alt="Sobre nosotros" />
          </div>
          <p className="layout_padding2-bottom">
            Nuestro equipo se mantiene actualizado en normativas y certificaciones para entregar
            instalaciones, mantenimientos y reparaciones de primer nivel. Estamos listos para tu siguiente
            proyecto.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
