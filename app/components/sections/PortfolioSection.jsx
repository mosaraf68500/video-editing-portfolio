"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import ArrowIcon from "../common/ArrowIcon";
import SectionHeading from "../common/SectionHeading";

const defaultVideoThumbnail = "/thumbnails/video-thumbnail.svg";

export default function PortfolioSection({ portfolioItems, onPlay }) {
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
    <section id="portfolio" data-reveal className="py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Portfolio"
          title="Recent cuts and video concepts."
          copy="Use these premium placeholders for thumbnails, embedded reels, or client case studies when your final media is ready."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <article
              key={item.title}
              data-video-card
              role="button"
              tabIndex={0}
              onMouseEnter={() => setPreviewVideo(item.title)}
              onMouseLeave={() => setPreviewVideo(null)}
              onTouchStart={(event) => {
                if (previewVideo !== item.title) {
                  event.preventDefault();
                  setPreviewVideo(item.title);
                }
              }}
              onClick={() => {
                setPreviewVideo(null);
                onPlay(item);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setPreviewVideo(null);
                  onPlay(item);
                }
              }}
              className="brand-card group cursor-pointer overflow-hidden rounded-2xl p-[1px]"
            >
              <div className="overflow-hidden rounded-[calc(1rem-1px)] bg-[#08091b]">
                <div className="relative block aspect-video w-full overflow-hidden bg-black text-left">
                  <Image
                    src={item.thumbnail || defaultVideoThumbnail}
                    alt={`${item.title} thumbnail`}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  {previewVideo === item.title ? (
                    <iframe
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${item.youtubeId}&rel=0`}
                      title={`${item.title} preview`}
                      allow="autoplay; encrypted-media; picture-in-picture; web-share"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="absolute left-5 top-5 rounded-full bg-black/45 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-violet-200 backdrop-blur">
                    {item.category}
                  </div>
                  <div className="absolute inset-0 grid place-items-center transition duration-300 group-hover:opacity-0">
                    <span className="grid h-16 w-16 place-items-center rounded-full text-white drop-shadow-[0_0_18px_rgba(138,31,255,0.95)] transition group-hover:scale-110">
                      <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-white" />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-300">
                    Project 0{index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-black text-white">{item.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="purple-button inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-black text-white transition hover:-translate-y-1"
          >
            See More <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
