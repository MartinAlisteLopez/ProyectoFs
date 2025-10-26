
/**
 * Fuente de datos simulada con CRUD y persistencia simple en localStorage
 */
const KEY = 'dsy1104-products-v1';
const CART_KEY = 'dsy1104-cart-v1';

const seed = [
  { id: 1, name: 'Audífonos Pro', category: 'Audio', price: 49990, onSale: true },
  { id: 2, name: 'Teclado Mecánico', category: 'Periféricos', price: 69990, onSale: false },
  { id: 3, name: 'Mouse Gamer', category: 'Periféricos', price: 29990, onSale: true },
  { id: 4, name: 'Monitor 24"', category: 'Pantallas', price: 129990, onSale: false }
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

// Init products
if (!readLS(KEY, null)) writeLS(KEY, seed);
// Init cart
if (!readLS(CART_KEY, null)) writeLS(CART_KEY, []);

export const DataStore = {
  // CRUD Productos
  list() { return readLS(KEY, []); },
  get(id) { return this.list().find(p => p.id === Number(id)); },
  create(product) {
    const items = this.list();
    const nextId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
    const toInsert = { id: nextId, ...product };
    writeLS(KEY, [...items, toInsert]);
    return toInsert;
  },
  update(id, changes) {
    const items = this.list();
    const idx = items.findIndex(p => p.id === Number(id));
    if (idx === -1) return null;
    const updated = { ...items[idx], ...changes };
    items[idx] = updated;
    writeLS(KEY, items);
    return updated;
  },
  remove(id) {
    const items = this.list().filter(p => p.id !== Number(id));
    writeLS(KEY, items);
  },

  // Carrito
  cartList() { return readLS(CART_KEY, []); },
  cartAdd(productId) {
    const cart = this.cartList();
    const existing = cart.find(i => i.productId === Number(productId));
    if (existing) existing.qty += 1;
    else cart.push({ productId: Number(productId), qty: 1 });
    writeLS(CART_KEY, cart);
  },
  cartRemove(productId) {
    let cart = this.cartList().filter(i => i.productId !== Number(productId));
    writeLS(CART_KEY, cart);
  },
  cartClear() { writeLS(CART_KEY, []); }
};
