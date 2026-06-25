export interface Video {
  id: string;
  title: string;
  description?: string;
  path: string; // path to video file in /public/videos/
  thumbnail?: string;
  tags?: string[];
}

export const VIDEOS: Video[] = [
  {
    id: "hero-tour",
    title: "Luxury Property Tour",
    description: "Exclusive cinematic virtual property tour",
    path: "/videos/241e6fadc7eb824643f0cad52f950fd8_720w.mp4",
    tags: ["Hero", "Property Tour"],
  },
];

export function getVideoById(id: string): Video | undefined {
  return VIDEOS.find((video) => video.id === id);
}

export function getVideosByTag(tag: string): Video[] {
  return VIDEOS.filter((video) => video.tags?.includes(tag));
}
