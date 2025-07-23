import clsx from "clsx";

import { IconButtonProps } from "./IconButton.type";

const IconButton = ({ renderIcon, className, ...props }: IconButtonProps) => (
  <button className={clsx("h-8 w-8", className)} {...props}>
    {renderIcon()}
  </button>
);

export { IconButton };
