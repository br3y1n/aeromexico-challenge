import { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StatBox } from "@components/StatBox/StatBox";
import { StatBoxProps } from "@components/StatBox/StatBox.type";

const meta: Meta<StatBoxProps> = {
  title: "Components/StatBox",
  component: StatBox,
};

const Default: StoryObj<StatBoxProps> = {
  decorators: [
    (Story) => (
      <div className="p-2 rounded bg-gray-500">
        <Story />
      </div>
    ),
  ],
  args: {
    title: "title",
    subtitle: "subtitle",
    value: "value",
  },
};

export default meta;
export { Default };
