# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


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
- Hubo un caso en el CSS