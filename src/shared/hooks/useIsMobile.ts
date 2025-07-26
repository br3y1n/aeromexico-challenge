import { useEffect, useState } from "react";

const useIsMobile = () => {
  const isClient = typeof window !== "undefined";

  const getIsMobile = () =>
    isClient ? window.matchMedia("(max-width: 767px)").matches : false;

  const [isMobile, setIsMobile] = useState<boolean>(getIsMobile);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handler = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isMobile;
};

export { useIsMobile };
