import { Character } from "@character/types/character.type";

interface CharacterRepository {
  getCharacters: (filters?: Record<string, string>) => Promise<Character[]>;
}

export type { CharacterRepository };
