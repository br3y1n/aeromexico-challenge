import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { useCharacters } from "@character/hooks/useCharacters";
import { CharacterRepositoryFactory } from "@character/repositories/character-repository.factory";
import { Character } from "@character/types/character.type";
import { useDebounce } from "@hooks/useDebounce";

const ITEMS_PER_PAGE = 4;

const useCharactersState = () => {
  const form = useForm({ defaultValues: { search: "", page: "1" } });
  const { control, watch, setValue } = form;
  const repository = useMemo(() => new CharacterRepositoryFactory(), []);
  const [characterSelected, setCharacterSelected] = useState<Character | null>(
    null,
  );
  const [charactersLiked, setCharactersLiked] = useState<
    Record<string, Character>
  >({});
  const { applyDebounce } = useDebounce();
  const watchedFields = watch();
  const [debouncedValues, setDebouncedValues] = useState(watchedFields);
  const [pageOffset, setPageOffset] = useState(0);

  const {
    data: characterData,
    isLoading,
    error,
  } = useCharacters(repository, {
    name: debouncedValues.search,
    page: watchedFields.page,
  });

  const characters = characterData?.characters.slice(
    pageOffset,
    pageOffset + ITEMS_PER_PAGE,
  );

  const totalItemsPerPage = useMemo(() => {
    if (!characterData) return 0;

    return Math.ceil(characterData!.total / characterData!.pages);
  }, [characterData]);

  const { prevPageOffset, nextPageOffset } = useMemo(
    () => ({
      prevPageOffset: pageOffset - ITEMS_PER_PAGE,
      nextPageOffset: pageOffset + ITEMS_PER_PAGE,
    }),
    [pageOffset],
  );

  const removeCharacterLiked = (character: Character) => {
    setCharactersLiked((prevValues) => {
      const newValues = { ...prevValues };
      delete newValues[character.id];
      return newValues;
    });
  };

  const addCharacterLiked = (character: Character) => {
    setCharactersLiked((prevValues) => ({
      ...prevValues,
      [character.id]: character,
    }));
  };

  const toggleCharacterLiked = (character: Character) => {
    const fn = charactersLiked[character.id]
      ? removeCharacterLiked
      : addCharacterLiked;

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
      setPageOffset(totalItemsPerPage - ITEMS_PER_PAGE);
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
    isLoading: isLoading,
    error: !!error,
    control,
    characterSelected,
    charactersLiked,
    toggleCharacterLiked,
    removeCharacterLiked,
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
