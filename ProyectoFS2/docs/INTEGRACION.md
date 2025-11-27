# Documentación de Integración - ProyectoFS

## Resumen Ejecutivo

Este documento describe la integración entre el frontend React (Vite) y el backend Spring Boot REST. Incluye arquitectura, endpoints, flujos de datos, y pasos para probar la integración end-to-end.

---

## 📊 Arquitectura de Integración

```
┌──────────────────────────┐
│   Frontend (Vite)        │
│   http://localhost:5173  │
│                          │
│ - React 18               │
│ - axios/fetch            │
│ - localStorage (JWT)     │
└────────┬─────────────────┘
         │
         │ HTTP REST
         │ JSON + JWT Header
         │
┌────────▼─────────────────┐
│   Backend (Spring Boot)  │
│   http://localhost:8080  │
│                          │
│ - Spring 6.1             │
│ - JPA/Hibernate          │
│ - H2 (dev) / MySQL (prod)│
└──────────────────────────┘
```

---

## 🔌 Endpoints Utilizados

### **1. Autenticación**

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "client",
  "password": "client"
}
```

**Respuesta (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "userId": 3,
  "username": "client"
}
```

**Uso en Frontend:**
```javascript
// Guardar token
localStorage.setItem('token', response.data.token);
localStorage.setItem('userId', response.data.userId);

// Usar en requests autenticados
headers: {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}
```

#### Registro (Futuro)
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "password": "password123",
  "email": "user@example.com",
  "role": "ROLE_CLIENT"
}
```

---

### **2. Productos**

#### Listar Productos (sin autenticación)
```http
GET /api/v1/products
```

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Producto A",
    "description": "Descripcion A",
    "price": 9.99
  },
  {
    "id": 2,
    "name": "Producto B",
    "description": "Descripcion B",
    "price": 19.99
  }
]
```

**Uso en Frontend:**
```javascript
const API = axios.create({ baseURL: 'http://localhost:8080/api/v1' });

const products = await API.get('/products');
console.log(products.data); // Array de productos
```

#### Obtener Producto Específico (sin autenticación)
```http
GET /api/v1/products/{id}
```

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "name": "Producto A",
  "description": "Descripcion A",
  "price": 9.99
}
```

---

### **3. Órdenes**

#### Crear Orden (autenticado)
```http
POST /api/v1/orders
Content-Type: application/json
Authorization: Bearer <token>

{
  "userId": 3,
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 2, "quantity": 1 }
  ]
}
```

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "user": {
    "id": 3,
    "username": "client"
  },
  "createdAt": "2025-11-27T12:30:45",
  "total": 39.97,
  "items": [
    {
      "id": 1,
      "product": {
        "id": 1,
        "name": "Producto A",
        "price": 9.99
      },
      "quantity": 2,
      "price": 9.99
    }
  ]
}
```

**Uso en Frontend:**
```javascript
const createOrder = async (userId, cartItems) => {
  const token = localStorage.getItem('token');
  
  const response = await API.post('/orders', 
    {
      userId,
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    },
    {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  );
  
  return response.data; // Orden creada
};
```

