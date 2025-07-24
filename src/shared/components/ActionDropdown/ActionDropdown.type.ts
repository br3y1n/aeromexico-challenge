import { ReactNode } from "react";

interface ActionDropdownItem {
  id: string;
  label: string;
}

interface ActionDropdownProps {
  label: string;
  items: ActionDropdownItem[];
  onItemClick?: (item: ActionDropdownItem) => void;
  onActionClick?: (item: ActionDropdownItem) => void;
  actionIcon?: ReactNode;
  className?: string;
}

export type { ActionDropdownItem, ActionDropdownProps };
