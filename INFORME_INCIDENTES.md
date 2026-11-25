# Informe de incidencias · Gestor de tareas

**Estudiante:** Ramiro Fleitas  
**Fecha:** 25/11/2026  
**Proyecto / rama Git:** gestor-tareas-debugging / main
**Entorno (Expo SDK, Android, dispositivo):** Expo SDK 57, React Native, TypeScript, Node.js 24.14.1, Windows 11, Visual Studio Code, CMD y navegador web. Prueba en Android pendiente. Se utilizó la versión web debido a la incompatibilidad entre el SDK del proyecto y Expo Go instalado en el iPhone.

## Resumen ejecutivo

Durante el trabajo investigué errores de funcionamiento en una aplicación de gestión de tareas. Primero configuré el entorno y ejecuté las pruebas automatizadas con Jest. De las nueve pruebas iniciales, seis aprobaron y tres fallaron. Luego revisé el código y detecté seis incidencias: normalización de búsqueda (dos pruebas fallidas), validación de títulos, actualización del buscador, modificación del estado, manejo de errores del servicio e identificación de tarjetas.

Apliqué correcciones en tres archivos. Al finalizar, las nueve pruebas aprobaron y la comprobación de TypeScript no mostró errores. Las verificaciones manuales complementaron las pruebas automatizadas; queda pendiente registrar una prueba específica de regresión de las tarjetas y validar la aplicación en Android.

Las referencias a capturas corresponden al documento adjunto `edi 1.docx`.

## Incidencia 1

- **Título de incidencia:** Búsqueda sensible a mayúsculas y espacios sobrantes.
- **Pasos para reproducir:** Ejecutar `npm test` y revisar las pruebas de `filterTasks` con las búsquedas `VALIDAR` y `  login  `.
- **Esperado / observado:** Se esperaba una coincidencia en cada caso; se obtuvieron cero resultados.
- **Herramienta usada (DevTools / consola / test):** Jest y terminal CMD.
- **Hipótesis y evidencia:** La comparación no normalizaba el texto. Las dos pruebas fallidas aparecen en la página 1 del documento de capturas; la página 2 muestra que el conjunto de filtros aprobó después de la modificación.
- **Archivo y función involucrada:** `src/utils/taskFilters.ts`, `filterTasks`.
- **Causa raíz:** Se utilizaba `task.title.includes(query)` sin eliminar espacios externos ni unificar mayúsculas y minúsculas.
- **Corrección aplicada:** Normalicé la consulta con `query.trim().toLowerCase()` y comparé con `task.title.toLowerCase().includes(normalizedQuery)`. Conservé el filtrado por estado.
- **Prueba de regresión:** Ejecuté `npm test`. Las dos pruebas de búsqueda que fallaban pasaron correctamente. El resultado intermedio fue de ocho pruebas aprobadas y una fallida.
- **Estado:** Corregido.

## Incidencia 2

- **Título de incidencia:** Se aceptan títulos compuestos únicamente por espacios.
- **Pasos para reproducir:** Ejecutar la prueba `isValidTaskTitle('   ')` incluida en `taskValidation.test.ts`.
- **Esperado / observado:** Se esperaba `false`, pero la función devolvía `true`.
- **Herramienta usada (DevTools / consola / test):** Jest y terminal CMD.
- **Hipótesis y evidencia:** Los espacios se contaban como caracteres válidos. La página 2 muestra el fallo y la página 3 muestra las pruebas aprobadas tras la corrección.
- **Archivo y función involucrada:** `src/utils/taskValidation.ts`, `isValidTaskTitle`.
- **Causa raíz:** La longitud del título se comprobaba sin eliminar los espacios externos.
- **Corrección aplicada:** Reemplacé la validación por `return title.trim().length > 0;`.
- **Prueba de regresión:** Ejecuté `npm test`. Se rechazaron los títulos vacíos o compuestos por espacios y se aceptaron los títulos con palabras, incluso si tenían espacios externos.
- **Estado:** Corregido.

## Incidencia 3

- **Título de incidencia:** El listado no se actualiza al escribir en el buscador.
- **Pasos para reproducir:** Escribir el nombre de una tarea en el buscador y cambiar de pestaña para comprobar cuándo se actualiza el listado.
- **Esperado / observado:** El listado debía actualizarse mientras se escribía; el cálculo podía conservar resultados anteriores hasta que cambiara otra dependencia.
- **Herramienta usada (DevTools / consola / test):** Navegador y revisión del código en Visual Studio Code.
- **Hipótesis y evidencia:** El hook `useMemo` no tenía en cuenta los cambios de `query`. La página 3 contiene capturas del buscador y los filtros.
- **Archivo y función involucrada:** `app/index.tsx`, `TaskManagerScreen`, cálculo de `visibleTasks`.
- **Causa raíz:** El arreglo de dependencias era `[tasks, status]`, aunque el cálculo también utilizaba `query`.
- **Corrección aplicada:** Agregué `query` a las dependencias: `[tasks, query, status]`.
- **Prueba de regresión:** Comprobé manualmente que el buscador actualiza los resultados en tiempo real después de guardar el cambio.
- **Estado:** Corregido.

## Incidencia 4

