import { VIDEOS } from "@/lib/videos";

export function VideoPlayer({ videoId }: { videoId?: string }) {
  const video = videoId ? VIDEOS.find((v) => v.id === videoId) : undefined;

  if (!video) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No video found</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{video.title}</h2>
      {video.description && (
        <p className="text-gray-600 mb-4">{video.description}</p>
      )}
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <video
          controls
          className="w-full h-full"
          src={video.path}
          poster={video.thumbnail}
        >
          Your browser does not support the video tag.
        </video>
      </div>
      {video.tags && (
        <div className="mt-4 flex flex-wrap gap-2">
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
