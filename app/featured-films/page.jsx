"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import featuredVideos from "../../data/featured-videos.json";
import servicesData from "../../data/services.json";

const defaultVideoThumbnail = "/thumbnails/video-thumbnail.svg";
const reelVideos = servicesData.serviceVideoLibrary["reel-video"];
const recentReelVideos = [...reelVideos, featuredVideos[4]].slice(0, 4);
const whatsappMessage =
  "Hello! I saw your portfolio and I would love to discuss a video editing project with you.";
const whatsappLink = `https://wa.me/8801601222918?text=${encodeURIComponent(
  whatsappMessage
)}`;

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "About Me", href: "/#about" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/md.sahadat.islam.540581",
    icon: "facebook",
  },
  {
    label: "X",
    href: "https://x.com/md_sahadat39507",
    icon: "x",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sahadat200615/",
    icon: "instagram",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
    </svg>
  );
}

function PlayButton({ small = false }) {
  return (
    <span
      className={`grid place-items-center rounded-full text-white drop-shadow-[0_0_22px_rgba(138,31,255,0.95)] transition group-hover:scale-110 ${
        small ? "h-12 w-12" : "h-16 w-16"
      }`}
    >
      <span
        className={`ml-1 h-0 w-0 border-y-transparent border-l-white ${
          small
            ? "border-y-[9px] border-l-[14px]"
            : "border-y-[12px] border-l-[18px]"
        }`}
      />
    </span>
  );
}

function SocialIcon({ type }) {
  if (type === "facebook") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 8.2V6.7c0-.7.2-1.1 1.2-1.1H17V2.3A24.2 24.2 0 0 0 14.4 2c-2.6 0-4.3 1.6-4.3 4.4v1.8H7.2V12h2.9v10h3.8V12h3l.5-3.8H14Z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <rect width="17" height="17" x="3.5" y="3.5" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17" cy="7" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.7 3h3.1l-6.9 7.9L22 21h-6.4l-5-6.2L5 21H1.8l7.4-8.5L1.4 3h6.5l4.5 5.6L17.7 3Zm-1.1 16.2h1.7L7 4.7H5.2l11.4 14.5Z" />
    </svg>
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
      className={`group relative block w-full cursor-pointer overflow-hidden bg-black text-left ${
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

function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.16 }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

export default function FeaturedFilmsPage() {
  useScrollReveal();

  const [activeVideo, setActiveVideo] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [firstFeatured, secondFeatured] = featuredVideos;

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-violet-500/10 bg-[#08091b]/88 backdrop-blur-2xl">
        <div className="section-shell flex min-h-16 items-center justify-between gap-6">
          <Link href="/#home" className="flex items-center gap-3 font-black tracking-tight">
            <Image
              src="/logo.png"
              alt="Sahadat Media logo"
              width={140}
              height={56}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>

          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-300 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="purple-button rounded-full px-6 py-3 font-bold text-white transition hover:-translate-y-0.5"
            >
              Contact Me
            </a>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="purple-button rounded-full px-4 py-2.5 text-sm font-bold text-white lg:hidden"
          >
            Hire Me
          </a>
        </div>
      </nav>

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

      <footer data-reveal className="py-12">
        <div className="section-shell">
          <div className="rounded-[2rem] bg-[#08091b] p-7 sm:p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Link href="/#home" className="inline-flex items-center gap-3">
                  <Image
                    src="/logo.png"
                    alt="Sahadat Media logo"
                    width={130}
                    height={52}
                    className="h-10 w-auto object-contain"
                  />
                </Link>
                <p className="mt-4 max-w-md leading-7 text-slate-400">
                  Sahadat Media creates polished videos, reels, documentary
                  stories, and SaaS visuals that help brands look sharp online.
                </p>
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex flex-wrap gap-5 text-sm font-black text-slate-300">
                  <Link href="/#home">Home</Link>
                  <Link href="/#services">Services</Link>
                  <Link href="/#portfolio">Portfolio</Link>
                  <Link href="/#testimonials">Reviews</Link>
                  <Link href="/#contact">Contact</Link>
                </div>

                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="grid h-11 w-11 place-items-center rounded-full bg-[#8A1FFF]/10 text-white"
                    >
                      <SocialIcon type={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 text-sm text-slate-500">
              Copyright 2026 Sahadat Media. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
