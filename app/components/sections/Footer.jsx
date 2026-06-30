import Image from "next/image";

import SocialIcon from "../common/SocialIcon";

export default function Footer({ linkPrefix = "", socialLinks }) {
  return (
    <footer data-reveal className="py-12">
      <div className="section-shell">
        <div className="rounded-[2rem] bg-[#08091b] p-7 sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <a href={`${linkPrefix}#home`} className="inline-flex items-center gap-3">
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
                <a href={`${linkPrefix}#home`}>Home</a>
                <a href={`${linkPrefix}#services`}>Services</a>
                <a href={`${linkPrefix}#portfolio`}>Portfolio</a>
                <a href={`${linkPrefix}#testimonials`}>Reviews</a>
                <a href={`${linkPrefix}#contact`}>Contact</a>
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
  );
}
