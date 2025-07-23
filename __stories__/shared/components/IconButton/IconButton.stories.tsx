import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FaChevronRight } from "react-icons/fa";

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
    disabled: false,
    renderIcon: () => <FaChevronRight />,
  },
};

export default meta;
export { Default };
