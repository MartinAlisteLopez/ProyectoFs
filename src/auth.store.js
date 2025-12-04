/**
 * Manejo de usuarios y sesión en localStorage/sessionStorage.
 * Replica la lógica de los HTML originales (usuario admin por defecto, validaciones básicas).
 */
import api from './api.js';
const SESSION_KEY = 'usuarioActual';
const TOKEN_KEY = 'auth_token';

export const AuthStore = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  async register(user) {
    const payload = {
      name: user.nombre,
      email: user.correo,
      password: user.contrasena
    };
    await api.post('/auth/register', payload);
  },
  async login(correo, contrasena) {
    const { data } = await api.post('/auth/login', { email: correo, password: contrasena });
    const current = { email: correo, roles: data.roles || [] };
    localStorage.setItem(TOKEN_KEY, data.token);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(current));
    return current;
  },
  logout() {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },
  current() {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }
};
