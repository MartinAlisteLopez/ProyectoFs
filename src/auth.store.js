/**
 * Manejo de usuarios y sesión en localStorage/sessionStorage.
 * Replica la lógica de los HTML originales (usuario admin por defecto, validaciones básicas).
 */
const USERS_KEY = 'usuarios';
const SESSION_KEY = 'usuarioActual';

const adminDefault = {
  run: '12345678',
  nombre: 'Administrador',
  apellidos: 'del Sistema',
  fechaNacimiento: '1990-01-01',
  region: 'Metropolitana de Santiago',
  comuna: 'Santiago',
  direccion: 'Dirección administrativa',
  correo: 'admin@duoc.cl',
  contrasena: 'admin123',
  rol: 'administrador'
};

function ensureSeed() {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify([adminDefault]));
    return [adminDefault];
  }
  try {
    const parsed = JSON.parse(raw);
    if (!parsed.find(u => u.correo === adminDefault.correo)) {
      parsed.push(adminDefault);
      localStorage.setItem(USERS_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify([adminDefault]));
    return [adminDefault];
  }
}

const validarRUN = (run) => /^[0-9]{7,9}$/.test(run);
const validarCorreo = (correo) => correo.length <= 100 && /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo);
const validarLongitud = (texto, min, max) => texto.length >= min && texto.length <= max;

export const AuthStore = {
  register(user) {
    const users = ensureSeed();
    if (!validarRUN(user.run)) throw new Error('RUN inválido. Debe tener entre 7 y 9 dígitos, sin puntos ni guion.');
    if (!validarLongitud(user.nombre, 1, 50)) throw new Error('El nombre debe tener máximo 50 caracteres.');
    if (!validarLongitud(user.apellidos, 1, 100)) throw new Error('Los apellidos deben tener máximo 100 caracteres.');
    if (!validarCorreo(user.correo)) throw new Error('Correo inválido. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com (máx. 100 caracteres).');
    if (!validarLongitud(user.contrasena, 4, 10)) throw new Error('La contraseña debe tener entre 4 y 10 caracteres.');
    if (user.direccion?.length > 300) throw new Error('La dirección debe tener máximo 300 caracteres.');

    if (users.some(u => u.run === user.run)) throw new Error('RUN ya registrado.');
    if (users.some(u => u.correo === user.correo)) throw new Error('Correo ya registrado.');

    const newUser = { ...user, rol: 'cliente' };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
  },
  login(correo, contrasena) {
    const users = ensureSeed();
    if (!validarCorreo(correo)) throw new Error('Correo inválido. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com (máx. 100 caracteres).');
    if (!validarLongitud(contrasena, 4, 10)) throw new Error('La contraseña debe tener entre 4 y 10 caracteres.');
    const user = users.find(u => u.correo === correo && u.contrasena === contrasena);
    if (!user) throw new Error('Correo o contraseña incorrectos.');
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },
  logout() {
    sessionStorage.removeItem(SESSION_KEY);
  },
  current() {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }
};
