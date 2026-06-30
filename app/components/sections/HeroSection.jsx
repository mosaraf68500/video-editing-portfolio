import Image from "next/image";

import ArrowIcon from "../common/ArrowIcon";

export default function HeroSection({ whatsappLink }) {
  return (
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
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-violet-400/18 bg-black">
            <Image
              src="/mypic.png"
              alt="Sahadat Media banner"
              fill
              className="scale-105 object-cover object-center transition duration-700 ease-out group-hover:scale-100 group-hover:-rotate-1 group-hover:brightness-110 group-active:scale-100 group-active:-rotate-1 group-active:brightness-110"
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
