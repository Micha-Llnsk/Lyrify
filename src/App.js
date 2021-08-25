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

function App() {
  const [, , clearToken] = useToken();
  return (
    <Router>
      <div className="App">
        <header className="App__header">
          <Switch>
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
            <Route exact path="/">
              <h2 className="header">Playlists</h2>
            </Route>
            <Route path="*">
              <h2>No match</h2>
            </Route>
          </Switch>
        </header>
        <main className="content">
          <Switch>
            <Route path="/playlists/:playlistId">
              <SinglePlaylist />
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
              <Search />
            </Route>
            <Route path="/playlists">
              <Authorized>
                <Playlists />
              </Authorized>
            </Route>
            <Route exact path="/">
              <Authorized>
                You are logged in
                <button onClick={() => clearToken()}>Log Out</button>
              </Authorized>
            </Route>
            <Route path="*">
              <p>Wrong URL, try a different one ;)</p>
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
