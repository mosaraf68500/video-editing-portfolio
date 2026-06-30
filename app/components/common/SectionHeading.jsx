export default function SectionHeading({ eyebrow, title, copy }) {
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
