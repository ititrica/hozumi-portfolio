/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";

export default function AboutContact() {
  const bioAwards = [
    { name: "Awwwards Site of the Year - Nominee", year: "2025" },
    { name: "LensCulture Fine Art Photography Awards - Winner", year: "2024" },
    { name: "Paris Photo Festival - Selected Artist", year: "2024" },
    { name: "CSS Design Awards - Best UI/UX Design", year: "2025" },
  ];

  const philosophyPoints = [
    {
      title: "Architectural Gravity",
      desc: "Planes, shadows, and raw concrete hold histories. We document monuments as living forms balancing light."
    },
    {
      title: "The Silent Narrative",
      desc: "Removing noise to reveal essence. Stutter speeds and grain settings are configured to echo emotional voids."
    }
  ];

  return (
    <section className="py-24 max-w-[1400px] mx-auto px-6 w-full">
      
      {/* Subheader */}
      <div className="pb-6 mb-16 transition-colors duration-1000">
        <h2 className="font-serif text-xl font-light tracking-[0.12em] text-neutral-950 dark:text-white uppercase transition-colors duration-1000">
          Biography & Philosophy
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
            <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-600 dark:text-neutral-400 uppercase block transition-colors duration-1000">
              CREATIVE BIO & PHILOSOPHY
            </span>
            <h3 className="font-serif text-xl font-light text-neutral-950 dark:text-white leading-relaxed transition-colors duration-1000">
              Hozumi is a French digital visual artist & photographer based in Paris, creating at the intersection of structure and void.
            </h3>
            <p className="font-serif text-[13px] font-light leading-relaxed text-neutral-700 dark:text-neutral-350 max-w-xl transition-colors duration-1000">
              With a background in both front-end creative development and architecture, her photographic works bridge the gap between digital precision and tactile film mediumism. She handles high-resolution Sony ILCE-7CM2 systems, framing raw structural monoliths and human profiles like mathematical planes of silence.
            </p>
            <p className="font-serif text-[13px] font-light leading-relaxed text-neutral-700 dark:text-neutral-350 max-w-xl transition-colors duration-1000">
              Her design language favors extreme minimalism, precise typography pairings, and structured spatial grids. This portfolio exists as a quiet, interactive digital canvas designed to let photographs breathe, warp, and tell their nocturnal or coastal stories.
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
                  <p className="font-serif text-[11px] font-light leading-relaxed text-neutral-600 dark:text-neutral-400 transition-colors duration-1000">
                    {pt.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Awards and Exhibitions */}
          <div className="pt-8 space-y-6 transition-colors duration-1000">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-[11px] tracking-wider uppercase font-medium text-neutral-900 dark:text-neutral-100 transition-colors duration-1000">
                EXHIBITIONS & RECOGNITIONS
              </span>
            </div>
            
            <div className="space-y-4">
              {bioAwards.map((aw, idx) => (
                <div key={idx} className="flex justify-between items-baseline pb-2 transition-colors duration-1000">
                  <span className="font-serif text-[13px] font-light text-neutral-700 dark:text-neutral-350 transition-colors duration-1000">
                    {aw.name}
                  </span>
                  <span className="font-mono text-[9.5px] text-neutral-500 dark:text-neutral-450 transition-colors duration-1000">{aw.year}</span>
                </div>
              ))}
            </div>
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
            <span>PORTRAIT BY LÉON SIMON</span>
            <span>PARIS STUDIO — JULY 2025</span>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
