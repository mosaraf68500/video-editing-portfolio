export default function Rating({ value = 5 }) {
  return (
    <div
      aria-label={`${value} out of 5 rating`}
      className="flex items-center gap-0.5 text-base drop-shadow-[0_0_10px_rgba(255,209,102,0.55)]"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={index < value ? "text-[#FFD166]" : "text-slate-600"}
        >
          ★
        </span>
      ))}
    </div>
  );
}
