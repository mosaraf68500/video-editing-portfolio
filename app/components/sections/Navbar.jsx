import Image from "next/image";

export default function Navbar({ logoHref = "#home", navLinks, whatsappLink }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-violet-500/10 bg-[#08091b]/88 backdrop-blur-2xl">
      <div className="section-shell flex min-h-16 items-center justify-between gap-6">
        <a href={logoHref} className="flex items-center gap-3 font-black tracking-tight">
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
  );
}
