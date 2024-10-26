import { render, screen } from "@testing-library/react";
import { Direction } from "../../enums/direction";
import GridViewer from "./GridViewer";

test("renders the GridViewer component", () => {
  render(<GridViewer direction={Direction.NORTH} />);
  const linkElement = screen.getByTestId("grid-viewer");
  expect(linkElement).toBeInTheDocument();
});
