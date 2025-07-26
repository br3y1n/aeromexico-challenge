import { Character } from "@character/types/character.type";
import { catchApiErrors } from "@infrastructure/api/wrappers/catch-api-errors";
import { delayApiMock } from "@infrastructure/api/wrappers/delay-api-mock";

import { CharacterFavoriteRepository } from "../character-favorite.repository.interface";

class CharacterFavoriteMockRepository implements CharacterFavoriteRepository {
  private _characters: Character[] = [];

  getFavorites = delayApiMock(
    catchApiErrors(async () => {
      return [...this._characters];
    }),
  );

  addFavorite = delayApiMock(
    catchApiErrors(async (character: Character) => {
      this._characters.push(character);
      return character;
    }),
  );

  removeFavorite = delayApiMock(
    catchApiErrors(async (character: Character) => {
      this._characters = this._characters.filter(
        (currentCharacter) => character.id !== currentCharacter.id,
      );
    }),
  );
}

export { CharacterFavoriteMockRepository };
