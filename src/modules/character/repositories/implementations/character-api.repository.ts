import { characterAdapter } from "@character/adapters/character.adapter";
import { CharacterApiResponse } from "@character/adapters/character.adapter.type";
import { CharacterResponse } from "@character/types/character.type";
import { ApiClient } from "@infrastructure/api/api-client.interface";
import { ApiPathEnum } from "@infrastructure/api/api-path.enum";
import { catchApiErrors } from "@infrastructure/api/wrappers/catch-api-errors";

import { CharacterRepository } from "../character-repository.interface";

class CharacterApiRepository implements CharacterRepository {
  constructor(private readonly apiClient: ApiClient) {}

  getCharacters = catchApiErrors(async (filters?: Record<string, string>) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = `${ApiPathEnum.CHARACTERS}?${queryString}`;

    try {
      return characterAdapter(
        await this.apiClient.get<CharacterApiResponse>(url),
      );
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error && error.message.includes("404"))
        return <CharacterResponse>{
          characters: [],
          pages: 0,
          total: 0,
          next: null,
          prev: null,
        };

      throw error;
    }
  });
}

export { CharacterApiRepository };
