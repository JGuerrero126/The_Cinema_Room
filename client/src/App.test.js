import { render, screen } from "@testing-library/react";
import App from "./App";
import Home from "./components/pages/Home";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("renders The Cinema Room", () => {
  render(<App />);
  const elementWithSpecificText = screen.getByText(/The Cinema Room/i);
  expect(elementWithSpecificText).toBeInTheDocument();
});

it("renders Select A Genre in Home page", () => {
  act(() => {
    render(<Home />, container);
  });
  const elementWithSpecificText = screen.getByText(/Select A Genre/i);
  expect(elementWithSpecificText).toBeInTheDocument();
});

// it("renders Select A Genre in Home page", () => {
//   act(() => {
//     render(<Home />, container);
//   });
//   expect(container.textContent).toBe("Select A Genre");
// });
