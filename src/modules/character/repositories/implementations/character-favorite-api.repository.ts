import { Character } from "@character/types/character.type";
import { ApiClient } from "@infrastructure/api/api-client.interface";
import { ApiPathEnum } from "@infrastructure/api/api-path.enum";
import { catchApiErrors } from "@infrastructure/api/wrappers/catch-api-errors";

import { CharacterFavoriteRepository } from "../character-favorite.repository.interface";

class CharacterFavoriteApiRepository implements CharacterFavoriteRepository {
  constructor(private readonly apiClient: ApiClient) {}

  getFavorites = catchApiErrors(
    async () => await this.apiClient.get<Character[]>(ApiPathEnum.FAVORITES),
  );

  removeFavorite = catchApiErrors(async (character: Character) => {
    const url = `${ApiPathEnum.FAVORITES}/${character.id}`;

    return await this.apiClient.delete<void>(url);
  });

  addFavorite = catchApiErrors(
    async (character: Character) =>
      await this.apiClient.post<Character, Character>(
        ApiPathEnum.FAVORITES,
        character,
      ),
  );
}

export { CharacterFavoriteApiRepository };
