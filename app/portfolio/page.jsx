"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import VideoModal from "../components/common/VideoModal";
import useScrollReveal from "../components/common/useScrollReveal";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/sections/Footer";
import Navbar from "../components/sections/Navbar";
import navLinks from "../../data/home/nav-links.json";
import socialLinks from "../../data/home/social-links.json";
import servicesData from "../../data/services.json";

const defaultVideoThumbnail = "/thumbnails/video-thumbnail.svg";
const whatsappMessage =
  "Hello! I saw your portfolio and I would love to discuss a video editing project with you.";
const whatsappLink = `https://wa.me/8801601222918?text=${encodeURIComponent(
  whatsappMessage
)}`;
const subpageNavLinks = navLinks.map((link) => ({
  ...link,
  href: `/${link.href}`,
}));

const portfolioOrder = [
  "reel-video",
  "documentary-video",
  "saas-video",
  "ai-video",
  "logo-Intro",
];

const videoGroups = servicesData.services
  .map((service) => ({
    ...service,
    videos: servicesData.serviceVideoLibrary[service.slug] || [],
  }))
  .filter((group) => portfolioOrder.includes(group.slug))
  .filter((group) => group.videos.length > 0)
  .sort(
    (first, second) =>
      portfolioOrder.indexOf(first.slug) - portfolioOrder.indexOf(second.slug)
  );

function VideoCard({ onPlay, onPreviewEnd, onPreviewStart, previewVideo, video }) {
  const isPreviewing = previewVideo === video.title;

  return (
    <article
      data-video-card
      data-reveal
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
      className="brand-card group cursor-pointer overflow-hidden rounded-2xl p-[1px]"
      aria-label={`Open ${video.title} fullscreen`}
    >
      <div className="overflow-hidden rounded-[calc(1rem-1px)] bg-[#08091b]">
        <div className="relative aspect-video overflow-hidden bg-black">
          <Image
            src={video.thumbnail || defaultVideoThumbnail}
            alt={`${video.title} thumbnail`}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
          {isPreviewing ? (
            <iframe
              className="pointer-events-none absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${video.youtubeId}&rel=0`}
              title={`${video.title} preview`}
              allow="autoplay; encrypted-media; picture-in-picture; web-share"
            />
          ) : null}
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-violet-200 backdrop-blur">
            {video.type}
          </div>
          <div className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white backdrop-blur">
            {video.duration}
          </div>
          <div className="absolute inset-0 grid place-items-center transition duration-300 group-hover:opacity-0">
            <span className="grid h-16 w-16 place-items-center rounded-full text-white drop-shadow-[0_0_18px_rgba(138,31,255,0.95)] transition group-hover:scale-110">
              <span className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white" />
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-black text-white">{video.title}</h3>
          <p className="mt-3 leading-7 text-slate-400">{video.result}</p>
        </div>
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  useScrollReveal();

  const [previewVideo, setPreviewVideo] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050617] text-white">
      <Navbar logoHref="/#home" navLinks={subpageNavLinks} whatsappLink={whatsappLink} />

      <section data-reveal className="relative pt-32">
        <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-700/25 blur-3xl" />
        <div className="section-shell relative pb-14 text-center">
          <Link
            href="/#portfolio"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/15 bg-white/5 px-4 py-2 text-sm font-black text-violet-200 transition hover:border-violet-300/40"
          >
            Back to Portfolio
          </Link>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Complete <span className="gradient-text">Video Portfolio</span>
          </h1>
          <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
            Browse all video work by category. Documentary videos, reels, AI videos,
            and SaaS videos are grouped separately for easy viewing.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="section-shell space-y-20">
          {videoGroups.map((group) => (
            <section key={group.slug} id={group.slug} data-reveal>
              <div className="mb-8">
                <p className="mb-3 text-sm font-black uppercase tracking-[0.28em] text-violet-300">
                  {group.icon}
                </p>
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                  {group.title}
                </h2>
                <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                  {group.copy}
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.videos.map((video) => (
                  <VideoCard
                    key={`${group.slug}-${video.title}`}
                    video={video}
                    previewVideo={previewVideo}
                    onPreviewStart={setPreviewVideo}
                    onPreviewEnd={() => setPreviewVideo(null)}
                    onPlay={(selected) => {
                      setPreviewVideo(null);
                      setSelectedVideo(selected);
                    }}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <ContactSection whatsappLink={whatsappLink} />
      <Footer linkPrefix="/" socialLinks={socialLinks} />
      <VideoModal
        video={selectedVideo}
        label={selectedVideo?.type}
        onClose={() => setSelectedVideo(null)}
      />
    </main>
  );
}
