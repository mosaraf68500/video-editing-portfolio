import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#050617] px-4 py-16 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-[#8A1FFF]/25 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <section className="glass-card relative w-full max-w-2xl rounded-[2rem] p-8 text-center sm:p-12">
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo.png"
            alt="Sahadat Media logo"
            width={150}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
        </div>

        <p className="text-7xl font-black text-[#8A1FFF] sm:text-8xl">404</p>
        <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-5 max-w-xl leading-8 text-slate-300">
          The page you are looking for does not exist or may have been moved.
          Return home to explore Sahadat Media services and portfolio.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="purple-button rounded-full px-7 py-4 font-black text-white"
          >
            Back to Home
          </Link>
          <Link
            href="/#contact"
            className="brand-card rounded-full px-7 py-4 font-black text-white"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </main>
  );
}
