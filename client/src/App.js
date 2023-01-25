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
        <Route path="/test" element={<TestPage />} />
        <Route path="/toprated" element={<TopRated />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;

// import React from "react";
// import { Link, Route, Routes, useLocation } from "react-router-dom";
// import Home from "./components/pages/Home";
// // import Actor from "./components/pages/Actor";
// import Movie from "./components/pages/Movie";
// // import Genre from "./components/pages/Genre";

// const About = () => <div>You are on the about page</div>;
// // const Home = () => <div>You are home</div>;
// const NoMatch = () => <div>No match</div>;

// export const LocationDisplay = () => {
//   const location = useLocation();

//   return <div data-testid="location-display">{location.pathname}</div>;
// };

// export const App = () => (
//   <div>
//     <Link to="/">Home</Link>

//     <Link to="/about">About</Link>

//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/movies/:movie" element={<Movie />} />
//       <Route path="/about" element={<About />} />

//       <Route path="*" element={<NoMatch />} />
//     </Routes>

//     <LocationDisplay />
//   </div>
// );

// export default App;
