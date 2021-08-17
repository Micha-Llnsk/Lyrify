import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Favorites from "./pages/Favorites.js";
import Artists from "./pages/Artists.js";
import Search from "./pages/Search.js";
import Playlists from "./pages/Playlists.js";
import Footer from "./components/Footer.js";
import Login from "./pages/Login.js";

function App() {
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
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/artists">
              <Artists />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/playlists">
              <Playlists />
            </Route>
            <Route exact path="/">
              <Login />
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
