"use client";

import { FC, Suspense, useCallback, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader, type LoadingPhase } from "@/components/Loader";
import { CanvasUnavailable, HeroCanvasBoundary, SceneReadiness } from "./Readiness";
import Image from "next/image";
import { checkout } from "@/checkout";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const heroRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<LoadingPhase>("loading");
  const [revealed, setRevealed] = useState(false);
  const failed = phase === "error";
  const prepareScene = useCallback(() => {
    setPhase((current) => current === "loading" ? "preparing" : current);
  }, []);
  const revealScene = useCallback(() => {
    setPhase((current) => current === "error" ? current : "revealing");
  }, []);
  const failScene = useCallback(() => setPhase("error"), []);
  const completeReveal = useCallback(() => setRevealed(true), []);
  const continueWithoutScene = useCallback(() => {
    setPhase("error");
    setRevealed(true);
  }, []);

  useGSAP(() => {
    if (!revealed) return;
    const mm = gsap.matchMedia();
    const content = heroRef.current?.querySelector<HTMLElement>(".hero-content");
    if (!content) return;

    // Keep the copy in screen space, then clear it before the 3D tour.
    // The entrance owns the card itself; scroll owns its outer layer so a
    // delayed entrance cannot bring the card back over a scrolled scene.
    function createCopyExit(content: HTMLElement, motion: boolean) {
      const exit = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: () => `+=${Math.min(window.innerHeight * 0.42, 340)}`,
          scrub: motion ? 0.45 : true,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => { content.inert = progress >= 0.95; },
        },
      });

      exit
        .fromTo(content, { autoAlpha: 1 }, { autoAlpha: 0, duration: 1 }, 0)
        .to(".scroll-cue", { autoAlpha: 0, duration: 0.24 }, 0)
        .to(".hero-specs", { autoAlpha: 0, duration: 0.4 }, 0);

      if (motion) {
        exit
          .to(".hero-heading-wrap", { y: -36, duration: 1 }, 0)
          .to(".hero-card-layer", { y: -24, duration: 1 }, 0);
      }
    }

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = SplitText.create(".hero-heading", {
        type: "chars,lines",
        mask: "lines",
        linesClass: "line++",
      });

      const tl = gsap.timeline({ delay: failed ? 0 : 4.2 });

      tl.from(split.chars, {
        opacity: 0,
        y: -120,
        ease: "back",
        duration: 0.4,
        stagger: 0.07,
      }).to(".hero-body", { autoAlpha: 1, duration: 0.6, ease: "power2.out" });

      createCopyExit(content, true);

      // Crossfade a separate layer instead of repainting a full-screen gradient.
      gsap.to(
        ".hero-background-wash",
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "50% bottom",
            scrub: 0.45,
          },
        },
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".hero-heading, .hero-body", { autoAlpha: 1 });
      createCopyExit(content, false);
    });
    return () => {
      mm.revert();
      content.inert = false;
    };
  }, { scope: heroRef, dependencies: [revealed, failed], revertOnUpdate: true });

  return (
    <section
      ref={heroRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`hero relative h-dvh ${failed ? "" : "motion-safe:h-[300vh]"}`}
    >
      <div className="hero-scene pointer-events-none sticky top-0 h-dvh w-full">
        <div className="hero-background-wash" aria-hidden="true" />
        {failed ? (
          <Image
            className="hero-static-preview"
            src="/images/aJOiBaTt2nPbZ7yt_render_2.png"
            alt="Luma 75 keyboard"
            width={1920}
            height={1080}
          />
        ) : (
          <HeroCanvasBoundary onError={failScene}>
            <Canvas shadows="soft" dpr={[1, 1.5]} fallback={<CanvasUnavailable onError={failScene} />}>
              <Suspense fallback={null}>
                <Scene playing={revealed} />
                <SceneReadiness onPreparing={prepareScene} onReady={revealScene} onError={failScene} />
              </Suspense>
            </Canvas>
          </HeroCanvasBoundary>
        )}
      <div className="hero-content absolute inset-x-0 top-0 h-dvh">
        <Bounded
          fullWidth
          className="hero-heading-wrap"
        >
          <p className="eyebrow hero-eyebrow"><span /> INTRODUCING LUMA 75</p>
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <h1 className="hero-heading">
                  {children}
                </h1>
              ),
            }}
          />
        </Bounded>

        <div className="hero-card-layer">
        <Bounded
          fullWidth
          className="hero-body"
          innerClassName="flex flex-col gap-3"
        >
          <div className="hero-note"><span className="status-dot"/> THE EVERYDAY, ELEVATED <span className="hero-note-plus">+</span></div>
          <div className="max-w-md">
            <PrismicRichText
              field={slice.primary.body}
              components={{
                heading2: ({ children }) => (
                  <h2 className="hero-card-heading">
                    {children}
                  </h2>
                ),
              }}
            />
          </div>
          <button onClick={checkout} className="hero-card-link">
            {slice.primary.buy_button_text}
            <span className="transition group-hover:translate-x-1">{">"}</span>
          </button>
        </Bounded>
        </div>
        <a href="#features" className="scroll-cue"><span className="scroll-cue-icon">&darr;</span><span>Take a closer look<small>Scroll to discover</small></span></a>
        <div className="hero-specs"><span>75% layout</span><i/><span>Aluminum unibody</span><i/><span>Made to be yours</span></div>
      </div>
      </div>
      {!revealed && (
        <Loader phase={phase} onComplete={completeReveal} onContinue={continueWithoutScene} />
      )}
    </section>
  );
};

export default Hero;
