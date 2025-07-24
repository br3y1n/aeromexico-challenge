import clsx from "clsx";

import { StatBoxProps } from "./StatBox.type";

const StatBox = ({ title, subtitle, value, className }: StatBoxProps) => (
  <div className={clsx("flex flex-col md:gap-[1px] text-white", className)}>
    <h3 className="text-xs md:text-[20px] font-medium text-green-600 capitalize">
      {title}
    </h3>

    <div className="flex md:flex-col not-md:gap-1">
      {subtitle && <p className="text-xs md:text-md capitalize">{subtitle}</p>}

      <p className="text-xs md:text-md capitalize">{value}</p>
    </div>
  </div>
);

export { StatBox };
