import "./App.css";
import Header from "./components/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Actor from "./components/pages/Actor";
import Movie from "./components/pages/Movie";
import Genre from "./components/pages/Genre";
import Movies from "./components/pages/Movies";
import Crew from "./components/pages/Crew";
import Watchlist from "./components/pages/Watchlist";
import TestPage from "./components/pages/TestPage";
import TopRated from "./components/pages/TopRated";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres/:genre" element={<Genre />} />
        <Route path="/movies/:movie" element={<Movie />} />
        <Route path="/actors/:actor" element={<Actor />} />
        <Route path="/movie/:type/:sort/:search" element={<Movies />} />
        <Route path="/crew/:member" element={<Crew />} />
        <Route path="/watchlist" element={<Watchlist />} />

        <Route path="/toprated" element={<TopRated />} />
        <Route path="/test/:testParam" element={<TestPage />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
