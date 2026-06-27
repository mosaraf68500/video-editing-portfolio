"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import featuredVideos from "../data/featured-videos.json";
import servicesData from "../data/services.json";
import testimonials from "../data/testimonials.json";

const { services } = servicesData;
const defaultVideoThumbnail = "/thumbnails/video-thumbnail.svg";
const homepageServiceOrder = [
  "documentary-video",
  "reel-video",
  "saas-video",
  "google-ads-video",
  "ai-video",
  "logo-design",
];
const homepageServices = homepageServiceOrder
  .map((slug) => services.find((service) => service.slug === slug))
  .filter(Boolean);
const homepageServiceSpans = {
  "reel-video": "lg:col-span-2",
  "saas-video": "lg:col-span-2",
  "ai-video": "",
  "logo-design": "lg:col-span-2",
};

const whatsappMessage =
  "Hello! I saw your portfolio and I would love to discuss a video editing project with you.";
const whatsappLink = `https://wa.me/8801601222918?text=${encodeURIComponent(
  whatsappMessage
)}`;

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "About Me", href: "#about" },
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

const benefits = [
  { title: "Fast Delivery", icon: "BOLT" },
  { title: "Clear Communication", icon: "CHAT" },
  { title: "Unlimited Revisions", icon: "LOOP" },
  { title: "High Retention", icon: "UP" },
  { title: "Cinematic Storytelling", icon: "SPARK" },
  { title: "Creative Motion", icon: "LAY" },
];

const portfolioItems = [
  {
    title: "Founder Journey Film",
    category: "Documentary Video",
    youtubeId: "_B1P_19Ed_A",
    thumbnail: "/thumbnails/day 5 x.png",
  },
  {
    title: "Fitness Reel With Captions",
    category: "Reel Video",
    youtubeId: "buU66xm5j5I",
    thumbnail: "/thumbnails/day 9 x.png",
  },
  {
    title: "SaaS Product Demo",
    category: "SaaS Video",
    youtubeId: "SxGSL4NNJYk",
    thumbnail: "/thumbnails/day12 x.png",
  },
  {
    title: "Google Ads Promo",
    category: "Google Ads Video",
    youtubeId: "MPgjRi13Rvw",
    thumbnail: "/thumbnails/adf.png",
  },
  {
    title: "AI Avatar Promo",
    category: "AI Video",
    youtubeId: "0QXDnmpVLnA",
    thumbnail: "/thumbnails/day 2 x.png",
  },
  {
    title: "Logo Animation Reveal",
    category: "Logo Design",
    youtubeId: "m5wsUGvsRXU",
    thumbnail: "/thumbnails/logo.png",
  },
];

const skillBars = [
  { label: "Premiere Pro", value: 95 },
  { label: "After Effects", value: 90 },
  { label: "Photoshop", value: 85 },
  { label: "Storytelling", value: 95 },
  { label: "Motion Graphics", value: 88 },
];

const faqItems = [
  {
    icon: "01",
    question: "What Types of Videos Do You Edit?",
    answer:
      "I edit YouTube videos, reels, documentaries, SaaS/product videos, ads, podcasts, short-form content, and brand storytelling videos with clean pacing and polished visuals.",
  },
  {
    icon: "02",
    question: "How Many Revisions Are Included?",
    answer:
      "Every project includes revisions based on the package and scope. I make sure the final video matches your style, message, and platform goals before delivery.",
  },
  {
    icon: "03",
    question: "What Is Your Average Delivery Time?",
    answer:
      "Short-form reels usually take 24-48 hours. Long-form videos, documentaries, and detailed edits depend on footage length, complexity, and the amount of motion graphics needed.",
  },
  {
    icon: "04",
    question: "Do You Offer Long-Term Collaboration Packages?",
    answer:
      "Yes. I offer long-term editing support for creators, agencies, and brands that need consistent weekly or monthly content with a reliable workflow.",
  },
  {
    icon: "05",
    question: "What Is Your Average Delivery Time?",
    answer:
      "For urgent projects, I can offer faster delivery depending on availability. Share your deadline first, and I will confirm the best timeline before starting.",
  },
  {
    icon: "06",
    question: "Can You Edit Videos for YouTube, Reels, and Documentaries?",
    answer:
      "Yes. I can edit platform-ready YouTube videos, high-retention reels, and story-driven documentaries with proper structure, sound design, color, captions, and motion graphics.",
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

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-violet-300">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{copy}</p>
      ) : null}
    </div>
  );
}

