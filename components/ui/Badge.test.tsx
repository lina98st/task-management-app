import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
  it("renders its text", () => {
    render(<Badge>In progress</Badge>);

    expect(screen.getByText("In progress")).toBeInTheDocument();
  });

  it("applies the success variant", () => {
    render(<Badge variant="success">Done</Badge>);

    expect(screen.getByText("Done")).toHaveClass(
      "bg-[var(--success)]",
      "text-white",
    );
  });
});
