import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useToken from "../hooks/useToken";
import "./SinglePlaylist.css";

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
          .then((values) => {
            setSongs(values);
            console.log(values);
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
          <p className="Link__playlist--name">{song.name}</p>
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
