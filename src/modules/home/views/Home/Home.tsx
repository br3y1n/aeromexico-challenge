"use client";

import { Button } from "@components/Button";
import { SafeImage } from "@components/SafeImage";
import { useGoTo } from "@hooks/useGoTo";

const title = "Aeromexico Frontend Challenge";
const subtitle = "Rick and Morty API Implementation";
const description =
  "Hello! I'm Brayan Arango, excited to participate in Aeromexico's Frontend Developer challenge. I've built this application following modern best practices to showcase my technical skills.";

const Home = () => {
  const { goToCharacters } = useGoTo();

  return (
    <div className="relative w-full flex flex-col justify-center items-center gap-6 px-4 py-10 flex-1 bg-gray-900">
      <div className="text-center">
        <h1 className="font-bold text-3xl md:text-4xl text-white">{title}</h1>
        <h2 className="text-lg md:text-xl text-gray-400 mt-2">{subtitle}</h2>
      </div>

      <SafeImage
        src="/images/brayayin.webp"
        alt="The brayayin"
        className="w-[70%] md:w-full max-w-[280px] h-auto"
        width={1024}
        height={1024}
      />

      <div className="max-w-[700px] text-center">
        <p className="text-lg text-gray-50 leading-relaxed">{description}</p>
      </div>

      <Button
        onClick={goToCharacters}
        className="absolute bottom-0"
        text="Let's Go! →"
      />
    </div>
  );
};

export { Home };
