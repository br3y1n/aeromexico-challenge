import { Character } from "@character/types/character.type";
import { StatusEnum } from "@enums";

import { CharacterApiResponse } from "./character.adapter.type";

const characterAdapter = (characters: CharacterApiResponse[]): Character[] =>
  characters.map(({ details, id, imageUrl, name, status }) => ({
    details,
    id,
    imageUrl,
    liked: false,
    name,
    status: status as StatusEnum,
  }));

export { characterAdapter };
