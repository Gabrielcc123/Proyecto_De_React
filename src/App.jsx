import { useState } from 'react';
import RecipeCard from './RecipeCard';
import Tarjeta from './Tarjeta';
import './App.css';

// Paso 2: Un arreglo de datos (extraído de tu index.html)[cite: 2, 4]
const recipesData = [
  {
    id: 1,
    title: 'Spaghetti alla carbonara',
    category: 'Italian',
    image: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
    link: 'https://www.themealdb.com/meal/52982'
  },
  {
    id: 2,
    title: 'Beef Sunday Roast',
    category: 'Beef',
    image: 'https://www.themealdb.com/images/media/meals/ssrrrs1503664277.jpg',
    link: 'https://www.themealdb.com/meal/52824'
  },
  {
    id: 3,
    title: 'Teriyaki Chicken Casserole',
    category: 'Chicken',
    image: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    link: 'https://www.themealdb.com/meal/52772-teriyaki-chicken-casserole-recipe'
  }
];

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
          <div className="recipes-grid">
            {/* Paso 2: Renderiza la lista iterando el arreglo con map()[cite: 2] */}
            {recipesData.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onToggleFavorite={handleToggleFavorite} 
              />
            ))}
          </div>
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