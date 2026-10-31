import { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import Tarjeta from './Tarjeta';
import './App.css';

// Paso 1 y 2: API pública del proyecto (TheMealDB, del dominio de recetas).
// El endpoint "search.php" devuelve un JSON con la lista de comidas.
const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

// Ejemplo de lista simple para el componente Tarjeta (props: titulo, descripcion)
const destacados = [
  { id: 1, titulo: 'Spaghetti Carbonara', descripcion: 'Pasta italiana con huevo, queso y panceta.' },
  { id: 2, titulo: 'Tacos al Pastor', descripcion: 'Tortilla de maíz con cerdo adobado y piña.' },
  { id: 3, titulo: 'Ensalada César', descripcion: 'Lechuga romana, crutones, parmesano y aderezo césar.' },
];

function App() {
  // Paso 3: Estado para el contador global de favoritos[cite: 2, 3]
  const [favCount, setFavCount] = useState(0);

  // Paso 3: Estado para el formulario controlado[cite: 2, 3]
  const [formData, setFormData] = useState({ name: '', category: '', desc: '' });
  const [formMessage, setFormMessage] = useState({ text: '', type: '' });

  // Paso 3: Estados para el consumo de datos (useState + useEffect)
  const [recipes, setRecipes] = useState([]);   // Recetas que llegan de la API
  const [loading, setLoading] = useState(true); // true mientras se espera la respuesta
  const [error, setError] = useState(null);     // Mensaje si la petición falla
  const [reloadKey, setReloadKey] = useState(0); // Cambiarlo vuelve a ejecutar el useEffect

  // Paso 2 y 3: GET a la API dentro de useEffect
  useEffect(() => {
    const controller = new AbortController();

    async function fetchRecipes() {
      setLoading(true);
      setError(null);

      try {
        // Paso 2: petición GET a la API pública
        const res = await fetch(API_URL, { signal: controller.signal });

        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}`);
        }

        // Paso 2: convertir la respuesta a JSON y mostrarla en la consola
        const data = await res.json();
        console.log('📦 Datos recibidos de TheMealDB:', data);

        // La API devuelve { meals: [...] } (o meals: null si no hay resultados)
        const meals = data.meals ?? [];

        // Adaptamos la forma de la API a la que espera <RecipeCard />
        const mappedRecipes = meals.slice(0, 12).map((meal) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          category: meal.strCategory ?? 'Sin categoría',
          image: meal.strMealThumb,
          link: `https://www.themealdb.com/meal/${meal.idMeal}`,
        }));

        // Paso 3: guardamos los datos en el estado para renderizarlos
        setRecipes(mappedRecipes);
      } catch (err) {
        // Si el componente se desmonta, fetch lanza AbortError: lo ignoramos
        if (err.name !== 'AbortError') {
          console.error('❌ Error al consumir la API:', err);
          setError('No se pudieron cargar las recetas. Revisa tu conexión e inténtalo de nuevo.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchRecipes();

    // Limpieza: cancela la petición si el componente se desmonta
    return () => controller.abort();
  }, [reloadKey]);

  // Función para actualizar el contador desde las tarjetas
  const handleToggleFavorite = (change) => {
    setFavCount((prevCount) => prevCount + change);
  };

  // Manejador genérico para los inputs del formulario
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Paso 4: Evento de envío del formulario (Validación de app.js migrada)[cite: 2, 3]
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, category, desc } = formData;

    if (!name.trim() || !category.trim() || !desc.trim()) {
      setFormMessage({ text: '⚠️ Por favor, completa todos los campos antes de enviar.', type: 'error' });
      return;
    }

    setFormMessage({ text: `✅ ¡Gracias! La receta "${name.trim()}" ha sido enviada correctamente.`, type: 'exito' });
    setFormData({ name: '', category: '', desc: '' }); // Limpia el formulario
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <h1>🍳 SaborDB</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#recetas">Recetas</a></li>
            <li><a href="#sugerir">Sugerir</a></li>
            {/* Se renderiza dinámicamente el estado del contador */}
            <li className="fav-counter-container">❤️ Favoritos: <span>{favCount}</span></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <section id="inicio" className="hero-section">
          <h2>Encuentra tus recetas favoritas</h2>
          <p>Explora miles de platillos utilizando la base de datos de TheMealDB.</p>
          <h3 style={{ marginTop: '24px', color: 'var(--text-h)' }}>También te puede gustar</h3>
          <div className="destacados-grid">
            {destacados.map((item) => (
              <Tarjeta key={item.id} titulo={item.titulo} descripcion={item.descripcion} />
            ))}
          </div>
        </section>

        <section id="recetas" className="recipes-section">
          <h2>Recetas Destacadas</h2>

          {/* Paso 4: Estado de carga */}
          {loading && (
            <div className="status-message" role="status">
              <span className="spinner" aria-hidden="true"></span>
              Cargando recetas desde TheMealDB...
            </div>
          )}

          {/* Paso 4: Estado de error (con opción de reintentar) */}
          {!loading && error && (
            <div className="status-message error" role="alert">
              <p>⚠️ {error}</p>
              <button
                type="button"
                className="btn"
                onClick={() => setReloadKey((prev) => prev + 1)}
              >
                Reintentar
              </button>
            </div>
          )}

          {/* Estado vacío: la petición funcionó pero no hay datos */}
          {!loading && !error && recipes.length === 0 && (
            <p className="status-message">No se encontraron recetas para mostrar.</p>
          )}

          {/* Paso 3: Renderiza la lista iterando el estado con map() */}
          {!loading && !error && recipes.length > 0 && (
            <>
              <p className="recipes-count">
                Mostrando {recipes.length} recetas obtenidas de la API.
              </p>
              <div className="recipes-grid">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        <section id="sugerir" className="form-section">
          <h2>Sugerir una nueva receta</h2>
          {/* Formulario controlado */}
          <form id="recipe-form" noValidate onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre del platillo:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Ej: Pizza Margarita" />
            </div>

            <div className="form-group">
              <label htmlFor="category">Categoría:</label>
              <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} placeholder="Ej: Pasta, Postres, etc." />
            </div>

            <div className="form-group">
              <label htmlFor="desc">Ingredientes clave:</label>
              <textarea id="desc" name="desc" rows="3" value={formData.desc} onChange={handleInputChange} placeholder="Ej: Harina, tomate, queso..."></textarea>
            </div>

            {/* Mensaje dinámico del formulario */}
            {formMessage.text && (
              <p className={`form-message ${formMessage.type}`} style={{ display: 'block' }}>
                {formMessage.text}
              </p>
            )}

            <button type="submit" className="btn">Enviar Sugerencia</button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Recetario de Cocina - Alimentado por <a href="https://www.themealdb.com/" target="_blank" rel="noreferrer">TheMealDB</a></p>
      </footer>
    </>
  );
}

export default App;