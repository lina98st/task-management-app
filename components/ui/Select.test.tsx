import { render, screen } from "@testing-library/react";
import Select from "./Select";

describe("Select", () => {
  it("renders its options", () => {
    render(
      <Select aria-label="Task status">
        <option value="todo">To do</option>
        <option value="done">Done</option>
      </Select>,
    );

    expect(screen.getByRole("option", { name: "To do" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Done" })).toBeInTheDocument();
  });

  it("uses the provided default value", () => {
    render(
      <Select aria-label="Task status" defaultValue="done">
        <option value="todo">To do</option>
        <option value="done">Done</option>
      </Select>,
    );

    expect(screen.getByRole("combobox", { name: "Task status" })).toHaveValue(
      "done",
    );
  });
});
