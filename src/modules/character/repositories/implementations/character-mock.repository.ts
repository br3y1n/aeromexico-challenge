import { characterAdapter } from "@character/adapters/character.adapter";
import { CharacterApiResponse } from "@character/adapters/character.adapter.type";
import { StatusEnum } from "@enums";
import { catchApiErrors } from "@infrastructure/api/wrappers/catch-api-errors";
import { delayApiMock } from "@infrastructure/api/wrappers/delay-api-mock";

import { CharacterRepository } from "../character-repository.interface";

class CharacterMockRepository implements CharacterRepository {
  private readonly _characters: CharacterApiResponse[] = [
    {
      name: "The brayayin",
      details: {
        age: "22",
        location: "Earth",
        gender: "male",
        origin: "alien spa",
      },
      id: "1",
      imageUrl: "",
      status: StatusEnum.ALIVE,
    },
    {
      name: "The brayayin 2",
      details: {
        age: "22",
        origin: "alien spa",
      },
      id: "12",
      imageUrl: "images/brayayin.webp",
      status: StatusEnum.DEAD,
    },
    {
      name: "other",
      details: {
        age: "11",
        origin: "tester",
      },
      id: "123",
      imageUrl: "",
      status: StatusEnum.DEAD,
    },
  ];

  getCharacters = delayApiMock(
    catchApiErrors(async (filters?: Record<string, string>) => {
      const filterName = filters?.name ?? "";

      return characterAdapter(
        this._characters.filter(({ name }) => name.includes(filterName)),
      );
    }),
  );
}

export { CharacterMockRepository };
