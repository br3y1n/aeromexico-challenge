import { useQuery } from "@tanstack/react-query";

import { CharacterFavoriteRepository } from "@character/repositories/character-favorite.repository.interface";
import { API_KEYS } from "@infrastructure/api/constants/keys.const";
import { canRetry } from "@utils/can-retry";

const useFavorites = (repository: CharacterFavoriteRepository) =>
  useQuery({
    queryKey: API_KEYS.favorites(),
    queryFn: () => repository.getFavorites(),
    retry: canRetry,
    refetchOnWindowFocus: false,
  });

export { useFavorites };
