import { Button } from "@components/Button";

import { ErrorPageProps } from "./ErrorPage.type";

const text = "Oops! Something went wrong.";

const ErrorPage = ({ button, description, title }: ErrorPageProps) => {
  return (
    <main className="w-full h-full flex justify-center items-center flex-col gap-2">
      <h1 className="font-bold text-2xl">{title || text}</h1>
      {description && <p className="text-gray-700">{description}</p>}
      {button && (
        <Button
          text={button.text}
          onClick={button.onClick}
          className="mt-3 rounded-b-[10px]"
        />
      )}
    </main>
  );
};

export { ErrorPage };
