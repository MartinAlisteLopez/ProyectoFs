
export default function ProductCard({ product, onAdd }) {
  const price = Number(product?.price) || 0;

  return (
    <div className="card h-100 card-product">
      <div className="card-body">
        <h5 className="card-title">{product?.name}</h5>
        <p className="card-text small text-muted">{product?.category}</p>
        <p className="fw-bold">${price.toFixed(2)}</p>
        <button className="btn btn-sm btn-primary" onClick={() => onAdd && onAdd(product)}>Agregar</button>
      </div>
    </div>
  );
}
