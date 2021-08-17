import { useState, useEffect } from "react";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);

  const hash = window.location.hash.substring(1);
  const params = {};

  hash.split("&").map((url) => {
    const keyPair = url.split("=");
    // params[keyPair[0]] = keyPair[1];
  });

  console.log(params);

  const { access_token } = params;

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPlaylists(data.items);
      });
  }, [access_token]);

  function renderPlaylists() {
    const ListOfPlaylists = playlists.map((playlist) => {
      return <li key={playlist.name}>{playlist.name}</li>;
    });
    return ListOfPlaylists;
  }

  return (
    <div>
      <ul>{renderPlaylists()}</ul>
    </div>
  );
}
