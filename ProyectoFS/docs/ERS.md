# ERS - Especificación de Requisitos del Software
## Proyecto ProyectoFS (Frontend + Backend)

## 1. Identificación
- **Nombre**: ProyectoFS - Plataforma de Comercio Electrónico Integrada
- **Versión**: 1.0 (MVP)
- **Fecha**: 27 de noviembre de 2025
- **Componentes**: Frontend (React + Vite) + Backend (Spring Boot + MySQL)

## 2. Actores
- **Cliente**: Usuario final que compra productos
- **Vendedor**: Gestiona catálogo y visualiza órdenes
- **Administrador**: Control total del sistema

## 3. Contexto y Alcance
ProyectoFS integra un frontend moderno en React con Vite y un backend REST con Spring Boot. El sistema permite:
- Registro e autenticación vía JWT
- Visualización de productos
- Creación y seguimiento de órdenes
- Control de acceso basado en roles (RBAC)

## 4. Requisitos Funcionales Detallados

### Autenticación (Backend)
- **RF-1**: Un usuario puede registrarse con username, email y contraseña
  - Endpoint: `POST /api/v1/auth/register`
  - Body: `{ "username", "email", "password", "role" }`
  - Validación: username único
  
- **RF-2**: Un usuario puede iniciar sesión y obtener JWT
  - Endpoint: `POST /api/v1/auth/login`
  - Respuesta: `{ "token": "...", "userId": 1, "username": "..." }`
  - Token válido 24 horas

- **RF-3**: JWT se valida en endpoints protegidos
  - Header: `Authorization: Bearer <token>`
  - Roles: ROLE_ADMIN, ROLE_VENDOR, ROLE_CLIENT

### Productos (Backend + Frontend)
- **RF-4**: Listar productos del catálogo
  - Endpoint: `GET /api/v1/products` (sin autenticación)
  - Frontend: Componente `ProductList` muestra catálogo

- **RF-5**: Ver detalle de producto
  - Endpoint: `GET /api/v1/products/{id}` (sin autenticación)
  - Datos: nombre, descripción, precio

### Órdenes (Backend + Frontend)
- **RF-6**: Crear una orden con múltiples items
  - Endpoint: `POST /api/v1/orders` (autenticado)
  - Body: `{ "userId": 1, "items": [ { "productId": 1, "quantity": 2 } ] }`
  - Calcula total automáticamente

- **RF-7**: Visualizar órdenes del usuario
  - Endpoint: `GET /api/v1/orders/user/{userId}` (autenticado)
  - Respuesta: Lista de órdenes con detalles

- **RF-8**: Ver detalle de una orden
  - Endpoint: `GET /api/v1/orders/{id}` (autenticado)
  - Incluye items y total

### Carrito (Frontend)
- **RF-9**: Agregar productos al carrito
  - UI: Seleccionar cantidad y agregar desde `ProductList`
  - Persistencia: localStorage o sesión

- **RF-10**: Ver resumen del carrito
  - Componente: `CartSummary` muestra items y total
  - Permite editar cantidades o eliminar items

- **RF-11**: Pasar a checkout
  - Formulario: datos de usuario (nombre, email, dirección)
  - Validación: campos obligatorios y carrito no vacío

- **RF-12**: Confirmar orden
  - Envía carrito al backend (`POST /api/v1/orders`)
  - Limpia carrito tras éxito

## 5. Requisitos No Funcionales

- **RNF-1**: El backend responde en máx. 2 segundos
- **RNF-2**: Soporta concurrencia (BD con locks)
- **RNF-3**: JWT firmado con HMAC-SHA256
- **RNF-4**: CORS habilitado para localhost:5173 (Vite)
- **RNF-5**: Documentación API: Swagger/OpenAPI en `/swagger-ui/index.html`
- **RNF-6**: Cobertura de pruebas: >70% en lógica de servicios
- **RNF-7**: Responsive design en frontend (Bootstrap)
- **RNF-8**: Frontend soporta offline (carrito en localStorage)

## 6. Diagrama ER (Base de Datos)

```
┌──────────────────────────────────┐
│           USERS                  │
├──────────────────────────────────┤
│ id (PK)                          │
│ username (UNIQUE)                │
│ password (hashed en prod)        │
│ email                            │
└──────────────────┬───────────────┘
                   │ (1:N)
                   │
         ┌─────────┴──────────┐
         │                    │
    ┌────▼─────────┐  ┌──────▼────────┐
    │   USER_ROLES │  │     ORDERS    │
    ├──────────────┤  ├───────────────┤
    │ user_id (FK) │  │ id (PK)       │
    │ role_id (FK) │  │ user_id (FK)  │
    └──────┬───────┘  │ created_at    │
           │          │ total         │
       ┌───▼────┐     └─────┬─────────┘
       │ ROLES  │           │ (1:N)
       ├────────┤      ┌────▼──────────────┐
       │ id(PK) │      │   ORDER_ITEMS    │
       │ name   │      ├──────────────────┤
       └────────┘      │ id (PK)          │
                       │ order_id (FK)    │
                       │ product_id (FK)  │
                       │ quantity         │
                       │ price (snapshot) │
                       └────┬─────────────┘
                            │
                       ┌────▼──────────┐
                       │   PRODUCTS    │
                       ├───────────────┤
                       │ id (PK)       │
                       │ name          │
                       │ description   │
                       │ price         │
                       └───────────────┘
```

