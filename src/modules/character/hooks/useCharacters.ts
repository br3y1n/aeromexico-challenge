import { useQuery } from "@tanstack/react-query";

import { CharacterRepository } from "@character/repositories/character-repository.interface";
import { API_KEYS } from "@infrastructure/api/constants/keys.const";
import { canRetry } from "@utils/can-retry";

const useCharacters = (
  repository: CharacterRepository,
  filters?: Record<string, string>,
) =>
  useQuery({
    queryKey: API_KEYS.characters(filters),
    queryFn: () => repository.getCharacters(filters),
    retry: canRetry,
    refetchOnWindowFocus: false,
  });

export { useCharacters };
