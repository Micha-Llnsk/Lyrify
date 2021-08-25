import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useToken from "../hooks/useToken";

export default function SinglePlaylist() {
  const { playlistId } = useParams();
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [token] = useToken();

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
        setSongs(data.items);
        setIsLoading(false);
      });
  }, [playlistId, token]);

  function renderPlaylist() {
    if (isLoading || songs === null) {
      return "Loading...";
    }

    const ListOfSongs = songs.map((song) => {
      return (
        <li className="List__Item" key={song.track.href}>
          <p>{song.track.name}</p>
        </li>
      );
    });
    return ListOfSongs;
  }

  return <ul className="List">{renderPlaylist()}</ul>;
}
