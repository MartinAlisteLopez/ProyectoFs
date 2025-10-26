//LOGICA PANEL DE ADMIN


// EVENTOS, VERIFICACION DE USUARIO Y CARGA INICIAL DE DATOS
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está autenticado y es administrador
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
    
    if (!usuarioActual || usuarioActual.rol !== 'administrador') {
        alert('Acceso denegado. Debe ser administrador para acceder a esta página.');
        window.location.href = 'iniciarSesion.html';
        return;
    }

    // Mostrar nombre usuario
    document.getElementById('userName').textContent = `Hola, ${usuarioActual.nombre}`;

    // Cargar datos
    cargarUsuarios();
    cargarProductos();
    cargarCategorias();
    
    // Evento cerrar sesión
    document.getElementById('btnCerrarSesion').addEventListener('click', function() {
        sessionStorage.removeItem('usuarioActual');
        window.location.href = 'index.html';
    });
    
    // Eventos para usuarios
    document.getElementById('btnGuardarUsuario').addEventListener('click', crearUsuarioAdmin);
    document.getElementById('btnActualizarUsuario').addEventListener('click', actualizarUsuario);
    
    // Eventos para productos
    document.getElementById('btnGuardarProducto').addEventListener('click', crearProducto);
    document.getElementById('btnActualizarProducto').addEventListener('click', actualizarProducto);
    
    // Cargar categorías en "modales" productos
    $('#modalCrearProducto').on('show.bs.modal', function() {
        cargarCategoriasEnSelect('categoriaProducto');
    });
    
    $('#modalEditarProducto').on('show.bs.modal', function() {
        cargarCategoriasEnSelect('editCategoriaProducto');
    });


    // Cargar regiones en modal de crear usuario
    $('#modalCrearUsuario').on('show.bs.modal', function() {
        cargarRegionesEnSelect('regionAdmin');
        
        // Cargar comunas
        document.getElementById('regionAdmin').addEventListener('change', function() {
            cargarComunasEnSelect('comunaAdmin', this.value);
        });
    });

    
    // Eventos paginacion con verificacion
    // y pequeño retardo para asegurar que el DOM este listo
    // para mostrar todos los elementos
    setTimeout(() => {
        // Verificar q los elementos existan
        const btnUsuariosAnterior = document.getElementById('btnUsuariosAnterior');
        const btnUsuariosSiguiente = document.getElementById('btnUsuariosSiguiente');
        const selectUsuariosPorPagina = document.getElementById('selectUsuariosPorPagina');
        const btnProductosAnterior = document.getElementById('btnProductosAnterior');
        const btnProductosSiguiente = document.getElementById('btnProductosSiguiente');
        const selectProductosPorPagina = document.getElementById('selectProductosPorPagina');
        
        if (btnUsuariosAnterior) btnUsuariosAnterior.addEventListener('click', () => cambiarPaginaUsuarios('anterior'));
        if (btnUsuariosSiguiente) btnUsuariosSiguiente.addEventListener('click', () => cambiarPaginaUsuarios('siguiente'));
        if (selectUsuariosPorPagina) selectUsuariosPorPagina.addEventListener('change', cambiarUsuariosPorPagina);
        if (btnProductosAnterior) btnProductosAnterior.addEventListener('click', () => cambiarPaginaProductos('anterior'));
        if (btnProductosSiguiente) btnProductosSiguiente.addEventListener('click', () => cambiarPaginaProductos('siguiente'));
        if (selectProductosPorPagina) selectProductosPorPagina.addEventListener('change', cambiarProductosPorPagina);
    }, 100);

});


//-----------------------------------------------------------------------------
// VARIABLES GLOBALES PAGINACION
//-----------------------------------------------------------------------------
let paginaUsuariosActual = 1;
let usuariosPorPagina = 10;
let paginaProductosActual = 1;
let productosPorPagina = 10;

//-----------------------------------------------------------------------------
// FUNCIONES PAGINACION USUARIOS
//-----------------------------------------------------------------------------

