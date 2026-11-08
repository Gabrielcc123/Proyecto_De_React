import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'sabordb_favorites';

const FavoritesContext = createContext(null);

function readStoredFavorites() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readStoredFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(recipe) {
    setFavorites((current) => {
      const exists = current.some((item) => item.id === recipe.id);
      if (exists) {
        return current.filter((item) => item.id !== recipe.id);
      }
      return [...current, recipe];
    });
  }

  function isFavorite(id) {
    return favorites.some((item) => item.id === id);
  }

  const value = {
    favorites,
    favCount: favorites.length,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// El hook vive junto al Provider: es la API pública que pide la práctica.
// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === null) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
