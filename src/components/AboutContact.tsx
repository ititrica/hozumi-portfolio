/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Language, UI_TRANSLATIONS } from "../i18n";

interface AboutContactProps {
  lang: Language;
}

export default function AboutContact({ lang }: AboutContactProps) {
  const t = UI_TRANSLATIONS[lang];
  const philosophyPoints = t.philosophyPoints;

  return (
    <section className="py-24 max-w-[1400px] mx-auto px-6 w-full">
      
      {/* Subheader */}
      <div className="pb-6 mb-16 transition-colors duration-1000">
        <h2 className="font-serif text-xl font-light tracking-[0.12em] text-neutral-950 dark:text-white uppercase transition-colors duration-1000">
          {t.bioPhilosophyTitle}
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
      >
        {/* Biography text & details */}
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-6">
            <span className="font-mono text-[9px] tracking-[0.1em] text-neutral-600 dark:text-neutral-400 uppercase block transition-colors duration-1000">
              {t.creativeBioTitle}
            </span>
            <h3 className="font-serif text-xl font-light text-neutral-950 dark:text-white leading-snug transition-colors duration-1000">
              {t.bioLead}
            </h3>
            <p className="font-serif text-[14px] font-normal leading-loose text-neutral-700 dark:text-neutral-300 max-w-xl transition-colors duration-1000">
              {t.bioParagraph1}
            </p>
            <p className="font-serif text-[14px] font-normal leading-loose text-neutral-700 dark:text-neutral-300 max-w-xl transition-colors duration-1000">
              {t.bioParagraph2}
            </p>
          </div>

          {/* Philosophy Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 transition-colors duration-1000">
            {philosophyPoints.map((pt, index) => {
              return (
                <div key={index} className="space-y-3">
                  <div className="text-neutral-900 dark:text-neutral-100 transition-colors duration-1000">
                    <h4 className="font-mono text-[11px] tracking-wider uppercase font-medium transition-colors duration-1000">{pt.title}</h4>
                  </div>
                  <p className="font-serif text-[12px] font-normal leading-loose text-neutral-700 dark:text-neutral-300 transition-colors duration-1000">
                    {pt.desc}
                  </p>
                </div>
              );
            })}
          </div>


        </div>

        {/* Profile image column */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-none">
            <img
              src="/images/about-profile.webp"
              alt="Hozumi Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1s] ease-in-out"
            />
          </div>
          <div className="flex justify-between items-baseline font-mono text-[8px] text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.18em]">
            <span>{t.portraitBy}</span>
            <span>{t.parisStudio}</span>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
