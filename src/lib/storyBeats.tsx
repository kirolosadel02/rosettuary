export interface StoryBeat {
  from: number;
  to: number;
  align: "left" | "center" | "right";
  title: string;
  subtitle?: string;
  /** crossfade width in frames at each edge */
  fade?: number;
}

export const STORY_BEATS: StoryBeat[] = [
  {
    from: 0,
    to: 35,
    align: "center",
    title: "ROSETTUARY",
    subtitle: "Rashid · Egypt · 2026",
    fade: 8,
  },
  {
    from: 36,
    to: 75,
    align: "left",
    title: "Stillness",
    subtitle: "The Nile Side",
    fade: 8,
  },
  {
    from: 76,
    to: 120,
    align: "center",
    title: "Reflection",
    subtitle: "Healing Minds · Restoring Hope",
    fade: 8,
  },
  {
    from: 121,
    to: 170,
    align: "right",
    title: "Healing",
    subtitle: "Meditation · Music · Craft",
    fade: 8,
  },
  {
    from: 171,
    to: 205,
    align: "left",
    title: "Release",
    subtitle: "The Mediterranean Side",
    fade: 8,
  },
  {
    from: 206,
    to: 224,
    align: "center",
    title: "Healing begins where the waters meet.",
    fade: 6,
  },
];