"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AboutSection({ skillBars }) {
  const [animatedSkills, setAnimatedSkills] = useState(() =>
    Object.fromEntries(skillBars.map((skill) => [skill.label, 0]))
  );
  const sectionRef = useRef(null);
  const isSkillSectionActive = useRef(false);
  const animationFrame = useRef(null);

  useEffect(() => {
    const aboutSection = sectionRef.current;

    if (!aboutSection) {
      return undefined;
    }

    function resetSkills() {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }

      setAnimatedSkills(
        Object.fromEntries(skillBars.map((skill) => [skill.label, 0]))
      );
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          isSkillSectionActive.current = false;
          resetSkills();
          return;
        }

        if (isSkillSectionActive.current) {
          return;
        }

        isSkillSectionActive.current = true;
        const duration = 3000;
        const startTime = performance.now();

        function animateSkills(currentTime) {
          const progress = Math.min((currentTime - startTime) / duration, 1);

          setAnimatedSkills(
            Object.fromEntries(
              skillBars.map((skill) => [
                skill.label,
                Math.round(skill.value * progress),
              ])
            )
          );

          if (progress < 1) {
            animationFrame.current = requestAnimationFrame(animateSkills);
          }
        }

        animationFrame.current = requestAnimationFrame(animateSkills);
      },
      { threshold: 0.55 }
    );

    observer.observe(aboutSection);

    return () => {
      observer.disconnect();
      resetSkills();
    };
  }, [skillBars]);

  return (
    <section
      id="about"
      ref={sectionRef}
      data-reveal
      className="border-t border-violet-500/5 py-24"
    >
      <div className="section-shell grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            I help creators and businesses produce engaging, high-retention
            videos that attract viewers and drive results. With a keen eye for
            pacing, storytelling, and visual aesthetics, I transform ordinary
            footage into extraordinary content.
          </p>
          <div className="mt-9 space-y-6">
            {skillBars.map((skill) => (
              <div key={skill.label}>
                <div className="mb-2 flex items-center justify-between text-sm font-black text-white">
                  <span>{skill.label}</span>
                  <span className="text-violet-300">
                    {animatedSkills[skill.label] ?? 0}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-violet-950/70">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#8A1FFF] via-violet-500 to-[#8A1FFF] shadow-[0_0_18px_rgba(138,31,255,0.85)]"
                    style={{ width: `${animatedSkills[skill.label] ?? 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="group relative mx-auto w-full max-w-[430px]">
          <div className="relative aspect-square overflow-hidden rounded-full border border-violet-400/14 bg-black p-5">
            <div className="relative h-full overflow-hidden rounded-full">
              <Image
                src="/mypic.png"
                alt="Sahadat Media about"
                fill
                className="scale-105 object-cover object-center transition duration-700 ease-out group-hover:scale-100 group-hover:rotate-2 group-hover:brightness-110 group-active:scale-100 group-active:rotate-2 group-active:brightness-110"
                sizes="(min-width: 1024px) 430px, 90vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
