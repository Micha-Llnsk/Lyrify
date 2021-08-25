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
        <li className="List__Item" key={playlist.id}>
          <img src={playlist.images[2]?.url} alt={playlist.name} />

          <Link to={`/playlists/${playlist.id}`}>
            <p>{playlist.name}</p>
            <p>Songs: {playlist.tracks.total}</p>
          </Link>
        </li>
      );
    });
    return ListOfPlaylists;
  }
  /*
  <li className="App__List--Item" key={char.id}>
          <img src={char.image} alt={char.name} />
          <Link to={`/character/${char.id}`}>
            <h2>{char.name}</h2>
          </Link>
        </li>
  */

  return <ul className="List">{renderPlaylists()}</ul>;
}
