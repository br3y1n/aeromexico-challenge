import { Character } from "@character/types/character.type";

interface CharacterFavoriteRepository {
  getFavorites: () => Promise<Character[]>;
  removeFavorite: (character: Character) => Promise<void>;
  addFavorite: (character: Character) => Promise<Character>;
}

export type { CharacterFavoriteRepository };
