import clsx from "clsx";
import { FaRegHeart } from "react-icons/fa";

import { SafeImage } from "@components/SafeImage";
import { KeysEnum } from "@enums";

import { CharacterCardProps } from "./CharacterCard.type";

const likeText = "Like";

const CharacterCard = <T = unknown,>({
  title,
  onClick,
  onLike,
  selected,
  liked,
  data,
}: CharacterCardProps<T>) => (
  <article
    role="button"
    tabIndex={0}
    aria-pressed={selected}
    aria-label={`Character card: ${title}. ${selected ? "Selected" : "Not selected"}`}
    className={clsx(
      "h-[226px] w-[190px] bg-gray-850/80 hover:bg-gray-700 rounded-[30px] shadow-card cursor-pointer px-5 py-2.5 text-white flex flex-col gap-1.5 items-center",
      selected && "border-2 border-green-600",
    )}
    onClick={() => onClick(data)}
    onKeyDown={(e) => {
      if (e.key === KeysEnum.ENTER || e.key === KeysEnum.SPACE) {
        onClick(data);
      }
    }}
  >
    <h3 className="uppercase text-sm tracking-[1.25px] mb-2">{title}</h3>

    <SafeImage
      className="w-[146px] h-[146px] shrink-0"
      alt={`Image of ${title}`}
      aria-hidden={false}
    />

    <div className="flex gap-2 items-center">
      <button
        type="button"
        aria-label={liked ? "Unlike character" : "Like character"}
        aria-pressed={liked}
        onClick={(e) => {
          e.stopPropagation();
          onLike(data);
        }}
        onKeyDown={(e) => e.stopPropagation()}
        className={clsx(
          "hover:scale-110 transition cursor-pointer",
          liked && "text-red-500",
        )}
      >
        <FaRegHeart aria-hidden="true" className="h-6 w-6" />
      </button>

      <p className="text-md ">{likeText}</p>
    </div>
  </article>
);

export { CharacterCard };
