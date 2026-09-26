import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders the button text", () => {
    render(<Button>Save task</Button>);

    expect(
      screen.getByRole("button", { name: "Save task" }),
    ).toBeInTheDocument();
  });
});
