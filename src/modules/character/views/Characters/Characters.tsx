"use client";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GrSearch } from "react-icons/gr";
import { LuUserRound } from "react-icons/lu";
import { TbTrash } from "react-icons/tb";

import { ActionDropdown } from "@components/ActionDropdown";
import { CharacterCard } from "@components/CharacterCard";
import { IconButton } from "@components/IconButton";
import { Input } from "@components/Input";
import { SafeImage } from "@components/SafeImage";
import { StatBox } from "@components/StatBox/StatBox";
import { StatusIndicator } from "@components/StatusIndicator";

import { useCharactersState } from "./hooks/useCharactersState";

const Characters = () => {
  const {
    characters,
    control,
    characterSelected,
    charactersLiked,
    removeCharacterLiked,
    toggleCharacterLiked,
    setCharacterSelected,
  } = useCharactersState();

  // console.log(isLoading);
  // console.log(error);

  return (
    <section className="w-full flex-1 bg-black bg-[url('/images/background.webp')] bg-repeat-x bg-[length:auto_120%] lg:bg-[length:auto_150%] bg-[position:55%_50%] xs:bg-[position:57%_50%] sm:bg-[position:59%_50%] md:bg-[position:65%_50%] lg:bg-[position:115%_60%]">
      <div className="flex flex-col md:grid md:grid-cols-2 w-[92%] lg:w-[98%] max-w-5xl gap-y-10 mx-auto md:mb-10 lg:mb-0 lg:translate-y-14 lg:translate-x-[2%] xl:translate-x-[10%]">
        <SafeImage
          src="/images/logo.webp"
          alt="rick and morty"
          className="w-full max-w-[332px] h-auto col-start-2 mx-auto mt-5 lg:mt-0"
        />

        <div className="md:col-span-2 flex not-md:flex-col-reverse relative not-md:pb-20">
          <div className="relative md:w-1/2 border not-md:rounded-[20px] rounded-l-[20px] overflow-hidden w-[280px] not-md:h-[290px] not-md:mx-auto">
            <SafeImage
              src={characterSelected?.imageUrl}
              alt={clsx("Character: ", characterSelected?.name || "none")}
              className="w-full h-full absolute top-0 bottom-0 bg-gray-400 object-cover"
            />

            <div className="w-full h-full absolute z-10 top-0  scale-110 md:scale-105 -translate-x-2 translate-y-3 bottom-0 inset-shadow-[0_10px_10px_15px_rgba(0,0,0,0.25),_0px_15px_15px_10px_rgba(0,0,0,0.25)]" />

            {characterSelected && (
              <>
                <StatusIndicator
                  status={characterSelected.status}
                  className="z-10 absolute top-3 left-3 md:top-[73px] md:left-6"
                />

                <div className="absolute flex flex-col justify-around bottom-0 right-0 w-full h-[85px] md:h-[170px]  bg-black/70 py-1 md:py-2 px-4 md:px-7">
                  <StatBox
                    title={characterSelected.name}
                    value="value"
                    subtitle="subtitle"
                  />

                  <div className="flex justify-between gap-2 md:gap-10">
                    {Object.entries(characterSelected.details).map(
                      ([key, value]) => (
                        <StatBox key={key} title={key} value={value} />
                      ),
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="relative w-full not-md:max-w-[300px] not-md:mx-auto md:w-1/2 flex flex-col gap-5 items-center md:border md:bg-gray-875 not-md:mb-5 md:py-[45px] md:pl-2 lg:pl-[30px] md:pr-2 lg:pr-[13px] rounded-r-[20px] md:overflow-hidden">
            <Controller
              control={control}
              name="search"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Find your character..."
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  classNames={{
                    container: "max-w-[240px]",
                  }}
                  renderRightIcon={(props) => <LuUserRound {...props} />}
                  renderLeftIcon={(props) => <GrSearch {...props} />}
                />
              )}
            />

            <div className="relative w-full md:py-8 md:pr-10 not-md:pb-16">
              <IconButton
                className="absolute not-md:left-0 not-md:bottom-0 md:right-0 md:top-0 not-md:-rotate-90"
                renderIcon={() => <FaChevronUp />}
              />

              {(characters?.length ?? 0) > 0 ? (
                <div className="grid grid-cols-2 items-center gap-y-2 md:gap-y-10 gap-x-2">
                  {characters!.map((character) => (
                    <CharacterCard
                      key={character.id}
                      data={character}
                      onClick={setCharacterSelected}
                      onLike={toggleCharacterLiked}
                      selected={characterSelected?.id === character.id}
                      liked={!!charactersLiked[character.id]}
                      title={character.name}
                      imageUrl={character.imageUrl}
                      className="justify-self-center lg:even:justify-self-end"
                    />
                  ))}
                </div>
              ) : (
                <p>Characters no found</p>
              )}

              <IconButton
                className="absolute right-0 bottom-0 not-md:-rotate-90"
                renderIcon={() => <FaChevronDown />}
              />
              <p className="absolute md:top-1/2 md:-translate-y-1/2 md:right-0 not-md:bottom-0 not-md:left-1/2 not-md:-translate-x-1/2 text-white text-xs flex gap-1 md:flex-col text-center bg-gray-500/70 p-1 rounded">
                <span>Page</span>
                <span>1/2</span>
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 w-fit left-1/2 md:left-3/4 -translate-x-1/2 z-50">
            <ActionDropdown
              className="not-md:w-[300px]"
              items={Object.values(charactersLiked).map(({ id, name }) => ({
                id,
                label: name,
              }))}
              label="Favs"
              onActionClick={({ id }) =>
                removeCharacterLiked(charactersLiked[id])
              }
              actionIcon={<TbTrash className="h-5 w-5" />}
              onItemClick={({ id }) =>
                setCharacterSelected(charactersLiked[id])
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Characters };