// Cargar usuarios
function cargarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const tabla = document.getElementById('tablaUsuarios').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    
    // Calcular indices paginación
    const inicio = (paginaUsuariosActual - 1) * usuariosPorPagina;
    const fin = inicio + usuariosPorPagina;
    const usuariosPagina = usuarios.slice(inicio, fin);
    
    // Llenar tabla con usuaris de la pagina actual
    usuariosPagina.forEach(usuario => {
        const fila = tabla.insertRow();
        // CORREGIR LOS ÍNDICES SEGÚN EL ORDEN DEL HTML
        fila.insertCell(0).textContent = usuario.run;
        fila.insertCell(1).textContent = `${usuario.nombre} ${usuario.apellidos}`;
        fila.insertCell(2).textContent = usuario.fechaNacimiento || 'No especificada';
        fila.insertCell(3).textContent = usuario.region || 'No especificada';
        fila.insertCell(4).textContent = usuario.comuna || 'No especificada';
        fila.insertCell(5).textContent = usuario.direccion || 'No especificada';
        fila.insertCell(6).textContent = usuario.correo;
        fila.insertCell(7).textContent = usuario.rol;
        
        const celdaAcciones = fila.insertCell(8);
        celdaAcciones.innerHTML = `<button class="btn btn-sm btn-info mr-1" onclick="editarUsuario('${usuario.run}')">Editar</button> <button class="btn btn-sm btn-danger" onclick="eliminarUsuario('${usuario.run}')">Eliminar</button>`;
    });
    
    // Actualizar flechas paginacion
    actualizarControlesUsuarios(usuarios.length);
}

// Actualizar controles paginacion
function actualizarControlesUsuarios(totalUsuarios) {
    const totalPaginas = Math.ceil(totalUsuarios / usuariosPorPagina);
    const inicio = (paginaUsuariosActual - 1) * usuariosPorPagina + 1;
    const fin = Math.min(paginaUsuariosActual * usuariosPorPagina, totalUsuarios);
    
    // Verificar que elementos existan antes de actualizar
    const usuariosMostrados = document.getElementById('usuariosMostrados');
    const totalUsuariosSpan = document.getElementById('totalUsuarios');
    const paginaUsuariosActualSpan = document.getElementById('paginaUsuariosActual');
    const btnUsuariosAnterior = document.getElementById('btnUsuariosAnterior');
    const btnUsuariosSiguiente = document.getElementById('btnUsuariosSiguiente');
    
    if (usuariosMostrados) usuariosMostrados.textContent = `${inicio}-${fin}`;
    if (totalUsuariosSpan) totalUsuariosSpan.textContent = totalUsuarios;
    if (paginaUsuariosActualSpan) paginaUsuariosActualSpan.textContent = paginaUsuariosActual;
    if (btnUsuariosAnterior) btnUsuariosAnterior.disabled = paginaUsuariosActual <= 1;
    if (btnUsuariosSiguiente) btnUsuariosSiguiente.disabled = paginaUsuariosActual >= totalPaginas;
}

// Cambiar pagina
function cambiarPaginaUsuarios(direccion) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);
    
    if (direccion === 'siguiente' && paginaUsuariosActual < totalPaginas) {
        paginaUsuariosActual++;
    } else if (direccion === 'anterior' && paginaUsuariosActual > 1) {
        paginaUsuariosActual--;
    }
    
    cargarUsuarios();
}

// Cambiar usuarios por pagina
function cambiarUsuariosPorPagina() {
    usuariosPorPagina = parseInt(document.getElementById('selectUsuariosPorPagina').value);
    paginaUsuariosActual = 1; // volver a la primera pagina
    cargarUsuarios();
}


//-----------------------------------------------------------------------------
// FUNCIONES PAGINACION PRODUCTOS
//-----------------------------------------------------------------------------

// Cargar productos
function cargarProductos() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const tabla = document.getElementById('tablaProductos').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    
    // Calcular indices para la paginacion
    const inicio = (paginaProductosActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productos.slice(inicio, fin);
    
    // Llenar tabla solo con productos de la pagina actual
    productosPagina.forEach(producto => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = producto.codigo;
        fila.insertCell(1).textContent = producto.nombre;
        fila.insertCell(2).textContent = producto.categoria;
        fila.insertCell(3).textContent = `$${producto.precio.toLocaleString('es-CL')}`;
        fila.insertCell(4).textContent = producto.stock;
        fila.insertCell(5).textContent = producto.stockCritico || 'No definido';
        
        const celdaAcciones = fila.insertCell(6);
        celdaAcciones.innerHTML = `
            <button class="btn btn-sm btn-info mr-1" onclick="editarProducto('${producto.codigo}')">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminarProducto('${producto.codigo}')">Eliminar</button>
        `;
    });
    
    // Actualizar controles paginacion
    actualizarControlesProductos(productos.length);
}

