import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GrSearch } from "react-icons/gr";
import { LuUserRound } from "react-icons/lu";

import { InputProps, Input } from "@components/Input";

const meta: Meta<InputProps> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    onChange: { action: "onChange" },
  },
};

const Default: StoryObj<InputProps> = {
  args: {
    placeholder: "Find your character...",
    classNames: {
      container: "max-w-[240px]",
    },
    renderRightIcon: (props) => <LuUserRound {...props} />,
    renderLeftIcon: (props) => <GrSearch {...props} />,
  },
};

export default meta;
export { Default };
