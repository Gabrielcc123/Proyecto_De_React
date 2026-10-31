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

  // Función para obtener los datos de la API
  const fetchRecipes = async (simulateError = false) => {
    try {
      setLoading(true);
      setError(null);

      // Pausa de 2 segundos para que se aprecie el estado de carga (loading) en pantalla
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Si simulateError es true, usamos una URL rota para demostrar el Punto 4 (estado de error)
      const urlToFetch = simulateError 
        ? 'https://www.themealdb.com/api/json/v1/1/url-invalida-error' 
        : API_URL;

      const res = await fetch(urlToFetch);
      if (!res.ok) {
        throw new Error(`No se pudo conectar con el servidor (Código HTTP: ${res.status})`);
      }

      const data = await res.json();

      // Punto 2: Mostrar los datos en la consola
      console.log('Datos crudos de TheMealDB (res.json()):', data);

      const formattedRecipes = (data.meals || []).map((meal) => ({
        id: meal.idMeal,
        title: meal.strMeal,
        category: meal.strCategory,
        image: meal.strMealThumb,
        link: meal.strSource || `https://www.themealdb.com/meal/${meal.idMeal}`
      }));

      setRecipes(formattedRecipes);
    } catch (err) {
      console.error('Error capturado:', err);
      setError('Error al cargar las recetas desde TheMealDB. Verifica tu conexión o la URL de la API.');
    } finally {
      setLoading(false);
    }
  };

  // Punto 3: Se ejecuta automáticamente al cargar la página
  useEffect(() => {
    fetchRecipes(false);
  }, []);

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
          <h2>Recetas Destacadas</h2>

          {/* Botones de control para probar Carga y Error en vivo */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '24px' }}>
            <button type="button" className="btn" onClick={() => fetchRecipes(false)}>
              🔄 Recargar API (Ver Carga)
            </button>
            <button type="button" className="btn" onClick={() => fetchRecipes(true)}>
              ⚠️ Simular Falla (Ver Error)
            </button>
          </div>

          {/* Punto 4: Estado de CARGA visible */}
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Cargando recetas desde TheMealDB...</p>
            </div>
          )}

          {/* Punto 4: Estado de ERROR visible */}
          {!loading && error && (
            <div className="form-message error" style={{ maxWidth: '480px', margin: '20px auto' }}>
              <p>❌ {error}</p>
            </div>
          )}

          {/* Punto 3: Renderizar la lista cuando terminó de cargar sin errores */}
          {!loading && !error && (
            <div className="recipes-grid">
              {recipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onToggleFavorite={handleToggleFavorite} 
                />
              ))}
            </div>
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