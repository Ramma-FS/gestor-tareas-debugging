# Pruebas y evidencias

Fecha: 25/11/2026. Entorno: Windows, Node 24.14.1, CMD, Expo web y Jest.

## Automatizadas
Ejecutar `npm test` y `npm run typecheck`.

| Suite | Casos | Antes | Después |
|---|---:|---:|---:|
| taskFilters.test.ts | 4 | 2/4 | 4/4 |
| taskValidation.test.ts | 3 | 2/3 | 3/3 |
| TaskCard.test.tsx | 2 | 2/2 | 2/2 |
| Total | 9 | 6/9 | 9/9 |

La ejecución final registró 3 suites aprobadas y 9 pruebas aprobadas (2.613 s). `npx tsc --noEmit` terminó sin mensajes de error. Las pruebas de TaskCard verifican el callback y la expansión individual, no la identidad de tarjetas al filtrar ni la actualización del estado de la pantalla completa.

## Regresión manual
| Caso | Resultado registrado |
|---|---|
| Buscar mientras se escribe | Confirmado por el estudiante. |
| Cambiar estado de tarea | Corrección comprobada por el estudiante. |
| Simular fallo de servicio | Corrección comprobada; capturas antes/después. |
| Expandir y filtrar/eliminar otra tarjeta | Corrección aplicada; comprobación específica pendiente. |
| Ejecutar en Android | Pendiente. |

## Evidencias
- [Capturas del laboratorio](../evidencias/edi%201.docx): página 1, fallos de búsqueda; página 2, validación y resultados iniciales/intermedios; página 3, 9 pruebas aprobadas y filtros; página 4, error de servicio antes/después y resultado final.
- [Log contextualizado](../evidencias/debugging-api.webp): consola del navegador, error simulado HTTP 503, origen `[taskService]`, función `loadTasks`, `app/index.tsx:33`. El error es intencional y no implica una caída de servidor real.
- [Informe de incidencias](../INFORME_INCIDENTES.md).

No se dispone de evidencia de instalación limpia ni prueba nativa. Repetir Expo Doctor y revisar las alertas de npm audit antes del cierre.
