import { useState } from 'react';

export default function RecipeCard({ recipe, onToggleFavorite }) {
  // Paso 3: Agrega estado local para saber si esta tarjeta es favorita
  const [isFavorite, setIsFavorite] = useState(false);

  // Paso 4: Conecta eventos para el botón
  const handleFavClick = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    // Replicamos la lógica de app.js: sumamos 1 si es favorito, restamos 1 si no[cite: 3]
    onToggleFavorite(newState ? 1 : -1); 
  };

  return (
    <article className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipe-info">
        <h3>{recipe.title}</h3>
        <p>Categoría: {recipe.category}</p>
        <div className="card-actions">
          <a href={recipe.link} target="_blank" rel="noreferrer" className="btn">Ver Receta</a>
          <button 
            className={`btn-fav ${isFavorite ? 'activo' : ''}`} 
            type="button"
            onClick={handleFavClick}
            style={{
              backgroundColor: isFavorite ? '#e74c3c' : '#ecf0f1',
              color: isFavorite ? '#fff' : '#333'
            }}
          >
            {isFavorite ? '❤️ Guardado' : '🤍 Me gusta'}
          </button>
        </div>
      </div>
    </article>
  );
}