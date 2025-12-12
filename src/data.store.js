
import { productApi, cartApi, userApi } from './api.js';

const PRODUCT_KEY = 'stroms-products-cache';
const CART_KEY = 'stroms-cart-v1';

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
if (!readLS(CART_KEY, null)) writeLS(CART_KEY, []);
let cachedProducts = readLS(PRODUCT_KEY, []);
const notifyCart = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cart:updated'));
  }
};

export const DataStore = {
  // Productos
  async fetchProducts() {
    const { data } = await productApi.get('/all'); 
    cachedProducts = data;
    writeLS(PRODUCT_KEY, cachedProducts);
    return data;
  },
  async createProduct(payload) {
    const { data } = await productApi.post('/add', payload);
    await this.fetchProducts();
    return data;
  },
  async updateProduct(id, payload) {
    const { data } = await productApi.put(`/update?id=${id}`, payload);
    await this.fetchProducts();
    return data;
  },
  async deleteProduct(id) {
    await productApi.delete(`/delete?id=${id}`);
    await this.fetchProducts();
  },
  listCached() {
    return cachedProducts;
  },
  listByCategory(category) {
    return cachedProducts.filter(p => p.category === category);
  },
  listOffers() {
    return cachedProducts.filter(p => p.onSale);
  },
  search(term) {
    const q = (term || '').toLowerCase();
    return cachedProducts.filter(p =>
      (p.name || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    );
  },
  get(id) {
    return cachedProducts.find(p => p.id === Number(id));
  },

  // Ordenes (llama al microservicio de carrito)
  async createOrder(items) {

    const user = AuthStore.current();
    if (!user) throw new Error("Debe iniciar sesión para finalizar la compra.");

    const body = {
        idUsuario: idUsuario, // usammos id temporal por ahora
        fechaCreacion: new Date().toISOString().slice(0, 10), // (YYYY-MM-DD)
        
        items: items.map(it => ({
            idProducto: it.productId || it.id, // Mapea a idProducto
            cantidad: it.qty || 1, // Mapea a cantidad
            precioUnitario: it.price || 0 // Mapea a precioUnitario
        })),
    };

    const carritoCreado = await cartApi.post('/add', body);
    const idCarrito = carritoCreado.data.idCarrito; // obtener id q el backend asignó

    // llama al endpoint de finalizar compra
    const { data } = await cartApi.post(`/comprar/${idCarrito}`); // Endpoint de Carrito

    return data;
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
