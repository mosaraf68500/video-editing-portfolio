"use client";

import emailjs from "@emailjs/browser";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import servicesData from "../../data/services.json";

const defaultVideoThumbnail = "/thumbnails/video-thumbnail.svg";
const whatsappMessage =
  "Hello! I saw your portfolio and I would love to discuss a video editing project with you.";
const whatsappLink = `https://wa.me/8801601222918?text=${encodeURIComponent(
  whatsappMessage
)}`;
const emailJsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

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

const portfolioOrder = [
  "reel-video",
  "documentary-video",
  "saas-video",
  "ai-video",
  "logo-design",
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

export default function PortfolioPage() {
  useScrollReveal();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [previewVideo, setPreviewVideo] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [status, setStatus] = useState({ type: "idle" });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function getEmailJsErrorMessage(error) {
    if (error?.status || error?.text) {
      return `EmailJS error${error.status ? ` ${error.status}` : ""}: ${
        error.text || "Unable to send message."
      }`;
    }

    return error?.message || "Something went wrong. Please try again.";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "loading" });

    try {
      if (
        !emailJsConfig.serviceId ||
        !emailJsConfig.templateId ||
        !emailJsConfig.publicKey
      ) {
        throw new Error("EmailJS is not configured yet.");
      }

      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          name: form.name,
          email: form.email,
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          message: form.message,
        },
        {
          publicKey: emailJsConfig.publicKey,
        }
      );

      setForm({ name: "", email: "", message: "" });
      setStatus({ type: "success" });
      await Swal.fire({
        title: "Message Sent!",
        text: "Thank you for reaching out. I will get back to you shortly.",
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#8A1FFF",
        background: "#08091b",
        color: "#ffffff",
      });
    } catch (error) {
      const errorMessage = getEmailJsErrorMessage(error);

      setStatus({ type: "error" });
      console.error("EmailJS send error:", {
        message: errorMessage,
        status: error?.status,
        text: error?.text,
        error,
      });
    }
  }

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

      <section id="contact" data-reveal className="border-t border-violet-500/5 py-24">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-violet-300">
              Contact Us
            </p>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
              Ready to make your next video impossible to skip?
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Send the project details here or use WhatsApp for a faster
              conversation. I will reply with availability, timeline, and the
              best edit plan for your goal.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="purple-button mt-8 inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-black text-white transition hover:-translate-y-1"
            >
              Message on WhatsApp <ArrowIcon />
            </a>
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass-card rounded-[2.2rem] p-6 sm:p-8"
          >
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-200">Name</span>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-2xl border border-violet-500/12 bg-white/5 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300"
              />
            </label>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-bold text-slate-200">Email</span>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-violet-500/12 bg-white/5 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300"
              />
            </label>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-bold text-slate-200">Message</span>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your footage, deadline, and editing style..."
                rows="6"
                className="w-full resize-none rounded-2xl border border-violet-500/12 bg-white/5 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300"
              />
            </label>
            <button
              type="submit"
              disabled={status.type === "loading"}
              className="purple-button mt-6 w-full rounded-full px-7 py-4 font-black text-white transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status.type === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
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

      {selectedVideo ? (
        <div className="fixed inset-0 z-[90] bg-black">
          <button
            type="button"
            onClick={() => setSelectedVideo(null)}
            className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full border border-[#8A1FFF]/40 bg-black/70 text-2xl font-black text-white transition hover:bg-[#8A1FFF]"
            aria-label="Close portfolio video"
          >
            x
          </button>
          <div className="absolute left-5 top-5 z-10 rounded-2xl border border-[#8A1FFF]/30 bg-black/60 px-5 py-4 backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-300">
              {selectedVideo.type}
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
