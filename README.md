# Gestor de tareas — Taller de debugging y testing

Proyecto de 3.º año de Desarrollo de Software Multiplataforma. Permite gestionar tareas y practicar diagnóstico, corrección y pruebas sobre una aplicación existente. La versión corregida aborda seis incidencias del laboratorio.

## Requisitos y tecnologías
- Node.js 22.13 o superior según la guía original; entorno utilizado: 24.14.1, Windows y CMD.
- npm, Expo SDK 57, Expo Router ~57.0.29, React 19.2.3, React Native 0.86.3, TypeScript ~6.0.3.
- Jest 29.7 y Testing Library React Native para pruebas.
- No requiere servidor, base de datos, credenciales ni variables de entorno.

## Instalación y ejecución web
Desde la raíz del proyecto, con el `package-lock.json` generado durante la instalación y versionado junto al código:

```cmd
npm ci --legacy-peer-deps
npx expo start --web
```

Si todavía no existe el lockfile, usar `npm install --legacy-peer-deps` y conservar el archivo generado. Se utilizó esta opción por conflictos de dependencias peer durante la configuración; no implica que todos los riesgos de compatibilidad estén resueltos. La instalación limpia con `npm ci` queda por verificar.

Abrir la dirección que indique Expo. Para Android se necesita Expo Go compatible con SDK 57 o una development build del propio proyecto. El script `npm start` utiliza `--dev-client`; `npm run start:go` inicia Expo sin esa opción. La APK y la prueba Android están pendientes; no se debe reutilizar una APK incompatible de otro proyecto.

## Funcionalidades
- Listar tareas y mostrar contadores de pendientes y completadas.
- Buscar por título y filtrar por estado.
- Agregar, eliminar, completar y expandir tareas.
- Recargar datos y simular un error de servicio.
- Consultar la pantalla de guía.

Los cambios viven en memoria: recargar datos recupera las cinco tareas iniciales. No existe persistencia ni API HTTP real.

## Verificación
```cmd
npm test
npm run typecheck
npx expo-doctor
```
Resultados registrados: Jest 9/9, TypeScript sin errores; Expo Doctor 21/21 durante la configuración inicial, antes de los últimos cambios de dependencias. Repetir Doctor al cierre. Ver [pruebas](docs/pruebas.md).

## Estructura
```text
app/                 # Pantallas y rutas
src/components/      # TaskCard y StatusTabs
src/services/        # Servicio simulado
src/types/           # Modelos TypeScript
src/utils/           # Búsqueda y validación
__tests__/           # Pruebas automatizadas
docs/                # Documentación técnica
evidencias/          # Capturas del laboratorio
```

## Documentación
- [Guía del laboratorio](GUIA_ESTUDIANTES.md)
- [Informe de incidencias](INFORME_INCIDENTES.md)
- [Requisitos](docs/requisitos.md)
- [Arquitectura](docs/arquitectura.md)
- [Contrato del servicio](docs/api.md)
- [Pruebas](docs/pruebas.md)
- [Decisiones técnicas](docs/decisiones/ADR-001.md)
- [Historial de cambios](CHANGELOG.md)

Estudiante: Ramiro Fleitas. Proyecto académico; licencia de distribución no especificada.
