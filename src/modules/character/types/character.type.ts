import { StatusEnum } from "@enums";

interface CharacterResponse {
  total: number;
  pages: number;
  next?: string | null;
  prev?: string | null;
  characters: Character[];
}

interface Character {
  id: string;
  name: string;
  status: StatusEnum;
  specie: string;
  type: string;
  details: Record<string, string>;
  imageUrl: string;
}

export type { Character, CharacterResponse };
