import { configEnvs } from "@constants/config-envs.const";
import { createApiClient } from "@infrastructure/api/api-client.factory";

import { CharacterImplementationEnum } from "./character-implementation.enum";
import { CharacterRepository } from "./character-repository.interface";
import { CharacterApiRepository } from "./implementations/character-api.repository";
import { CharacterLocalRepository } from "./implementations/character-local.repository";

class CharacterRepositoryFactory implements CharacterRepository {
  private _apiRepository?: CharacterApiRepository;
  private _localRepository?: CharacterLocalRepository;

  private _getRepository = (target: CharacterImplementationEnum) => {
    const repositories = {
      [CharacterImplementationEnum.LOCAL]: () => {
        if (!this._localRepository)
          this._localRepository = new CharacterLocalRepository();

        return this._localRepository!;
      },
      [CharacterImplementationEnum.API]: () => {
        if (!this._apiRepository)
          this._apiRepository = new CharacterApiRepository(createApiClient());

        return this._apiRepository!;
      },
    };

    return (
      repositories[target] ?? repositories[CharacterImplementationEnum.LOCAL]
    )();
  };

  getCharacters = (filters?: Record<string, string>) =>
    this._getRepository(
      configEnvs.TARGET_CHARACTERS as CharacterImplementationEnum,
    ).getCharacters(filters);
}

export { CharacterRepositoryFactory };
