import { CharacterFavoriteImplementationEnum } from "@character/repositories/character-favorite-implementation.enum";
import { CharacterImplementationEnum } from "@character/repositories/character-implementation.enum";
import { EnvConfig } from "../types";
import { CliFlagEnum } from "../enums/cli-flag.enum";

const ENVS_CONFIG: Record<string, EnvConfig> = {
  NEXT_PUBLIC_TARGET_CHARACTERS: {
    options: Object.values(CharacterImplementationEnum),
    default: CharacterImplementationEnum.MOCK,
    flagName: CliFlagEnum.WITH_CHARACTER_TARGET,
  },
  NEXT_PUBLIC_TARGET_FAVORITES: {
    options: Object.values(CharacterFavoriteImplementationEnum),
    default: CharacterFavoriteImplementationEnum.MOCK,
    flagName: CliFlagEnum.WITH_FAVORITE_TARGET,
  },
};

export { ENVS_CONFIG };
