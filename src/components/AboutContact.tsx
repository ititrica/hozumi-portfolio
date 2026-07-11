/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Award, Compass, Camera } from "lucide-react";
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
      desc: "Planes, shadows, and raw concrete hold histories. We document monuments as living forms balancing light.",
      icon: Compass
    },
    {
      title: "The Silent Narrative",
      desc: "Removing noise to reveal essence. Stutter speeds and grain settings are configured to echo emotional voids.",
      icon: Camera
    }
  ];

  return (
    <section className="py-24 max-w-[1400px] mx-auto px-6 w-full">
      
      {/* Subheader */}
      <div className="border-b border-neutral-500/10 pb-6 mb-16">
        <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-neutral-950 dark:text-white">
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
            <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase block">
              CREATIVE BIO // PHILOSOPHY
            </span>
            <h3 className="font-serif text-3xl font-light text-neutral-950 dark:text-white">
              Cathy Dolle is a French digital visual artist & photographer based in Paris, creating at the intersection of structure and void.
            </h3>
            <p className="font-serif text-sm font-light leading-relaxed text-neutral-600 dark:text-neutral-300">
              With a background in both front-end creative development and architecture, her photographic works bridge the gap between digital precision and tactile film mediumism. She handles analog Pentax 67 systems and high-density Leica formats, framing raw structural monoliths and human profiles like mathematical planes of silence.
            </p>
            <p className="font-serif text-sm font-light leading-relaxed text-neutral-600 dark:text-neutral-300">
              Her design language favors extreme minimalism, precise typography pairings, and structured spatial grids. This portfolio exists as a quiet, interactive digital canvas designed to let photographs breathe, warp, and tell their nocturnal or coastal stories.
            </p>
          </div>

          {/* Philosophy Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-neutral-500/10 pt-8">
            {philosophyPoints.map((pt, index) => {
              const IconComp = pt.icon;
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center space-x-3 text-neutral-900 dark:text-neutral-100">
                    <IconComp className="w-5 h-5 text-neutral-400" />
                    <h4 className="font-mono text-xs tracking-wider uppercase font-semibold">{pt.title}</h4>
                  </div>
                  <p className="font-serif text-xs font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {pt.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Awards and Exhibitions */}
          <div className="border-t border-neutral-500/10 pt-8 space-y-6">
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-neutral-400" />
              <span className="font-mono text-xs tracking-wider uppercase font-semibold text-neutral-900 dark:text-neutral-100">
                EXHIBITIONS & RECOGNITIONS
              </span>
            </div>
            
            <div className="space-y-4">
              {bioAwards.map((aw, idx) => (
                <div key={idx} className="flex justify-between items-baseline border-b border-neutral-500/5 pb-2">
                  <span className="font-serif text-sm font-light text-neutral-700 dark:text-neutral-300">
                    {aw.name}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-400">{aw.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile image column */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-500/10 rounded-none">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=85&w=1000"
              alt="Cathy Dolle Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1s] ease-in-out"
            />
          </div>
          <div className="flex justify-between items-baseline font-mono text-[9px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
            <span>PORTRAIT BY LÉON SIMON</span>
            <span>PARIS STUDIO // JULY 2025</span>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
