import { useState, useEffect } from "react";
import useToken from "../hooks/useToken";
import "./Search.css";
import { Link } from "react-router-dom";

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
      });
  }, [search, token]);

  function renderSongs() {
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

  function handleChange(e) {
    const value = e.target.value;
    setSearch(value);
  }

  return (
    <div>
      <form className="Form" onChange={handleChange}>
        <input
          className="Input"
          type="search"
          placeholder="Search Artists/Songs"
          name="search"
          id="search"
        />
      </form>
      <ul>{renderSongs()}</ul>
    </div>
  );
}
