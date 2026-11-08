import { useFavorites } from './context/FavoritesContext.jsx';

export default function Header() {
  const { favCount } = useFavorites();

  return (
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
  );
}
