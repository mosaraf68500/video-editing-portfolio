import Image from "next/image";
import Link from "next/link";

import ArrowIcon from "../common/ArrowIcon";
import SectionHeading from "../common/SectionHeading";

const defaultVideoThumbnail = "/thumbnails/video-thumbnail.svg";

export default function ServicesSection({ services, serviceVisuals }) {
  return (
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
        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.title}
              href={`/services/${service.slug}`}
              className="glass-card group relative min-h-56 overflow-hidden rounded-2xl p-[1px] text-left transition hover:-translate-y-1 hover:border-violet-400/35 hover:shadow-[0_0_44px_rgba(147,51,234,0.2)]"
            >
              <div className="relative grid h-full overflow-hidden rounded-[calc(1rem-1px)] bg-[#08091b] sm:grid-cols-[0.92fr_1fr]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_50%,rgba(138,31,255,0.16),transparent_18rem),linear-gradient(90deg,transparent_0%,rgba(8,9,27,0.25)_42%,rgba(8,9,27,0.96)_63%,rgba(8,9,27,0.98)_100%)]" />
                <div className="pointer-events-none absolute inset-y-0 left-[34%] z-[1] hidden w-36 bg-gradient-to-r from-transparent via-[#08091b]/70 to-[#08091b] blur-xl sm:block" />
                <div className="relative min-h-48 overflow-hidden bg-black/20 sm:min-h-full">
                  <Image
                    src={serviceVisuals[service.slug] || defaultVideoThumbnail}
                    alt={`${service.title} service preview`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 280px, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-[#08091b]/10 to-[#08091b] sm:to-[#08091b]/85" />
                  <div className="absolute inset-y-0 right-[-1px] hidden w-24 bg-gradient-to-r from-transparent to-[#08091b] sm:block" />
                  <div className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-xl bg-violet-700/80 text-[0.65rem] font-black text-violet-100 shadow-[0_0_28px_rgba(147,51,234,0.55)]">
                    {service.icon}
                  </div>
                </div>

                <div className="relative z-[2] flex flex-col justify-center p-6 sm:p-7">
                  <h3 className="text-2xl font-black text-white">{service.title}</h3>
                  <p className="mt-4 line-clamp-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                    {service.copy}
                  </p>
                  <span className="purple-button mt-6 inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white transition group-hover:-translate-y-0.5">
                    Explore {service.title} <ArrowIcon />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
