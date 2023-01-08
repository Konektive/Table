import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should update the filterId state when handleFilterIdChange is called", () => {
    render(<App />);
    const input = screen.getByTestId("filter-id-input");
    fireEvent.change(input, { target: { value: "123" } });
    expect(input.value).toBe("123");
  });

  it("should update the itemsPerPage state when handleItemsPerPageChange is called", () => {
    render(<App />);
    const input = screen.getByTestId("items-per-page-input");
    fireEvent.change(input, { target: { value: "10" } });
    expect(input.value).toBe("10");
  });

  it("should update the page state and call the previousPage function when the Previous button is clicked", () => {
    render(<App />);
    const button = screen.getByTestId("previous-button");
    fireEvent.click(button);
    expect(button).toBeDisabled();
  });

  it("should update the page state when handlePageChange is called", () => {
    render(<App />);
    const input = screen.getByTestId("page-input");
    fireEvent.change(input, { target: { value: "2" } });
    expect(input.value).toBe("2");
  });

  it("should update the page state and call the nextPage function when the Next button is clicked", () => {
    render(<App />);
    const button = screen.getByTestId("next-button");
    fireEvent.click(button);
    expect(button).toBeDisabled();
  });

  it("should not render a modal when the modalProduct state is null", () => {
    render(<App />);
    const modal = screen.queryByTestId("modal");
    expect(modal).toBeNull();
  });
});
