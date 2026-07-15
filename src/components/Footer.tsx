/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useNavigate } from "react-router-dom";
import { Instagram, Twitter, Mail } from "lucide-react";
import { Language, UI_TRANSLATIONS } from "../i18n";

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const navigate = useNavigate();
  const t = UI_TRANSLATIONS[lang];

  return (
    <footer className="border-t border-neutral-500/10 py-16 bg-neutral-100/40 dark:bg-neutral-950/20 transition-colors duration-1000">
      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Logo & Slogan */}
        <div className="md:col-span-5 space-y-4">
          <span className="font-serif text-xl tracking-[0.15em] font-medium uppercase text-neutral-900 dark:text-neutral-100">
            Hozumi
          </span>
          <p className="font-serif text-xs font-light text-neutral-400 dark:text-neutral-500 leading-snug max-w-sm">
            {t.footerSlogan}
          </p>
        </div>

        {/* Quick links map */}
        <div className="md:col-span-3 flex flex-col space-y-3 font-mono text-[10px] tracking-widest uppercase">
          <span className="text-neutral-400 dark:text-neutral-600">{t.sections}</span>
          <button onClick={() => navigate("/")} className="text-left text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white py-1">
            {t.selectedWork}
          </button>
          <button onClick={() => navigate("/about")} className="text-left text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white py-1">
            {t.biography}
          </button>
        </div>

        {/* Connect social icons */}
        <div className="md:col-span-4 flex flex-col space-y-4">
          <span className="font-mono text-[10px] tracking-widest text-neutral-400 dark:text-neutral-600 uppercase">
            {t.resourcesConnect}
          </span>
          <div className="flex space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-neutral-500/5 hover:bg-neutral-500/10 text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white rounded-none transition-all duration-300"
              aria-label="Instagram"
              data-cursor="pointer"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-neutral-500/5 hover:bg-neutral-500/10 text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white rounded-none transition-all duration-300"
              aria-label="Twitter"
              data-cursor="pointer"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="mailto:ititrica@gmail.com"
              className="p-3 bg-neutral-500/5 hover:bg-neutral-500/10 text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white rounded-none transition-all duration-300"
              aria-label="Email"
              data-cursor="pointer"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
          <span className="font-mono text-[9px] text-neutral-400 mt-2">
            {t.copyright}
          </span>
        </div>
      </div>
    </footer>
  );
}
