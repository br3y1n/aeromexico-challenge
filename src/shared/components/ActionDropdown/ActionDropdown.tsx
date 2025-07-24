import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@components/Button";

import { ActionDropdownProps } from "./ActionDropdown.type";
import { useActionDropdownState } from "./hooks/useActionDropdownState";

const ActionDropdown = ({
  label,
  items,
  onItemClick,
  onActionClick,
  actionIcon,
  className,
}: ActionDropdownProps) => {
  const { containerRef, toggleOpen, isOpen } = useActionDropdownState();

  return (
    <div ref={containerRef} className={clsx("relative h-fit w-fit", className)}>
      <Button
        onClick={toggleOpen}
        aria-haspopup="true"
        aria-expanded={isOpen}
        text={label}
        className={className}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-0 left-0 w-full max-h-[131px] rounded-[10px] bg-gray-600 origin-bottom py-2.5 overflow-hidden flex flex-col"
            initial={{ height: 0 }}
            animate={{ height: 131 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul
              role="menu"
              className="w-full overflow-y-auto flex flex-col gap-[2px]"
            >
              {items.map((item) => (
                <li
                  key={item.id}
                  role="menuitem"
                  tabIndex={0}
                  className="flex items-center justify-between text-white text-sm cursor-pointer border border-gray-650 bg-gray-400 uppercase px-4 h-[26px] shrink-0"
                  onClick={() => {
                    onItemClick?.(item);
                  }}
                >
                  <span className="leading-0">{item.label}</span>

                  {onActionClick && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onActionClick(item);
                      }}
                      aria-label={`Action for ${item.label}`}
                      className="hover:bg-gray-500 cursor-pointer rounded p-[1px]"
                    >
                      {actionIcon}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ActionDropdown };
