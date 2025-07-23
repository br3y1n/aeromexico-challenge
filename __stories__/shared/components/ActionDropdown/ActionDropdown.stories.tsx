import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TbTrash } from "react-icons/tb";

import {
  ActionDropdown,
  ActionDropdownProps,
} from "@components/ActionDropdown";

const meta: Meta<ActionDropdownProps> = {
  title: "Components/ActionDropdown",
  component: ActionDropdown,
  argTypes: {
    onItemClick: { action: "onItemClick" },
    onActionClick: { action: "onActionClick" },
  },
};

const Default: StoryObj<ActionDropdownProps> = {
  decorators: [
    (Story) => (
      <div className="h-40 flex items-end">
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Favs",
    items: [
      { id: "1", label: "item 1" },
      { id: "2", label: "item 2" },
      { id: "3", label: "item 3" },
      { id: "4", label: "item 4" },
      { id: "5", label: "item 5" },
    ],
    actionIcon: <TbTrash className="h-5 w-5" />,
  },
};

export default meta;
export { Default };
