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
      {/* <Router> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres/:genre" element={<Genre />} />
        <Route path="/movies/:movie" element={<Movie />} />
        <Route path="/actors/:actor" element={<Actor />} />
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
