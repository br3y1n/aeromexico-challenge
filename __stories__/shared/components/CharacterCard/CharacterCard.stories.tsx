import { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CharacterCard, CharacterCardProps } from "@components/CharacterCard";

const meta: Meta<CharacterCardProps> = {
  title: "Components/CharacterCard",
  component: CharacterCard,
  argTypes: {
    onLike: { action: "onLike" },
    onClick: { action: "onClick" },
  },
};

const Default: StoryObj<CharacterCardProps> = {
  decorators: [
    (Story) => (
      <div className="bg-gray-200">
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Title",
    liked: false,
    selected: false,
    data: "1",
  },
};

export default meta;
export { Default };
