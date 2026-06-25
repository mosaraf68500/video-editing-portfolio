import { notFound } from "next/navigation";

import servicesData from "../../../data/services.json";
import ServicePageClient from "./service-page-client";

const { logoGallery, serviceVideoLibrary, services } = servicesData;

function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug);
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} Portfolio | Sahadat Media`,
    description: service.copy,
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <ServicePageClient
      service={service}
      videos={serviceVideoLibrary[service.slug] || []}
      logos={logoGallery?.[service.slug] || []}
      services={services}
    />
  );
}