// Actualizar controles paginacion
function actualizarControlesProductos(totalProductos) {
    const totalPaginas = Math.ceil(totalProductos / productosPorPagina);
    const inicio = (paginaProductosActual - 1) * productosPorPagina + 1;
    const fin = Math.min(paginaProductosActual * productosPorPagina, totalProductos);
    
    // Verificar que elementos existan
    const productosMostrados = document.getElementById('productosMostrados');
    const totalProductosSpan = document.getElementById('totalProductos');
    const paginaProductosActualSpan = document.getElementById('paginaProductosActual');
    const btnProductosAnterior = document.getElementById('btnProductosAnterior');
    const btnProductosSiguiente = document.getElementById('btnProductosSiguiente');
    
    if (productosMostrados) productosMostrados.textContent = `${inicio}-${fin}`;
    if (totalProductosSpan) totalProductosSpan.textContent = totalProductos;
    if (paginaProductosActualSpan) paginaProductosActualSpan.textContent = paginaProductosActual;
    if (btnProductosAnterior) btnProductosAnterior.disabled = paginaProductosActual <= 1;
    if (btnProductosSiguiente) btnProductosSiguiente.disabled = paginaProductosActual >= totalPaginas;
}

// Cambiar pagina
function cambiarPaginaProductos(direccion) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    
    if (direccion === 'siguiente' && paginaProductosActual < totalPaginas) {
        paginaProductosActual++;
    } else if (direccion === 'anterior' && paginaProductosActual > 1) {
        paginaProductosActual--;
    }
    
    cargarProductos();
}

// Cambiar productos por pagina
function cambiarProductosPorPagina() {
    productosPorPagina = parseInt(document.getElementById('selectProductosPorPagina').value);
    paginaProductosActual = 1; // volver a la primera pagina
    cargarProductos();
}


//-----------------------------------------------------------------------------
// FUNCIONES USUARIOS
//-----------------------------------------------------------------------------

// CREAR usuario
function crearUsuarioAdmin() {
    // Obtener valores formulario
    const run = document.getElementById('runAdmin').value.trim();
    const nombre = document.getElementById('nombreAdmin').value.trim();
    const apellidos = document.getElementById('apellidosAdmin').value.trim();
    const fechaNacimiento = document.getElementById('fechaNacimientoAdmin').value;
    const region = document.getElementById('regionAdmin').value;
    const comuna = document.getElementById('comunaAdmin').value;
    const direccion = document.getElementById('direccionAdmin').value.trim();
    const correo = document.getElementById('correoAdmin').value.trim();
    const contrasena = document.getElementById('contrasenaAdmin').value;
    const rol = document.getElementById('rolAdmin').value;
    
    // Validaciones (funciones de data.js)
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
    
    if (!validarLongitud(direccion, 1, 300)) {
        alert('La dirección debe tener máximo 300 caracteres.');
        return;
    }

    if (!validarLongitud(contrasena, 4, 10)) {
        alert('La contraseña debe tener entre 4 y 10 caracteres.');
        return;
    }

    if (!region || !comuna) {
        alert('Debe seleccionar región y comuna.');
        return;
    }


    // Crear objeto usuario
    const usuario = {
        run,
        nombre,
        apellidos,
        fechaNacimiento: fechaNacimiento || null, // opcional
        region,
        comuna,
        direccion,
        correo,
        contrasena,
        rol
    };
    
    // Obtener usuarios existentes
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Verificar si el RUN ya existe
    if (usuarios.some(u => u.run === run)) {
        alert('RUN ya registrado.');
        return;
    }
    // Verificar si el correo ya existe
    if (usuarios.some(u => u.correo === correo)) {
        alert('Correo ya registrado.');
        return;
    }
    
    // Agregar usuario
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    alert('Usuario creado exitosamente.');
    $('#modalCrearUsuario').modal('hide');

    cargarUsuarios();
    
    // Limpiar formulario
    document.getElementById('formCrearUsuario').reset();
}

