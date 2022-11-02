import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
// import { App, LocationDisplay } from "./app";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

// test("full app rendering/navigating", () => {
//   render(<App />, { wrapper: BrowserRouter });
//   // const user = userEvent.setup();

//   // verify page content for default route
//   expect(screen.getByText(/Select A Genre/i)).toBeInTheDocument();

//   // verify page content for expected route after navigating
//   // await user.click(screen.getByText(/about/i));
//   // expect(screen.getByText(/Select A Genre/i)).toBeInTheDocument();
// });

test("landing on Home page", () => {
  const slashRoute = "/";

  render(
    <MemoryRouter initialEntries={[slashRoute]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Select A Genre/i)).toBeInTheDocument();
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
