import { ReactNode } from "react";

interface ConfigItem {
  is: boolean;
  render?: () => ReactNode;
}

interface RenderByStatus {
  (
    render: () => ReactNode,
    config: {
      loader?: ConfigItem;
      error?: ConfigItem;
    },
  ): ReactNode;
}

export type { RenderByStatus };
