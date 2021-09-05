import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useToken from "../hooks/useToken";
import "./SinglePlaylist.css";
import { Link } from "react-router-dom";

export default function SinglePlaylist() {
  const { playlistId } = useParams();
  const [token] = useToken();
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=ES&fields=items`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return Promise.all(
          data.items.map((url) => {
            return fetch(`${url.track.href}?market=ES`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then((res) => res.json());
          })
        )
          .then((data) => {
            setSongs(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, [playlistId, token]);

  function renderPlaylist() {
    if (isLoading || songs === null) {
      return "Loading...";
    }

    const ListOfSongs = songs.map((song) => {
      return (
        <li key={song.id}>
          <Link
            className="Link__search"
            to={`/lyrics?artist=${song.artists[0].name}&track=${song.name}`}
          >
            <img src={song.album.images[2].url} alt={song.album.name} />
            <div className="Link__search--info">
              <p className="Link__search--name">{song.name}</p>
              <p className="Link__search--sub">
                Artist: {song.artists[0].name}
              </p>
              <p className="Link__search--sub">Album: {song.album.name}</p>
            </div>
          </Link>
        </li>
      );
    });
    return ListOfSongs;
  }

  return (
    <div>
      <ul className="List">{renderPlaylist()}</ul>
    </div>
  );
}
