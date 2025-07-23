import { STATUS_INDICATOR_MAP } from "../constants";
import { StatusIndicatorProps } from "../StatusIndicator.type";

const useStatusIndicatorState = ({ status }: StatusIndicatorProps) => {
  const { color, label } = STATUS_INDICATOR_MAP[status];

  return { color, label };
};

export { useStatusIndicatorState };
