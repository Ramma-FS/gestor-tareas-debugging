# Requisitos

## Objetivo y usuario
Gestionar tareas de manera sencilla y utilizar el sistema como laboratorio de debugging para estudiantes.

| ID | Requisito funcional | Criterio de aceptación |
|---|---|---|
| RF01 | Listar tareas y contadores | Mostrar registros y cantidades según su estado. |
| RF02 | Buscar por título | Actualizar al escribir, ignorando mayúsculas y espacios externos. |
| RF03 | Filtrar por estado | Mostrar todas, pendientes o completadas. |
| RF04 | Agregar tareas | Rechazar títulos vacíos o solo espacios. |
| RF05 | Cambiar estado | Actualizar tarjeta, contadores y filtro. |
| RF06 | Eliminar tareas | Retirar el registro seleccionado. |
| RF07 | Expandir detalles | Mostrar descripción sin transferir expansión a otra tarea. |
| RF08 | Recargar y simular error | Mostrar mensaje ante fallo y finalizar carga. |
| RF09 | Consultar guía | Navegar a la pantalla de consigna. |

## Requisitos no funcionales
- RNF01: mantener compatibilidad con Expo SDK 57 y dependencias alineadas.
- RNF02: comprobar tipos y ejecutar las pruebas de regresión existentes.
- RNF03: documentar instalación, incidencias y decisiones para reproducir el trabajo.
- RNF04: informar errores de servicio mediante mensaje visible y log contextualizado.

## Alcance y restricciones
Servicio local simulado con 700 ms de demora. No hay autenticación, persistencia, backend real ni datos sensibles. La prueba web fue realizada; Android queda pendiente. Los requisitos describen el comportamiento esperado, no certifican por sí solos su cumplimiento.
