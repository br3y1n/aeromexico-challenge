import clsx from "clsx";

import { configEnvs } from "@constants/config-envs.const";

import { SafeImageProps } from "./SafeImage.type";

const resolvePath = (path: string) =>
  path.startsWith("/") ? `${configEnvs.BASE_PATH}${path}` : path;

const SafeImage = ({
  className,
  src,
  alt,
  onError,
  ...otherProps
}: SafeImageProps) => {
  const fallback = "/images/no-image.png";
  const resolvedSrc = resolvePath(src || fallback);
  const resolvedFallback = resolvePath(fallback);

  return (
    <img
      className={clsx(!!src ? "object-contain" : "object-cover", className)}
      src={resolvedSrc}
      onError={(e) => {
        e.currentTarget.src = resolvedFallback;
        e.currentTarget.classList.replace("object-contain", "object-cover");
        onError?.(e);
      }}
      alt={alt}
      {...otherProps}
    />
  );
};

export { SafeImage };
