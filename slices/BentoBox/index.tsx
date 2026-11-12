import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import Image from "next/image";
import clsx from "clsx";
import { FadeIn } from "@/components/FadeIn";

/**
 * Props for `BentoBox`.
 */
export type BentoBoxProps = SliceComponentProps<Content.BentoBoxSlice>;

/**
 * Component for "BentoBox" Slices.
 */
const BentoBox: FC<BentoBoxProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <FadeIn>
        <p className="eyebrow section-eyebrow">THE DETAILS MAKE THE DIFFERENCE</p>
        <h2
          id="features"
          className="section-heading"
        >
          <PrismicText field={slice.primary.heading} />
        </h2>
      </FadeIn>

      <FadeIn targetChildren className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {slice.primary.items.map((item) => (
          <BentoBoxItem key={asText(item.text)} item={item} />
        ))}
      </FadeIn>
    </Bounded>
  );
};

export default BentoBox;

type BentoBoxItemProps = {
  item: Content.BentoBoxSliceDefaultPrimaryItemsItem;
};

function BentoBoxItem({ item }: BentoBoxItemProps) {
  return (
    <div
      className={clsx(
        "feature-card relative overflow-hidden",
        item.size === "Small" && "md:col-span-2",
        item.size === "Medium" && "md:col-span-3",
        item.size === "Large" && "md:col-span-4",
      )}
    >
      <Image
        src={item.image.url || ""}
        alt={item.image.alt || ""}
        className="h-full w-full object-cover"
        quality={96}
        width={700}
        height={394}
      />

      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black"></div>

      <div className="feature-caption">
        <PrismicRichText field={item.text} />
      </div>
    </div>
  );
}
