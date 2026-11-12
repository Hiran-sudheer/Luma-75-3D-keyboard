"use client";

import { Component, useEffect, useRef, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";

type FailureProps = { onError: () => void };

export class HeroCanvasBoundary extends Component<FailureProps & { children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function CanvasUnavailable({ onError }: FailureProps) {
  useEffect(onError, [onError]);
  return null;
}

type ReadinessProps = FailureProps & { onPreparing: () => void; onReady: () => void };

export function SceneReadiness({ onPreparing, onReady, onError }: ReadinessProps) {
  const { gl, scene, camera } = useThree();
  const compiled = useRef(false);
  const frames = useRef(0);
  const reported = useRef(false);

  // This component commits inside the same Suspense boundary as the model,
  // textures and environment. Downloads alone do not guarantee a ready frame.
  useEffect(() => {
    let cancelled = false;
    compiled.current = false;
    frames.current = 0;
    reported.current = false;
    onPreparing();

    async function prepare() {
      try {
        await gl.compileAsync(scene, camera);
        if (!cancelled) compiled.current = true;
      } catch {
        if (!cancelled) onError();
      }
    }

    void prepare();
    return () => { cancelled = true; };
  }, [gl, scene, camera, onPreparing, onError]);

  useFrame(() => {
    if (!compiled.current || reported.current) return;
    // One completed draw uploads textures before revealing the next frame.
    frames.current += 1;
    if (frames.current < 2) return;
    reported.current = true;
    if (gl.getContext().isContextLost()) onError();
    else onReady();
  });

  return null;
}
