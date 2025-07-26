import { CharacterResponse } from "@character/types/character.type";
import { StatusEnum } from "@enums";

import { CharacterApiResponse } from "./character.adapter.type";

const characterAdapter = ({
  info,
  results,
}: CharacterApiResponse): CharacterResponse => ({
  characters: results.map(
    ({
      episode,
      gender,
      image,
      location,
      origin,
      species,
      type,
      id,
      name,
      status,
    }) => ({
      details: {
        origin: origin.name.replace(/\s*\(.*\)$/, ""),
        location: location.name.replace(/\s*\(.*\)$/, ""),
        gender: gender,
        episodes: episode.length.toString(),
      },
      id: id.toString(),
      imageUrl: image,
      name,
      status:
        status.toLowerCase() === StatusEnum.ALIVE
          ? StatusEnum.ALIVE
          : StatusEnum.DEAD,
      specie: species,
      type,
    }),
  ),
  next: info.next && new URL(info.next).searchParams.get("page"),
  prev: info.prev && new URL(info.prev).searchParams.get("page"),
  pages: info.pages,
  total: info.count,
});
export { characterAdapter };
