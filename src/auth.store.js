/**
 * Manejo de usuarios y sesión en localStorage/sessionStorage.
 * Replica la lógica de los HTML originales (usuario admin por defecto, validaciones básicas).
 */
import { userApi } from './api.js';

const SESSION_KEY = 'usuarioActual';
const ROL_KEY = 'user_rol'; 
const USERNAME_KEY = 'username'; 
const TOKEN_KEY = 'auth_token'; 
const ID_KEY = 'user_id';


// llama al back para obtener el rol y almacena la sesión
export async function verificarRolUsuario(username) {
    try {
        const response = await userApi.get(`/rol/${username}`);
        const rol = response.data.trim().toUpperCase(); 
        
        // almacena los datos en el navegador
        localStorage.setItem(USERNAME_KEY, username);
        localStorage.setItem(ROL_KEY, rol);
        
        return rol; 
        
    } catch (error) {
        console.error("Fallo al obtener el rol del usuario o usuario no encontrado:", error);
        // si hay error, asumimos rol cliente
        localStorage.setItem(ROL_KEY, 'CLIENTE'); 
        return 'CLIENTE'; 
    }
}



export const AuthStore = {

    // funciones de acceso rapido
    getRol() { return localStorage.getItem(ROL_KEY); },
    isLoggedIn() { return !!localStorage.getItem(USERNAME_KEY); },
    isAdmin() { return AuthStore.getRol() === 'ADMIN'; },
    getToken() { return localStorage.getItem(TOKEN_KEY); },


    async register(user) {
        const payload = {
            nombre: user.nombre,
            correo: user.correo,
            contrasena: user.contrasena
        };

        await userApi.post('/add', payload); 
    },


    async login(username, contrasena) {
        
        // 1. Verificar credenciales y obtener token
        try {
            const { data } = await userApi.post('/login', { username, contrasena });
            const idUsuario = data.idUsuario; 
            localStorage.setItem(ID_KEY, idUsuario); // guardar id del usuario  
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // error 401 del back x credenciales:
                throw new Error("Credenciales inválidas. Por favor, revisa tu correo y contraseña.");
            }
            // error de conexion o cualquier otro
            throw new Error(error.message || "Error al conectar con el servidor de autenticación.");
        }

        // 2. Obtener y almacenar el rol del usuario
        const rol = await verificarRolUsuario(username);

        // 3. Almacenar token simulado
        const current = { 
            username: username, 
            roles: [rol],
            id: idUsuario
        };
        
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(current)); 
        
        return current; 
    },

    
    // logout elimina la sesión y datos del usuario
    logout() {
        sessionStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USERNAME_KEY); 
        localStorage.removeItem(ROL_KEY);
        localStorage.removeItem(ID_KEY);
    },
    
    getId() {
        return localStorage.getItem(ID_KEY);
    },

    // current devuelve el usuario actual o null si no hay sesión
    current() {
        const username = localStorage.getItem(USERNAME_KEY);
        const rol = localStorage.getItem(ROL_KEY);

        if (!username || !rol) return null;
        
        return { 
            username: username, 
            roles: [rol] 
        }; 
    }
};