/**
 * Fuente de datos simulada con persistencia en localStorage.
 * Maneja catálogo de productos y carrito.
 */
const PRODUCT_KEY = 'stroms-products-v1';
const CART_KEY = 'stroms-cart-v1';

const seedProducts = [
  { id: 1, name: 'Kit instalación básica', category: 'Instalaciones', price: 49990, onSale: true, stock: 10, description: 'Instalación eléctrica residencial estándar.', image: '/images/s-1.jpg' },
  { id: 2, name: 'Cableado en tubos', category: 'Cableado', price: 89990, onSale: false, stock: 8, description: 'Cableado seguro para oficinas y locales.', image: '/images/s-2.jpg' },
  { id: 3, name: 'Reparación electrodomésticos', category: 'Reparaciones', price: 29990, onSale: true, stock: 25, description: 'Diagnóstico y reparación rápida.', image: '/images/s-3.jpg' },
  { id: 4, name: 'Panel solar residencial', category: 'Paneles Solares', price: 249990, onSale: false, stock: 5, description: 'Instalación y mantenimiento de paneles solares.', image: '/images/solar-panel.png' }
];

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// inicialización
if (!readLS(PRODUCT_KEY, null)) writeLS(PRODUCT_KEY, seedProducts);
if (!readLS(CART_KEY, null)) writeLS(CART_KEY, []);

const nextId = (items) => (items.length ? Math.max(...items.map(p => p.id)) + 1 : 1);
const notifyCart = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cart:updated'));
  }
};

export const DataStore = {
  // CRUD productos
  list() {
    return readLS(PRODUCT_KEY, []);
  },
  listByCategory(category) {
    return this.list().filter(p => p.category === category);
  },
  listOffers() {
    return this.list().filter(p => p.onSale);
  },
  search(term) {
    const q = (term || '').toLowerCase();
    return this.list().filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    );
  },
  get(id) {
    return this.list().find(p => p.id === Number(id));
  },
  create(product) {
    const items = this.list();
    const productToInsert = { id: nextId(items), stock: 0, onSale: false, ...product };
    writeLS(PRODUCT_KEY, [...items, productToInsert]);
    return productToInsert;
  },
  update(id, changes) {
    const items = this.list();
    const idx = items.findIndex(p => p.id === Number(id));
    if (idx === -1) return null;
    const updated = { ...items[idx], ...changes };
    items[idx] = updated;
    writeLS(PRODUCT_KEY, items);
    return updated;
  },
  remove(id) {
    const updated = this.list().filter(p => p.id !== Number(id));
    writeLS(PRODUCT_KEY, updated);
  },

  // Carrito
  cartList() {
    return readLS(CART_KEY, []);
  },
  cartAdd(productId, qty = 1) {
    const cart = this.cartList();
    const existing = cart.find(i => i.productId === Number(productId));
    if (existing) existing.qty += qty;
    else cart.push({ productId: Number(productId), qty });
    writeLS(CART_KEY, cart);
    notifyCart();
    return cart;
  },
  cartUpdateQty(productId, qty) {
    const cart = this.cartList();
    const item = cart.find(i => i.productId === Number(productId));
    if (!item) return cart;
    item.qty = qty;
    if (item.qty <= 0) return this.cartRemove(productId);
    writeLS(CART_KEY, cart);
    notifyCart();
    return cart;
  },
  cartRemove(productId) {
    const updated = this.cartList().filter(i => i.productId !== Number(productId));
    writeLS(CART_KEY, updated);
    notifyCart();
    return updated;
  },
  cartClear() {
    writeLS(CART_KEY, []);
    notifyCart();
  }
};
