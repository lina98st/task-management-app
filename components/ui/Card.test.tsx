import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  it("renders its content", () => {
    render(<Card>Task overview</Card>);

    expect(screen.getByText("Task overview")).toBeInTheDocument();
  });

  it("accepts a custom className", () => {
    render(<Card className="custom-class">Task overview</Card>);

    expect(screen.getByText("Task overview")).toHaveClass("custom-class");
  });
});
