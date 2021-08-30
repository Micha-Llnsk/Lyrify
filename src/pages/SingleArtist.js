import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useToken from "../hooks/useToken";
import "./SingleArtist.css";
import { Link } from "react-router-dom";

export default function SingleArtist() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState([]);

  const [token] = useToken();

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setArtist(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [artistId, token]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSongs(data.tracks);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [artistId, token]);

  function renderArtist() {
    if (isLoading || artist === null) {
      return "Loading...";
    }
    let followNumb = artist.followers.total;
    return (
      <section className="artist__info">
        <h3>Artist: {artist.name}</h3>
        <img src={artist.images[1].url} alt={artist.name} />
        <p className="topSongs--sub">
          Followers: {followNumb.toLocaleString()}
        </p>
        <h2 className="topSongs--header">Popular Songs:</h2>
        <div className="Link__playlists--border"></div>
      </section>
    );
  }

  function renderSongs() {
    if (isLoading || songs === null) {
      return "Loading...";
    }
    const ListOfSongs = songs.map((song) => {
      return (
        <li key={song.id}>
          <Link className="topSongs__List">
            <img src={song.album.images[2].url} alt={song.album.name} />
            <div className="topSongs--info">
              <p className="topSongs--song">{song.name}</p>
              <p className="topSongs--sub">Popularity: {song.popularity}</p>
              <p className="topSongs--sub">Album: {song.album.name}</p>
            </div>
          </Link>
        </li>
      );
    });
    return ListOfSongs;
  }

  return (
    <>
      <div>
        {renderArtist()}
        <ul>{renderSongs()}</ul>
      </div>
    </>
  );
}
