import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { useCharacters } from "@character/hooks/useCharacters";
import { CharacterRepositoryFactory } from "@character/repositories/character-repository.factory";
import { Character } from "@character/types/character.type";
import { useDebounce } from "@hooks/useDebounce";

const useCharactersState = () => {
  const form = useForm({ defaultValues: { search: "" } });
  const { control, watch } = form;
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

  useEffect(() => {
    applyDebounce(() => {
      setDebouncedValues(watchedFields);
    });
  }, [watchedFields.search]);

  const {
    data: characters,
    isLoading,
    error,
  } = useCharacters(repository, { name: debouncedValues.search });

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
  };
};

export { useCharactersState };
