import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Detects whether the browser can create a WebGL rendering context.
 *
 * Runs once on the client. Returns false during SSR or when WebGL is blocked.
 *
 * @returns {boolean} True when a WebGL context is obtainable.
 */
export function detectWebGLSupport() {
  if (typeof document === "undefined") {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return Boolean(context);
  } catch {
    return false;
  }
}

/**
 * Heuristic for low-power devices that should skip WebGL to save battery.
 *
 * Uses logical CPU count and the coarse-pointer media query (touch devices).
 *
 * @returns {boolean} True when the device looks low-powered / mobile.
 */
export function isLowPowerDevice() {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }

  const FEW_CORES = 4;
  const hasFewCores =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= FEW_CORES;
  const isCoarsePointer =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;

  return hasFewCores && isCoarsePointer;
}

/**
 * Decides whether the animated 3D hero scene should mount.
 *
 * Gates on: reduced-motion preference, WebGL support, and device power.
 * Any failing condition falls back to the static poster.
 *
 * @returns {boolean} True only when it is safe to render the 3D scene.
 */
export function useCanRender3D() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isCapable, setIsCapable] = useState(false);

  useEffect(() => {
    setIsCapable(detectWebGLSupport() && !isLowPowerDevice());
  }, []);

  return isCapable && !prefersReducedMotion;
}
