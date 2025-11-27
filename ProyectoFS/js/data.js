// DATOS + UTILIDADES COMPARTIDAS


//-----------------------------------------------------------------------------
// DATOS
//-----------------------------------------------------------------------------

// Usuario administrador por defecto
const usuarioAdminPorDefecto = {
    run: "12345678",
    nombre: "Administrador",
    apellidos: "del Sistema",
    fechaNacimiento: "1990-01-01",
    region: "Metropolitana de Santiago",
    comuna: "Santiago",
    direccion: "Dirección administrativa",
    correo: "admin@duoc.cl",
    contrasena: "admin123",
    rol: "administrador"
};

// Inicializar localStorage con el usuario admin si no existe
if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify([usuarioAdminPorDefecto]));
}


// Categorías productos
const categoriasProductos = [
    "Interruptores",
    "Tomacorrientes",
    "Cables",
    "Iluminación",
    "Accesorios",
    "Protección",
    "Energía Solar",
    "Control",
    "Herramientas",
    "Transformadores"
];

// Datos productos
var productos = [
    {
        codigo: "PROD001",
        nombre: "Interruptor Simple",
        descripcion: "Interruptor de pared simple para control de luces.",
        precio: 2990,
        stock: 50,
        stockCritico: 5,
        categoria: "Interruptores",
        imagen: "images/interruptor-simple.jpg"
    },
    {
        codigo: "PROD002",
        nombre: "Tomacorriente Doble",
        descripcion: "Tomacorriente doble con conexión a tierra.",
        precio: 4990,
        stock: 35,
        stockCritico: 5,
        categoria: "Tomacorrientes",
        imagen: "images/tomacorriente-doble.jpg"
    },
    {
        codigo: "PROD003",
        nombre: "Cable Eléctrico 2.5mm",
        descripcion: "Cable eléctrico flexible de 2.5mm, 100 metros.",
        precio: 45990,
        stock: 20,
        stockCritico: 3,
        categoria: "Cables",
        imagen: "images/cable-electrico.webp"
    },
    {
        codigo: "PROD004",
        nombre: "Foco LED 9W",
        descripcion: "Foco LED de 9W, equivalente a 60W, luz cálida.",
        precio: 1990,
        stock: 100,
        stockCritico: 10,
        categoria: "Iluminación",
        imagen: "images/foco-led.jpg"
    },
    {
        codigo: "PROD005",
        nombre: "Caja de Derivación",
        descripcion: "Caja de derivación plástica para instalaciones eléctricas.",
        precio: 3990,
        stock: 30,
        stockCritico: 5,
        categoria: "Accesorios",
        imagen: "images/caja-derivacion.png"
    },
    {
        codigo: "PROD006",
        nombre: "Breaker 20A",
        descripcion: "Disyuntor termomagnético de 20 amperes.",
        precio: 8990,
        stock: 25,
        stockCritico: 3,
        categoria: "Protección",
        imagen: "images/disyuntor.jpg"
    },
    {
        codigo: "PROD007",
        nombre: "Panel Solar 100W",
        descripcion: "Panel solar monocristalino de 100W para sistemas fotovoltaicos.",
        precio: 89990,
        stock: 15,
        stockCritico: 2,
        categoria: "Energía Solar",
        imagen: "images/panel-solar.jpeg"
    },
    {
        codigo: "PROD008",
        nombre: "Dimmer Rotativo",
        descripcion: "Regulador de intensidad luminosa rotativo para luces incandescentes y LED.",
        precio: 12990,
        stock: 18,
        stockCritico: 3,
        categoria: "Control",
        imagen: "images/dimmer.jpg"
    }
];


// Inicializar localStorage con productos si no existen
if (!localStorage.getItem('productos')) {
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Inicializar localStorage con categorías si no existen
if (!localStorage.getItem('categoriasProductos')) {
    localStorage.setItem('categoriasProductos', JSON.stringify(categoriasProductos));
}


// Datos regiones y comunas
const regionesYComunas = {
    "Región de Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Región de Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "Región de Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    "Región de Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    "Región de Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "Región de Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
    "Región Metropolitana de Santiago": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Santiago", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
    "Región del Libertador General Bernardo O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Santa Cruz", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "San Fernando"],
    "Región del Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "Región de Ñuble": ["Chillán", "Bulnes", "Chillán Viejo", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Quirihue", "Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Ránquil", "Treguaco", "San Carlos", "Coihueco", "Ñiquén", "San Fabián", "San Nicolás"],
    "Región del Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualpén", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Lebu", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
    "Región de La Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
    "Región de Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
    "Región de Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
    "Región de Aysén del General Carlos Ibáñez del Campo": ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
    "Región de Magallanes y de la Antártica Chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
};


//-----------------------------------------------------------------------------
// UTILIDADES COMPARTIDAS
//-----------------------------------------------------------------------------
// funciones validacion (para usar en main.js y admin.js)

// Validar RUN (sin puntos ni guión, 7-9 caracteres)
function validarRUN(run) {
    const runRegex = /^[0-9]{7,9}$/;
    return runRegex.test(run);
}

// Validar email (dominios y longitud)
function validarCorreo(correo) {
    const correoRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    return correo.length <= 100 && correoRegex.test(correo);
}

// Validar longitud de texto
function validarLongitud(texto, min, max) {
    return texto.length >= min && texto.length <= max;
}