// EDITAR usuario
function editarUsuario(run) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.run === run);
    
    if (!usuario) {  //si el usuario no existe
        alert('Usuario no encontrado.');
        return;
    }
    
    // Llenar formulario edicion
    document.getElementById('editRun').value = usuario.run;
    document.getElementById('editNombre').value = usuario.nombre;
    document.getElementById('editApellidos').value = usuario.apellidos;
    document.getElementById('editFechaNacimiento').value = usuario.fechaNacimiento || '';
    document.getElementById('editCorreo').value = usuario.correo;
    document.getElementById('editRol').value = usuario.rol;
    document.getElementById('editDireccion').value = usuario.direccion;
    document.getElementById('editContrasena').value = '';

    // Cargar regiones y seleccionar actual
    cargarRegionesEnSelect('editRegion', usuario.region);
    
    // Cargar comunas al cambiar region
    document.getElementById('editRegion').addEventListener('change', function() {
        cargarComunasEnSelect('editComuna', this.value);
    });
    
    // Cargar comunas con delay para que la region ya este cargada
    setTimeout(() => {
        cargarComunasEnSelect('editComuna', usuario.region, usuario.comuna);
    }, 100);

    
    $('#modalEditarUsuario').modal('show');
}

// ACTUALIZAR usuario
function actualizarUsuario() {
    const run = document.getElementById('editRun').value;
    const nombre = document.getElementById('editNombre').value.trim();
    const apellidos = document.getElementById('editApellidos').value.trim();
    const fechaNacimiento = document.getElementById('editFechaNacimiento').value;
    const region = document.getElementById('editRegion').value;
    const comuna = document.getElementById('editComuna').value;
    const direccion = document.getElementById('editDireccion').value.trim();
    const correo = document.getElementById('editCorreo').value.trim();
    const rol = document.getElementById('editRol').value;
    const nuevaContrasena = document.getElementById('editContrasena').value;
    
    // Validaciones
    if (!validarCorreo(correo)) {
        alert('Correo electrónico inválido.');
        return;
    }

    if (!validarLongitud(direccion, 1, 300)) {
        alert('La dirección debe tener máximo 300 caracteres.');
        return;
    }
    
    if (!region || !comuna) {
        alert('Debe seleccionar región y comuna.');
        return;
    }

    
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioIndex = usuarios.findIndex(u => u.run === run);
    

    if (usuarioIndex === -1) {
        alert('Usuario no encontrado.');
        return;
    }
    
    
    // Verificar si el correo ya es usado por otro usuario
    if (usuarios.some((u, index) => u.correo === correo && index !== usuarioIndex)) {
        alert('El correo electrónico ya está en uso.');
        return;
    }
    
    // Actualizar usuario
    usuarios[usuarioIndex].nombre = nombre;
    usuarios[usuarioIndex].apellidos = apellidos;
    usuarios[usuarioIndex].fechaNacimiento = fechaNacimiento || null;
    usuarios[usuarioIndex].region = region;
    usuarios[usuarioIndex].comuna = comuna;
    usuarios[usuarioIndex].direccion = direccion;
    usuarios[usuarioIndex].correo = correo;
    usuarios[usuarioIndex].rol = rol;
    
    // Actualizar contraseña si se cambio
    if (nuevaContrasena) {
        if (!validarLongitud(nuevaContrasena, 4, 10)) {
            alert('La contraseña debe tener entre 4 y 10 caracteres.');
            return;
        }
        usuarios[usuarioIndex].contrasena = nuevaContrasena;
    }
    
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    alert('Usuario actualizado exitosamente.');
    $('#modalEditarUsuario').modal('hide');
    cargarUsuarios();
}

// ELIMINAR usuario
function eliminarUsuario(run) {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios = usuarios.filter(u => u.run !== run);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        alert('Usuario eliminado exitosamente.');
        cargarUsuarios();
    }
}



//-----------------------------------------------------------------------------
// FUNCIONES PRODUCTOS
//-----------------------------------------------------------------------------

