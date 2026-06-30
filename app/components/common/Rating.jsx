export default function Rating({ value = 5 }) {
  return (
    <div
      aria-label={`${value} out of 5 rating`}
      className="flex items-center gap-0.5 text-base drop-shadow-[0_0_10px_rgba(138,31,255,0.55)]"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={index < value ? "text-[#8A1FFF]" : "text-slate-600"}
        >
          ★
        </span>
      ))}
    </div>
  );
}
