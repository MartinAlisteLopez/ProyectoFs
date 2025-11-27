export default function ProductCard({ product, onAdd }) {
  const { name, price, description, onSale, image } = product;

  return (
    <div className="card h-100">
      {image && <img src={image} className="card-img-top" alt={name} />}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title d-flex align-items-center justify-content-between">
          <span>{name}</span>
          {onSale && <span className="badge bg-danger">Oferta</span>}
        </h5>
        <p className="card-text text-muted small flex-grow-1">{description}</p>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <strong>${Number(price || 0).toLocaleString('es-CL')}</strong>
          <button className="btn btn-sm btn-primary" onClick={() => onAdd(product)}>Agregar</button>
        </div>
      </div>
    </div>
  );
}
