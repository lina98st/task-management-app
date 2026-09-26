import { render, screen } from "@testing-library/react";
import Logo from "./Logo";

describe("Logo", () => {
  it("renders the app name", () => {
    render(<Logo />);

    expect(screen.getByText("Task Management App")).toBeInTheDocument();
  });

  it("links to the home page by default", () => {
    render(<Logo />);

    expect(
      screen.getByRole("link", { name: "Task Management App home" }),
    ).toHaveAttribute("href", "/");
  });

  it("accepts a custom href", () => {
    render(<Logo href="/dashboard" />);

    expect(
      screen.getByRole("link", { name: "Task Management App home" }),
    ).toHaveAttribute("href", "/dashboard");
  });
});
