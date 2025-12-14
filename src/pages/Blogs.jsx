import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell.jsx';

const posts = [
  {
    id: 1,
    title: 'Precauciones al manipular aparatos electricos',
    excerpt: 'Conoce las principales medidas de seguridad antes de trabajar con instalaciones electricas.',
    image: '/images/Aparato%20electrico.jpg',
    to: '/blog1'
  },
  {
    id: 2,
    title: 'Tendencias en el mundo electrico 2025',
    excerpt: 'Innovaciones en energia solar, movilidad electrica y automatizacion del hogar.',
    image: '/images/Tendencia%20electrica.jpg',
    to: '/blog2'
  }
];

export default function Blogs() {
  return (
    <PageShell>
      <section className="blog-hero">
        <div className="container">
          <p className="hero-kicker">Noticias</p>
          <h2 className="hero-title">Nuestros Blogs</h2>
          <div className="hero-underline"></div>
        </div>
      </section>

      <section className="layout_padding">
        <div className="container">
          <div className="blog-grid">
            {posts.map(post => (
              <div className="blog-card" key={post.id}>
                <img src={post.image} alt={post.title} />
                <div className="card-body">
                  <h5>{post.title}</h5>
                  <p>{post.excerpt}</p>
                  <Link className="btn btn-primary btn-sm" to={post.to}>Leer articulo</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
