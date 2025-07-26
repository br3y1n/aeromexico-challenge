import { characterAdapter } from "@character/adapters/character.adapter";
import { CharacterApiResponse } from "@character/adapters/character.adapter.type";
import charactersData from "@character/assets/characters.json";
import { catchApiErrors } from "@infrastructure/api/wrappers/catch-api-errors";
import { delayApiMock } from "@infrastructure/api/wrappers/delay-api-mock";

import { CharacterRepository } from "../character-repository.interface";

class CharacterMockRepository implements CharacterRepository {
  private readonly _characterResponse: CharacterApiResponse;

  constructor() {
    this._characterResponse = charactersData;
  }

  getCharacters = delayApiMock(
    catchApiErrors(async (filters?: Record<string, string>) => {
      const filterName = filters?.name ?? "";
      const currentPage = parseInt(filters?.page || "1");
      const itemsPerPage = 20;

      const filteredCharacters = this._characterResponse.results.filter(
        ({ name }) =>
          name.toLowerCase().trim().includes(filterName.toLowerCase().trim()),
      );

      const totalCount = filteredCharacters.length;
      const totalPages = Math.ceil(totalCount / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedResults = filteredCharacters.slice(
        startIndex,
        startIndex + itemsPerPage,
      );

      const prev = currentPage > 1 ? currentPage - 1 : null;
      const next = currentPage < totalPages ? currentPage + 1 : null;

      const createFakeUrl = (page: number) =>
        `https://test.com/test?page=${page}`;

      return characterAdapter({
        info: {
          count: totalCount,
          pages: totalPages,
          next: next ? createFakeUrl(next) : null,
          prev: prev ? createFakeUrl(prev) : null,
        },
        results: paginatedResults,
      });
    }),
  );
}

export { CharacterMockRepository };
