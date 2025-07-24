import { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button, ButtonProps } from "@components/Button";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    onClick: { action: "onClick" },
    disabled: { control: "boolean" },
  },
};

const Default: StoryObj<ButtonProps> = {
  args: {
    disabled: false,
    text: "Next",
  },
};

export default meta;
export { Default };
