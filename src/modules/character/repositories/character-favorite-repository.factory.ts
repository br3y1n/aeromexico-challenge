import { Character } from "@character/types/character.type";
import { configEnvs } from "@constants/config-envs.const";
import { createApiClient } from "@infrastructure/api/api-client.factory";

import { CharacterFavoriteImplementationEnum } from "./character-favorite-implementation.enum";
import { CharacterFavoriteRepository } from "./character-favorite.repository.interface";
import { CharacterFavoriteApiRepository } from "./implementations/character-favorite-api.repository";
import { CharacterFavoriteMockRepository } from "./implementations/character-favorite-mock.repository";

class CharacterFavoriteRepositoryFactory
  implements CharacterFavoriteRepository
{
  private _apiRepository?: CharacterFavoriteRepository;
  private _mockRepository?: CharacterFavoriteRepository;

  private _getRepository = (target: CharacterFavoriteImplementationEnum) => {
    const repositories = {
      [CharacterFavoriteImplementationEnum.MOCK]: () => {
        if (!this._mockRepository)
          this._mockRepository = new CharacterFavoriteMockRepository();

        return this._mockRepository!;
      },
      [CharacterFavoriteImplementationEnum.API]: () => {
        if (!this._apiRepository)
          this._apiRepository = new CharacterFavoriteApiRepository(
            createApiClient(configEnvs.FAVORITE_API),
          );

        return this._apiRepository!;
      },
    };

    return (
      repositories[target] ??
      repositories[CharacterFavoriteImplementationEnum.MOCK]
    )();
  };

  getFavorites = () =>
    this._getRepository(
      configEnvs.TARGET_FAVORITES as CharacterFavoriteImplementationEnum,
    ).getFavorites();

  removeFavorite = (character: Character) =>
    this._getRepository(
      configEnvs.TARGET_FAVORITES as CharacterFavoriteImplementationEnum,
    ).removeFavorite(character);

  addFavorite = (character: Character) =>
    this._getRepository(
      configEnvs.TARGET_FAVORITES as CharacterFavoriteImplementationEnum,
    ).addFavorite(character);
}

export { CharacterFavoriteRepositoryFactory };
