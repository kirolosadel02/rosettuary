import { createFileRoute } from "@tanstack/react-router";
import { ScrollVideoSequence } from "@/components/ScrollVideoSequence";
import { StoryOverlay } from "@/components/StoryOverlay";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { Credits } from "@/components/Credits";
import facadeAsset from "@/assets/render-facade.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rosettuary — Addiction Rehabilitation Center" },
      {
        name: "description",
        content:
          "An architectural sanctuary in Rashid, Egypt — where the Nile meets the Mediterranean.",
      },
      { property: "og:title", content: "Rosettuary — Addiction Rehabilitation Center" },
      {
        property: "og:description",
        content:
          "Healing begins where the waters meet. Graduation project 2026, British University in Egypt.",
      },
      { property: "og:image", content: facadeAsset },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-[var(--ink)] text-[var(--soft)]">
      <ScrollVideoSequence />
      <StoryOverlay />
      <ProgressIndicator />
      <Credits />
    </main>
  );
}