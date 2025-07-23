import clsx from "clsx";

import { IconButtonProps } from "./IconButton.type";

const IconButton = ({ renderIcon, className, ...props }: IconButtonProps) => (
  <button
    className={clsx(
      "h-8 w-8 flex justify-center items-center bg-gray-500/70 rounded text-white cursor-pointer hover:text-green-600 active:text-green-600 active:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-300",
      className,
    )}
    {...props}
  >
    {renderIcon()}
  </button>
);

export { IconButton };
