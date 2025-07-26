import { CharacterResponse } from "@character/types/character.type";

interface CharacterRepository {
  getCharacters: (
    filters?: Record<string, string>,
  ) => Promise<CharacterResponse>;
}

export type { CharacterRepository };
