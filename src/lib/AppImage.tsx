import type { ImgHTMLAttributes } from "react";

type AppImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string | { src: string };
  alt: string;
  priority?: boolean;
};

export default function AppImage({
  src,
  alt,
  className,
  width,
  height,
  style,
  ...rest
}: AppImageProps) {
  const resolvedSrc = typeof src === "string" ? src : src.src;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={style}
      loading="lazy"
      {...rest}
    />
  );
}
