import { clsx } from "clsx";

import { InputProps } from "./Input.type";

const Input = ({
  onChange,
  onBlur,
  classNames,
  value = "",
  renderLeftIcon,
  renderRightIcon,
  ...props
}: InputProps) => (
  <div className={clsx("relative text-green-600", classNames?.container)}>
    {renderLeftIcon?.({
      className: "absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5",
    })}

    <input
      {...props}
      value={value}
      className={clsx(
        "w-full h-14 rounded-xl border border-green-600 hover:border-green-700  p-4 focus:outline-green-700 text-sm",
        classNames?.input,
        renderLeftIcon && "pl-12",
        renderRightIcon && "pr-12",
      )}
      onChange={(event) => onChange?.(event.target.value)}
      onBlur={(event) => onBlur?.(event.target.value)}
    />

    {renderRightIcon?.({
      className: "absolute top-1/2 right-4 -translate-y-1/2 h-5 w-5",
    })}
  </div>
);

export { Input };
