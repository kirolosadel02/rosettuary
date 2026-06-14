import { useStoryStore } from "@/lib/storyStore";

export function ProgressIndicator() {
  const progress = useStoryStore((s) => s.progress);

  if (progress >= 1) return null;

  return (
    <div className="pointer-events-none fixed bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 md:gap-4">
      <span className="label-caps hidden text-[var(--gold)] sm:inline">
        Nile
      </span>

      <div className="relative h-px w-28 bg-white/20 md:w-40">
        <div
          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[var(--gold)]"
          style={{
            left: `${progress * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <span className="label-caps hidden text-[var(--gold)] sm:inline">
        Mediterranean
      </span>
    </div>
  );
}