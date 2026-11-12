"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useProgress } from "@react-three/drei";
import { LogoMark } from "./LogoMark";

export type LoadingPhase = "loading" | "preparing" | "revealing" | "error";

type LoaderProps = {
  phase: LoadingPhase;
  onComplete: () => void;
  onContinue: () => void;
};

const labels: Record<LoadingPhase, string> = {
  loading: "Loading your keyboard",
  preparing: "Finishing touches",
  revealing: "Ready when you are.",
  error: "The 3D scene couldn’t load.",
};

export function Loader({ phase, onComplete, onContinue }: LoaderProps) {
  const downloaded = useProgress((state) => state.progress);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [slow, setSlow] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const failed = phase === "error";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const next = phase === "revealing" ? 100
      : phase === "preparing" ? 94
      : Math.min(88, Math.floor(downloaded * 0.88));
    if (!Number.isFinite(next) || failed) return;
    setProgress((current) => Math.max(current, next));
  }, [downloaded, phase, failed]);

  useEffect(() => {
    const timer = window.setTimeout(() => setSlow(true), 15000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== "revealing") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(onComplete, reduced ? 0 : 650);
    return () => window.clearTimeout(timer);
  }, [phase, onComplete]);

  useEffect(() => {
    if (!mounted || !root.current) return;
    // Keep the loading controls available while the page behind them is inert.
    const siblings = Array.from(document.body.children).filter(
      (node): node is HTMLElement => (
        node instanceof HTMLElement && node !== root.current
        && !["SCRIPT", "STYLE"].includes(node.tagName)
      ),
    );
    const previousInert = siblings.map((node) => node.inert);
    const previousOverflow = document.body.style.overflow;
    const previousGutter = document.documentElement.style.scrollbarGutter;
    document.documentElement.style.scrollbarGutter = "stable";
    document.body.style.overflow = "hidden";
    siblings.forEach((node) => { node.inert = true; });
    return () => {
      siblings.forEach((node, index) => { node.inert = previousInert[index]; });
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.scrollbarGutter = previousGutter;
    };
  }, [mounted]);

  const content = (
    <div
      ref={root}
      className="scene-loader"
      data-phase={phase}
      aria-label="Loading Luma 75"
      aria-busy={!failed && phase !== "revealing"}
    >
      <div className="loader-composition">
        <div className="loader-key" aria-hidden="true">
          <div className="loader-key-face"><LogoMark /></div>
        </div>
        <span className="loader-wordmark">luma<span>.</span></span>
        <div
          className="loader-progress"
          role="progressbar"
          aria-label="Preparing the 3D keyboard"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          style={{ "--load-progress": progress / 100 } as CSSProperties}
        >
          <span />
        </div>
        <div className="loader-caption">
          <span role="status" aria-live="polite">{labels[phase]}</span>
          {!failed && (
            <span className="loader-percent" aria-hidden="true">
              {String(progress).padStart(2, "0")}<small>%</small>
            </span>
          )}
        </div>
        {(failed || slow) && phase !== "revealing" && (
          <div className="loader-actions">
            {failed && (
              <button type="button" onClick={() => window.location.reload()}>Try again</button>
            )}
            <button type="button" onClick={onContinue}>
              Explore without 3D <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return mounted ? createPortal(content, document.body) : content;
}