#### Ver Órdenes del Usuario (autenticado)
```http
GET /api/v1/orders/user/{userId}
Authorization: Bearer <token>
```

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "user": { "id": 3 },
    "createdAt": "2025-11-27T12:30:45",
    "total": 39.97,
    "items": [...]
  }
]
```

#### Obtener Detalle de Orden (autenticado)
```http
GET /api/v1/orders/{orderId}
Authorization: Bearer <token>
```

---

## 🧪 Pruebas de Integración

### Test 1: Listar Productos (sin autenticación)

**Comando:**
```powershell
$response = Invoke-WebRequest -Uri "http://localhost:8080/api/v1/products" -Method GET
$response.Content | ConvertFrom-Json
```

**Resultado esperado:**
```
[
  { "id": 1, "name": "Producto A", "price": 9.99 },
  { "id": 2, "name": "Producto B", "price": 19.99 },
  { "id": 3, "name": "Producto C", "price": 29.99 }
]
```

---

### Test 2: Login (obtener JWT)

**Comando:**
```powershell
$body = @{
    username = "client"
    password = "client"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:8080/api/v1/auth/login" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body

$response.Content | ConvertFrom-Json
```

**Resultado esperado:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjbGllbnQiLCJyb2xlIjoiUk9MRV9DTElFTlQiLCJpYXQiOjE3MzI2NzU4NDUsImV4cCI6MTczMjc2MjI0NX0.xxx",
  "userId": 3,
  "username": "client"
}
```

---

### Test 3: Crear Orden (autenticado)

**Preparación:**
```powershell
# Obtener token del Test 2
$token = "eyJhbGciOiJIUzI1NiJ9..."
```

**Comando:**
```powershell
$orderBody = @{
    userId = 3
    items = @(
        @{ productId = 1; quantity = 2 },
        @{ productId = 2; quantity = 1 }
    )
} | ConvertTo-Json -Depth 10

$response = Invoke-WebRequest -Uri "http://localhost:8080/api/v1/orders" `
    -Method POST `
    -Headers @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $token"
    } `
    -Body $orderBody

$response.Content | ConvertFrom-Json
```

**Resultado esperado:**
```json
{
  "id": 1,
  "user": { "id": 3, "username": "client" },
  "createdAt": "2025-11-27T14:05:45",
  "total": 39.97,
  "items": [...]
}
```

---

### Test 4: Ver Órdenes del Usuario (autenticado)

**Comando:**
```powershell
$token = "eyJhbGciOiJIUzI1NiJ9..."

$response = Invoke-WebRequest -Uri "http://localhost:8080/api/v1/orders/user/3" `
    -Method GET `
    -Headers @{
        "Authorization" = "Bearer $token"
    }

$response.Content | ConvertFrom-Json
```

**Resultado esperado:**
```json
[
  {
    "id": 1,
    "user": { "id": 3 },
    "createdAt": "2025-11-27T14:05:45",
    "total": 39.97,
    "items": [...]
  }
]
```

---

## 🚀 Flujo End-to-End (Caso de Uso Completo)

### Escenario: Cliente compra 2 productos

1. **Cliente accede a `http://localhost:5173`**
   - Frontend carga lista de productos (`GET /api/v1/products`)
   - Se muestran: Producto A ($9.99), Producto B ($19.99), Producto C ($29.99)

2. **Cliente hace login**
   - Envía: `POST /api/v1/auth/login` con `client`/`client`
   - Recibe JWT
   - Frontend almacena en `localStorage`

3. **Cliente selecciona productos**
   - Agrega al carrito: Producto A (cantidad 2) + Producto B (cantidad 1)
   - Carrito almacenado en `localStorage` del cliente

4. **Cliente va a checkout**
   - Completa formulario: nombre, email, dirección
   - Click "Confirmar"

5. **Frontend envía orden al backend**
   - `POST /api/v1/orders` con header `Authorization: Bearer <token>`
   - Body:
     ```json
     {
       "userId": 3,
       "items": [
         { "productId": 1, "quantity": 2 },
         { "productId": 2, "quantity": 1 }
       ]
     }
     ```

6. **Backend procesa la orden**
   - Valida JWT (Spring Security)
   - Obtiene usuario (ID 3)
   - Busca productos en BD
   - Crea Order + OrderItems
   - Calcula total: (9.99 * 2) + (19.99 * 1) = $39.97
   - Retorna orden creada

7. **Frontend recibe confirmación**
   - Muestra "Orden #1 creada - Total: $39.97"
   - Vacía carrito
   - Guarda orden en historial

8. **Cliente ve sus órdenes**
   - Click en "Mis Órdenes"
   - Frontend: `GET /api/v1/orders/user/3` con JWT
   - Muestra lista de todas sus órdenes

---

## 🔒 Seguridad

### Headers Necesarios (Autenticado)
```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
Content-Type: application/json
```

### Validaciones Backend
- JWT se valida en cada request protegido
- Usuario solo puede ver sus propias órdenes
- Productos públicos (no requieren autenticación)
- Roles restringen acceso:
  - ROLE_CLIENT: crear órdenes, ver propias órdenes
  - ROLE_VENDOR: ver todas las órdenes, detalles
  - ROLE_ADMIN: acceso total

### CORS
- Habilitado para `http://localhost:5173` (Vite dev)
- Cambiar en `application.yml` si frontend corre en otro puerto

---

## 📝 Checklist de Integración

- [ ] Backend arranca sin errores en puerto 8080
- [ ] Frontend arranca en puerto 5173
- [ ] `/api/v1/products` devuelve array de 3 productos
- [ ] Login con `client`/`client` devuelve JWT válido
- [ ] JWT se almacena en `localStorage`
- [ ] Crear orden con JWT funciona
- [ ] Orden se persiste en BD (H2)
- [ ] Ver órdenes del usuario funciona
- [ ] Swagger UI accesible en `/swagger-ui/index.html`
- [ ] Navegador no muestra errores CORS

---

## 🔗 Referencias

- **Swagger/OpenAPI**: `http://localhost:8080/swagger-ui/index.html`
- **API Base URL**: `http://localhost:8080/api/v1`
- **Frontend Base URL**: `http://localhost:5173`
- **ERS**: `docs/ERS.md`
- **APIs**: `docs/APIs.md`

---

**Última actualización**: 27 de noviembre de 2025  
**Versión**: 1.0 MVP