// Cargar categorías para uso general
function cargarCategorias() {
    const categorias = JSON.parse(localStorage.getItem('categoriasProductos')) || [];
    return categorias;
}

// Cargar categorías para select
function cargarCategoriasEnSelect(selectId) {
    const select = document.getElementById(selectId);
    const categorias = cargarCategorias();
    
    // Limpiar opciones excepto la primera
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    // Agregar categorias
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        select.appendChild(option);
    });
}

// CREAR producto
function crearProducto() {
    // Obtener valores del formulario
    const codigo = document.getElementById('codigoProducto').value.trim();
    const nombre = document.getElementById('nombreProducto').value.trim();
    const descripcion = document.getElementById('descripcionProducto').value.trim();
    const precio = parseFloat(document.getElementById('precioProducto').value);
    const stock = parseInt(document.getElementById('stockProducto').value);
    const stockCritico = document.getElementById('stockCriticoProducto').value ? 
        parseInt(document.getElementById('stockCriticoProducto').value) : null;
    const categoria = document.getElementById('categoriaProducto').value;
    const imagenInput = document.getElementById('imagenProducto');
    
    // Validaciones
    if (codigo.length < 3) {
        alert('El código del producto debe tener al menos 3 caracteres.');
        return;
    }
    if (nombre.length === 0 || nombre.length > 100) {
        alert('El nombre del producto es obligatorio y debe tener máximo 100 caracteres.');
        return;
    }
    if (descripcion.length > 500) {
        alert('La descripción no puede tener más de 500 caracteres.');
        return;
    }
    if (precio < 0) {
        alert('El precio no puede ser negativo.');
        return;
    }
    if (stock < 0) {
        alert('El stock no puede ser negativo.');
        return;
    }
    if (stockCritico !== null && stockCritico < 0) {
        alert('El stock crítico no puede ser negativo.');
        return;
    }
    if (!categoria) {
        alert('Debe seleccionar una categoría.');
        return;
    }
    
    // Procesar imagen si se subio una (debe estar en /images)
    let imagen = '';
    if (imagenInput.files.length > 0) {
        const file = imagenInput.files[0];
        imagen = `images/${file.name}`; //se guarda el nombre del archivo
    }
    
    // Crear objeto producto
    const producto = {
        codigo,
        nombre,
        descripcion: descripcion || '',
        precio,
        stock,
        stockCritico,
        categoria,
        imagen: imagen || 'images/producto-default.jpg' // se pone imagen x defecto de /images
    };
    
    // Obtener productos existentes
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    
    // Verificar si el código ya existe
    if (productos.some(p => p.codigo === codigo)) {
        alert('Ya existe un producto con ese código.');
        return;
    }
    
    // Agregar producto
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));
    
    alert('Producto creado exitosamente.');
    $('#modalCrearProducto').modal('hide');
    
    cargarProductos();
    
    // Limpiar formulario
    document.getElementById('formCrearProducto').reset();
}

// EDITAR producto
function editarProducto(codigo) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const producto = productos.find(p => p.codigo === codigo);
    
    if (!producto) {
        alert('Producto no encontrado.');
        return;
    }
    
    // Llenar formulario edición
    document.getElementById('editCodigoProducto').value = producto.codigo;
    document.getElementById('editNombreProducto').value = producto.nombre;
    document.getElementById('editDescripcionProducto').value = producto.descripcion;
    document.getElementById('editPrecioProducto').value = producto.precio;
    document.getElementById('editStockProducto').value = producto.stock;
    document.getElementById('editStockCriticoProducto').value = producto.stockCritico || '';
    document.getElementById('editCategoriaProducto').value = producto.categoria;
    
    // Mostrar imagen actual
    const imagenContainer = document.getElementById('editImagenActual');
    imagenContainer.innerHTML = producto.imagen ? 
        `<img src="${producto.imagen}" alt="${producto.nombre}" class="img-thumbnail" style="max-height: 100px;">` : '<p>No hay imagen</p>';
    
    $('#modalEditarProducto').modal('show');
}

