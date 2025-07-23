import clsx from "clsx";

import { useStatusIndicatorState } from "./hooks/useStatusIndicatorState";
import { StatusIndicatorProps } from "./StatusIndicator.type";

const StatusIndicator = (props: StatusIndicatorProps) => {
  const { className } = props;
  const { color, label } = useStatusIndicatorState(props);

  return (
    <div
      className={clsx(
        "inline-flex bg-gray-900/90 h-7 w-[110px] rounded-[10px] p-1.5 gap-2 items-center",
        className,
      )}
      role="status"
      aria-label={label}
    >
      <span
        className={clsx("w-[15px] h-[15px] rounded-full", color)}
        aria-hidden="true"
      />
      <p className="uppercase text-white text-md">{label}</p>
    </div>
  );
};

export { StatusIndicator };
