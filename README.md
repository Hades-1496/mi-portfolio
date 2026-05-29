# Mi Portfolio Personal

## Descripción del proyecto
Portfolio personal que presenta mis proyectos, habilidades, estudios y experiencia laboral (Hades Otero). Construido usando React y React Router para la navegación entre secciones, e integración de peticiones a la API de GitHub para listar mis repositorios públicos.

## Estado de Requisitos (Midterm)

Basado en el feedback recibido, actualmente el portfolio cubre y requiere las siguientes adaptaciones:

- [x] **Estructura modular** (`components/`, `routes/`, etc.)
- [x] **React Router v7** con enlaces de navegación
- [x] **Hooks básicos de React** (`useState`, `useEffect`, `useMemo` activos)
- [x] **Búsqueda / Filtrado** (Implementado buscador dinámico por nombre de repositorio en Proyectos)
- [x] **Responsive ~1024px** (Pantallas grandes cubiertas)
- [x] **Context API + Fetch API Externa** (Centralizada la llamada a GitHub globalmente mediante GithubContext)
- [x] **Rutas dinámicas con params `:id`** (Creada vista modal detallada para proyectos individuales combinando useParams y useNavigate)
- [x] **CSS Modules** (Migrados todos los estilos *inline* en componentes a hojas locales con extensión `.module.css`)
- [x] **Responsive ~600px** (Implementado mediante media queries CSS, eliminando comprobaciones innecesarias con JS)
- [x] **Testing Unitario** (Añadidos tests comprobando estados asíncronos y mocks con Vitest)
- [ ] **Deploy** (Por configurar y subir a GitHub Pages)

## Tecnologías Principales
- **React** + **Vite**
- **React Router DOM**
- **Vitest y Testing Library**
- **GitHub REST API**

## Instalación y ejecución local

1. Clona el repositorio.
2. Instala las dependencias ejecutando `npm install`.
3. Inicia el servidor de desarrollo local usando `npm run dev`.
4. Abre tu navegador en la URL indicada por Vite (suele ser http://localhost:5173).

## Arquitectura del Proyecto

```text
segundo-proyecto/
├── src/
│   ├── components/
│   │   └── Navegador.jsx         # Menú de navegación
│   ├── hooks/
│   │   └── useFetch.jsx          # Hook personalizado para consultas a la API
│   ├── routes/
│   │   ├── Contacto.jsx          # Sección de información de contacto
│   │   ├── Experiencia.js        # Datos de experiencia laboral y carreras
│   │   ├── GithubContext.jsx     # Proveedor de estado global para la API
│   │   └── Resultado.jsx         # Renderizado principal de proyectos y vistas dinámicas
│   ├── tests/
│   │   ├── Contacto.test.jsx     # Pruebas de la sección de contacto
│   │   └── GithubContext.test.jsx# Pruebas de los estados y carga de la API
│   ├── App.css
│   ├── App.jsx                   # Estructura principal y cabecera
│   ├── index.css                 # Estilos globales del documento
│   └── main.jsx                  # Punto de entrada, Providers y enrutador principal
├── .env                          # Variable de entorno con la URL de la API de GitHub
├── package.json                  # Dependencias y scripts de ejecución
├── README.md                     # Documentación general y feedback
└── vite.config.js                # Configuración del entorno de Vite y Vitest
```

## Uso de la AI

### Uso general:
Bajo este proyecto, mantuve una filosofía bastante concisa para agilizar el trabajo:

- Usé una plantilla hecha por la propia IA para empezar a trabajar con el proyecto.
- Todo lo que dependía de CSS, incluyendo los atributos "style" del HTLMX, están implementados por la IA, bajo mi supervisión y revisión.
- Por cada implementación nueva, solicité ejemplos para familiarizarme.
- Si tardo más de media hora, consulto la IA.

### Consulta
Ante la consulta de la IA tras los errores, mantenía una fórmula para la revisión de mi programación:

Explicación del error ocurrido y cuándo ha ocurrido.
```Sección de error en el inspector o el terminal```
Lista de archivos que puedan estar implicados:

- Nombre del archivo.
```Código del archivo```

Asímismo, si el error era visual, se compartía una captura y se referenciaba esa misma captura en la introducción del error.

### Uso de otras fuentes
Igualmente, también he usado de referecia material de la propia clase y de las propias entregas realizadas.


### Problemas que he encontrado usando la IA:
- Para el uso de CSS, a pesar de que no había código que usase sin su manipulación, aumentaba desajustes en vez de hallar el problema.