## 7. Endpoints de la API (v1)

### Autenticación (public)
- `POST /api/v1/auth/register` 
- `POST /api/v1/auth/login`

### Productos (public read)
- `GET /api/v1/products`
- `GET /api/v1/products/{id}`

### Órdenes (autenticado)
- `POST /api/v1/orders`
- `GET /api/v1/orders/user/{userId}`
- `GET /api/v1/orders/{id}`

### Documentación
- `GET /swagger-ui/index.html`

## 8. Componentes Frontend (React)

| Componente | Responsabilidad |
|-----------|-----------------|
| `ProductList` | Listar productos, agregar al carrito |
| `ProductDetail` | Detalle y selección de cantidad |
| `Cart` | Resumen del carrito, editar items |
| `CheckoutForm` | Datos de usuario, validación |
| `OrderConfirmation` | Confirmación de compra exitosa |
| `MyOrders` | Historial de órdenes del usuario |
| `NavBar` | Navegación, login/logout |

## 9. Flujos de Casos de Uso

### Caso de Uso 1: Comprar Producto (Cliente)
1. Cliente visualiza listado de productos (`GET /api/v1/products`)
2. Selecciona cantidad y agrega al carrito (localStorage)
3. Revisa carrito y procede a checkout
4. Completa formulario (nombre, email, dirección)
5. Confirma orden → `POST /api/v1/orders` (con JWT)
6. Backend crea Order + OrderItems
7. Frontend muestra confirmación y limpia carrito
8. Cliente puede ver historial: `GET /api/v1/orders/user/{userId}`

### Caso de Uso 2: Iniciar Sesión
1. Usuario abre login en frontend
2. Ingresa username y password
3. Frontend envía: `POST /api/v1/auth/login`
4. Backend valida y devuelve JWT
5. Frontend almacena JWT en localStorage
6. Incluye JWT en header Authorization para requests protegidas

## 10. Decisiones Técnicas

| Aspecto | Decisión |
|--------|----------|
| Framework Backend | Spring Boot 3.1.4 |
| Framework Frontend | React 18 + Vite |
| Lenguaje Backend | Java 17 |
| Autenticación | JWT (JJWT 0.11.5) |
| BD Desarrollo | H2 (in-memory) |
| BD Producción | MySQL 8.0 |
| Seguridad | Spring Security + @PreAuthorize |
| API Doc | SpringDoc OpenAPI 2.1 |
| Persistencia BD | JPA/Hibernate |
| CORS | Configurado para localhost:5173 |
| Testing Backend | JUnit 5 + Mockito |
| Build Frontend | Vite (vite build) |

## 11. Prototipos y Mockups

### Frontend Wireframe (Carrito)
```
┌──────────────────────────────────┐
│  NavBar (Logo | Products | Cart) │
├──────────────────────────────────┤
│ Producto 1   Cantidad: [2]  $20  │
│ Producto 2   Cantidad: [1]  $10  │
├──────────────────────────────────┤
│ Total: $30                       │
│ [Proceder a Checkout]            │
└──────────────────────────────────┘
```

## 12. Criterios de Aceptación (MVP)

- ✅ Backend arranca sin errores
- ✅ Endpoints responden con códigos HTTP correctos
- ✅ JWT se genera y valida
- ✅ Órdenes se crean y persisten en BD
- ✅ Frontend consume endpoints sin errores CORS
- ✅ Carrito funciona con localStorage
- ✅ Documentación Swagger accesible
- ✅ Pruebas unitarias pasan

## 13. Estado de Implementación

| Tarea | Estado |
|------|--------|
| Backend scaffolding | ✅ Completo |
| Entidades DB | ✅ Completo |
| Autenticación JWT | ✅ Completo |
| CRUD Productos | ✅ Completo |
| CRUD Órdenes | ✅ Completo |
| Servicios + lógica | ✅ Completo |
| Pruebas unitarias | ✅ Básicas |
| Swagger/OpenAPI | ✅ Completo |
| Frontend Vite setup | ✅ Existente |
| Integración Frontend | 🔄 En progreso |
| Manual de usuario | 🔄 En progreso |
| Despliegue AWS EC2 | ⏳ Pendiente |

---
**Versión**: 1.0 MVP
**Última actualización**: 27 de noviembre de 2025

## 6. Interfaces (UI y componentes)
- Componentes React:
	- `ServiceList`: lista de servicios.
	- `ServiceCard`: tarjeta de servicio con notas y botón agregar.
	- `ServiceInvoice`: resumen/factura con desglose por ítem.
	- `CheckoutForm`: formulario de cliente con validación.
- Rutas: `/`, `/invoice`, `/checkout`.

## 7. Casos de uso / Flujos principales
1. Selección de servicios: Usuario navega al listado, añade servicios con notas.
2. Revisión de factura: Usuario consulta factura y revisa desglose.
3. Checkout: Usuario completa datos y genera factura (simulado), la app limpia la factura tras el envío.

## 8. Criterios de aceptación globales
- Todas las funciones críticas (agregar/eliminar ítems, cálculo de totales, validación del checkout) deben estar cubiertas por pruebas unitarias.

## 9. Entregables
- Código fuente del frontend en React.
- Pruebas unitarias y configuración de test (Karma/Jasmine).
- Documentos: ERS y cobertura de testing.

