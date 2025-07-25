import { CharacterFavoriteImplementationEnum } from "@character/repositories/character-favorite-implementation.enum";
import { CliFlagEnum } from "scripts/enums/cli-flag.enum";
import { CommandConfig } from "scripts/types";

const SERVERS_OPTIONS: CommandConfig[] = [
  {
    name: "FRONTEND",
    prefixColor: "green",
    getCommand: (flags) =>
      `yarn sync:envs ${Object.entries(flags)
        .map(([key, val]) => `--${key}=${val}`)
        .join(" ")} && yarn dev`,
    condition: () => true,
  },
  {
    name: "JSON SERVER",
    prefixColor: "blue",
    getCommand: () => "yarn start:json-api",
    condition: (flags) =>
      flags[CliFlagEnum.WITH_FAVORITE_TARGET] ===
      CharacterFavoriteImplementationEnum.API,
  },
];

export { SERVERS_OPTIONS };
