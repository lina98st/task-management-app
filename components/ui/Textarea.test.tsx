import { render, screen } from "@testing-library/react";
import Textarea from "./Textarea";

describe("Textarea", () => {
  it("renders with a placeholder", () => {
    render(<Textarea placeholder="Task description" />);

    expect(screen.getByPlaceholderText("Task description")).toBeInTheDocument();
  });

  it("uses the provided default value", () => {
    render(
      <Textarea
        aria-label="Task description"
        defaultValue="Finish the project"
      />,
    );

    expect(screen.getByLabelText("Task description")).toHaveValue(
      "Finish the project",
    );
  });
});
