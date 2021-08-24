import { useState, useEffect } from "react";
import useToken from "../hooks/useToken";

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [token] = useToken();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
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
      .catch(() => {
        setIsError(true);
      });
  }, [token]);

  function renderArtists() {
    if (isLoading || artists === null) {
      return "Loading...";
    }
    const ListOfArtists = artists.map((artist) => {
      return (
        <li key={artist.id}>
          <p>{artist.name}</p>
        </li>
      );
    });
    return ListOfArtists;
  }

  return <ul>{renderArtists()}</ul>;
}
