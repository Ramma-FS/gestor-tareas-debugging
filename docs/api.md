# Contrato del servicio simulado

No existe una API HTTP real. `src/services/taskService.ts` implementa una función asíncrona local:

```ts
fetchTasks(simulateFailure = false): Promise<Task[]>
```

| Entrada | Resultado |
|---|---|
| false (por defecto) | Cinco tareas iniciales, copiadas como objetos nuevos, tras 700 ms. |
| true | Rechazo con Error: HTTP 503: servidor temporalmente indisponible (simulado). |

## Modelo
```ts
type TaskPriority = 'alta' | 'media' | 'baja';
type TaskStatus = 'todas' | 'pendientes' | 'completadas';
type Task = {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  completed: boolean;
};
```

Ejemplo de registro real del mock:
```json
{"id":"t01","title":"Validar login","description":"Comprobar campos vacíos y credenciales incorrectas.","priority":"alta","completed":false}
```

La pantalla captura el error, registra `[taskService] No se cargaron las tareas`, muestra un mensaje al usuario y desactiva la carga en `finally`. La recarga normal vuelve a consultar el mock. No hay endpoints, URL base, headers, tokens ni operaciones CRUD remotas.
