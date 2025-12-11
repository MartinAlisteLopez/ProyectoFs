import axios from 'axios';
import { AuthStore } from './auth.store.js';

// API USUARIOS
export const userApi = axios.create({
    baseURL: import.meta.env.VITE_USERS_API_URL || 'http://34.198.83.45:8081/api/v1/usuarios',
});

// API PRODUCTOS
export const productApi = axios.create({
    baseURL: import.meta.env.VITE_PRODUCTS_API_URL || 'http://34.198.83.45:8082/api/v1/productos',
});

// API CARRITO
export const cartApi = axios.create({
    baseURL: import.meta.env.VITE_CARTS_API_URL || 'http://34.198.83.45:8084/api/v1/carrito',
});

