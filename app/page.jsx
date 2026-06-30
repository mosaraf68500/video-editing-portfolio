"use client";

import { useState } from "react";

import useScrollReveal from "./components/common/useScrollReveal";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import FAQSection from "./components/sections/FAQSection";
import FeaturedPreviewSection from "./components/sections/FeaturedPreviewSection";
import Footer from "./components/sections/Footer";
import HeroSection from "./components/sections/HeroSection";
import Navbar from "./components/sections/Navbar";
import PortfolioSection from "./components/sections/PortfolioSection";
import ServicesSection from "./components/sections/ServicesSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import WhyChooseSection from "./components/sections/WhyChooseSection";
import VideoModal from "./components/common/VideoModal";
import benefits from "../data/home/benefits.json";
import faqItems from "../data/home/faq-items.json";
import navLinks from "../data/home/nav-links.json";
import portfolioItems from "../data/home/portfolio-items.json";
import serviceSection from "../data/home/service-section.json";
import skillBars from "../data/home/skill-bars.json";
import socialLinks from "../data/home/social-links.json";
import featuredVideos from "../data/featured-videos.json";
import servicesData from "../data/services.json";
import testimonials from "../data/testimonials.json";

const whatsappMessage =
  "Hello! I saw your portfolio and I would love to discuss a video editing project with you.";
const whatsappLink = `https://wa.me/8801601222918?text=${encodeURIComponent(
  whatsappMessage
)}`;

const homepageServices = serviceSection.order
  .map((slug) => servicesData.services.find((service) => service.slug === slug))
  .filter(Boolean);

export default function Home() {
  useScrollReveal();

  const [selectedFeaturedVideo, setSelectedFeaturedVideo] = useState(null);
  const [selectedPortfolioVideo, setSelectedPortfolioVideo] = useState(null);

  return (
    <main className="overflow-hidden bg-[#050617]">
      <Navbar navLinks={navLinks} whatsappLink={whatsappLink} />
      <HeroSection whatsappLink={whatsappLink} />
      <TestimonialsSection testimonials={testimonials} />
      <FeaturedPreviewSection
        featuredVideo={featuredVideos[0]}
        onPlay={setSelectedFeaturedVideo}
      />
      <ServicesSection
        services={homepageServices}
        serviceVisuals={serviceSection.visuals}
      />
      <WhyChooseSection benefits={benefits} />
      <PortfolioSection
        portfolioItems={portfolioItems}
        onPlay={setSelectedPortfolioVideo}
      />
      <AboutSection skillBars={skillBars} />
      <FAQSection faqItems={faqItems} />
      <ContactSection whatsappLink={whatsappLink} />
      <Footer socialLinks={socialLinks} />

      <VideoModal
        video={selectedFeaturedVideo}
        label={selectedFeaturedVideo?.category}
        onClose={() => setSelectedFeaturedVideo(null)}
      />
      <VideoModal
        video={selectedPortfolioVideo}
        label={selectedPortfolioVideo?.category}
        onClose={() => setSelectedPortfolioVideo(null)}
      />
    </main>
  );
}
