import { NavLink } from "react-router-dom";
import "./Footer.css";
import library from "../icons/Library.svg";
import artists from "../icons/Artists.svg";
import bookmark from "../icons/Saved.svg";
import search from "../icons/Search.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <nav className="navigation">
        <NavLink to="/playlists">
          <img className="Nav--icon" src={library} alt="Playlists" />
        </NavLink>
        <NavLink to="/search">
          <img className="Nav--icon" src={search} alt="Search" />
        </NavLink>
        <NavLink to="/artists">
          <img className="Nav--icon" src={artists} alt="Artists" />
        </NavLink>
        <NavLink to="/favorites">
          <img className="Nav--icon" src={bookmark} alt="Favorites" />
        </NavLink>
      </nav>
    </footer>
  );
}
