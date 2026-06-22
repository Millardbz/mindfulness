import Image from "next/image";

import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage as SanityImageType } from "@/sanity/types";

type BaseProps = {
  image?: SanityImageType | null;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

type FillProps = BaseProps & { fill: true; width?: never; height?: never };
type FixedProps = BaseProps & {
  fill?: false;
  width: number;
  height: number;
};

/**
 * next/image wrapper for Sanity image fields. Renders nothing when the image
 * has no asset, and uses the LQIP (when projected) as a blur placeholder.
 */
export function SanityImage(props: FillProps | FixedProps) {
  const { image, alt, className, sizes, priority } = props;
  if (!image?.asset) return null;

  const altText = alt ?? image.alt ?? "";
  const blur = image.lqip
    ? ({ placeholder: "blur" as const, blurDataURL: image.lqip })
    : {};

  if (props.fill) {
    return (
      <Image
        src={urlFor(image).width(1600).auto("format").quality(80).url()}
        alt={altText}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        className={cn("object-cover", className)}
        {...blur}
      />
    );
  }

  return (
    <Image
      src={urlFor(image)
        .width(props.width)
        .height(props.height)
        .fit("crop")
        .auto("format")
        .quality(80)
        .url()}
      alt={altText}
      width={props.width}
      height={props.height}
      sizes={sizes}
      priority={priority}
      className={className}
      {...blur}
    />
  );
}
