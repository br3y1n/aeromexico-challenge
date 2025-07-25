import { configEnvs } from "@constants/config-envs.const";
import { createApiClient } from "@infrastructure/api/api-client.factory";

import { CharacterImplementationEnum } from "./character-implementation.enum";
import { CharacterRepository } from "./character-repository.interface";
import { CharacterApiRepository } from "./implementations/character-api.repository";
import { CharacterMockRepository } from "./implementations/character-mock.repository";

class CharacterRepositoryFactory implements CharacterRepository {
  private _apiRepository?: CharacterApiRepository;
  private _mockRepository?: CharacterMockRepository;

  private _getRepository = (target: CharacterImplementationEnum) => {
    const repositories = {
      [CharacterImplementationEnum.MOCK]: () => {
        if (!this._mockRepository)
          this._mockRepository = new CharacterMockRepository();

        return this._mockRepository!;
      },
      [CharacterImplementationEnum.API]: () => {
        if (!this._apiRepository)
          this._apiRepository = new CharacterApiRepository(createApiClient());

        return this._apiRepository!;
      },
    };

    return (
      repositories[target] ?? repositories[CharacterImplementationEnum.MOCK]
    )();
  };

  getCharacters = (filters?: Record<string, string>) =>
    this._getRepository(
      configEnvs.TARGET_CHARACTERS as CharacterImplementationEnum,
    ).getCharacters(filters);
}

export { CharacterRepositoryFactory };
