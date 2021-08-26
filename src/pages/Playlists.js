import { useState, useEffect } from "react";
import useToken from "../hooks/useToken";
import "./Playlists.css";
import { Link } from "react-router-dom";

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
          <Link className="Link" to={`/playlists/${playlist.id}`}>
            <img src={playlist.images[2]?.url} alt={playlist.name} />
            <div className="Link__info">
              <p className="Link__name">{playlist.name}</p>
              <p className="Link__sub">Owner: {playlist.owner.display_name}</p>
              <p className="Link__sub">Songs: {playlist.tracks.total}</p>
            </div>
          </Link>
          <div className="Link__border"></div>
        </li>
      );
    });
    return ListOfPlaylists;
  }
  return <ul className="List">{renderPlaylists()}</ul>;
}
