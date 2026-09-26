import { render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  it("renders with a placeholder", () => {
    render(<Input placeholder="Task title" />);

    expect(screen.getByPlaceholderText("Task title")).toBeInTheDocument();
  });

  it("renders a date input", () => {
    render(<Input type="date" aria-label="Due date" />);

    expect(screen.getByLabelText("Due date")).toHaveAttribute("type", "date");
  });
});
