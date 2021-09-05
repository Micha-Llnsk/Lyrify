import { useState, useEffect } from "react";
import useToken from "../hooks/useToken";
import "./Playlists.css";
import { Link } from "react-router-dom";
import placeholder from "../icons/placeholder.svg";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [token] = useToken();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPlaylists(data.items);
        setIsLoading(false);
      });
  }, [token]);

  function renderPlaylists() {
    if (isLoading || playlists === null) {
      return "Loading...";
    }

    const ListOfPlaylists = playlists.map((playlist) => {
      return (
        <li key={playlist.id}>
          <Link className="Link__playlists" to={`/playlists/${playlist.id}`}>
            <picture>
              <source srcSet={playlist.images[2]?.url} />
              <img src={placeholder} alt={playlist.name} />
            </picture>
            <div className="Link__playlists--info">
              <p className="Link__playlists--name">{playlist.name}</p>
              <p className="Link__playlists--sub">
                Owner: {playlist.owner.display_name}
              </p>
              <p className="Link__playlists--sub">
                Songs: {playlist.tracks.total}
              </p>
            </div>
          </Link>
          <div className="Link__playlists--border"></div>
        </li>
      );
    });
    return ListOfPlaylists;
  }
  return <ul className="List">{renderPlaylists()}</ul>;
}
