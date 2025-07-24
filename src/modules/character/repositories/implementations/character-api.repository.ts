import { characterAdapter } from "@character/adapters/character.adapter";
import { CharacterApiResponse } from "@character/adapters/character.adapter.type";
import { ApiClient } from "@infrastructure/api/api-client.interface";
import { ApiPathEnum } from "@infrastructure/api/api-path.enum";
import { catchApiErrors } from "@infrastructure/api/wrappers/catch-api-errors";

import { CharacterRepository } from "../character-repository.interface";

class CharacterApiRepository implements CharacterRepository {
  constructor(private readonly apiClient: ApiClient) {}

  getCharacters = catchApiErrors(async () =>
    characterAdapter(
      // TODO filters here!
      await this.apiClient.get<CharacterApiResponse[]>(ApiPathEnum.CHARACTERS),
    ),
  );
}

export { CharacterApiRepository };
