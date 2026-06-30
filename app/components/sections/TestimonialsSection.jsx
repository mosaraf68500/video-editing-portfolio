"use client";

import Image from "next/image";
import { useRef } from "react";

import Rating from "../common/Rating";

function ReviewSourceIcon({ source }) {
  const label = source?.slice(0, 1) || "?";
  const sourceStyles = {
    Facebook: "bg-[#8A1FFF] text-white",
    Instragram: "bg-[#8A1FFF] text-white",
    Instagram: "bg-[#8A1FFF] text-white",
    Fiverr: "bg-[#8A1FFF] text-white",
    Upwork: "bg-[#8A1FFF] text-white",
    LinkedIn: "bg-[#8A1FFF] text-white",
  };

  return (
    <span
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-black ${
        sourceStyles[source] || "bg-violet-500 text-white"
      }`}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}

function getCurrentTranslateX(element) {
  const transform = window.getComputedStyle(element).transform;

  if (!transform || transform === "none") {
    return 0;
  }

  const matrix = new DOMMatrixReadOnly(transform);
  return matrix.m41;
}

export default function TestimonialsSection({ testimonials }) {
  const trackRef = useRef(null);
  const dragRef = useRef({ isDragging: false, startX: 0, startTranslateX: 0 });

  function handlePointerDown(event) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    dragRef.current = {
      isDragging: true,
      startX: event.clientX,
      startTranslateX: getCurrentTranslateX(track),
    };
    track.style.animation = "none";
    track.style.transform = `translateX(${dragRef.current.startTranslateX}px)`;
    track.classList.add("is-dragging");
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    const track = trackRef.current;
    const drag = dragRef.current;

    if (!track || !drag.isDragging) {
      return;
    }

    const dragDistance = event.clientX - drag.startX;
    track.style.transform = `translateX(${drag.startTranslateX + dragDistance}px)`;
  }

  function handlePointerEnd(event) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    dragRef.current.isDragging = false;
    track.classList.remove("is-dragging");
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    window.setTimeout(() => {
      if (!dragRef.current.isDragging) {
        track.style.transform = "";
        track.style.animation = "";
      }
    }, 600);
  }

  return (
    <section id="testimonials" data-reveal className="border-t border-violet-500/5 py-12">
      <div className="mx-auto mb-8 max-w-3xl px-4 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-violet-300">
          Customer Reviews
        </p>
        <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
          Clients trust the cut and the delivery.
        </h2>
      </div>
      <div
        className="cursor-grab overflow-hidden active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <div
          ref={trackRef}
          className="testimonial-track flex w-max touch-pan-y select-none gap-4 px-4"
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className="glass-card w-[300px] rounded-[1.5rem] p-5 sm:w-[380px]"
            >
              <div className="flex items-center justify-between gap-4">
                <Rating value={testimonial.rating} />
                <div className="flex items-center gap-2 rounded-full bg-white/5 py-1 pl-1 pr-3 text-xs font-black text-slate-200">
                  <ReviewSourceIcon source={testimonial.source} />
                  <span>{testimonial.source}</span>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
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
                  <h3 className="text-sm font-black text-white">{testimonial.name}</h3>
                  <p className="text-xs text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
