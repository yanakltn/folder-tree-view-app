import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("It should allow modifications for input", () => {
  render(<App />);
  const searchInput = screen.getByTestId("search-input") as HTMLInputElement;
  fireEvent.change(searchInput, { target: { value: "Doom" } });
  expect(searchInput.value).toBe("Doom");
});

test("It should correctly search file in the file system", () => {
  render(<App />);
  const searchInput = screen.getByTestId("search-input") as HTMLInputElement;
  fireEvent.change(searchInput, { target: { value: "Doom" } });

  expect(screen.getByText("Doom.exe")).toBeInTheDocument();
  expect(screen.getByText("Games")).toBeInTheDocument();
  expect(screen.getByText("Program Files")).toBeInTheDocument();
});

test("It should correctly search directory in the file system", () => {
  render(<App />);
  const searchInput = screen.getByTestId("search-input") as HTMLInputElement;
  fireEvent.change(searchInput, { target: { value: "Games" } });

  expect(screen.getByText("Games")).toBeInTheDocument();
  expect(screen.getByText("Program Files")).toBeInTheDocument();
});

test("It should hide unrelated files to the search", () => {
  render(<App />);
  const searchInput = screen.getByTestId("search-input") as HTMLInputElement;
  fireEvent.change(searchInput, { target: { value: "Doom" } });

  expect(screen.queryByText("Work")).not.toBeInTheDocument();
  expect(screen.queryByText("Sims2.exe")).not.toBeInTheDocument();
  expect(screen.queryByText("Sims3.exe")).not.toBeInTheDocument();
});
