import clsx from "clsx";
import { forwardRef } from "react";

import { ButtonProps } from "./Button.type";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, className, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        "w-[200px] h-[25px] bg-gray-600 rounded-t-[10px] text-white hover:not-disabled:text-green-600 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500",
        className,
      )}
      {...props}
    >
      {text && <p className="text-sm uppercase leading-0">{text}</p>}
    </button>
  ),
);

export { Button };
