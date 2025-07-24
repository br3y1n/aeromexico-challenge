import clsx from "clsx";
import { ImgHTMLAttributes } from "react";

const SafeImage = ({
  className,
  src,
  alt,
  onError,
  ...otherProps
}: ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    className={clsx(!!src ? "object-contain" : "object-cover", className)}
    src={src || "/images/no-image.png"}
    onError={(e) => {
      e.currentTarget.src = "/images/no-image.png";
      e.currentTarget.classList.replace("object-contain", "object-cover");
      onError?.(e);
    }}
    alt={alt}
    {...otherProps}
  />
);

export { SafeImage };
