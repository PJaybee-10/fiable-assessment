import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import {
  INVALID_COORDINATES_ERROR,
  INVALID_DIRECTION_ERROR,
  INVALID_FORMAT,
} from "../../helpers/error-messages";
import GridRenderer from "./GridRenderer";

const meta = {
  component: GridRenderer,
} satisfies Meta<typeof GridRenderer>;

export default meta;

type Story = StoryObj<typeof meta>;

const testInputValue = async (canvas: any, testValue: string) => {
  await userEvent.type(canvas.getByRole("textbox"), testValue);
  await expect(canvas.getByRole("textbox")).toHaveValue(testValue);
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const testValue = "0,0 NORTH";

    await testInputValue(canvas, testValue);
    expect(canvas.getByTestId("marker")).toBeInTheDocument();
  },
};

export const MoveUp: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const testValue = "0,1 NORTH";

    await testInputValue(canvas, testValue);
    expect(canvas.getByTestId("marker")).toBeInTheDocument();
  },
};

export const MoveRight: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const testValue = "1,1 NORTH";

    await testInputValue(canvas, testValue);
    expect(canvas.getByTestId("marker")).toBeInTheDocument();
  },
};

export const RotateMarkerToEast: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const testValue = "1,1 EAST";

    await testInputValue(canvas, testValue);
    expect(canvas.getByTestId("marker")).toBeInTheDocument();
  },
};

export const RotateMarkerToWest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const testValue = "1,1 WEST";

    await testInputValue(canvas, testValue);
    expect(canvas.getByTestId("marker")).toBeInTheDocument();
  },
};

export const InvalidCoordinates: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const testValue = "a,b WEST";

    await testInputValue(canvas, testValue);
    await expect(
      canvas.getByText(INVALID_COORDINATES_ERROR)
    ).toBeInTheDocument();
  },
};

export const InvalidDirection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const testValue = "1,1 W";

    await testInputValue(canvas, testValue);
    await expect(canvas.getByText(INVALID_DIRECTION_ERROR)).toBeInTheDocument();
  },
};

export const InvalidFormat: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const testValue = "randomText";

    await testInputValue(canvas, testValue);
    await expect(canvas.getByText(INVALID_FORMAT)).toBeInTheDocument();
  },
};
