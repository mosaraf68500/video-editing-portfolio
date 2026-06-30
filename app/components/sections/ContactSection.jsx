import ArrowIcon from "../common/ArrowIcon";
import ContactForm from "../common/ContactForm";

export default function ContactSection({ whatsappLink }) {
  return (
    <section id="contact" data-reveal className="py-24">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-violet-300">
            Contact Us
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Ready to make your next video impossible to skip?
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Send the project details here or use WhatsApp for a faster
            conversation. I will reply with availability, timeline, and the
            best edit plan for your goal.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="purple-button mt-8 inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-black text-white transition hover:-translate-y-1"
          >
            Message on WhatsApp <ArrowIcon />
          </a>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
