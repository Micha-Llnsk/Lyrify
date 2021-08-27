import { useState, useEffect } from "react";
import useToken from "../hooks/useToken";
import { Link } from "react-router-dom";
import "./Artists.css";

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [token] = useToken();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.spotify.com/v1/me/following?type=artist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setArtists(data.artists.items);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  function renderArtists() {
    if (isLoading || artists === null) {
      return "Loading...";
    }
    const ListOfArtists = artists.map((artist) => {
      return (
        <li key={artist.id}>
          <Link className="Link__artists">
            <img
              className="Link__artists--image"
              src={artist.images[1]?.url}
              alt={artist.name}
            />
            <p className="Link__artists--name">{artist.name}</p>
            <p className="Link__artists--sub">
              Followers: {artist.followers.total}
            </p>
          </Link>
        </li>
      );
    });
    return ListOfArtists;
  }

  return <ul className="Grid">{renderArtists()}</ul>;
}
