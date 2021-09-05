import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Favorites from "./pages/Favorites.js";
import Artists from "./pages/Artists.js";
import Search from "./pages/Search.js";
import Playlists from "./pages/Playlists.js";
import Footer from "./components/Footer.js";
import useToken from "./hooks/useToken.js";
import Authorized from "./components/Authorized";
import SinglePlaylist from "./pages/SinglePlaylist.js";
import SingleArtist from "./pages/SingleArtist.js";
import Lyrics from "./pages/Lyrics.js";
import { useLocation } from "react-router";

function Playlist() {
  const params = new URLSearchParams(useLocation().search);
  const playlist = params.get("playlist");
  return <h2 className="header">{playlist}</h2>;
}

function Artist() {
  const params = new URLSearchParams(useLocation().search);
  const artist = params.get("artist");
  return <h2 className="header">{artist}</h2>;
}

function App() {
  const [, , clearToken] = useToken();
  return (
    <Router>
      <div className="App">
        <header className="App__header">
          <Switch>
            <Route
              path="/playlists/:playlistId"
              children={<Playlist />}
            ></Route>
            <Route path="/artists/:artistId" children={<Artist />}></Route>
            <Route path="/playlists">
              <h2 className="header">Playlists</h2>
            </Route>
            <Route path="/search">
              <h2 className="header">Search</h2>
            </Route>
            <Route path="/artists">
              <h2 className="header">Artists</h2>
            </Route>
            <Route path="/favorites">
              <h2 className="header">Favorites</h2>
            </Route>
            <Route exact path="/lyrics">
              <h2 className="header">Lyrics</h2>
            </Route>
            <Route exact path="/">
              <h2 className="header">LYRIFY</h2>
            </Route>
            <Route path="*">
              <h2>No match</h2>
            </Route>
          </Switch>
        </header>
        <main className="content">
          <Switch>
            <Route path="/playlists/:playlistId">
              <Authorized>
                <SinglePlaylist />
              </Authorized>
            </Route>
            <Route path="/artists/:artistId">
              <Authorized>
                <SingleArtist />
              </Authorized>
            </Route>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/artists">
              <Authorized>
                <Artists />
              </Authorized>
            </Route>
            <Route path="/search">
              <Authorized>
                <Search />
              </Authorized>
            </Route>
            <Route path="/playlists">
              <Authorized>
                <Playlists />
              </Authorized>
            </Route>
            <Route path="/lyrics">
              <Authorized>
                <Lyrics />
              </Authorized>
            </Route>
            <Route exact path="/">
              <Authorized>
                <div className="login__page">
                  <p>Your Token has timed out, logout to login again</p>
                  <button
                    className="button__logout"
                    onClick={() => clearToken()}
                  >
                    Log Out
                  </button>
                </div>
              </Authorized>
            </Route>
            <Route path="*">
              <p>Wrong URL, try a different one</p>
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
