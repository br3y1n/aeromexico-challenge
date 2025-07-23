import { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@components/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    onClick: { action: "onClick" },
    disabled: { control: "boolean" },
  },
};

const Default: StoryObj<typeof Button> = {
  args: {
    disabled: false,
    text: "Next",
  },
};

export default meta;
export { Default };
