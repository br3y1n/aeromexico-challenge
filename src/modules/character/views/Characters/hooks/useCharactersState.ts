import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { useAddFavorite } from "@character/hooks/useAddFavorite";
import { useCharacters } from "@character/hooks/useCharacters";
import { useFavorites } from "@character/hooks/useFavorites";
import { useRemoveFavorite } from "@character/hooks/useRemoveFavorite";
import { CharacterFavoriteRepositoryFactory } from "@character/repositories/character-favorite-repository.factory";
import { CharacterRepositoryFactory } from "@character/repositories/character-repository.factory";
import { Character } from "@character/types/character.type";
import { useDebounce } from "@hooks/useDebounce";
import { useIsMobile } from "@hooks/useIsMobile";

const ITEMS_PER_PAGE_DESKTOP = 4;
const ITEMS_PER_PAGE_MOBILE = 2;

const useCharactersState = () => {
  const form = useForm({ defaultValues: { search: "", page: "1" } });
  const isMobile = useIsMobile();
  const itemsPerPage = isMobile
    ? ITEMS_PER_PAGE_MOBILE
    : ITEMS_PER_PAGE_DESKTOP;
  const { control, watch, setValue } = form;
  const characterRepository = useMemo(
    () => new CharacterRepositoryFactory(),
    [],
  );
  const characterFavoriteRepository = useMemo(
    () => new CharacterFavoriteRepositoryFactory(),
    [],
  );
  const [characterSelected, setCharacterSelected] = useState<Character | null>(
    null,
  );
  const { applyDebounce } = useDebounce();
  const watchedFields = watch();
  const [debouncedValues, setDebouncedValues] = useState(watchedFields);
  const [pageOffset, setPageOffset] = useState(0);

  const {
    data: characterData,
    isLoading: isLoadingCharacters,
    error: errorCharacters,
  } = useCharacters(characterRepository, {
    name: debouncedValues.search,
    page: watchedFields.page,
  });

  const { data: favoritesData } = useFavorites(characterFavoriteRepository);

  const { mutate: addFavorite } = useAddFavorite(characterFavoriteRepository);

  const { mutate: removeFavorite } = useRemoveFavorite(
    characterFavoriteRepository,
  );

  const favoritesIndexed = useMemo(
    () =>
      favoritesData?.reduce<Record<string, Character>>(
        (charactersIndexed, character) => {
          charactersIndexed[character.id] = character;
          return charactersIndexed;
        },
        {},
      ) ?? {},
    [favoritesData],
  );

  const characters = characterData?.characters.slice(
    pageOffset,
    pageOffset + itemsPerPage,
  );

  const totalItemsPerPage = useMemo(() => {
    if (!characterData) return 0;

    return Math.ceil(characterData!.total / characterData!.pages);
  }, [characterData]);

  const { prevPageOffset, nextPageOffset } = useMemo(
    () => ({
      prevPageOffset: pageOffset - itemsPerPage,
      nextPageOffset: pageOffset + itemsPerPage,
    }),
    [pageOffset, itemsPerPage],
  );

  const toggleCharacterLiked = (character: Character) => {
    const fn = favoritesIndexed[character.id] ? removeFavorite : addFavorite;

    fn(character);
  };

  const onNextPage = () => {
    if (nextPageOffset >= totalItemsPerPage) {
      setPageOffset(0);
      setValue("page", characterData!.next!);
      return;
    }

    setPageOffset(nextPageOffset);
  };

  const onBackPage = () => {
    if (prevPageOffset < 0) {
      setPageOffset(totalItemsPerPage - itemsPerPage);
      setValue("page", characterData!.prev!);
      return;
    }

    if (prevPageOffset === 0) {
      setPageOffset(0);

      return;
    }

    setPageOffset(prevPageOffset);
  };

  useEffect(() => {
    applyDebounce(() => {
      setDebouncedValues(watchedFields);
      setPageOffset(0);
      setValue("page", "1");
    });
  }, [watchedFields.search]);

  return {
    characters,
    isLoading: isLoadingCharacters,
    error: !!errorCharacters,
    control,
    characterSelected,
    favoritesIndexed,
    toggleCharacterLiked,
    removeFavorite,
    setCharacterSelected,
    hasCharacters: (characters?.length ?? 0) > 0,
    onNextPage:
      characterData?.next || nextPageOffset < totalItemsPerPage
        ? onNextPage
        : undefined,
    onPrevPage:
      characterData?.prev || prevPageOffset >= 0 ? onBackPage : undefined,
  };
};

export { useCharactersState };
