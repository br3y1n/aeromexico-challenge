import { useEffect, useRef, useState } from "react";

import { EventsEnum, KeysEnum } from "@enums";

const useActionDropdownState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === KeysEnum.ESCAPE) setIsOpen(false);
    };

    document.addEventListener(EventsEnum.MOUSE_DOWN, handleClickOutside);
    document.addEventListener(EventsEnum.KEY_DOWN, handleEsc);

    return () => {
      document.removeEventListener(EventsEnum.MOUSE_DOWN, handleClickOutside);
      document.removeEventListener(EventsEnum.KEY_DOWN, handleEsc);
    };
  }, []);

  return { isOpen, toggleOpen, containerRef };
};

export { useActionDropdownState };
