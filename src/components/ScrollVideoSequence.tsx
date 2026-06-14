import { useEffect, useRef, useState } from "react";
import { useStoryStore } from "@/lib/storyStore";
import { FRAME_URLS } from "@/lib/frames";

export const SCROLL_HEIGHT_VH = 500;

export function ScrollVideoSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frame = useStoryStore((s) => s.frame);
  const setProgress = useStoryStore((s) => s.setProgress);

  const loadedRef = useRef<Set<number>>(new Set());
  const [ready, setReady] = useState(false);
  const [, forceRender] = useState(0);

  // Mobile-aware preload tuning. Computed once on mount (inside the
  // component, not at module scope) so it's safe under SSR.
const tuningRef = useRef<{ preloadRadius: number; initialLoadCount: number }>(null!);
  if (!tuningRef.current) {
    const isMobile =
      typeof window !== "undefined" && window.innerWidth < 768;
    tuningRef.current = {
      preloadRadius: isMobile ? 6 : 12,
      initialLoadCount: isMobile ? 10 : 20,
    };
  }
  const { preloadRadius, initialLoadCount } = tuningRef.current;

  // Preload a window of frames around the current index.
  useEffect(() => {
    const start = Math.max(0, frame - preloadRadius);
    const end = Math.min(FRAME_URLS.length - 1, frame + preloadRadius);

    for (let i = start; i <= end; i++) {
      if (loadedRef.current.has(i)) continue;
      const img = new Image();
      img.src = FRAME_URLS[i];
      img.decoding = "async";
      img.onload = () => {
        loadedRef.current.add(i);
        forceRender((n) => n + 1);
      };
    }
  }, [frame, preloadRadius]);

  // Initial load gate: wait for the first chunk of frames before reveal.
  useEffect(() => {
    let cancelled = false;
    const count = Math.min(initialLoadCount, FRAME_URLS.length);

    const checkReady = () => {
      if (cancelled) return;
      let loaded = 0;
      for (let i = 0; i < count; i++) {
        if (loadedRef.current.has(i)) loaded++;
      }
      if (loaded >= count) {
        setReady(true);
      } else {
        requestAnimationFrame(checkReady);
      }
    };

    for (let i = 0; i < count; i++) {
      if (loadedRef.current.has(i)) continue;
      const img = new Image();
      img.src = FRAME_URLS[i];
      img.decoding = "async";
      img.onload = () => {
        loadedRef.current.add(i);
      };
    }
    checkReady();
    return () => {
      cancelled = true;
    };
  }, [initialLoadCount]);

  // Scroll handler -> progress
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const next = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setProgress(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [setProgress]);

  // Resolve nearest loaded frame so fast scrolling never shows a blank image.
  let displayFrame = frame;
  while (displayFrame > 0 && !loadedRef.current.has(displayFrame)) {
    displayFrame--;
  }

  const src = loadedRef.current.has(displayFrame)
    ? FRAME_URLS[displayFrame]
    : FRAME_URLS[0];

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--ink)]">
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
        />

        {/* Loading veil */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-[var(--ink)] transition-opacity duration-700"
          style={{
            opacity: ready ? 0 : 1,
            pointerEvents: ready ? "none" : "auto",
          }}
        >
          <div className="label-caps text-[var(--gold)]/80">
            Loading walkthrough…
          </div>
        </div>

        {/* vignette so overlay text stays legible across all frames */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/45" />
      </div>
    </section>
  );
}