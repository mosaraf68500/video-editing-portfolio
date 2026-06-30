"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import ArrowIcon from "../common/ArrowIcon";

const defaultVideoThumbnail = "/thumbnails/video-thumbnail.svg";

export default function FeaturedPreviewSection({ featuredVideo, onPlay }) {
  const [previewVideo, setPreviewVideo] = useState(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!event.target.closest("[data-video-card]")) {
        setPreviewVideo(null);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <section data-reveal className="border-t border-violet-500/5 py-16">
      <div className="section-shell">
        <div className="mx-auto mb-9 max-w-4xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-violet-300">
            Latest Masterpiece
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Watch my <span className="gradient-text">featured edit</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl leading-8 text-slate-300">
            A highlighted video project with cinematic pacing, polished visuals,
            and story-driven editing.
          </p>
        </div>

        <article
          data-video-card
          role="button"
          tabIndex={0}
          onMouseEnter={() => setPreviewVideo(featuredVideo.title)}
          onMouseLeave={() => setPreviewVideo(null)}
          onTouchStart={(event) => {
            if (previewVideo !== featuredVideo.title) {
              event.preventDefault();
              setPreviewVideo(featuredVideo.title);
            }
          }}
          onClick={() => {
            setPreviewVideo(null);
            onPlay(featuredVideo);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              setPreviewVideo(null);
              onPlay(featuredVideo);
            }
          }}
          className="brand-card group mx-auto max-w-5xl cursor-pointer overflow-hidden rounded-[2rem]"
          aria-label={`Open ${featuredVideo.title} fullscreen`}
        >
          <div className="relative aspect-video overflow-hidden bg-black">
            <Image
              src={featuredVideo.thumbnail || defaultVideoThumbnail}
              alt={`${featuredVideo.title} thumbnail`}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 1000px, 100vw"
            />
            {previewVideo === featuredVideo.title ? (
              <iframe
                className="pointer-events-none absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${featuredVideo.youtubeId}&rel=0`}
                title={`${featuredVideo.title} preview`}
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
              />
            ) : null}
            <div className="absolute inset-0 bg-black/35 transition duration-300 group-hover:bg-black/20" />
            <div className="absolute left-5 top-5 rounded-full bg-black/55 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-violet-200 backdrop-blur">
              {featuredVideo.category}
            </div>
            <div className="absolute right-5 top-5 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white backdrop-blur">
              {featuredVideo.duration}
            </div>
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid h-20 w-20 place-items-center rounded-full text-white drop-shadow-[0_0_24px_rgba(138,31,255,0.95)] transition group-hover:scale-110">
                <span className="ml-1 h-0 w-0 border-y-[14px] border-l-[22px] border-y-transparent border-l-white" />
              </span>
            </div>
            <div className="absolute inset-x-6 bottom-6">
              <h3 className="max-w-2xl text-2xl font-black text-white sm:text-4xl">
                {featuredVideo.title}
              </h3>
            </div>
          </div>
        </article>

        <div className="mt-8 text-center">
          <Link
            href="/featured-films"
            className="purple-button inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-black text-white transition hover:-translate-y-1"
          >
            See More <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
