import { useState } from "react";

const DELAY_DEBOUNCE = 500;

const useDebounce = (delay = DELAY_DEBOUNCE) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const clearDebounce = () => {
    if (timer) clearTimeout(timer!);
  };

  const applyDebounce = (callback: () => void) => {
    clearDebounce();
    setTimer(setTimeout(() => callback(), delay));
  };

  return {
    clearDebounce,
    applyDebounce,
  };
};

export { useDebounce };
