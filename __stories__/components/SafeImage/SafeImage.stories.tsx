import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImgHTMLAttributes } from "react";

import { SafeImage } from "@components/SafeImage";

const meta: Meta<ImgHTMLAttributes<HTMLImageElement>> = {
  title: "Components/SafeImage",
  component: SafeImage,
};

const Default: StoryObj<ImgHTMLAttributes<HTMLImageElement>> = {
  args: {
    className: "w-[200px] h-[200px]",
  },
};
const WithImage: StoryObj<ImgHTMLAttributes<HTMLImageElement>> = {
  args: {
    className: "w-[200px] h-[200px]",
    src: "images/brayayin.webp",
  },
};

export default meta;
export { Default, WithImage };
