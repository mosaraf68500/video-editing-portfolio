"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import ArrowIcon from "../components/common/ArrowIcon";
import useScrollReveal from "../components/common/useScrollReveal";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/sections/Footer";
import Navbar from "../components/sections/Navbar";
import navLinks from "../../data/home/nav-links.json";
import socialLinks from "../../data/home/social-links.json";
import featuredVideos from "../../data/featured-videos.json";
import servicesData from "../../data/services.json";

const defaultVideoThumbnail = "/thumbnails/video-thumbnail.svg";
const reelVideos = servicesData.serviceVideoLibrary["reel-video"] || [];
const recentReelVideos = [...reelVideos, featuredVideos[4]].filter(Boolean).slice(0, 4);
const whatsappMessage =
  "Hello! I saw your portfolio and I would love to discuss a video editing project with you.";
const whatsappLink = `https://wa.me/8801601222918?text=${encodeURIComponent(
  whatsappMessage
)}`;
const subpageNavLinks = navLinks.map((link) => ({
  ...link,
  href: `/${link.href}`,
}));

function PlayButton({ small = false }) {
  return (
    <span
      className={`grid place-items-center rounded-full text-white drop-shadow-[0_0_22px_rgba(138,31,255,0.95)] transition group-hover:scale-110 ${
        small ? "h-12 w-12" : "h-16 w-16"
      }`}
    >
      <span
        className={`ml-1 h-0 w-0 border-y-transparent border-l-white ${
          small ? "border-y-[9px] border-l-[14px]" : "border-y-[12px] border-l-[18px]"
        }`}
      />
    </span>
  );
}

function VideoFrame({
  activeVideo,
  compact = false,
  onActivate,
  onPreviewEnd,
  onPreviewStart,
  previewVideo,
  priority = false,
  video,
}) {
  const category = video.category || video.type;
  const isActive = activeVideo === video.title;
  const isPreviewing = previewVideo === video.title && !isActive;
  const isPlayingInline = isActive || isPreviewing;

  return (
    <button
      type="button"
      data-video-card
      onMouseEnter={onPreviewStart ? () => onPreviewStart(video.title) : undefined}
      onMouseLeave={onPreviewEnd}
      onTouchStart={(event) => {
        if (!isActive && previewVideo !== video.title) {
          event.preventDefault();
          onPreviewStart?.(video.title);
        }
      }}
      onClick={() => {
        onPreviewEnd?.();
        onActivate(video.title);
      }}
      className={`brand-card group relative block w-full cursor-pointer overflow-hidden bg-black text-left ${
        compact ? "aspect-[4/5] rounded-xl" : "aspect-video rounded-2xl"
      }`}
      aria-label={`Play ${video.title} inline`}
    >
      <Image
        src={video.thumbnail || defaultVideoThumbnail}
        alt={`${video.title} thumbnail`}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
        priority={priority}
        sizes={compact ? "(min-width: 1024px) 25vw, 50vw" : "(min-width: 1024px) 720px, 100vw"}
      />
      {isPlayingInline ? (
        <iframe
          className={`absolute inset-0 h-full w-full ${isActive ? "" : "pointer-events-none"}`}
          src={
            isActive
              ? `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&playsinline=1&rel=0`
              : `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${video.youtubeId}&rel=0`
          }
          title={isActive ? video.title : `${video.title} preview`}
          allow="autoplay; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : null}
      <div className="absolute inset-0 bg-black/35 transition duration-300 group-hover:bg-black/20" />
      <div className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-violet-200 backdrop-blur">
        {category}
      </div>
      <div className="absolute right-3 top-3 rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white backdrop-blur">
        {video.duration}
      </div>
      <div className={`absolute inset-0 grid place-items-center transition duration-300 ${isPlayingInline ? "opacity-0" : "group-hover:opacity-0"}`}>
        <PlayButton small={compact} />
      </div>
    </button>
  );
}

export default function FeaturedFilmsPage() {
  useScrollReveal();

  const [activeVideo, setActiveVideo] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [firstFeatured, secondFeatured] = featuredVideos;

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
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <Navbar logoHref="/#home" navLinks={subpageNavLinks} whatsappLink={whatsappLink} />

      <section data-reveal className="relative pt-32">
        <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-700/20 blur-3xl" />
        <div className="section-shell relative pb-14 text-center">
          <Link
            href="/#testimonials"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/15 bg-white/5 px-4 py-2 text-sm font-black text-violet-200 transition hover:border-violet-300/40"
          >
            Back to Home
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-cyan-300 sm:text-6xl">
            Featured Films
          </h1>
          <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-slate-400 sm:text-lg">
            Explore recent video edits where creativity meets precision, crafted
            with clean pacing, detailed sound, and polished visuals.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="section-shell space-y-20">
          <div data-reveal className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <article>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-violet-300">
                {firstFeatured.category}
              </p>
              <h2 className="text-3xl font-black text-cyan-300 sm:text-4xl">
                {firstFeatured.title}
              </h2>
              <p className="mt-6 leading-8 text-slate-400">
                {firstFeatured.description}
              </p>
              <button
                type="button"
                onClick={() => {
                  setPreviewVideo(null);
                  setActiveVideo(firstFeatured.title);
                }}
                className="purple-button mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 font-black text-white transition hover:-translate-y-1"
              >
                Watch Film <ArrowIcon />
              </button>
            </article>
            <VideoFrame
              video={firstFeatured}
              activeVideo={activeVideo}
              previewVideo={previewVideo}
              onPreviewStart={setPreviewVideo}
              onPreviewEnd={() => setPreviewVideo(null)}
              onActivate={setActiveVideo}
              priority
            />
          </div>

          <div data-reveal className="grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
            <VideoFrame
              video={secondFeatured}
              activeVideo={activeVideo}
              previewVideo={previewVideo}
              onPreviewStart={setPreviewVideo}
              onPreviewEnd={() => setPreviewVideo(null)}
              onActivate={setActiveVideo}
            />
            <article>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-violet-300">
                {secondFeatured.category}
              </p>
              <h2 className="text-3xl font-black text-cyan-300 sm:text-4xl">
                {secondFeatured.title}
              </h2>
              <p className="mt-6 leading-8 text-slate-400">
                {secondFeatured.description}
              </p>
              <button
                type="button"
                onClick={() => {
                  setPreviewVideo(null);
                  setActiveVideo(secondFeatured.title);
                }}
                className="purple-button mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 font-black text-white transition hover:-translate-y-1"
              >
                Watch Film <ArrowIcon />
              </button>
            </article>
          </div>
        </div>
      </section>

      <section data-reveal className="pb-24">
        <div className="section-shell">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black tracking-tight text-cyan-300 sm:text-5xl">
              Our Recent Projects
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-400">
              A few reel edits from my short-form video work.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentReelVideos.map((video) => (
              <article key={video.title} data-reveal className="group">
                <VideoFrame
                  compact
                  video={video}
                  activeVideo={activeVideo}
                  previewVideo={previewVideo}
                  onPreviewStart={setPreviewVideo}
                  onPreviewEnd={() => setPreviewVideo(null)}
                  onActivate={setActiveVideo}
                />
                <h3 className="mt-3 text-sm font-black leading-5 text-white">
                  {video.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactSection whatsappLink={whatsappLink} />
      <Footer linkPrefix="/" socialLinks={socialLinks} />
    </main>
  );
}
