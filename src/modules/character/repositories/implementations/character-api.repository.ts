import { characterAdapter } from "@character/adapters/character.adapter";
import { CharacterApiResponse } from "@character/adapters/character.adapter.type";
import { ApiClient } from "@infrastructure/api/api-client.interface";
import { ApiPathEnum } from "@infrastructure/api/api-path.enum";
import { catchApiErrors } from "@infrastructure/api/wrappers/catch-api-errors";

import { CharacterRepository } from "../character-repository.interface";

class CharacterApiRepository implements CharacterRepository {
  constructor(private readonly apiClient: ApiClient) {}

  getCharacters = catchApiErrors(async (filters?: Record<string, string>) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = `${ApiPathEnum.CHARACTERS}?${queryString}`;

    return characterAdapter(
      await this.apiClient.get<CharacterApiResponse>(url),
    );
  });
}

export { CharacterApiRepository };
