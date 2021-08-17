const Auth_url = "https://accounts.spotify.com/authorize";
const Redirect_url = "http://localhost:3000/playlists";
const Client_id = "4bf03788a9974f979220033e8e0b79cf";

function handleLogin() {
  const URL = `${Auth_url}?client_id=${Client_id}&redirect_uri=${Redirect_url}&response_type=token&show_dialog=true`;
  window.location.href = URL;
}

export default function Login() {
  return (
    <div>
      <button type="submit" onClick={handleLogin}>
        LOGIN to Spotify
      </button>
    </div>
  );
}
