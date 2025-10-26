// LOGICA APLICACION PRINCIPAL


// CARGA DE DATOS BASE

// Cargar regiones en crearCuenta.html
function cargarRegiones() {
    const selectRegion = document.getElementById('region');
    
    // Limpiar opciones existentes
    while (selectRegion.options.length > 1) {
        selectRegion.remove(1);
    }
    
    // Llenar con regiones desde data.js
    for (const region in regionesYComunas) {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        selectRegion.appendChild(option);
    }
}

// Cargar comunas segun la region elegida
function cargarComunas() {
    const selectRegion = document.getElementById('region');
    const selectComuna = document.getElementById('comuna');
    const regionSeleccionada = selectRegion.value;
    
    // Limpiar select
    selectComuna.innerHTML = '';
    
    if (regionSeleccionada) {
        // Habilitar select de comuna
        selectComuna.disabled = false;
        
        // Crear opción por defecto
        const opcionDefault = document.createElement('option');
        opcionDefault.value = '';
        opcionDefault.textContent = 'Seleccione una comuna';
        opcionDefault.disabled = true;
        opcionDefault.selected = true;
        selectComuna.appendChild(opcionDefault);
        
        // Llenar con las comunas de la región seleccionada
        const comunas = regionesYComunas[regionSeleccionada];
        comunas.forEach(comuna => {
            const option = document.createElement('option');
            option.value = comuna;
            option.textContent = comuna;
            selectComuna.appendChild(option);
        });
    } else {
        // Por si no se puso ninguna region
        selectComuna.disabled = true;
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Primero seleccione una región';
        option.disabled = true;
        option.selected = true;
        selectComuna.appendChild(option);
    }
}



// Verificar y mostrar estado de sesión
function actualizarEstadoSesion() {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    
    // VERIFICAR SI LOS ELEMENTOS EXISTEN ANTES DE ACCEDER A ELLOS
    if (userMenu && userName) {
        if (usuarioActual) {
            // Mostrar menu usuario
            userMenu.style.display = 'flex';
            userName.textContent = `Hola, ${usuarioActual.nombre}`;
            
            // Ocultar opciones inicio de sesion y rtegistro
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            navLinks.forEach(link => {
                if (link.textContent.includes('Iniciar Sesión') || 
                    link.textContent.includes('Crear Cuenta')) {
                    link.parentElement.style.display = 'none';
                }
            });
        } else {
            // Ocultar menu usuario
            userMenu.style.display = 'none';
        }
    }
    //si no existen entonces no se hace nada
}

// Función cerrar sesión
function cerrarSesion() {
    sessionStorage.removeItem('usuarioActual');
    alert('Sesión cerrada correctamente');
    window.location.href = 'index.html';
}



// REGISTRO DE USUARIOS

// Registrar usuario
function registrarUsuario(event) {
    event.preventDefault();
    
    // Obtener valores formulario
    const run = document.getElementById('run').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const fechaNacimientoInput = document.getElementById('fechaNacimiento').value; // opcional
    const region = document.getElementById('region').value;
    const comuna = document.getElementById('comuna').value;
    const direccion = document.getElementById('direccion').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const contrasena = document.getElementById('contrasena').value;
    
    // Formatear fecha si se ingresó
    const fechaNacimiento = formatearFechaParaAlmacenamiento(fechaNacimientoInput);

    // Validaciones
    if (!validarRUN(run)) {
        alert('RUN inválido. Debe tener entre 7 y 9 dígitos, sin puntos ni guión.');
        return;
    }
    
    if (!validarLongitud(nombre, 1, 50)) {
        alert('El nombre debe tener máximo 50 caracteres.');
        return;
    }
    
    if (!validarLongitud(apellidos, 1, 100)) {
        alert('Los apellidos deben tener máximo 100 caracteres.');
        return;
    }
    
    if (!validarCorreo(correo)) {
        alert('Correo electrónico inválido. Solo se permiten @duoc.cl, @profesor.duoc.cl y @gmail.com (máx. 100 caracteres).');
        return;
    }
    
    if (direccion.length > 300) {
        alert('La dirección debe tener máximo 300 caracteres.');
        return;
    }
    
    if (!validarLongitud(contrasena, 4, 10)) {
        alert('La contraseña debe tener entre 4 y 10 caracteres.');
        return;
    }
    
    // Crear objeto usuario (rol por defecto: cliente)
    const usuario = {
        run,
        nombre,
        apellidos,
        fechaNacimiento: fechaNacimiento || null, // Fecha opcional
        region,
        comuna,
        direccion,
        correo,
        contrasena,
        rol: 'cliente' // Rol por defecto
    };
    
    // Obtener usuarios existentes o inicializar array vacío
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Verificar si el RUN ya está registrado
    if (usuarios.some(u => u.run === run)) {
        alert('RUN ya registrado.');
        return;
    }
    
    // Verificar si el correo ya está registrado
    if (usuarios.some(u => u.correo === correo)) {
        alert('Correo ya registrado.');
        return;
    }
    
    // Agregar y guardar el usuario nuevo
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    alert('Cuenta creada exitosamente.');
    window.location.href = 'iniciarSesion.html';
}


// -------------------------------------------------------------------------


//  Iniciar sesion
function iniciarSesion(event) {
    event.preventDefault();
    
    // Obtener valores del formulario
    const correo = document.getElementById('correoLogin').value.trim();
    const contrasena = document.getElementById('contrasenaLogin').value;
    
    // Validaciones
    if (!validarCorreo(correo)) {
        alert('Correo electrónico inválido. Solo se permiten @duoc.cl, @profesor.duoc.cl y @gmail.com (máx. 100 caracteres).');
        return;
    }
    
    if (!validarLongitud(contrasena, 4, 10)) {
        alert('La contraseña debe tener entre 4 y 10 caracteres.');
        return;
    }
    
    // Obtener usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Buscar usuario con datos ingresados
    const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
    
    if (usuario) {
        alert('Inicio de sesión exitoso.');
        // Guardar usuario en sessionStorage
        sessionStorage.setItem('usuarioActual', JSON.stringify(usuario));
        
        // Redirigir según el rol
        if (usuario.rol === 'administrador') {
            window.location.href = 'admin.html'; // Página de administración
        } else {
            window.location.href = 'index.html'; // Página principal para clientes
        }
    } else {
        alert('Correo o contraseña incorrectos.');
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    // Verificar y mostrar estado de sesión
    actualizarEstadoSesion();
    
    // Configurar botón de cierre de sesión
    if (document.getElementById('btnCerrarSesion')) {
        document.getElementById('btnCerrarSesion').addEventListener('click', cerrarSesion);
    }

    // Página registro
    if (document.getElementById('region')) {
        cargarRegiones();
        document.getElementById('region').addEventListener('change', cargarComunas);
        document.getElementById('formularioRegistro').addEventListener('submit', registrarUsuario);
    }
    
    // Página inicio sesión
    if (document.getElementById('formularioLogin')) {
        document.getElementById('formularioLogin').addEventListener('submit', iniciarSesion);
    }

});


// Formatear fecha de DD/MM/AAAA a AAAA-MM-DD
function formatearFechaParaAlmacenamiento(fechaTexto) {
    if (!fechaTexto.trim()) return null;
    
    // Convertir DD/MM/AAAA a AAAA-MM-DD
    const partes = fechaTexto.split('/');
    if (partes.length === 3) {
        const dia = partes[0].padStart(2, '0');
        const mes = partes[1].padStart(2, '0');
        const anio = partes[2];
        return `${anio}-${mes}-${dia}`;
    }
    
    return fechaTexto;
}