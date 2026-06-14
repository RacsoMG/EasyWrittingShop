import { Suspense, lazy, useEffect, useRef, useState } from "react";

import { useCanRender3D } from "@/hooks/use-can-render-3d";

const ConstellationCanvas = lazy(
  () => import("@/components/home/ConstellationCanvas"),
);

/**
 * Tracks whether the element is on screen so the WebGL render loop can be torn
 * down when scrolled away (battery / GPU savings) and never runs more than the
 * visible sections at once.
 *
 * @param {React.RefObject<Element>} ref Element to observe.
 * @returns {boolean} True while the element intersects the viewport.
 */
function useIsOnScreen(ref) {
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsOnScreen(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [ref]);

  return isOnScreen;
}

/**
 * Drops a themeable 3D constellation behind any section. The static `poster`
 * always renders underneath, so there is never a blank frame or layout shift;
 * the animated canvas mounts on top only when WebGL/motion/power gates pass and
 * the section is visible.
 *
 * @param {React.ReactNode} poster   Static fallback (also shown during gating).
 * @param {object}          [scene]  Props forwarded to ConstellationCanvas
 *                                   (color, count, coreOpacity, …).
 */
export default function Lazy3DBackdrop({ poster = null, scene = {} }) {
  const containerRef = useRef(null);
  const canRender3D = useCanRender3D();
  const isOnScreen = useIsOnScreen(containerRef);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      {poster}
      {canRender3D && isOnScreen ? (
        <Suspense fallback={null}>
          <ConstellationCanvas {...scene} />
        </Suspense>
      ) : null}
    </div>
  );
}
