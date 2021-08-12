import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Favorites from "./pages/Favorites.js";
import Artists from "./pages/Artists.js";
import Search from "./pages/Search.js";
import Playlists from "./pages/Playlists.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="header"></div>
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
              <Playlists />
            </Route>
            <Route path="*">
              <h2>No match</h2>
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