- **Título de incidencia:** Actualización incorrecta del estado de las tareas.
- **Pasos para reproducir:** Marcar una tarea como completada y comprobar su estado visual, los contadores y las pestañas de pendientes y completadas.
- **Esperado / observado:** La interfaz debía reflejar el nuevo estado inmediatamente. El código original podía impedir la actualización al reutilizar la misma referencia del arreglo.
- **Herramienta usada (DevTools / consola / test):** Navegador, revisión del código y consola de DevTools (log contextualizado).
- **Hipótesis y evidencia:** Se modificaba directamente `found.completed` y luego se ejecutaba `setTasks(tasks)`. La página 3 contiene capturas de los filtros por estado.
- **Archivo y función involucrada:** `app/index.tsx`, `toggleTask`.
- **Causa raíz:** Mutación directa del estado de React sin crear un nuevo arreglo ni un nuevo objeto para la tarea modificada.
- **Corrección aplicada:** Utilicé la actualización funcional de `setTasks` y `map()` para crear un nuevo arreglo, copiando la tarea correspondiente con el operador spread y cambiando su propiedad `completed`.
- **Prueba de regresión:** Realicé la comprobación manual de marcado y desmarcado de tareas y actualización de los filtros. No hay una prueba automatizada específica de esta función en la suite actual.
- **Estado:** Corregido.

## Otras incidencias (opcional)

### Incidencia 5

- **Título de incidencia:** Indicador de carga permanece activo ante un error del servicio.
- **Pasos para reproducir:** Presionar «Simular error API» y esperar el mensaje de error.
- **Esperado / observado:** El indicador debía desaparecer al finalizar la solicitud, pero permanecía activo después del error.
- **Herramienta usada (DevTools / consola / test):** Navegador, revisión del código y consola de DevTools (log contextualizado).
- **Hipótesis y evidencia:** La página 4 muestra el mensaje de error con el indicador activo y otra captura donde se muestran las tareas sin el indicador. Además, [la captura de consola](evidencias/debugging-api.webp) registra el error HTTP 503 simulado con el prefijo `[taskService]`, en `loadTasks` (`app/index.tsx:33`).
- **Archivo y función involucrada:** `app/index.tsx`, `loadTasks`.
- **Causa raíz:** `setLoading(false)` estaba dentro del bloque `try`, por lo que no se ejecutaba si `fetchTasks` lanzaba una excepción.
- **Corrección aplicada:** Moví `setLoading(false)` a un bloque `finally`, manteniendo el mensaje de error en `catch`.
- **Prueba de regresión:** Volví a simular el error y comprobé que el indicador desaparece. El mensaje de error permanece visible, como corresponde. La recarga normal debe permitir recuperar los datos.
- **Estado:** Corregido.

### Incidencia 6

- **Título de incidencia:** Identificación incorrecta de tarjetas al cambiar el listado.
- **Pasos para reproducir:** Expandir una tarjeta y cambiar el filtro o eliminar una tarea anterior a ella. Observar si otra tarjeta hereda su estado de expansión.
- **Esperado / observado:** Cada tarjeta debe mantener su identidad. El uso del índice permite que una clave se reutilice para otra tarea cuando cambia el listado.
- **Herramienta usada (DevTools / consola / test):** Revisión del código, Jest y TypeScript.
- **Hipótesis y evidencia:** El `keyExtractor` original utilizaba `String(index)`. No se dispone de una captura específica que demuestre la reproducción de este fallo.
- **Archivo y función involucrada:** `app/index.tsx`, propiedad `keyExtractor` de `FlatList`.
- **Causa raíz:** La posición de una tarea se utilizaba como clave en lugar de un identificador estable.
- **Corrección aplicada:** Reemplacé `keyExtractor={(_item, index) => String(index)}` por `keyExtractor={(item) => item.id}`.
- **Prueba de regresión:** Las nueve pruebas automatizadas aprobaron y TypeScript no informó errores. Queda pendiente confirmar y registrar la prueba manual específica de expansión y filtrado o eliminación de tarjetas.
- **Estado:** Corrección aplicada; verificación manual específica pendiente.

## Pruebas

| Prueba | Antes | Después | Evidencia |
|---|---|---|---|
| Búsqueda | Dos pruebas fallidas | Ambas aprobadas | Capturas, páginas 1–3 |
| Validación | Una prueba fallida | Aprobada | Capturas, páginas 2–3 |
| Actualización del buscador | Dependencia faltante | Búsqueda en tiempo real | Capturas de filtros, página 3; comprobación manual |
| Actualización de estado | Mutación directa | Actualización inmutable | Capturas de filtros, página 3; comprobación manual |
| Error de servicio | Indicador activo tras error | Indicador desaparece | Capturas, página 4 |
| Identificación de tarjetas | Claves por índice | Claves por ID | Revisión de código; prueba manual específica pendiente |
| Suite completa de Jest | 6/9 aprobadas | 9/9 aprobadas | Capturas, páginas 2 y 4 |
| TypeScript (`npx tsc --noEmit`) | Sin registro inicial | Sin errores informados | Salida final de CMD compartida durante el trabajo |

## Conclusión y control de cambios

**Commit de correcciones (hash):** b4f63a0
**Mensaje del commit:** fix: correccion de seis incidencias, pruebas y documentacion tecnica
**Repositorio:** https://github.com/Ramma-FS/gestor-tareas-debugging
- **Qué aprendí y cómo lo aplicaría a mi app final:** Aprendí que no alcanza con que una aplicación se pueda ejecutar. También es necesario comprobar cómo responde ante distintos datos, cambios de estado y errores. Las pruebas automatizadas me permitieron identificar problemas y comprobar que las correcciones no afectaran las funcionalidades que ya estaban cubiertas. También entendí la importancia de no modificar directamente el estado de React, declarar las dependencias de los hooks y manejar correctamente las solicitudes asíncronas. En mi aplicación final aplicaría estos mismos criterios, documentando los errores y realizando pruebas antes de entregar una nueva versión.