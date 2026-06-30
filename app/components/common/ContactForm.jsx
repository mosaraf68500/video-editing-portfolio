"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";
import Swal from "sweetalert2";

const emailJsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

function getEmailJsErrorMessage(error) {
  if (error?.status || error?.text) {
    return `EmailJS error${error.status ? ` ${error.status}` : ""}: ${
      error.text || "Unable to send message."
    }`;
  }

  return error?.message || "Something went wrong. Please try again.";
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "idle" });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "loading" });

    try {
      if (
        !emailJsConfig.serviceId ||
        !emailJsConfig.templateId ||
        !emailJsConfig.publicKey
      ) {
        throw new Error("EmailJS is not configured yet.");
      }

      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          name: form.name,
          email: form.email,
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          message: form.message,
        },
        {
          publicKey: emailJsConfig.publicKey,
        }
      );

      setForm({ name: "", email: "", message: "" });
      setStatus({ type: "success" });
      await Swal.fire({
        title: "Message Sent!",
        text: "Thank you for reaching out. I will get back to you shortly.",
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#8A1FFF",
        background: "#08091b",
        color: "#ffffff",
      });
    } catch (error) {
      const errorMessage = getEmailJsErrorMessage(error);

      setStatus({ type: "error" });
      console.error("EmailJS send error:", {
        message: errorMessage,
        status: error?.status,
        text: error?.text,
        error,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-[2.2rem] p-6 sm:p-8">
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-slate-200">Name</span>
        <input
          required
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className="w-full rounded-2xl border border-violet-500/12 bg-white/5 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300"
        />
      </label>
      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-bold text-slate-200">Email</span>
        <input
          required
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full rounded-2xl border border-violet-500/12 bg-white/5 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300"
        />
      </label>
      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-bold text-slate-200">Message</span>
        <textarea
          required
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your footage, deadline, and editing style..."
          rows="6"
          className="w-full resize-none rounded-2xl border border-violet-500/12 bg-white/5 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300"
        />
      </label>
      <button
        type="submit"
        disabled={status.type === "loading"}
        className="purple-button mt-6 w-full rounded-full px-7 py-4 font-black text-white transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status.type === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
