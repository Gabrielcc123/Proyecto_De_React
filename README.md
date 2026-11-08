# 🍳 SaborDB — Recetario de Cocina (Versión React - Fase 1)

Aplicación Web de Página Única (SPA) construida con React. Este proyecto sirve como introducción práctica al desarrollo basado en componentes, permitiendo mostrar un catálogo de recetas y gestionar interactividad básica mediante el estado local.

## 📋 Metadatos del proyecto

| Campo | Valor | 
| ----- | ----- | 
| Proyecto | Recetario de Cocina (SaborDB - React) | 
| Fase actual | Fase 2: Consumo de datos y lista en pantalla | 
| Tecnologías | React, JSX, Vite, pnpm | 
| Conceptos clave | Componentes funcionales, `props`, `useState`, `useEffect`, `fetch`, renderizado de listas | 

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
│   ├── main.jsx             # Punto de anclaje de React al DOM
│   ├── RecipeCard.jsx       # Tarjeta de receta traída desde la API
│   └── Tarjeta.jsx          # Tarjeta simple para recetas destacadas
└── vite.config.js           # Configuración del empaquetador Vite
```

## 🚀 Conceptos aplicados en esta fase

En esta iteración del proyecto, estamos aislando la interfaz de usuario para entender cómo React dibuja la pantalla sin depender de un backend:

1. **Jerarquía de Componentes:** División de la interfaz en piezas reutilizables (como el componente padre `App` y componentes hijos como `Header`).

2. **Paso de propiedades (`props`):** Transferencia de datos desde el catálogo principal hacia cada tarjeta o componente individual.

3. **Manejo del Estado (`useState`):** Implementación de interactividad en cada tarjeta para marcar las recetas como "Favoritas" (Me gusta / No me gusta) de forma independiente.

4. **Renderizado de Listas:** Uso del método `.map()` de JavaScript para iterar sobre un arreglo de datos y generar elementos dinámicamente.

5. **Consumo de datos (`fetch` + `useEffect`):** Petición GET a una API pública al montar el componente, con estados de carga y error.

6. **Lista en pantalla:** Renderizado de la respuesta de la API con `.map()` y una `key` única por elemento (`idMeal`).

## 📚 Avance de las prácticas

| Práctica | Tema | Estado |
| -------- | ---- | ------ |
| U3-1 | Primer paso del consumo de datos (GET + `res.json()` en consola) | ✅ Completada |
| U3-2 | Convertir el GET en una lista real en pantalla | ✅ Completada |

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

---

## 🌐 Consumo de API (Práctica de la Semana U3-1)

En esta entrega se integró el consumo de datos reales de forma asíncrona en React utilizando `fetch`, `useEffect` y `useState`, incluyendo el manejo visual de estados de carga (`loading`) y error (`error`).

* **API Pública elegida:** [TheMealDB](https://www.themealdb.com/)
* **Documentación oficial:** `https://www.themealdb.com/api.php`
* **Endpoint utilizado (GET):** `https://www.themealdb.com/api/json/v1/1/search.php?s=a`
* **Archivo de implementación:** `src/App.jsx`

## 🖥️ Lista en pantalla (Práctica de la Semana U3-2)

En esta entrega el GET de la semana pasada se convirtió en una lista visible dentro de la aplicación:

1. Los datos se cargan con `fetch` dentro de un `useEffect` que se ejecuta una sola vez al montar `App`.
2. Se manejan los tres estados de la práctica:
   * **Datos:** `recipes` guarda la lista normalizada de recetas.
   * **Cargando:** `loading` muestra el spinner y el texto `Cargando...`.
   * **Error:** `error` muestra un mensaje amigable con un botón para **Reintentar**.
3. La lista se renderiza con `.map()` y cada tarjeta usa `meal.idMeal` como `key` única.
4. La pantalla incluye un estado vacío por si la API no devuelve recetas.
5. El avance quedó versionado en GitHub y documentado en este README.

* **Componente de la tarjeta:** `src/RecipeCard.jsx`
* **Botones de prueba:** **Recargar API** (muestra el estado de carga) y **Simular Falla** (muestra el estado de error).

*Nota: El proyecto consume la API pública directamente desde el frontend. La integración con una API REST propia y una base de datos se implementará en fases posteriores.*