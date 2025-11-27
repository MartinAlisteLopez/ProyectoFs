# Cobertura de testing (resumen)

Objetivo: asegurar cobertura de la lógica crítica (facturación, validaciones) con pruebas unitarias.

Componentes y estado:
- `ServiceInvoice`: probado (desglose, total) - `src/components/__tests__/ServiceInvoice.spec.js` (implementado)
- `CheckoutForm`: probado (validación de ausencia de datos/servicios) - `src/components/__tests__/CheckoutForm.spec.js` (implementado)
- `ServiceList/ServiceCard`: pruebas implementadas (interacciones básicas: `onAdd`)

Ejecución:
- `npm install` y luego `npm run test` generará reportes en `/coverage` (HTML). También se genera un resumen de texto en la salida del test con porcentajes.

Resultados de la ejecución actual (resumen):

- Statements: 79.62% (43/54)
- Branches: 62.50% (30/48)
- Functions: 66.66% (16/24)
- Lines: 76.59% (36/47)

El reporte HTML completo está en `coverage/Chrome Headless 142.0.0.0 (Windows 10)/index.html`.

Casos faltantes (recomendado):
- Pruebas para agregar múltiples ítems y verificar acumulación de cantidad.
- Pruebas para editar manualmente costos de materiales/otros y verificar recálculo de la factura.
- Pruebas de integración (mocks) para llamadas a backend si se implementan en el futuro.

Acción siguiente recomendada: añadir 3–4 tests adicionales para los flujos arriba y apuntar a >80% en Statements/Lines.
