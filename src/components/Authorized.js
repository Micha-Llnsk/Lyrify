import { useEffect } from "react";
import useToken from "../hooks/useToken";

export default function Authorized({ children = [] }) {
  const [token, setToken] = useToken(null);

  const url = new URL("https://accounts.spotify.com/authorize");
  url.searchParams.set("client_id", process.env.REACT_APP_CLIENT_ID);
  url.searchParams.set("redirect_uri", `${window.location.href}playlists`);
  url.searchParams.set("response_type", "token");
  url.searchParams.set(
    "scope",
    "playlist-modify-private playlist-read-private user-read-private user-read-playback-state user-library-modify user-read-playback-position user-modify-playback-state playlist-modify-public user-follow-modify user-follow-read user-library-read user-top-read"
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const hash = url.hash;
    if (hash) {
      const token = hash.split("&")[0].split("=")[1];
      setToken(token);
    }
  }, [setToken]);

  return !token ? <a href={url.toString()}>Login</a> : children;
}