function Rating({ value = 5 }) {
  return (
    <div
      aria-label={`${value} out of 5 rating`}
      className="flex items-center gap-1 text-xl text-[#FFD166] drop-shadow-[0_0_12px_rgba(255,209,102,0.75)]"
    >
      {Array.from({ length: value }).map((_, index) => (
        <span key={index}>★</span>
      ))}
    </div>
  );
}

function SocialIcon({ type }) {
  if (type === "facebook") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 8.8V6.9c0-.8.5-1 1.1-1H17V2.7c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6v1.6h-3v3.6h3v9h3.7v-9h3l.5-3.6h-3Z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="7" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.7 3h3.1l-6.9 7.9L22 21h-6.4l-5-6.2L5 21H1.8l7.4-8.5L1.4 3h6.5l4.5 5.6L17.7 3Zm-1.1 16.2h1.7L7 4.7H5.2l11.4 14.5Z" />
    </svg>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedFeaturedVideo, setSelectedFeaturedVideo] = useState(null);
  const [previewFeaturedVideo, setPreviewFeaturedVideo] = useState(null);
  const [selectedPortfolioVideo, setSelectedPortfolioVideo] = useState(null);
  const [previewPortfolioVideo, setPreviewPortfolioVideo] = useState(null);
  const [animatedSkills, setAnimatedSkills] = useState(() =>
    Object.fromEntries(skillBars.map((skill) => [skill.label, 0]))
  );
  const aboutSectionRef = useRef(null);
  const isSkillSectionActive = useRef(false);
  const skillAnimationFrame = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "idle", message: "" });

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

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!event.target.closest("[data-video-card]")) {
        setPreviewFeaturedVideo(null);
        setPreviewPortfolioVideo(null);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    const aboutSection = aboutSectionRef.current;

    if (!aboutSection) {
      return undefined;
    }

    function resetSkills() {
      if (skillAnimationFrame.current) {
        cancelAnimationFrame(skillAnimationFrame.current);
      }

      setAnimatedSkills(
        Object.fromEntries(skillBars.map((skill) => [skill.label, 0]))
      );
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          isSkillSectionActive.current = false;
          resetSkills();
          return;
        }

        if (isSkillSectionActive.current) {
          return;
        }

        isSkillSectionActive.current = true;
        const duration = 3000;
        const startTime = performance.now();

        function animateSkills(currentTime) {
          const progress = Math.min((currentTime - startTime) / duration, 1);

          setAnimatedSkills(
            Object.fromEntries(
              skillBars.map((skill) => [
                skill.label,
                Math.round(skill.value * progress),
              ])
            )
          );

          if (progress < 1) {
            skillAnimationFrame.current = requestAnimationFrame(animateSkills);
          }
        }

        skillAnimationFrame.current = requestAnimationFrame(animateSkills);
      },
      { threshold: 0.55 }
    );

    observer.observe(aboutSection);

    return () => {
      observer.disconnect();

      resetSkills();
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to send message.");
      }

      setForm({ name: "", email: "", message: "" });
      setStatus({
        type: "success",
        message: "Message sent. I will get back to you shortly.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <main className="overflow-hidden bg-[#050617]">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-violet-500/10 bg-[#08091b]/88 backdrop-blur-2xl">
        <div className="section-shell flex min-h-16 items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-3 font-black tracking-tight">
            <Image
              src="/logo.png"
              alt="Sahadat Media logo"
              width={140}
              height={56}
              className="h-11 w-auto object-contain"
              priority
            />
          </a>

          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-300 lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </a>
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

      <section id="home" data-reveal className="relative pt-28 sm:pt-36">
        <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-700/25 blur-3xl" />
        <div className="section-shell relative grid min-h-[calc(100vh-5rem)] items-center gap-14 pb-20 pt-8 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <div className="brand-card mb-7 inline-flex items-center gap-3 rounded-2xl px-4 py-2 text-sm font-bold text-violet-200">
              <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_18px_rgba(168,85,247,0.95)]" />
              Available for new projects
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1] tracking-[-0.05em] text-white sm:text-6xl lg:text-[5rem]">
              Turning Raw Footage Into{" "}
              <span className="gradient-text">Stories That Captivate</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Professional Video Editing for Content Creators, Businesses,
              Documentary Channels, and Brands.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#portfolio"
                className="purple-button inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-black text-white transition hover:-translate-y-1"
              >
                View Portfolio <ArrowIcon />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="brand-card inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-black text-white transition hover:-translate-y-1"
              >
                Hire Me <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="group relative mx-auto w-full max-w-[520px] lg:max-w-none">
            <div className="absolute -inset-5 rounded-[2rem] bg-violet-600/35 opacity-45 blur-2xl transition duration-500 group-hover:opacity-100 group-active:opacity-100" />
            <div className="purple-glow relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-violet-400/18 bg-black">
              <Image
                src="/mypic.png"
                alt="Sahadat Media banner"
                fill
                className="scale-105 object-cover object-center transition duration-700 ease-out group-hover:scale-100 group-hover:-rotate-1 group-hover:brightness-110 group-active:scale-100 group-active:-rotate-1 group-active:brightness-110"
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-black/35 transition duration-500 group-hover:bg-black/5 group-active:bg-black/5" />
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" data-reveal className="border-t border-violet-500/5 py-12">
        <div className="mx-auto mb-8 max-w-3xl px-4 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-violet-300">
            Customer Reviews
          </p>
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
            Clients trust the cut and the delivery.
          </h2>
        </div>
        <div className="overflow-hidden">
          <div className="testimonial-track flex w-max gap-4 px-4">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <article
                key={`${testimonial.name}-${index}`}
                className="glass-card w-[300px] rounded-[1.5rem] p-5 sm:w-[380px]"
              >
                <Rating value={testimonial.rating} />
                <p className="mt-4 text-base leading-7 text-slate-200">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name} avatar`}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full border border-violet-300/25 object-cover shadow-[0_0_22px_rgba(138,31,255,0.35)]"
                  />
                  <div>
                    <h3 className="font-black text-white">{testimonial.name}</h3>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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
            onMouseEnter={() => setPreviewFeaturedVideo(featuredVideos[0].title)}
            onMouseLeave={() => setPreviewFeaturedVideo(null)}
            onTouchStart={(event) => {
              if (previewFeaturedVideo !== featuredVideos[0].title) {
                event.preventDefault();
                setPreviewFeaturedVideo(featuredVideos[0].title);
              }
            }}
            onClick={() => {
              setPreviewFeaturedVideo(null);
              setSelectedFeaturedVideo(featuredVideos[0]);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setPreviewFeaturedVideo(null);
                setSelectedFeaturedVideo(featuredVideos[0]);
              }
            }}
            className="brand-card group mx-auto max-w-5xl cursor-pointer overflow-hidden rounded-[2rem]"
            aria-label={`Open ${featuredVideos[0].title} fullscreen`}
          >
            <div className="relative aspect-video overflow-hidden bg-black">
              <Image
                src={featuredVideos[0].thumbnail || defaultVideoThumbnail}
                alt={`${featuredVideos[0].title} thumbnail`}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 1000px, 100vw"
              />
              {previewFeaturedVideo === featuredVideos[0].title ? (
                <iframe
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${featuredVideos[0].youtubeId}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${featuredVideos[0].youtubeId}&rel=0`}
                  title={`${featuredVideos[0].title} preview`}
                  allow="autoplay; encrypted-media; picture-in-picture; web-share"
                />
              ) : null}
              <div className="absolute inset-0 bg-black/35 transition duration-300 group-hover:bg-black/20" />
              <div className="absolute left-5 top-5 rounded-full bg-black/55 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-violet-200 backdrop-blur">
                {featuredVideos[0].category}
              </div>
              <div className="absolute right-5 top-5 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white backdrop-blur">
                {featuredVideos[0].duration}
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid h-20 w-20 place-items-center rounded-full text-white drop-shadow-[0_0_24px_rgba(138,31,255,0.95)] transition group-hover:scale-110">
                  <span className="ml-1 h-0 w-0 border-y-[14px] border-l-[22px] border-y-transparent border-l-white" />
                </span>
              </div>
              <div className="absolute inset-x-6 bottom-6">
                <h3 className="max-w-2xl text-2xl font-black text-white sm:text-4xl">
                  {featuredVideos[0].title}
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

      <section id="services" data-reveal className="border-t border-violet-500/5 py-24">
        <div className="section-shell">
          <SectionHeading
            eyebrow=""
            title={
              <>
                My <span className="gradient-text">Services</span>
              </>
            }
            copy="Specialized editing solutions tailored to your content needs."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {homepageServices.map((service) => (
              <Link
                key={service.title}
                href={`/services/${service.slug}`}
                className={`glass-card group min-h-36 rounded-2xl p-5 text-left transition hover:-translate-y-1 hover:border-violet-400/35 hover:shadow-[0_0_44px_rgba(147,51,234,0.2)] sm:p-6 ${
                  homepageServiceSpans[service.slug] ?? service.span
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-violet-700/55 text-[0.65rem] font-black text-violet-100 shadow-[0_0_28px_rgba(147,51,234,0.4)]">
                    {service.icon}
                  </div>
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-violet-200 transition group-hover:bg-[#8A1FFF] group-hover:text-white">
                    <ArrowIcon />
                  </span>
                </div>
                <h3 className="text-lg font-black text-white sm:text-xl">{service.title}</h3>
                <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                  {service.copy}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-violet-300">
                  View Work
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section data-reveal className="border-t border-violet-500/5 py-24">
        <div className="section-shell">
          <SectionHeading
            eyebrow=""
            title={
              <>
                Why <span className="gradient-text">Choose Me</span>
              </>
            }
            copy=""
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="glass-card flex min-h-28 items-center gap-6 rounded-2xl p-7"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-violet-950 text-xs font-black text-violet-300 shadow-[0_0_26px_rgba(147,51,234,0.35)]">
                  {benefit.icon}
                </span>
                <h3 className="text-lg font-black leading-tight text-white">
                  {benefit.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                onMouseEnter={() => setPreviewPortfolioVideo(item.title)}
                onMouseLeave={() => setPreviewPortfolioVideo(null)}
                onTouchStart={(event) => {
                  if (previewPortfolioVideo !== item.title) {
                    event.preventDefault();
                    setPreviewPortfolioVideo(item.title);
                  }
                }}
                onClick={() => {
                  setPreviewPortfolioVideo(null);
                  setSelectedPortfolioVideo(item);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setPreviewPortfolioVideo(null);
                    setSelectedPortfolioVideo(item);
                  }
                }}
                className="brand-card group cursor-pointer overflow-hidden rounded-2xl"
              >
                <div className="relative block aspect-video w-full overflow-hidden bg-black text-left">
                  <Image
                    src={item.thumbnail || defaultVideoThumbnail}
                    alt={`${item.title} thumbnail`}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  {previewPortfolioVideo === item.title ? (
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

      <section
        id="about"
        ref={aboutSectionRef}
        data-reveal
        className="border-t border-violet-500/5 py-24"
      >
        <div className="section-shell grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              I help creators and businesses produce engaging, high-retention
              videos that attract viewers and drive results. With a keen eye for
              pacing, storytelling, and visual aesthetics, I transform ordinary
              footage into extraordinary content.
            </p>
            <div className="mt-9 space-y-6">
              {skillBars.map((skill) => (
                <div key={skill.label}>
                  <div className="mb-2 flex items-center justify-between text-sm font-black text-white">
                    <span>{skill.label}</span>
                    <span className="text-violet-300">
                      {animatedSkills[skill.label] ?? 0}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-violet-950/70">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-700 via-purple-400 to-fuchsia-400 shadow-[0_0_18px_rgba(168,85,247,0.85)]"
                      style={{ width: `${animatedSkills[skill.label] ?? 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="group relative mx-auto w-full max-w-[430px]">
            <div className="absolute inset-0 rounded-full bg-violet-700/25 opacity-45 blur-3xl transition duration-500 group-hover:opacity-100 group-active:opacity-100" />
            <div className="purple-glow relative aspect-square overflow-hidden rounded-full border border-violet-400/14 bg-black p-5">
              <div className="relative h-full overflow-hidden rounded-full">
                <Image
                  src="/mypic.png"
                  alt="Sahadat Media about"
                  fill
                  className="scale-105 object-cover object-center transition duration-700 ease-out group-hover:scale-100 group-hover:rotate-2 group-hover:brightness-110 group-active:scale-100 group-active:rotate-2 group-active:brightness-110"
                  sizes="(min-width: 1024px) 430px, 90vw"
                />
                <div className="absolute inset-0 bg-black/35 transition duration-500 group-hover:bg-black/5 group-active:bg-black/5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" data-reveal className="border-t border-violet-500/5 py-24">
        <div className="section-shell">
          <div className="mx-auto mb-12 max-w-5xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-violet-300">
              FAQ
            </p>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-6 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
              Got questions? We have got you covered! Explore answers to common
              questions about video editing services, how we collaborate with
              clients, and how to make the most out of professional video editing
              solutions.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-4">
            {faqItems.map((item, index) => (
              <article
                key={item.question}
                className={`brand-card rounded-2xl px-5 py-4 transition hover:-translate-y-1 ${
                  openFaq === index
                    ? "border-[#8A1FFF]/80"
                    : "hover:border-[#8A1FFF]/75"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center gap-4 text-left"
                  aria-expanded={openFaq === index}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#8A1FFF]/15 text-xs font-black text-white">
                    {item.icon}
                  </span>
                  <span className="flex-1 text-base font-semibold text-white sm:text-lg">
                    {item.question}
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-xl font-black text-white">
                    {openFaq === index ? "-" : "+"}
                  </span>
                </button>
                {openFaq === index ? (
                  <p className="mt-4 border-t border-white/10 pt-4 leading-7 text-slate-300 sm:pl-13">
                    {item.answer}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" data-reveal className="py-24">
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
            {status.message ? (
              <p
                className={`mt-4 rounded-2xl px-4 py-3 text-sm font-bold ${
                  status.type === "success"
                    ? "bg-emerald-400/10 text-emerald-200"
                    : status.type === "error"
                      ? "bg-red-400/10 text-red-200"
                      : "bg-white/10 text-slate-200"
                }`}
              >
                {status.message}
              </p>
            ) : null}
          </form>
        </div>
      </section>

      <footer data-reveal className="py-12">
        <div className="section-shell">
          <div className="rounded-[2rem] bg-[#08091b] p-7 sm:p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <a href="#home" className="inline-flex items-center gap-3">
                  <Image
                    src="/logo.png"
                    alt="Sahadat Media logo"
                    width={130}
                    height={52}
                    className="h-10 w-auto object-contain"
                  />
                </a>
                <p className="mt-4 max-w-md leading-7 text-slate-400">
                  Sahadat Media creates polished videos, logos, reels, documentary
                  stories, and SaaS visuals that help brands look sharp online.
                </p>
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex flex-wrap gap-5 text-sm font-black text-slate-300">
                  <a href="#home">
                    Home
                  </a>
                  <a href="#services">
                    Services
                  </a>
                  <a href="#portfolio">
                    Portfolio
                  </a>
                  <a href="#testimonials">
                    Reviews
                  </a>
                  <a href="#contact">
                    Contact
                  </a>
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

      {selectedFeaturedVideo ? (
        <div className="fixed inset-0 z-[90] bg-black">
          <button
            type="button"
            onClick={() => setSelectedFeaturedVideo(null)}
            className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full border border-[#8A1FFF]/40 bg-black/70 text-2xl font-black text-white transition hover:bg-[#8A1FFF]"
            aria-label="Close featured video"
          >
            x
          </button>
          <div className="absolute left-5 top-5 z-10 rounded-2xl border border-[#8A1FFF]/30 bg-black/60 px-5 py-4 backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-300">
              {selectedFeaturedVideo.category}
            </p>
            <h2 className="mt-1 text-lg font-black text-white sm:text-2xl">
              {selectedFeaturedVideo.title}
            </h2>
          </div>
          <iframe
            className="h-screen w-screen"
            src={`https://www.youtube.com/embed/${selectedFeaturedVideo.youtubeId}?autoplay=1&rel=0`}
            title={selectedFeaturedVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : null}

      {selectedPortfolioVideo ? (
        <div className="fixed inset-0 z-[90] bg-black">
          <button
            type="button"
            onClick={() => setSelectedPortfolioVideo(null)}
            className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full border border-[#8A1FFF]/40 bg-black/70 text-2xl font-black text-white transition hover:bg-[#8A1FFF]"
            aria-label="Close portfolio video"
          >
            x
          </button>
          <div className="absolute left-5 top-5 z-10 rounded-2xl border border-[#8A1FFF]/30 bg-black/60 px-5 py-4 backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-300">
              {selectedPortfolioVideo.category}
            </p>
            <h2 className="mt-1 text-lg font-black text-white sm:text-2xl">
              {selectedPortfolioVideo.title}
            </h2>
          </div>
          {selectedPortfolioVideo.youtubeId.startsWith("VIDEO_ID") ? (
            <div className="relative h-screen w-screen bg-black">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(138,31,255,0.72),transparent_18rem),linear-gradient(150deg,#100b2d,#02030d)]" />
              <div className="absolute inset-0 grid place-items-center p-8 text-center">
                <div>
                  <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-white text-slate-950 shadow-[0_0_56px_rgba(138,31,255,0.9)]">
                    <span className="ml-1 h-0 w-0 border-y-[18px] border-l-[28px] border-y-transparent border-l-slate-950" />
                  </div>
                  <p className="mt-7 text-3xl font-black text-white">
                    Full Screen Video Preview
                  </p>
                  <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                    Ei project-er actual YouTube video play korte
                    `portfolioItems` er `youtubeId` value replace korun.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <iframe
              className="h-screen w-screen"
              src={`https://www.youtube.com/embed/${selectedPortfolioVideo.youtubeId}?autoplay=1&rel=0`}
              title={selectedPortfolioVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
      ) : null}
    </main>
  );
}
