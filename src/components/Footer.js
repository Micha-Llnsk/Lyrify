import { NavLink } from "react-router-dom";
import "./Footer.css";
import { ReactComponent as Library } from "../icons/Library.svg";
import { ReactComponent as Artists } from "../icons/Artists.svg";
import { ReactComponent as Favorites } from "../icons/Lyric.svg";
import { ReactComponent as Search } from "../icons/Search.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <nav className="navigation">
        <NavLink to="/playlists">
          <Library className="Icon" />
        </NavLink>
        <NavLink to="/search">
          <Search className="Icon--search" />
        </NavLink>
        <NavLink to="/artists">
          <Artists className="Icon" />
        </NavLink>
        <NavLink to="/favorites">
          <Favorites className="Icon" />
        </NavLink>
      </nav>
    </footer>
  );
}
