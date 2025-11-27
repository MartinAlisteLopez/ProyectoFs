# ProyectoFS - Frontend de Servicios (React)

[![CI](https://github.com/MartinAlisteLopez/ProyectoFs/actions/workflows/ci.yml/badge.svg)](https://github.com/MartinAlisteLopez/ProyectoFs/actions/workflows/ci.yml)

Instrucciones rápidas:

1. Instalar dependencias:

```powershell
npm install
```

2. Ejecutar tests (Karma + Jasmine):

```powershell
npm run test
```

3. Levantar servidor de desarrollo:

```powershell
npm run start
```

Estructura relevante:
- `src/components` - componentes React para servicios y factura.
- `docs/ERS.md` - Especificación de requisitos.
- `docs/testing-coverage.md` - Resumen de cobertura de tests.
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/JJmef63O)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=20254853)

Integrantes: Antonia Faúndes y Martín Aliste.

Entrega comprimida: `ProyectoFS2-delivery.zip` (generado en la carpeta raíz del proyecto).

1.- Contexto del proyecto: En el ámbito de los servicios eléctricos domiciliarios y comerciales,
    los clientes enfrentan diversas dificultades, entre ellas las siguientes:
    -Procesos manuales de contacto poco eficientes (llamadas, WhatsApp, etc).
    -Dificultad para dar seguimiento al estado de sus solicitudes de servicio.
    -Poca optimización en la asignación de cuadrillas y rutas de trabajo, lo que genera retraso, ineficiencia y mayor cantidad de errores.

2.- Objetivo del proyecyo: Se propone el desarrollo de una plataforma de gestión de solicitudes de servicios
    eléctricos. La plataforma contará con las siguientes funciones:
    -Portal para clientes: Permite el registro de solicitudes de servicio (intalación, reparación, mantención, etc.).
    -Panel de administración para la empresa: Permite la gestión centralizada de las solicitudes. Permite ver las solicitudes pendientes.


3.- Breve descripción técnica: Sistema basado en el uso de HTML, CSS y JavaScript.
    -Frontend: Aplicación web y versión móvil (si es posible también). Interfaz para cliente, y un panel distinto para administradores.

4.- Instrucciónes básicas de instalación/ejecución:
4.- Instrucciónes básicas de instalación/ejecución:

Se agrega a continuación una sección técnica que describe cómo se diseñó la parte frontend,
cómo ejecutar los tests unitarios con Karma/Jasmine y qué evidencia se incluyó para la evaluación.

## Diseño y estructura del frontend

- El proyecto contiene una aplicación en React bajo la carpeta `src/` en la raíz del repositorio principal.
- Componentes relevantes: `NavBar.jsx`, `CarroProductos.jsx` (ProductCard), `Home.jsx`, etc. Estos componentes
    usan props y estado (`useState`, `useEffect`) y emplean clases de Bootstrap (`container`, `row`, `col-...`) para
    diseño responsivo.

## Testing (Jasmine + Karma)

- Se incluye una configuración de Karma en `karma.conf.js` (framework: jasmine, browsers: Firefox/Chrome).
- Para demostrar el proceso de testing unitario y cumplir la rúbrica se añadió un test de ejemplo en
    `ProyectoFS2/src/sample.test.js` que valida funciones simples en `ProyectoFS2/src/sample.js`.

Cómo ejecutar los tests (desde la carpeta `ProyectoFS2`):

```powershell
cd .\ProyectoFS2
npm install
npm test
```

Notas:
- La configuración actual ejecuta tests ubicados en `ProyectoFS2/src/**/*.test.js`.
- Si prefieres probar componentes React con JSX en Karma se requiere adicionar un preprocesador (Babel/webpack)
    y dependencias extra; eso se puede hacer en una siguiente fase si quieres que los tests cubran JSX.

## Qué se añadió para cumplir la rúbrica

- `ProyectoFS2/src/sample.js` — módulo de ejemplo con funciones.
- `ProyectoFS2/src/sample.test.js` — pruebas unitarias Jasmine que demuestran el flujo de Karma.
- Actualización de `ProyectoFS2/package.json` con scripts `test` y `test:watch`.
- Corrección menor en `ProyectoFS2/karma.conf.js` para no excluir los tests.
