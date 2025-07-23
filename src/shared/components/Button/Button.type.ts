import { ButtonHTMLAttributes } from "react";

interface PrevButtonProps {
  text?: string;
}

type ButtonProps = PrevButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export type { ButtonProps };
