# ERS - Especificación de Requisitos del Software

## 1. Identificación
- Nombre: ProyectoFs - Frontend Tienda de Servicios
- Versión: 1.0 (entrega parcial)

## 2. Actores
- Cliente (usuario final)
- Administrador (gestión futura)

## 3. Contexto y Alcance
Este proyecto entrega un frontend en React que permite a un cliente seleccionar servicios (p.ej. arreglos, pintura), revisar una factura con desglose detallado y completar un checkout simulado. No incluye backend en esta entrega.

## 4. Requisitos funcionales (detallados)
- RF1: Listado de servicios
	- Descripción: Mostrar catálogo de servicios con costo base y campo de notas.
	- Criterio de aceptación: El usuario puede ver al menos 4 servicios y abrir el formulario para agregar notas.

- RF2: Agregar servicio a la factura
	- Descripción: El usuario puede agregar un servicio al resumen/factura; si agrega el mismo servicio varias veces se incrementa la cantidad.
	- Criterio de aceptación: Al agregar un servicio, la factura muestra la cantidad y el subtotal del ítem.

- RF3: Mostrar factura con desglose
	- Descripción: Para cada ítem mostrar: costo trabajo (base * qty), materiales (estimado 10% por defecto o valor específico), otros costos y total por ítem. Mostrar total general.
	- Criterio de aceptación: La suma mostrada debe coincidir con la suma de los subtotales.

- RF4: Eliminar ítem de la factura
	- Descripción: El usuario puede eliminar un servicio de la factura.
	- Criterio de aceptación: Después de eliminar, la factura actualiza totales correctamente.

- RF5: Checkout y validación
	- Descripción: Formulario de checkout que valida nombre, email y dirección; requiere que la factura contenga al menos un ítem.
	- Criterio de aceptación: Si faltan datos o no hay servicios, el formulario muestra errores y no permite generar la factura.

## 5. Requisitos no funcionales
- RNF1: Responsividad — usar Bootstrap para que la interfaz sea usable en móviles y escritorio.
- RNF2: Pruebas unitarias — usar Jasmine + Karma; objetivos iniciales: cubrir lógica de factura y validaciones (meta >70%).
- RNF3: Build reproducible — usar webpack y scripts npm (`start`, `build`, `test`).

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

