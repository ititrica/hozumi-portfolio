/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhotographySeries } from "./types";

export const PHOTOGRAPHY_DATA: PhotographySeries[] = [
  {
    id: "silent-monoliths",
    title: "Silent Monoliths",
    subtitle: "Architectural Geometries",
    category: "Architecture",
    year: "2025",
    location: "Paris & Berlin",
    coordinates: "48.8566° N, 2.3522° E",
    coverImage: "/images/silent-monoliths/cover.webp",
    description: "An exploration of brutalist and modernist raw concrete structures. The interplay of geometric concrete slabs with harsh, direct sunlight creates dramatic, razor-sharp shadows and reveals the deep texture of raw, shuttered concrete. Captured with an eye for quiet, monumental permanence in the heart of Western Europe's urban landscapes.",
    colorTheme: {
      bg: "bg-stone-100",
      text: "text-stone-900",
      accent: "border-stone-400"
    },
    images: [
      {
        id: "sm-1",
        url: "/images/silent-monoliths/sm-1.webp",
        title: "Concrete Angle I",
        caption: "Diagonal cantilever slab against a bright summer sky in Berlin.",
        aspectRatio: "landscape",
        location: "Berlin, Germany",
        date: "May 2025",
        exif: {
          camera: "Leica M11-P",
          lens: "Summilux-M 35mm f/1.4 ASPH",
          focalLength: "35mm",
          aperture: "f/5.6",
          shutterSpeed: "1/1000s",
          iso: "64"
        }
      },
      {
        id: "sm-2",
        url: "/images/silent-monoliths/sm-2.webp",
        title: "Lines of Silence",
        caption: "Geometric columns and deep shadows in a sunlit corridor.",
        aspectRatio: "portrait",
        location: "Paris, France",
        date: "September 2025",
        exif: {
          camera: "Leica M11-P",
          lens: "Elmarit-M 28mm f/2.8 ASPH",
          focalLength: "28mm",
          aperture: "f/8.0",
          shutterSpeed: "1/500s",
          iso: "100"
        }
      },
      {
        id: "sm-3",
        url: "/images/silent-monoliths/sm-3.webp",
        title: "Glass Reflectance",
        caption: "Structural glass and concrete grid mirroring the sky.",
        aspectRatio: "portrait",
        location: "La Défense, Paris",
        date: "October 2025",
        exif: {
          camera: "Leica M11-P",
          lens: "Summilux-M 35mm f/1.4 ASPH",
          focalLength: "35mm",
          aperture: "f/4.0",
          shutterSpeed: "1/2000s",
          iso: "64"
        }
      },
      {
        id: "sm-4",
        url: "/images/silent-monoliths/sm-4.webp",
        title: "Raw Grain",
        caption: "Macro detail of board-marked concrete catching the raking afternoon light.",
        aspectRatio: "landscape",
        location: "Berlin, Germany",
        date: "June 2025",
        exif: {
          camera: "Leica M11-P",
          lens: "Apo-Summicron-M 50mm f/2 ASPH",
          focalLength: "50mm",
          aperture: "f/2.8",
          shutterSpeed: "1/125s",
          iso: "200"
        }
      }
    ]
  },
  {
    id: "paris-spleen",
    title: "Paris Spleen",
    subtitle: "Nocturnal Streetscapes",
    category: "Street",
    year: "2025",
    location: "Paris, France",
    coordinates: "48.8534° N, 2.3488° E",
    coverImage: "/images/paris-spleen/cover.webp",
    description: "An homage to Baudelaire's prose poems, this series captures Paris after dark, wet with rain and draped in cinematic mood. Neon signs from historic brasseries reflect in deep roadside puddles, lonely figures stand under wrought-iron streetlamps, and a soft golden amber haze warms the damp, cold atmosphere of the metropolitan night.",
    colorTheme: {
      bg: "bg-slate-950",
      text: "text-slate-100",
      accent: "border-amber-500/50"
    },
    images: [
      {
        id: "ps-1",
        url: "/images/paris-spleen/ps-1.webp",
        title: "Saint-Germain Amber",
        caption: "Golden headlights reflecting on wet cobblestones of Boulevard Saint-Germain.",
        aspectRatio: "landscape",
        location: "Saint-Germain, Paris",
        date: "November 2025",
        exif: {
          camera: "Fujifilm X-T5",
          lens: "XF 35mm f/1.4 R",
          focalLength: "35mm",
          aperture: "f/1.4",
          shutterSpeed: "1/60s",
          iso: "800"
        }
      },
      {
        id: "ps-2",
        url: "/images/paris-spleen/ps-2.webp",
        title: "Midnight Silhouette",
        caption: "A single traveler crossing the Pont des Arts in a gentle mist.",
        aspectRatio: "portrait",
        location: "Pont des Arts, Paris",
        date: "November 2025",
        exif: {
          camera: "Fujifilm X-T5",
          lens: "XF 56mm f/1.2 R WR",
          focalLength: "56mm",
          aperture: "f/1.2",
          shutterSpeed: "1/125s",
          iso: "1600"
        }
      },
      {
        id: "ps-3",
        url: "/images/paris-spleen/ps-3.webp",
        title: "Seine reflections",
        caption: "Bridges over the Seine illuminated by passing tourist boats.",
        aspectRatio: "landscape",
        location: "Sainte-Chapelle, Paris",
        date: "December 2025",
        exif: {
          camera: "Fujifilm X-T5",
          lens: "XF 23mm f/1.4 R LM WR",
          focalLength: "23mm",
          aperture: "f/2.0",
          shutterSpeed: "1/40s",
          iso: "1600"
        }
      },
      {
        id: "ps-4",
        url: "/images/paris-spleen/ps-4.webp",
        title: "Brasserie Glow",
        caption: "Warm incandescent lights leaking from a Montmartre café facade.",
        aspectRatio: "portrait",
        location: "Montmartre, Paris",
        date: "October 2025",
        exif: {
          camera: "Fujifilm X-T5",
          lens: "XF 35mm f/1.4 R",
          focalLength: "35mm",
          aperture: "f/1.4",
          shutterSpeed: "1/80s",
          iso: "1000"
        }
      }
    ]
  },
  {
    id: "ethereal-shores",
    title: "Ethereal Shores",
    subtitle: "Oceanic Long Exposures",
    category: "Landscape",
    year: "2026",
    location: "Brittany & Normandy",
    coordinates: "48.6360° N, 1.5115° W",
    coverImage: "/images/ethereal-shores/cover.webp",
    description: "An evocative study of water and sky where the horizons blur. Utilizing long exposure times and dense neutral density filters, the turbulent Atlantic Ocean is transformed into a peaceful, cloud-like fog. Muted colors, minimal compositions, and ancient coastal structures emerge from the mist in absolute, serene silence.",
    colorTheme: {
      bg: "bg-sky-50/50",
      text: "text-sky-950",
      accent: "border-sky-300"
    },
    images: [
      {
        id: "es-1",
        url: "/images/ethereal-shores/es-1.webp",
        title: "Sea Mist Whispers",
        caption: "Sunrays cutting through sea mist over a tranquil tide.",
        aspectRatio: "landscape",
        location: "Étretat, Normandy",
        date: "January 2026",
        exif: {
          camera: "Sony α7R V",
          lens: "FE 24-70mm f/2.8 GM II",
          focalLength: "45mm",
          aperture: "f/11.0",
          shutterSpeed: "30s",
          iso: "50"
        }
      },
      {
        id: "es-2",
        url: "/images/ethereal-shores/es-2.webp",
        title: "Stretched Horizon",
        caption: "Infinite sand flats melting into a pastel sky at sunset.",
        aspectRatio: "portrait",
        location: "Mont Saint-Michel",
        date: "February 2026",
        exif: {
          camera: "Sony α7R V",
          lens: "FE 24-70mm f/2.8 GM II",
          focalLength: "24mm",
          aperture: "f/8.0",
          shutterSpeed: "120s",
          iso: "50"
        }
      },
      {
        id: "es-3",
        url: "/images/ethereal-shores/es-3.webp",
        title: "Solitary Rock",
        caption: "A basalt sea stack braving the long exposure fog.",
        aspectRatio: "landscape",
        location: "Crozon, Brittany",
        date: "March 2026",
        exif: {
          camera: "Sony α7R V",
          lens: "FE 70-200mm f/2.8 GM OSS II",
          focalLength: "105mm",
          aperture: "f/13.0",
          shutterSpeed: "60s",
          iso: "50"
        }
      },
      {
        id: "es-4",
        url: "/images/ethereal-shores/es-4.webp",
        title: "Oceanic Stillness",
        caption: "Muted blue and silver gradients of sea and cloud.",
        aspectRatio: "portrait",
        location: "Brest, France",
        date: "March 2026",
        exif: {
          camera: "Sony α7R V",
          lens: "FE 24-70mm f/2.8 GM II",
          focalLength: "35mm",
          aperture: "f/11.0",
          shutterSpeed: "15s",
          iso: "50"
        }
      }
    ]
  },
  {
    id: "human-landscapes",
    title: "Human Landscapes",
    subtitle: "Fine Art Portraiture",
    category: "Portrait",
    year: "2025",
    location: "Paris, France",
    coordinates: "48.8647° N, 2.3324° E",
    coverImage: "/images/human-landscapes/cover.webp",
    description: "An intimate documentation of human gestures, expressions, and forms. Stripped of loud colors and excessive styling, this portrait collection utilizes soft side-lighting, organic paper textures, and film grain. It frames eyes, clasped hands, and silent profiles, highlighting the delicate architectures of personal presence.",
    colorTheme: {
      bg: "bg-amber-50/30",
      text: "text-amber-950",
      accent: "border-amber-300/60"
    },
    images: [
      {
        id: "hl-1",
        url: "/images/human-landscapes/hl-1.webp",
        title: "Aura of Grace",
        caption: "Soft lighting reflecting of a serene facial profile under soft shadows.",
        aspectRatio: "landscape",
        location: "Studio Paris",
        date: "July 2025",
        exif: {
          camera: "Hasselblad X2D 100C",
          lens: "XCD 90mm f/2.5 V",
          focalLength: "90mm",
          aperture: "f/2.5",
          shutterSpeed: "1/180s",
          iso: "64"
        }
      },
      {
        id: "hl-2",
        url: "/images/human-landscapes/hl-2.webp",
        title: "Quiet Contemplation",
        caption: "Intense, direct gaze framed by sculptural shadows.",
        aspectRatio: "landscape",
       location: "Studio Paris",
       date: "August 2025",
        exif: {
          camera: "Hasselblad X2D 100C",
          lens: "XCD 90mm f/2.5 V",
          focalLength: "90mm",
          aperture: "f/4.0",
          shutterSpeed: "1/125s",
          iso: "100"
        }
      },
      {
        id: "hl-3",
        url: "/images/human-landscapes/hl-3.webp",
        title: "Telling Lines",
        caption: "Close-up portrait capturing subtle textures and lines of experience.",
        aspectRatio: "portrait",
        location: "Studio Berlin",
        date: "May 2025",
        exif: {
          camera: "Hasselblad X2D 100C",
          lens: "XCD 55mm f/2.5 V",
          focalLength: "55mm",
          aperture: "f/3.5",
          shutterSpeed: "1/160s",
          iso: "64"
        }
      },
      {
        id: "hl-4",
        url: "/images/human-landscapes/hl-4.webp",
        title: "Subtle Glow",
        caption: "Intimate focus of soft light tracing facial structures.",
        aspectRatio: "landscape",
        location: "Studio Paris",
        date: "September 2025",
        exif: {
          camera: "Hasselblad X2D 100C",
          lens: "XCD 90mm f/2.5 V",
          focalLength: "90mm",
          aperture: "f/2.8",
          shutterSpeed: "1/200s",
          iso: "64"
        }
      }
    ]
  },
  {
    id: "interstate-chronicles",
    title: "Interstate Chronicles",
    subtitle: "Cinematic Roadside Americana",
    category: "Cinematic",
    year: "2024",
    location: "California & Nevada",
    coordinates: "36.7783° N, 119.4179° W",
    coverImage: "/images/interstate-chronicles/cover.webp",
    description: "A wide-aspect road journey across the high deserts of the American West. Spotlighting solitary neon motels, retro gas stations under cosmic twilight sky spreads, and rusted classic sedans buried in desert sand. Colored in warm, nostalgic Kodachrome palettes with heavy cinematic framing, evoking a long-lost romance of travel and space.",
    colorTheme: {
      bg: "bg-orange-50/40",
      text: "text-amber-950",
      accent: "border-orange-300"
    },
    images: [
      {
        id: "ic-1",
        url: "/images/interstate-chronicles/ic-1.webp",
        title: "The Long Highway",
        caption: "Distant asphalt road cutting through dusty golden canyons.",
        aspectRatio: "landscape",
        location: "Death Valley, California",
        date: "July 2024",
        exif: {
          camera: "Pentax 67II",
          lens: "SMC Pentax 67 105mm f/2.4",
          focalLength: "105mm",
          aperture: "f/8.0",
          shutterSpeed: "1/500s",
          iso: "160"
        }
      },
      {
        id: "ic-2",
        url: "/images/interstate-chronicles/ic-2.webp",
        title: "San Francisco Breeze",
        caption: "Classic car driving down a foggy, architectural San Francisco street.",
        aspectRatio: "portrait",
        location: "San Francisco, USA",
        date: "June 2024",
        exif: {
          camera: "Pentax 67II",
          lens: "SMC Pentax 67 75mm f/2.8",
          focalLength: "75mm",
          aperture: "f/4.0",
          shutterSpeed: "1/250s",
          iso: "400"
        }
      },
      {
        id: "ic-3",
        url: "/images/interstate-chronicles/ic-3.webp",
        title: "Valleys of Gold",
        caption: "Morning fog draping over giant redwoods and winding wilderness routes.",
        aspectRatio: "landscape",
        location: "Yosemite Valley",
        date: "June 2024",
        exif: {
          camera: "Pentax 67II",
          lens: "SMC Pentax 67 105mm f/2.4",
          focalLength: "105mm",
          aperture: "f/5.6",
          shutterSpeed: "1/125s",
          iso: "160"
        }
      }
    ]
  }
];
