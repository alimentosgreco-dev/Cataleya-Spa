"use client";

import { Flower2, Mail, Phone, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { navLinks, siteConfig } from "@/data/navigation";
import { scrollToSection } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contacto"
      className="relative border-t border-purple/10 bg-gray-light dark:bg-black-soft/50"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple to-olive text-white">
                <Flower2 className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-display text-xl font-semibold">
                Cataleya
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-text">
              Tu refugio de belleza y bienestar en el corazón de CDMX. Experiencias
              premium que transforman cuerpo y mente.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-purple">
              Navegación
            </h3>
            <ul className="space-y-2" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href.replace("#", ""))}
                    className="text-sm text-gray-text transition-colors hover:text-purple focus-visible:outline-none focus-visible:underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-purple">
              Contacto
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3 text-sm text-gray-text transition-colors hover:text-purple"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-olive" aria-hidden />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:+52${siteConfig.phone}`}
                  className="flex items-start gap-3 text-sm text-gray-text transition-colors hover:text-purple"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-olive" aria-hidden />
                  {siteConfig.phoneFormatted}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-text">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-olive" aria-hidden />
                {siteConfig.address}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-purple">
              Redes sociales
            </h3>
            <div className="flex gap-3">
              <a
                href={`https://instagram.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-2xl glass transition-all hover:-translate-y-0.5 hover:bg-purple/10 hover:shadow-lg hover:shadow-purple/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
                aria-label={`Instagram: ${siteConfig.instagram}`}
              >
                <InstagramIcon className="text-purple" />
              </a>
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-2xl glass transition-all hover:-translate-y-0.5 hover:bg-purple/10 hover:shadow-lg hover:shadow-purple/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
                aria-label={`Facebook: ${siteConfig.facebook}`}
              >
                <FacebookIcon className="text-purple" />
              </a>
            </div>
            <p className="mt-4 text-xs text-gray-text">
              Síguenos como{" "}
              <span className="font-medium text-foreground">
                {siteConfig.instagram}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-purple/10 pt-8 sm:flex-row">
          <p className="text-xs text-gray-text">
            © {year} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-text">
            Diseñado con amor · CDMX, México
          </p>
        </div>
      </div>
    </footer>
  );
}
