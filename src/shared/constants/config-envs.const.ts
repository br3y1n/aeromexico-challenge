import { CharacterFavoriteImplementationEnum } from "@character/repositories/character-favorite-implementation.enum";
import { CharacterImplementationEnum } from "@character/repositories/character-implementation.enum";

const configEnvs = {
  CHARACTER_API: process.env.NEXT_PUBLIC_CHARACTER_API ?? "",

  FAVORITE_API: process.env.NEXT_PUBLIC_FAVOTIRE_API ?? "",

  TARGET_CHARACTERS:
    process.env.NEXT_PUBLIC_TARGET_CHARACTERS ??
    CharacterImplementationEnum.MOCK,

  TARGET_FAVORITES:
    process.env.NEXT_PUBLIC_TARGET_FAVORITES ??
    CharacterFavoriteImplementationEnum.MOCK,

  MOCK_DELAY_RESPONSE_MS: Number(
    process.env.NEXT_PUBLIC_MOCK_DELAY_RESPONSE_MS ?? 500,
  ),

  NUMBER_RETRIES_REQUEST: Number(
    process.env.NEXT_PUBLIC_NUMBER_RETRIES_REQUEST ?? 2,
  ),
};

export { configEnvs };
