import axios from 'axios';

// API USUARIOS
export const userApi = axios.create({
    baseURL: import.meta.env.VITE_USERS_API_URL || 'http://34.198.83.45:8081/api/v1/usuarios',
});

// API PRODUCTOS
export const productApi = axios.create({
    baseURL: import.meta.env.VITE_PRODUCTS_API_URL || 'http://98.92.75.216:8082/api/v1/productos',
});

// API CARRITO
export const cartApi = axios.create({
    baseURL: import.meta.env.VITE_CARTS_API_URL || 'http://3.235.239.128:8084/api/v1/carrito',
});

