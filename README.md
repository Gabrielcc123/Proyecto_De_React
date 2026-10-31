# 🍳 SaborDB — Recetario de Cocina (Versión React - Fase 2)

Aplicación Web de Página Única (SPA) construida con React. En esta fase el catálogo de recetas deja de ser estático: los datos se obtienen en tiempo real desde la API pública **TheMealDB** mediante `fetch` + `useEffect`, y se renderizan con `useState`, incluyendo estados de carga y error.

## 📋 Metadatos del proyecto

| Campo | Valor | 
| ----- | ----- | 
| Proyecto | Recetario de Cocina (SaborDB - React) | 
| Fase actual | Fase 2: Primer paso del consumo de datos (API) |
| Tecnologías | React, JSX, Vite, pnpm, Fetch API |
| API pública | [TheMealDB](https://www.themealdb.com/) |
| Conceptos clave | Componentes funcionales, `props`, `useState`, `useEffect`, `fetch`, estados de carga y error |

## 📁 Estructura inicial del proyecto

Esta es la estructura de archivos actual del proyecto, generada con Vite:

```text
.
├── eslint.config.js         # Configuración de linting
├── index.html               # Plantilla base y punto de entrada
├── package.json             # Dependencias y scripts del proyecto
├── pnpm-lock.yaml           # Archivo de bloqueo de versiones de pnpm
├── public/                  # Archivos estáticos públicos
│   ├── favicon.svg
│   └── icons.svg
├── README.md                # Documentación del proyecto
├── src/                     # Código fuente de la aplicación
│   ├── App.css              # Estilos específicos del componente App
│   ├── App.jsx              # Componente principal / Contenedor
│   ├── assets/              # Recursos gráficos e imágenes
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── Header.jsx           # Componente de cabecera
│   ├── index.css            # Estilos globales
│   └── main.jsx             # Punto de anclaje de React al DOM
└── vite.config.js           # Configuración del empaquetador Vite
```

## 🚀 Conceptos aplicados en esta fase

En esta iteración del proyecto, estamos aislando la interfaz de usuario para entender cómo React dibuja la pantalla sin depender de un backend:

1. **Jerarquía de Componentes:** División de la interfaz en piezas reutilizables (como el componente padre `App` y componentes hijos como `Header`).

2. **Paso de propiedades (`props`):** Transferencia de datos desde el catálogo principal hacia cada tarjeta o componente individual.

3. **Manejo del Estado (`useState`):** Implementación de interactividad en cada tarjeta para marcar las recetas como "Favoritas" (Me gusta / No me gusta) de forma independiente.

4. **Renderizado de Listas:** Uso del método `.map()` de JavaScript para iterar sobre el arreglo de recetas y generar elementos dinámicamente.

5. **Consumo de datos con `fetch`:** Petición `GET` a una API pública desde `useEffect`, conversión de la respuesta con `res.json()` y almacenamiento en el estado con `useState`.

## 🌐 Consumo de datos (API)

En esta fase la sección **Recetas Destacadas** ya no usa datos escritos a mano: se alimenta de la API pública **[TheMealDB](https://www.themealdb.com/)**.

**URL de la API utilizada:**

```text
https://www.themealdb.com/api/json/v1/1/search.php?s=
```

- No requiere API key ni registro.
- Devuelve un objeto JSON con la forma `{ "meals": [ ... ] }`.
- Cada receta incluye `idMeal`, `strMeal`, `strCategory`, `strMealThumb`, etc.

**Ejemplo simplificado de la respuesta:**

```json
{
  "meals": [
    {
      "idMeal": "53322",
      "strMeal": "Flan",
      "strCategory": "Dessert",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/...jpg"
    }
  ]
}
```

**Qué hace el código (`src/App.jsx`):**

1. Define la constante `API_URL` con la URL anterior.
2. Dentro de `useEffect`, hace `fetch(API_URL)`, valida `res.ok` y convierte la respuesta con `res.json()`.
3. Muestra la respuesta completa en la consola del navegador con `console.log(...)` (F12 → pestaña *Console*).
4. Adapta cada receta al formato que espera `<RecipeCard />` y la guarda con `setRecipes(...)`.
5. Renderiza la lista con `.map()`.

**Estados manejados:**

| Estado | Variable | Qué se muestra |
| ------ | -------- | -------------- |
| Cargando | `loading` | Spinner y mensaje "Cargando recetas..." |
| Error | `error` | Mensaje de error y botón **Reintentar** |
| Sin resultados | `recipes.length === 0` | Mensaje "No se encontraron recetas" |
| Éxito | `recipes` | Grilla de tarjetas con los datos de la API |

## 💻 Instrucciones de instalación y ejecución

Para correr este proyecto en tu entorno local, asegúrate de tener Node.js y `pnpm` instalados, luego sigue estos pasos:

1. **Clonar el repositorio** (o descargar los archivos):

   ```bash
   git clone <url-del-repositorio>
   cd sabordb-react
   ```

2. **Instalar las dependencias:**

   ```bash
   pnpm install
   ```

3. **Iniciar el servidor de desarrollo:**

   ```bash
   pnpm run dev
   ```

4. **Ver la aplicación:**
   Abre tu navegador e ingresa a `http://localhost:5173`.

*Nota: En esta fase el frontend ya consume datos reales de TheMealDB mediante `fetch`. La integración con un backend/base de datos propia y el resto de funcionalidades se implementarán en fases posteriores.*