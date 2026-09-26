import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders the button text", () => {
    render(<Button>Save task</Button>);

    expect(
      screen.getByRole("button", { name: "Save task" }),
    ).toBeInTheDocument();
  });

  it("uses button type by default", () => {
    render(<Button>Save task</Button>);

    expect(screen.getByRole("button", { name: "Save task" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("accepts a custom button type", () => {
    render(<Button type="submit">Save task</Button>);

    expect(screen.getByRole("button", { name: "Save task" })).toHaveAttribute(
      "type",
      "submit",
    );
  });
});
