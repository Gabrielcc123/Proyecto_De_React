import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import Tarjeta from './Tarjeta';
import './App.css';

// Endpoint público de TheMealDB (Punto 1 de la práctica)
const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a';

const destacados = [
  { id: 1, titulo: 'Spaghetti Carbonara', descripcion: 'Pasta italiana con huevo, queso y panceta.' },
  { id: 2, titulo: 'Tacos al Pastor', descripcion: 'Tortilla de maíz con cerdo adobado y piña.' },
  { id: 3, titulo: 'Ensalada César', descripcion: 'Lechuga romana, crutones, parmesano y aderezo césar.' },
];

function App() {
  // Estados para consumir la API (Puntos 3 y 4)
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para el contador global de favoritos
  const [favCount, setFavCount] = useState(0);

  // Estado para el formulario controlado
  const [formData, setFormData] = useState({ name: '', category: '', desc: '' });
  const [formMessage, setFormMessage] = useState({ text: '', type: '' });

  // Hace el GET y devuelve la lista normalizada, sin tocar el estado.
  // Así el useEffect solo actualiza el estado dentro de callbacks asíncronos.
  const getRecipes = async (simulateError = false) => {
    // Si simulateError es true, usamos una URL rota para demostrar el estado de error.
    const urlToFetch = simulateError
      ? 'https://www.themealdb.com/api/json/v1/1/url-invalida-error'
      : API_URL;

    const res = await fetch(urlToFetch);
    if (!res.ok) {
      throw new Error(`No se pudo conectar con el servidor (Código HTTP: ${res.status})`);
    }

    const data = await res.json();

    // Punto 2 de U3-1: mostrar los datos crudos en la consola.
    console.log('Datos crudos de TheMealDB (res.json()):', data);

    // Normalizamos la respuesta para que la lista sea más fácil de renderizar.
    return (data.meals || []).map((meal) => ({
      id: meal.idMeal,
      title: meal.strMeal,
      category: meal.strCategory,
      image: meal.strMealThumb,
      link: meal.strSource || `https://www.themealdb.com/meal/${meal.idMeal}`
    }));
  };

  // Punto 1 de U3-2: fetch dentro de useEffect, una sola vez al montar el componente.
  useEffect(() => {
    let cancelled = false;

    getRecipes()
      .then((formattedRecipes) => {
        if (cancelled) return;
        setRecipes(formattedRecipes);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Error capturado:', err);
        setRecipes([]);
        setError('No pudimos cargar las recetas. Revisa tu conexión a internet e inténtalo de nuevo.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // Evita actualizar el estado si el componente se desmonta antes de terminar.
    return () => {
      cancelled = true;
    };
  }, []);

  // Reintenta la carga mostrando de nuevo el estado "Cargando...".
  const handleRetry = (simulateError = false) => {
    setLoading(true);
    setError(null);

    getRecipes(simulateError)
      .then((formattedRecipes) => {
        setRecipes(formattedRecipes);
        setError(null);
      })
      .catch((err) => {
        console.error('Error capturado:', err);
        setRecipes([]);
        setError('No pudimos cargar las recetas. Revisa tu conexión a internet e inténtalo de nuevo.');
      })
      .finally(() => setLoading(false));
  };

  const handleToggleFavorite = (change) => {
    setFavCount((prevCount) => prevCount + change);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, category, desc } = formData;

    if (!name.trim() || !category.trim() || !desc.trim()) {
      setFormMessage({ text: '⚠️ Por favor, completa todos los campos antes de enviar.', type: 'error' });
      return;
    }

    setFormMessage({ text: `✅ ¡Gracias! La receta "${name.trim()}" ha sido enviada correctamente.`, type: 'exito' });
    setFormData({ name: '', category: '', desc: '' });
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
          <h2>Recetas desde TheMealDB</h2>

          {/* Botones de control para probar Carga y Error en vivo */}
          <div className="api-controls">
            <button type="button" className="btn" onClick={() => handleRetry(false)}>
              🔄 Recargar API
            </button>
            <button type="button" className="btn" onClick={() => handleRetry(true)}>
              ⚠️ Simular Falla
            </button>
          </div>

          {/* Punto 2 de U3-2: estado de CARGA visible */}
          {loading && (
            <div className="loading-container" role="status" aria-live="polite">
              <div className="spinner" aria-hidden="true"></div>
              <p>Cargando...</p>
              <span className="loading-detail">Consultando las recetas de TheMealDB</span>
            </div>
          )}

          {/* Punto 2 de U3-2: estado de ERROR con mensaje amigable y opción de reintentar */}
          {!loading && error && (
            <div className="error-container" role="alert">
              <p className="error-title">😕 Ups, algo salió mal</p>
              <p>{error}</p>
              <button type="button" className="btn" onClick={() => handleRetry(false)}>
                Reintentar
              </button>
            </div>
          )}

          {/* Punto 3 de U3-2: lista renderizada con .map() y key única (id) */}
          {!loading && !error && recipes.length === 0 && (
            <div className="empty-container" role="status">
              <p>No encontramos recetas para mostrar.</p>
              <button type="button" className="btn" onClick={() => handleRetry(false)}>
                Volver a intentar
              </button>
            </div>
          )}

          {!loading && !error && recipes.length > 0 && (
            <>
              <p className="results-count">Mostrando {recipes.length} recetas</p>
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