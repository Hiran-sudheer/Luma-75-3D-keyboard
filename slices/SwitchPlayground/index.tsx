"use client";

import { FC, useState } from "react";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { Canvas } from "@react-three/fiber";
import { SOUND_MAP, Switch } from "@/components/Switch";
import { Stage } from "@react-three/drei";
import gsap from "gsap";
import { LuVolume2 } from "react-icons/lu";

/**
 * Props for `SwitchPlayground`.
 */
export type SwitchPlaygroundProps =
  SliceComponentProps<Content.SwitchPlaygroundSlice>;

/**
 * Component for "SwitchPlayground" Slices.
 */
const SwitchPlayground: FC<SwitchPlaygroundProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="switch-section relative"
      innerClassName="flex flex-col justify-center"
    >
      <FadeIn>
        <p className="eyebrow section-eyebrow">THE SOUND OF YOUR EVERYDAY</p>
        <h2
          id="switch-playground"
          className="section-heading"
        >
          <PrismicText field={slice.primary.heading} />
        </h2>

        <div className="section-description">
          <PrismicRichText field={slice.primary.description} />
        </div>

        <FadeIn
          targetChildren
          className="switch-grid"
        >
          {slice.primary.switches.map((item) =>
            isFilled.contentRelationship(item.switch) ? (
              <SharedCanvas key={item.switch.id} color={item.switch} />
            ) : null,
          )}
        </FadeIn>
      </FadeIn>
    </Bounded>
  );
};

export default SwitchPlayground;

type SharedCanvasProps = {
  color: Content.SwitchPlaygroundSliceDefaultPrimarySwitchesItem["switch"];
};

const SharedCanvas = ({ color }: SharedCanvasProps) => {
  const [playing, setPlaying] = useState(false);
  if (!isFilled.contentRelationship(color) || !color.data) return null;

  const colorName = color.uid as "red" | "brown" | "blue" | "black";
  const { color: hexColor, name } = color.data;

  const handleSound = () => {
    const selectedSound = gsap.utils.random(SOUND_MAP[colorName]);

    const audio = new Audio(selectedSound);
    audio.volume = 0.6;
    setPlaying(true);
    audio.onended = () => setPlaying(false);
    void audio.play().catch(() => setPlaying(false));
  };

  return (
    <div className="switch-card group relative select-none">
      <span className="switch-card-hint">PRESS TO FEEL IT</span>

      <button
        onClick={handleSound}
        className="switch-play-button"
        aria-label={`Play ${name} switch sound`}
        aria-pressed={playing}
      >
        <span>{name}<small>{({blue:"Crisp & expressive",red:"Smooth & effortless",brown:"A gentle little bump",black:"Steady & deliberate"})[colorName]}</small></span><span className="sound-icon"><LuVolume2 /></span>
      </button>
      {/* Canvas */}
      <Canvas camera={{ position: [1.5, 2, 0], fov: 7 }}>
        <Stage
          adjustCamera
          intensity={0.5}
          shadows={"contact"}
          environment={{ files: "/hdr/city.hdr" }}
        >
          <Switch
            rotation={[0, Math.PI / 4, 0]}
            color={colorName}
            hexColor={hexColor || ""}
          />
        </Stage>
      </Canvas>
    </div>
  );
};
