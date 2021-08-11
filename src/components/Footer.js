import { NavLink } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <nav className="navigation">
        <NavLink to="/playlists">Playlists</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/artists">Artists</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </nav>
    </footer>
  );
}
