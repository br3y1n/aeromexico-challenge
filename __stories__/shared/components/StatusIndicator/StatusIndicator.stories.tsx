import { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  StatusIndicator,
  StatusIndicatorProps,
} from "@components/StatusIndicator";
import { StatusEnum } from "@enums";

const meta: Meta<StatusIndicatorProps> = {
  title: "Components/StatusIndicator",
  component: StatusIndicator,
  argTypes: {
    status: { options: Object.values(StatusEnum), control: "select" },
  },
};

const Alive: StoryObj<StatusIndicatorProps> = {
  args: {
    status: StatusEnum.ALIVE,
  },
};

const Dead: StoryObj<StatusIndicatorProps> = {
  args: {
    status: StatusEnum.DEAD,
  },
};

export default meta;
export { Alive, Dead };
