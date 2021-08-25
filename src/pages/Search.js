import { useState, useEffect } from "react";
import useToken from "../hooks/useToken";

export default function Search() {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [token] = useToken();

  useEffect(() => {
    if (!search) {
      return;
    }
    setIsLoading(true);
    fetch(`https://api.spotify.com/v1/search?q=${search}&type=track%2Cartist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSongs(data.tracks.items);
        setIsLoading(false);
        console.log(data);
      });
  }, [search, token]);

  function renderSongs() {
    if (isLoading || songs === null) {
      return "Loading...";
    }
    const ListOfSongs = songs.map((song) => {
      return (
        <li key={song.id}>
          <img src={song.album.images[2].url} alt={song.album.name} />
          <p>Artists: {song.artists[0].name}</p>
          <p>Song: {song.name}</p>
          <p>Album: {song.album.name}</p>
        </li>
      );
    });
    return ListOfSongs;
  }

  function handleChange(e) {
    const value = e.target.value;
    setSearch(value);
  }

  return (
    <div>
      <form className="search" onChange={handleChange}>
        <input
          type="search"
          placeholder="Search Artists/Songs"
          name="search"
          id="search"
        />
      </form>
      <ul className="Songlist">{renderSongs()}</ul>
    </div>
  );
}
