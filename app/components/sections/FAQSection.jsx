"use client";

import { useState } from "react";

export default function FAQSection({ faqItems }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section id="faq" data-reveal className="border-t border-violet-500/5 py-24">
      <div className="section-shell">
        <div className="mx-auto mb-12 max-w-5xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-violet-300">
            FAQ
          </p>
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
            Got questions? We have got you covered! Explore answers to common
            questions about video editing services, how we collaborate with
            clients, and how to make the most out of professional video editing
            solutions.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-4">
          {faqItems.map((item, index) => (
            <article
              key={`${item.icon}-${item.question}`}
              className={`brand-card rounded-2xl px-5 py-4 transition hover:-translate-y-1 ${
                openFaq === index ? "border-[#8A1FFF]/80" : "hover:border-[#8A1FFF]/75"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="flex w-full items-center gap-4 text-left"
                aria-expanded={openFaq === index}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#8A1FFF]/15 text-xs font-black text-white">
                  {item.icon}
                </span>
                <span className="flex-1 text-base font-semibold text-white sm:text-lg">
                  {item.question}
                </span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-xl font-black text-white">
                  {openFaq === index ? "-" : "+"}
                </span>
              </button>
              {openFaq === index ? (
                <p className="mt-4 border-t border-white/10 pt-4 leading-7 text-slate-300 sm:pl-13">
                  {item.answer}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
