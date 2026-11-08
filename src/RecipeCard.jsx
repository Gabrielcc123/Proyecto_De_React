import { useFavorites } from './context/FavoritesContext.jsx';

export default function RecipeCard({ recipe }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const active = isFavorite(recipe.id);

  return (
    <article className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipe-info">
        <h3>{recipe.title}</h3>
        <p>Categoría: {recipe.category}</p>
        <div className="card-actions">
          <a href={recipe.link} target="_blank" rel="noreferrer" className="btn">Ver Receta</a>
          <button
            className={`btn-fav ${active ? 'activo' : ''}`}
            type="button"
            onClick={() => toggleFavorite(recipe)}
            style={{
              backgroundColor: active ? '#e74c3c' : '#ecf0f1',
              color: active ? '#fff' : '#333'
            }}
          >
            {active ? '❤️ Guardado' : '🤍 Me gusta'}
          </button>
        </div>
      </div>
    </article>
  );
}
