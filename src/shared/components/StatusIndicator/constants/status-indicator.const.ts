import { StatusEnum } from "@enums";

const STATUS_INDICATOR_MAP: Record<
  StatusEnum,
  { color: string; label: string }
> = {
  [StatusEnum.ALIVE]: {
    color: "bg-radial from-green-400 to-green-700",
    label: "live",
  },
  [StatusEnum.DEAD]: {
    color: "bg-radial from-red-400 to-red-600",
    label: "dead",
  },
};

export { STATUS_INDICATOR_MAP };
