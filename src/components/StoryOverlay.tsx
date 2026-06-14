import { useStoryStore } from "@/lib/storyStore";
import { STORY_BEATS, type StoryBeat } from "@/lib/storyBeats";

function beatOpacity(beat: StoryBeat, frame: number): number {
  const fade = beat.fade ?? 6;
  if (frame < beat.from - fade || frame > beat.to + fade) return 0;
  if (frame < beat.from) {
    return (frame - (beat.from - fade)) / fade;
  }
  if (frame > beat.to) {
    return 1 - (frame - beat.to) / fade;
  }
  return 1;
}

const alignClasses: Record<StoryBeat["align"], string> = {
  center: "items-center justify-center text-center px-6",
  left: "items-start justify-center text-left px-8 md:px-20",
  right: "items-end justify-center text-right px-8 md:px-20",
};

export function StoryOverlay() {
  const frame = useStoryStore((s) => s.frame);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex flex-col">
      {STORY_BEATS.map((beat, i) => {
        const opacity = beatOpacity(beat, frame);
        if (opacity <= 0) return null;

        const isFinal = !beat.subtitle;

        return (
          <div
            key={i}
            className={`absolute inset-0 flex flex-col ${alignClasses[beat.align]}`}
            style={{ opacity, transition: "opacity 200ms linear" }}
          >
            {isFinal ? (
              <h2
                className="serif-thin mx-auto max-w-3xl text-[clamp(1.75rem,5vw,4rem)] leading-[1.2] text-[var(--soft)]"
                style={{ fontWeight: 200 }}
              >
                {beat.title}
              </h2>
            ) : (
              <div>
                <div className="label-caps text-[var(--gold)]">
                  {beat.subtitle}
                </div>
                <h2
                  className="serif-thin mt-3 text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] text-[var(--soft)]"
                  style={{ fontWeight: 200, letterSpacing: "0.05em" }}
                >
                  {beat.title}
                </h2>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}