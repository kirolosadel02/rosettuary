import { TOTAL_FRAMES } from "./storyStore";

export const FRAME_URLS = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) =>
    `/frames/frame_${String(i).padStart(5, "0")}.jpg`
);