import { Meta, StoryObj } from "@storybook/nextjs-vite";

import { IconButton, IconButtonProps } from "@components/IconButton";

const meta: Meta<IconButtonProps> = {
  title: "Components/IconButton",
  component: IconButton,
  argTypes: {
    onClick: { action: "clicked" },
  },
};

const Default: StoryObj<IconButtonProps> = {
  args: {
    renderIcon: () => <div>Icon</div>,
  },
};

export default meta;
export { Default };
