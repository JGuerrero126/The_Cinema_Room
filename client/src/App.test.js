import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
// import { App, LocationDisplay } from "./app";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

test("landing on Home page (by text)", () => {
  const slashRoute = "/";

  render(
    <MemoryRouter initialEntries={[slashRoute]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Select A Genre/i)).toBeInTheDocument();
});

test("landing on Home page (by id)", () => {
  const slashRoute = "/";

  render(
    <MemoryRouter initialEntries={[slashRoute]}>
      <App />
    </MemoryRouter>
  );

  expect(document.getElementById("home-page")).toBeInTheDocument();
});

test("landing on Genre page", () => {
  const genreRoute = "/genres/35"; // this is the route for comedies

  render(
    <MemoryRouter initialEntries={[genreRoute]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Here are the top/i)).toBeInTheDocument();
});

// the movie page test has log errors
test("landing on Movie page", () => {
  const movieRoute = "/movies/1891"; // this is the route for The Empire Strikes Back

  render(
    <MemoryRouter initialEntries={[movieRoute]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Cast/i)).toBeInTheDocument();
});

test("landing on Actor page", () => {
  const actorRoute = "/actors/2"; // this is the route for Mark Hamill

  render(
    <MemoryRouter initialEntries={[actorRoute]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Actor Appearances/i)).toBeInTheDocument();
});

test("landing on Crew page", () => {
  const crewRoute = "/crew/491"; // this is the route for John Williams

  render(
    <MemoryRouter initialEntries={[crewRoute]}>
      <App />
    </MemoryRouter>
  );

  expect(document.getElementById("crew-page")).toBeInTheDocument();
});
