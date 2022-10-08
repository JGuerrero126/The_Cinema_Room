import "./App.css";
import Header from "./components/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Actor from "./components/pages/Actor";
import Movie from "./components/pages/Movie";
import Genre from "./components/pages/Genre";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genres/:genre" element={<Genre />} />
          <Route path="/movies/:movie" element={<Movie />} />
          <Route path="/actors/:actor" element={<Actor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
