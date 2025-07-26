import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CharacterFavoriteRepository } from "@character/repositories/character-favorite.repository.interface";
import { Character } from "@character/types/character.type";
import { API_KEYS } from "@infrastructure/api/constants/keys.const";

const useAddFavorite = (repository: CharacterFavoriteRepository) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (character: Character) => repository.addFavorite(character),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: API_KEYS.favorites() });
    },
  });
};

export { useAddFavorite };
