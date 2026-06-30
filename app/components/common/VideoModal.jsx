export default function VideoModal({ video, label, onClose }) {
  if (!video) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] bg-black">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full border border-[#8A1FFF]/40 bg-black/70 text-2xl font-black text-white transition hover:bg-[#8A1FFF]"
        aria-label="Close video"
      >
        x
      </button>
      <div className="absolute left-5 top-5 z-10 rounded-2xl border border-[#8A1FFF]/30 bg-black/60 px-5 py-4 backdrop-blur">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-300">
          {label || video.category || video.type}
        </p>
        <h2 className="mt-1 text-lg font-black text-white sm:text-2xl">
          {video.title}
        </h2>
      </div>
      <iframe
        className="h-screen w-screen"
        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
