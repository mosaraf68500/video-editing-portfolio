"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const defaultVideoThumbnail = "/thumbnails/video-thumbnail.svg";
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

function VideoCard({ onPlay, onPreviewEnd, onPreviewStart, previewVideo, video }) {
  return (
    <article
      data-video-card
      role="button"
      tabIndex={0}
      onMouseEnter={() => onPreviewStart(video.title)}
      onMouseLeave={onPreviewEnd}
      onTouchStart={(event) => {
        if (previewVideo !== video.title) {
          event.preventDefault();
          onPreviewStart(video.title);
        }
      }}
      onClick={() => {
        onPreviewEnd();
        onPlay(video);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onPreviewEnd();
          onPlay(video);
        }
      }}
      className="brand-card cursor-pointer overflow-hidden rounded-2xl"
      aria-label={`Open ${video.title} fullscreen`}
    >
      <div className="group relative block aspect-video w-full overflow-hidden bg-black text-left">
        <Image
          src={video.thumbnail || defaultVideoThumbnail}
          alt={`${video.title} thumbnail`}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        {previewVideo === video.title ? (
          <iframe
            className="pointer-events-none absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${video.youtubeId}&rel=0`}
            title={`${video.title} preview`}
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
          />
        ) : null}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute left-5 top-5 rounded-full bg-black/45 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-violet-200 backdrop-blur">
          {video.type}
        </div>
        <div className="absolute right-5 top-5 rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white backdrop-blur">
          {video.duration}
        </div>
        <div className="absolute inset-0 grid place-items-center transition duration-300 group-hover:opacity-0">
          <span className="grid h-16 w-16 place-items-center rounded-full text-white drop-shadow-[0_0_18px_rgba(168,85,247,0.95)] transition group-hover:scale-110">
            <span className="ml-1 h-0 w-0 border-y-[12px] border-l-[18px] border-y-transparent border-l-white" />
          </span>
        </div>
        <div className="absolute inset-x-5 bottom-5">
          <p className="text-sm font-black text-white">Click to view fullscreen</p>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-black text-white">{video.title}</h3>
        <p className="mt-3 leading-7 text-slate-400">{video.result}</p>
      </div>
    </article>
  );
}

function LogoCard({ logo }) {
  return (
    <article className="brand-card overflow-hidden rounded-2xl p-6">
      <div className="grid aspect-square place-items-center rounded-2xl bg-[radial-gradient(circle_at_50%_40%,rgba(138,31,255,0.38),transparent_12rem),linear-gradient(150deg,#100b2d,#02030d)]">
        <div className="grid h-28 w-28 place-items-center rounded-[2rem] border border-[#8A1FFF]/35 bg-black/45 text-3xl font-black text-white shadow-[0_0_44px_rgba(138,31,255,0.36)]">
          {logo.initials}
        </div>
      </div>
      <div className="pt-6">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">
          {logo.style}
        </p>
        <h3 className="mt-3 text-xl font-black text-white">{logo.title}</h3>
        <p className="mt-3 leading-7 text-slate-400">{logo.description}</p>
      </div>
    </article>
  );
}

export default function ServicePageClient({ logos, service, videos, services }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const isLogoDesign = service.slug === "logo-design";

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
    <main className="min-h-screen overflow-hidden bg-[#050617] text-white">
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

      <section className="relative pt-32">
        <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-700/25 blur-3xl" />
        <div className="section-shell relative pb-16">
          <Link
            href="/#services"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/15 bg-white/5 px-4 py-2 text-sm font-black text-violet-200 transition hover:border-violet-300/40"
          >
            Back to services
          </Link>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-violet-300">
                {isLogoDesign ? "Logo Videos & Gallery" : "Service Videos"}
              </p>
              <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
                {service.title} <span className="gradient-text">Portfolio</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                {isLogoDesign
                  ? `${service.copy} Nicher logo videos and design concepts ei service-er example work.`
                  : `${service.copy} Nicher video-gulo ei service-er example work. Video card-e click korle full screen preview open hobe.`}
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">
                Browse Other Services
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {services.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/services/${item.slug}`}
                    className={`rounded-full border px-4 py-2 text-sm font-black transition ${
                      item.slug === service.slug
                        ? "border-violet-300 bg-[#8A1FFF] text-white"
                        : "border-violet-500/15 bg-white/5 text-slate-300 hover:border-violet-300/40"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="section-shell grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
                <VideoCard
                  key={video.title}
                  video={video}
                  previewVideo={previewVideo}
                  onPreviewStart={setPreviewVideo}
                  onPreviewEnd={() => setPreviewVideo(null)}
                  onPlay={setSelectedVideo}
                />
              ))}
          {isLogoDesign
            ? logos.map((logo) => <LogoCard key={logo.title} logo={logo} />)
            : null}
        </div>
      </section>

      {selectedVideo ? (
        <div className="fixed inset-0 z-[90] bg-black">
          <button
            type="button"
            onClick={() => setSelectedVideo(null)}
            className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full border border-violet-500/30 bg-black/60 text-2xl font-black text-white backdrop-blur transition hover:bg-violet-600"
            aria-label="Close fullscreen video"
          >
            x
          </button>
          <div className="absolute left-5 top-5 z-10 rounded-2xl border border-violet-500/20 bg-black/55 px-5 py-4 backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-300">
              {service.title}
            </p>
            <h2 className="mt-1 text-lg font-black text-white sm:text-2xl">
              {selectedVideo.title}
            </h2>
          </div>
          <iframe
            className="h-screen w-screen"
            src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
            title={selectedVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      ) : null}
    </main>
  );
}
