import { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ErrorPage } from "@components/ErrorPage";
import { ErrorPageProps } from "@components/ErrorPage/ErrorPage.type";

const meta: Meta<ErrorPageProps> = {
  title: "Components/ErrorPage",
  component: ErrorPage,
};

const Default: StoryObj<ErrorPageProps> = {};

const WithData: StoryObj<ErrorPageProps> = {
  args: {
    button: {
      text: "Text button",
      onClick: () => {},
    },
    description: "custom description",
    title: "custom error",
  },
};
export default meta;
export { Default, WithData };
