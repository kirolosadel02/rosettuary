import { useStoryStore } from "@/lib/storyStore";
import { STORY_BEATS, type StoryBeat } from "@/lib/storyBeats";

const TEXT_SHADOW = "0 0 30px rgba(0,0,0,.35)";
const LABEL_SHADOW = "0 0 20px rgba(0,0,0,.4)";

const TRANSITION =
  "opacity 300ms ease-out, transform 300ms ease-out";

function beatOpacity(beat: StoryBeat, frame: number): number {
  const fade = beat.fade ?? 6;

  if (frame < beat.from - fade || frame > beat.to + fade) {
    return 0;
  }

  if (frame < beat.from) {
    return (frame - (beat.from - fade)) / fade;
  }

  if (frame > beat.to) {
    return 1 - (frame - beat.to) / fade;
  }

  return 1;
}

function getTransform(
  opacity: number,
  align: StoryBeat["align"]
): string {
  const distance = (1 - opacity) * 35;

  switch (align) {
    case "left":
      return `translateX(${-distance}px)`;

    case "right":
      return `translateX(${distance}px)`;

    default:
      return `translateY(${distance}px)`;
  }
}

const alignClasses: Record<StoryBeat["align"], string> = {
  center: "items-center justify-center text-center",
  left: "items-start justify-center text-left",
  right: "items-end justify-center text-right",
};

export function StoryOverlay() {
  const frame = useStoryStore((s) => s.frame);

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {/* Cinematic readability layer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {STORY_BEATS.map((beat, i) => {
        const opacity = beatOpacity(beat, frame);

        if (opacity <= 0) {
          return null;
        }

        const isFinal = !beat.subtitle;

        return (
          <div
            key={i}
            className={`story-beat absolute inset-0 flex flex-col ${alignClasses[beat.align]}`}
            style={{
              opacity,
              transform: getTransform(opacity, beat.align),
              transition: TRANSITION,
            }}
          >
            <div className="w-full max-w-7xl px-8 md:px-16 lg:px-24">
              {isFinal ? (
                <h2
                  className="serif-thin mx-auto max-w-4xl text-center text-[clamp(2rem,5vw,4.5rem)] leading-[1.15] text-[var(--soft)]"
                  style={{
                    fontWeight: 200,
                    textShadow: TEXT_SHADOW,
                  }}
                >
                  {beat.title}
                </h2>
              ) : (
                <div>
                  {/* Subtitle appears first */}
                  <div
                    className="label-caps text-[var(--gold)]"
                    style={{
                      textShadow: LABEL_SHADOW,
                      opacity,
                      transition: "opacity 250ms ease-out",
                    }}
                  >
                    {beat.subtitle}
                  </div>

                  {/* Title follows slightly later */}
                  <h2
                    className="serif-thin mt-3 text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] text-[var(--soft)]"
                    style={{
                      fontWeight: 200,
                      letterSpacing: "0.05em",
                      textShadow: TEXT_SHADOW,
                      transition:
                        "opacity 300ms ease-out, transform 300ms ease-out",
                      transitionDelay: "120ms",
                    }}
                  >
                    {beat.title}
                  </h2>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}