// ACTUALIZAR producto
function actualizarProducto() {
    // Obtener valores del formulario
    const codigo = document.getElementById('editCodigoProducto').value;
    const nombre = document.getElementById('editNombreProducto').value.trim();
    const descripcion = document.getElementById('editDescripcionProducto').value.trim();
    const precio = parseFloat(document.getElementById('editPrecioProducto').value);
    const stock = parseInt(document.getElementById('editStockProducto').value);
    const stockCritico = document.getElementById('editStockCriticoProducto').value ? 
        parseInt(document.getElementById('editStockCriticoProducto').value) : null;
    const categoria = document.getElementById('editCategoriaProducto').value;
    const imagenInput = document.getElementById('editImagenProducto');
    
    // Validaciones
    if (nombre.length === 0 || nombre.length > 100) {
        alert('El nombre del producto es obligatorio y debe tener máximo 100 caracteres.');
        return;
    }
    if (descripcion.length > 500) {
        alert('La descripción no puede tener más de 500 caracteres.');
        return;
    }
    if (precio < 0) {
        alert('El precio no puede ser negativo.');
        return;
    }
    if (stock < 0) {
        alert('El stock no puede ser negativo.');
        return;
    }
    if (stockCritico !== null && stockCritico < 0) {
        alert('El stock crítico no puede ser negativo.');
        return;
    }
    if (!categoria) {
        alert('Debe seleccionar una categoría.');
        return;
    }

    // Obtener productos existentes
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    const productoIndex = productos.findIndex(p => p.codigo === codigo);
    //si el producto no existe
    if (productoIndex === -1) {
        alert('Producto no encontrado.');
        return;
    }
    
    // Actualizar producto
    productos[productoIndex].nombre = nombre;
    productos[productoIndex].descripcion = descripcion;
    productos[productoIndex].precio = precio;
    productos[productoIndex].stock = stock;
    productos[productoIndex].stockCritico = stockCritico;
    productos[productoIndex].categoria = categoria;
    
    // Actualizar imagen si es q se subio una nueva
    if (imagenInput.files.length > 0) {
        const file = imagenInput.files[0];
        productos[productoIndex].imagen = `images/${file.name}`;
    }
    
    localStorage.setItem('productos', JSON.stringify(productos));
    
    alert('Producto actualizado exitosamente.');
    $('#modalEditarProducto').modal('hide');
    cargarProductos();
}

// ELIMINAR producto
function eliminarProducto(codigo) {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
        let productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos = productos.filter(p => p.codigo !== codigo);
        localStorage.setItem('productos', JSON.stringify(productos));
        
        alert('Producto eliminado exitosamente.');
        cargarProductos();
    }
}

// Verificar STOCK CRITICO
function verificarStockCritico() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const productosConStockCritico = productos.filter(p => 
        p.stockCritico && p.stock <= p.stockCritico
    );
    
    if (productosConStockCritico.length > 0) {
        const nombres = productosConStockCritico.map(p => p.nombre).join(', ');
        alert(`ALERTA: Los siguientes productos tienen stock crítico: ${nombres}`);
    }
}

// Llamar a la verificación de stock cada 5 minutos
setInterval(verificarStockCritico, 5 * 60 * 1000); // 5 x 60 segundos x 1000 ms



//-----------------------------------------------------------------------------
// FUNCIONES CARGA DE REGIONES Y COMUNAS
//-----------------------------------------------------------------------------

// Cargar regiones
function cargarRegionesEnSelect(selectId, regionSeleccionada = '') {
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="">Seleccione una región</option>';
    
    for (const region in regionesYComunas) {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        if (region === regionSeleccionada) {
            option.selected = true;
        }
        select.appendChild(option);
    }
}

// Cargar comunas
function cargarComunasEnSelect(selectId, region, comunaSeleccionada = '') {
    const select = document.getElementById(selectId);
    
    if (region) {
        select.disabled = false;
        select.innerHTML = '<option value="">Seleccione una comuna</option>';
        
        const comunas = regionesYComunas[region] || [];
        comunas.forEach(comuna => {
            const option = document.createElement('option');
            option.value = comuna;
            option.textContent = comuna;
            if (comuna === comunaSeleccionada) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    } else {
        select.disabled = true;
        select.innerHTML = '<option value="">Primero seleccione una región</option>';
    }
}