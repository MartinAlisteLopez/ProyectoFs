document.addEventListener('DOMContentLoaded', function() {
    // Verificar y mostrar estado de sesión
    actualizarEstadoSesion();
    
    // Configurar botón de cierre de sesión
    if (document.getElementById('btnCerrarSesion')) {
        document.getElementById('btnCerrarSesion').addEventListener('click', cerrarSesion);
    }
    
    // Cargar productos desde localStorage
    cargarProductos();
});

function cargarProductos() {
    // Obtener productos desde localStorage
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const productosContainer = document.getElementById('listaProductos');
    
    if (!productosContainer) return;
    
    productosContainer.innerHTML = '';
    
    // Verificar si hay productos
    if (productos.length === 0) {
        productosContainer.innerHTML = '<div class="col-12 text-center"><p>No hay productos disponibles.</p></div>';
        return;
    }
    
    // Crear tarjetas para cada producto
    productos.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        
        // Determinar clase de stock
        let stockClass = '';
        let stockMessage = '';
        
        if (producto.stock === 0) {
            stockClass = 'text-danger';
            stockMessage = 'Sin stock';
        } else if (producto.stockCritico && producto.stock <= producto.stockCritico) {
            stockClass = 'text-warning';
            stockMessage = 'Stock bajo';
        } else {
            stockClass = 'text-success';
            stockMessage = 'En stock';
        }
        
        col.innerHTML = `
            <div class="card h-100">
                <img src="${producto.imagen || 'images/producto-default.jpg'}" class="card-img-top" alt="${producto.nombre}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion || 'Sin descripción'}</p>
                    <p class="card-text"><strong>Categoría:</strong> ${producto.categoria}</p>
                    <p class="card-text"><strong>Precio:</strong> $${producto.precio.toLocaleString('es-CL')}</p>
                    <p class="card-text ${stockClass}"><strong>Stock:</strong> ${producto.stock} - ${stockMessage}</p>
                    <p class="card-text"><small class="text-muted">Código: ${producto.codigo}</small></p>
                    <button class="btn btn-sm btn-success btn-block" onclick="agregarAlCarrito('${producto.codigo}')">Agregar al carrito</button>
                </div>
            </div>
        `;
        
        productosContainer.appendChild(col);
    });
}

function agregarAlCarrito(codigoProducto) {
    // Verificar si el usuario está logueado
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
    
    if (!usuarioActual) {
        alert('Debe iniciar sesión para agregar productos al carrito.');
        window.location.href = 'iniciarSesion.html';
        return;
    }
    
    // Obtener productos
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const producto = productos.find(p => p.codigo === codigoProducto);
    
    if (!producto) {
        alert('Producto no encontrado.');
        return;
    }
    
    if (producto.stock === 0) {
        alert('Este producto no tiene stock disponible.');
        return;
    }
    
    // Obtener carrito del usuario
    let carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioActual.run}`)) || [];
    
    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(item => item.codigo === codigoProducto);
    
    if (productoEnCarrito) {
        // Si ya está, aumentar la cantidad
        productoEnCarrito.cantidad += 1;
    } else {
        // Si no está, agregarlo
        carrito.push({
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }
    
    // Guardar carrito actualizado
    localStorage.setItem(`carrito_${usuarioActual.run}`, JSON.stringify(carrito));
    
    alert('Producto agregado al carrito correctamente.');
}