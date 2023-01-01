import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
// import { App, LocationDisplay } from "./app";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

// test("landing on Home page", () => {
//   const slashRoute = "/";

//   render(
//     <MemoryRouter initialEntries={[slashRoute]}>
//       <App />
//     </MemoryRouter>
//   );

//   expect(screen.getByTestId("home-page")).toBeInTheDocument();
// });

// test("landing on Genre page", async () => {
//   const genreRoute = "/genres/35"; // this is the route for comedies

//   render(
//     <MemoryRouter initialEntries={[genreRoute]}>
//       <App />
//     </MemoryRouter>
//   );

//   expect(screen.getByTestId("genre-page")).toBeInTheDocument();
// });

test("landing on Test page", async () => {
  const testRoute = "/test/28"; // 28 is the genre number for "action"

  // function doNothing() {}

  // async function wait() {
  //   setTimeout(doNothing, 2000);
  // }

  await render(
    <MemoryRouter initialEntries={[testRoute]}>
      <App />
    </MemoryRouter>
  );

  // await wait();

  expect(screen.getByTestId("test-page")).toBeInTheDocument();
});

// test("landing on Movie page", () => {
//   const movieRoute = "/movies/1891"; // this is the route for The Empire Strikes Back

//   render(
//     <MemoryRouter initialEntries={[movieRoute]}>
//       <App />
//     </MemoryRouter>
//   );

//   expect(screen.getByTestId("movie-page")).toBeInTheDocument();
// });

// test("landing on Actor page", () => {
//   const actorRoute = "/actors/2"; // this is the route for Mark Hamill

//   render(
//     <MemoryRouter initialEntries={[actorRoute]}>
//       <App />
//     </MemoryRouter>
//   );

//   expect(screen.getByTestId("actor-page")).toBeInTheDocument();
// });

// test("landing on Movies page", () => {
//   const moviesRoute = "/movie/1/star%20wars"; // this is the route for a search for "star wars"

//   render(
//     <MemoryRouter initialEntries={[moviesRoute]}>
//       <App />
//     </MemoryRouter>
//   );

//   expect(screen.getByTestId("movies-page")).toBeInTheDocument();
// });

// test("landing on Crew page", () => {
//   const crewRoute = "/crew/491"; // this is the route for John Williams

//   render(
//     <MemoryRouter initialEntries={[crewRoute]}>
//       <App />
//     </MemoryRouter>
//   );

//   expect(screen.getByTestId("crew-page")).toBeInTheDocument();
// });
