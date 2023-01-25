import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
// import { App, LocationDisplay } from "./app";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { urlPrefix } from "./utils/constants";

var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)

// axios.get("/users").then(function (response) {
//   console.log(response.data);
// });

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

  mock.onGet("/users").reply(200, {
    users: [{ id: 1, name: "John Smith" }],
  });

  mock.onGet(urlPrefix + "/top-movies/").reply(200, {
    users: [{ id: 2, name: "Jane Smith" }],
  });

  // function doNothing() {}

  // async function wait() {
  //   setTimeout(doNothing, 2000);
  // }

  act(() => {
    render(
      <MemoryRouter initialEntries={[testRoute]}>
        <App />
      </MemoryRouter>
    );
  });

  // await wait();

  // act(()=>{

  // })

  // test axios call to jane smith
  await waitFor(() => {
    expect(screen.getByTestId("test-page")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText("testParam")).toBeInTheDocument();
  });
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
