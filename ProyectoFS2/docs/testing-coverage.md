# Cobertura de testing (resumen)

Objetivo: asegurar cobertura de la lógica crítica (facturación, validaciones) con pruebas unitarias.

Componentes y estado:
- `ServiceInvoice`: probado (desglose, total) - `src/components/__tests__/ServiceInvoice.spec.js` (implementado)
- `CheckoutForm`: probado (validación de ausencia de datos/servicios) - `src/components/__tests__/CheckoutForm.spec.js` (implementado)
- `ServiceList/ServiceCard`: pruebas pendientes (recomendado añadir interacción `onAdd`)

Ejecución:
- `npm install` y luego `npm run test` generará reportes en `/coverage` (HTML).

Casos faltantes:
- Cobertura de eventos de UI (agregar varios servicios, cantidades).
- Pruebas con mocks para integración con API (si se agrega backend).
