import SectionHeading from "../common/SectionHeading";

export default function WhyChooseSection({ benefits }) {
  return (
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
  );
}
