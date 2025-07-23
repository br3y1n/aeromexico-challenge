import { ButtonHTMLAttributes, JSX } from "react";

interface PrevIconButtonProps {
  renderIcon: () => JSX.Element;
}

type IconButtonProps = PrevIconButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export type { IconButtonProps };
