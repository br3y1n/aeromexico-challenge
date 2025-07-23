import { robotoCondensed } from "../src/app/layout";

import type { Preview } from "@storybook/nextjs-vite";

import "../src/shared/styles/globals.css";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={robotoCondensed.className}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
