"use client";

import { useRouter } from "next/navigation";

import { RouteEnum } from "@enums/route.enum";

const useGoTo = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push(RouteEnum.HOME);
  };

  const goToCharacters = () => {
    router.push(RouteEnum.CHARACTERS);
  };

  return {
    goToCharacters,
    goToHome,
  };
};

export { useGoTo };
