/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhotographySeries } from "./types";

export const PHOTOGRAPHY_DATA: PhotographySeries[] = [
  {
    id: "silent-monoliths",
    title: "Solitary Drift",
    subtitle: "Cinematic Portraits",
    category: "Portrait",
    year: "2025",
    location: "Hokkaido, Japan",
    coordinates: "43.0646° N, 141.3468° E",
    coverImage: "/images/silent-monoliths/cover.webp",
    description: "A visual essay capturing quiet moments of reflection, solitary walks, and urban geometries across Hokkaido.",
    colorTheme: {
      bg: "bg-stone-100",
      text: "text-stone-900",
      accent: "border-stone-400"
    },
    images: [
      {
        id: "sm-1",
        url: "/images/silent-monoliths/sm-1.webp",
        title: "Warm Light",
        caption: "A quiet moment under the soft glow of streetlights.",
        aspectRatio: "landscape",
        location: "Sapporo, Japan",
        date: "December 2025",
        exif: {
          camera: "ILCE-7CM2",
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
        title: "Above the Steps",
        caption: "A view from the stairs under the blue winter sky.",
        aspectRatio: "portrait",
        location: "Otaru, Japan",
        date: "December 2025",
        exif: {
          camera: "ILCE-7CM2",
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
        title: "Passage",
        caption: "Leaning against the cold concrete walls in the shadows.",
        aspectRatio: "portrait",
        location: "Asahikawa, Japan",
        date: "December 2025",
        exif: {
          camera: "ILCE-7CM2",
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
        title: "Nocturnal Flow",
        caption: "A solitary walk amidst blurred city lights and passing traffic.",
        aspectRatio: "landscape",
        location: "Sapporo, Japan",
        date: "December 2025",
        exif: {
          camera: "ILCE-7CM2",
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
    title: "Monochrome Studies",
    subtitle: "Black & White Narratives",
    category: "Monochrome",
    year: "2025",
    location: "Okinawa, Japan",
    coordinates: "26.2124° N, 127.6809° E",
    coverImage: "/images/paris-spleen/cover.webp",
    description: "A series of high-contrast black and white photographs exploring structural lines, human presence, and quiet shores.",
    colorTheme: {
      bg: "bg-slate-950",
      text: "text-slate-100",
      accent: "border-neutral-500/50"
    },
    images: [
      {
        id: "ps-1",
        url: "/images/paris-spleen/ps-1.webp",
        title: "Anteroom Naha",
        caption: "Geometric shadows at the entrance of a concrete hotel.",
        aspectRatio: "landscape",
        location: "Naha, Japan",
        date: "November 2025",
        exif: {
          camera: "ILCE-7CM2",
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
        title: "Street Musician",
        caption: "A busker performing on the sidewalk at night.",
        aspectRatio: "portrait",
        location: "Naha, Japan",
        date: "November 2025",
        exif: {
          camera: "ILCE-7CM2",
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
        title: "Solitary Crow",
        caption: "A bird perched on a white metal railing by the sea.",
        aspectRatio: "portrait",
        location: "Okinawa Coast, Japan",
        date: "December 2025",
        exif: {
          camera: "ILCE-7CM2",
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
        title: "Sea Structure",
        caption: "An old concrete platform standing in the waves.",
        aspectRatio: "portrait",
        location: "Okinawa, Japan",
        date: "October 2025",
        exif: {
          camera: "ILCE-7CM2",
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
    title: "Expressions",
    subtitle: "Character Studies",
    category: "Portrait",
    year: "2026",
    location: "Tokyo, Japan",
    coordinates: "35.6762° N, 139.6503° E",
    coverImage: "/images/ethereal-shores/cover.webp",
    description: "A collection of intimate portraits exploring facial expressions, textures of clothing, and raw human emotion.",
    colorTheme: {
      bg: "bg-sky-50/50",
      text: "text-sky-950",
      accent: "border-sky-300"
    },
    images: [
      {
        id: "es-1",
        url: "/images/ethereal-shores/es-1.webp",
        title: "Neutrality",
        caption: "A clean studio portrait in dark draped clothing.",
        aspectRatio: "portrait",
        location: "Tokyo, Japan",
        date: "January 2026",
        exif: {
          camera: "ILCE-7CM2",
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
        title: "Details",
        caption: "A close-up of hands holding a metal carabiner.",
        aspectRatio: "landscape",
        location: "Tokyo, Japan",
        date: "February 2026",
        exif: {
          camera: "ILCE-7CM2",
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
        title: "Spiral Steps",
        caption: "Sitting on a concrete spiral staircase looking upward.",
        aspectRatio: "portrait",
        location: "Tokyo, Japan",
        date: "March 2026",
        exif: {
          camera: "ILCE-7CM2",
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
        title: "Raw Emotion",
        caption: "An expressive, close-up snapshot showing raw feeling.",
        aspectRatio: "landscape",
        location: "Tokyo, Japan",
        date: "March 2026",
        exif: {
          camera: "ILCE-7CM2",
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
    title: "Urban Connection",
    subtitle: "Interactions & Portraits",
    category: "Portrait",
    year: "2026",
    location: "Tokyo, Japan",
    coordinates: "35.6762° N, 139.6503° E",
    coverImage: "/images/human-landscapes/cover.webp",
    description: "Capturing candid moments of companionship, laughter, and reflection in urban public parks and streets.",
    colorTheme: {
      bg: "bg-amber-50/30",
      text: "text-amber-950",
      accent: "border-amber-300/60"
    },
    images: [
      {
        id: "hl-1",
        url: "/images/human-landscapes/hl-1.webp",
        title: "The Bench",
        caption: "Sitting together in a quiet city garden surrounded by green leaves.",
        aspectRatio: "landscape",
        location: "Tokyo, Japan",
        date: "July 2025",
        exif: {
          camera: "ILCE-7CM2",
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
        title: "A Moment",
        caption: "A candid close-up of a shared, playful kiss.",
        aspectRatio: "landscape",
        location: "Tokyo, Japan",
        date: "August 2025",
        exif: {
          camera: "ILCE-7CM2",
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
        title: "Looking Up",
        caption: "Standing on the pathway with arms crossed under modern skyscrapers.",
        aspectRatio: "portrait",
        location: "Tokyo, Japan",
        date: "May 2025",
        exif: {
          camera: "ILCE-7CM2",
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
        title: "Gaze",
        caption: "A direct, close-up portrait with hands in motion.",
        aspectRatio: "landscape",
        location: "Tokyo, Japan",
        date: "September 2025",
        exif: {
          camera: "ILCE-7CM2",
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
    title: "Winter & Illusion",
    subtitle: "Creative Portraiture",
    category: "Portrait",
    year: "2025",
    location: "Hokkaido, Japan",
    coordinates: "43.0646° N, 141.3468° E",
    coverImage: "/images/interstate-chronicles/cover.webp",
    description: "An exploration of creative double-exposure portraiture and quiet, snowy scenes across northern Japan.",
    colorTheme: {
      bg: "bg-orange-50/40",
      text: "text-amber-950",
      accent: "border-orange-300"
    },
    images: [
      {
        id: "ic-1",
        url: "/images/interstate-chronicles/ic-1.webp",
        title: "Dot Wall",
        caption: "A quiet portrait set against a pattern of red dots.",
        aspectRatio: "portrait",
        location: "Tokyo, Japan",
        date: "July 2024",
        exif: {
          camera: "ILCE-7CM2",
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
        title: "Double Vision",
        caption: "A creative double-exposure portrait showing two perspectives.",
        aspectRatio: "portrait",
        location: "Tokyo, Japan",
        date: "June 2024",
        exif: {
          camera: "ILCE-7CM2",
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
        title: "Winter Silence",
        caption: "Leaning against a bare tree trunk in a white snowy field.",
        aspectRatio: "portrait",
        location: "Biei, Japan",
        date: "December 2024",
        exif: {
          camera: "ILCE-7CM2",
          lens: "SMC Pentax 67 105mm f/2.4",
          focalLength: "105mm",
          aperture: "f/5.6",
          shutterSpeed: "1/125s",
          iso: "160"
        }
      },
      {
        id: "ic-4",
        url: "/images/interstate-chronicles/ic-4.webp",
        title: "Cigarette & Cold",
        caption: "A close-up portrait in the snow with a bandaged hand.",
        aspectRatio: "portrait",
        location: "Biei, Japan",
        date: "December 2024",
        exif: {
          camera: "ILCE-7CM2",
          lens: "SMC Pentax 67 75mm f/2.8",
          focalLength: "75mm",
          aperture: "f/4.0",
          shutterSpeed: "1/60s",
          iso: "800"
        }
      },
      {
        id: "ic-5",
        url: "/images/interstate-chronicles/ic-5.webp",
        title: "Snow Drift",
        caption: "Lying down flat on a vast, snow-covered hill.",
        aspectRatio: "portrait",
        location: "Asahikawa, Japan",
        date: "December 2024",
        exif: {
          camera: "ILCE-7CM2",
          lens: "SMC Pentax 67 105mm f/2.4",
          focalLength: "105mm",
          aperture: "f/11.0",
          shutterSpeed: "1/1000s",
          iso: "160"
        }
      }
    ]
  },

  {
    id: "thresholds",
    title: "Northern Fragments",
    subtitle: "Hokkaido Vignettes",
    category: "Street",
    year: "2025",
    location: "Hokkaido, Japan",
    coordinates: "43.0646° N, 141.3468° E",
    coverImage: "/images/6/cover.webp",
    description: "A documentary collection capturing the quiet corners and fleeting encounters of Hokkaido. From a blue cafe truck overlooking the ocean and weathered seaside homes to unexpected street installations and the dust-kicking energy of northern horse racing, these frames document the rustic poetry of Japan's northernmost island.",
    colorTheme: {
      bg: "bg-stone-100",
      text: "text-stone-900",
      accent: "border-stone-400"
    },
    images: [
      {
        id: "th-1",
        url: "/images/6/th-1.webp",
        title: "Seaside Respite",
        caption: "A blue-grey house perched at the water's edge with a lone subcompact car, Hokkaido coast.",
        aspectRatio: "landscape",
        location: "Hokkaido, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "Elmarit-M 28mm f/2.8 ASPH",
          focalLength: "28mm",
          aperture: "f/8.0",
          shutterSpeed: "1/500s",
          iso: "100"
        }
      },
      {
        id: "th-2",
        url: "/images/6/th-2.webp",
        title: "Weathered Frame",
        caption: "A collapsed wooden shack slowly returning to the earth, contrasting with modern housing behind it.",
        aspectRatio: "landscape",
        location: "Hokkaido, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "Summilux-M 35mm f/1.4 ASPH",
          focalLength: "35mm",
          aperture: "f/5.6",
          shutterSpeed: "1/250s",
          iso: "64"
        }
      },
      {
        id: "th-3",
        url: "/images/6/th-3.webp",
        title: "Sun Mall Companion",
        caption: "A giant plush bear sits quietly at an outdoor table in a snowy shopping arcade, Otaru.",
        aspectRatio: "landscape",
        location: "Otaru, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "Apo-Summicron-M 50mm f/2 ASPH",
          focalLength: "50mm",
          aperture: "f/11.0",
          shutterSpeed: "1/125s",
          iso: "64"
        }
      },
      {
        id: "th-4",
        url: "/images/6/th-4.webp",
        title: "The Dirt Track",
        caption: "Horses kick up dust under the pale northern sun during a local race.",
        aspectRatio: "landscape",
        location: "Hokkaido, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "Elmarit-M 28mm f/2.8 ASPH",
          focalLength: "28mm",
          aperture: "f/8.0",
          shutterSpeed: "1/1000s",
          iso: "64"
        }
      }
    ]
  },
  {
    id: "ephemera",
    title: "Tracks and Tides",
    subtitle: "Regional Japan Diaries",
    category: "Street",
    year: "2025",
    location: "Choshi, Japan",
    coordinates: "35.7347° N, 140.8268° E",
    coverImage: "/images/7/cover.webp",
    description: "A photographic diary tracking the quiet rhythms of Japan's local railways, coastal edges, and regional landmarks. From the solitary guard at a country station to the crashing tides of the Pacific, these frames capture the nostalgic transit of everyday life in the provinces.",
    colorTheme: {
      bg: "bg-slate-950",
      text: "text-slate-100",
      accent: "border-amber-500/50"
    },
    images: [
      {
        id: "ep-1",
        url: "/images/7/ep-1.webp",
        title: "Tokawa Dispatch",
        caption: "A station guard holding flag batons waits at a quiet local station on the Choshi line.",
        aspectRatio: "landscape",
        location: "Choshi, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "XF 35mm f/1.4 R",
          focalLength: "35mm",
          aperture: "f/2.0",
          shutterSpeed: "1/250s",
          iso: "200"
        }
      },
      {
        id: "ep-2",
        url: "/images/7/ep-2.webp",
        title: "Parasol by the Shore",
        caption: "A woman holds a parasol, looking out over the rocky coast as a girl walks nearby.",
        aspectRatio: "landscape",
        location: "Choshi, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "XF 23mm f/1.4 R LM WR",
          focalLength: "23mm",
          aperture: "f/5.6",
          shutterSpeed: "1/500s",
          iso: "200"
        }
      },
      {
        id: "ep-3",
        url: "/images/7/ep-3.webp",
        title: "Pacific Surge",
        caption: "Waves crashing violently against the volcanic rocks under a bright blue sky.",
        aspectRatio: "portrait",
        location: "Choshi, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "XF 56mm f/1.2 R WR",
          focalLength: "56mm",
          aperture: "f/1.2",
          shutterSpeed: "1/500s",
          iso: "400"
        }
      },
      {
        id: "ep-4",
        url: "/images/7/ep-4.webp",
        title: "Iron Horse Consultation",
        caption: "Railway workers discuss operations beside a classic orange DE10 diesel locomotive.",
        aspectRatio: "portrait",
        location: "Tochigi, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "XF 35mm f/1.4 R",
          focalLength: "35mm",
          aperture: "f/1.4",
          shutterSpeed: "1/60s",
          iso: "800"
        }
      },
      {
        id: "ep-5",
        url: "/images/7/ep-5.webp",
        title: "Evening Over the Fields",
        caption: "A dramatic purple twilight sky stretching over solar panels and local houses.",
        aspectRatio: "landscape",
        location: "Chiba, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "XF 23mm f/1.4 R LM WR",
          focalLength: "23mm",
          aperture: "f/8.0",
          shutterSpeed: "1/500s",
          iso: "200"
        }
      },
      {
        id: "ep-6",
        url: "/images/7/ep-6.webp",
        title: "Brick and Sky",
        caption: "The white bell tower of a historic red-brick church rising toward passing clouds.",
        aspectRatio: "portrait",
        location: "Otaru, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "XF 35mm f/1.4 R",
          focalLength: "35mm",
          aperture: "f/1.4",
          shutterSpeed: "1/80s",
          iso: "1600"
        }
      }
    ]
  },
  {
    id: "inscapes",
    title: "Xiao Yuanhang",
    subtitle: "A Winter in Otaru",
    category: "Portrait",
    year: "2025",
    location: "Otaru, Japan",
    coordinates: "43.1907° N, 140.9947° E",
    coverImage: "/images/8/cover.webp",
    description: "An intimate portrait study of Xiao Yuanhang, captured across various locations and light conditions in Otaru. Through grainy black-and-white double exposures, neon-lit close-ups, and direct natural light, this series explores the quiet moods, intensity, and introspective character of a single subject.",
    colorTheme: {
      bg: "bg-amber-50/30",
      text: "text-amber-950",
      accent: "border-amber-300/60"
    },
    images: [
      {
        id: "in-1",
        url: "/images/8/in-1.webp",
        title: "Raincoat and Glass",
        caption: "A high-contrast black-and-white profile of Xiao Yuanhang wearing a clear plastic jacket.",
        aspectRatio: "portrait",
        location: "Otaru, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "XCD 90mm f/2.5 V",
          focalLength: "90mm",
          aperture: "f/2.5",
          shutterSpeed: "1/180s",
          iso: "64"
        }
      },
      {
        id: "in-2",
        url: "/images/8/in-2.webp",
        title: "Warm Neon",
        caption: "Warm streetlights illuminating the profile of the subject under the city lights.",
        aspectRatio: "portrait",
        location: "Otaru, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "XCD 90mm f/2.5 V",
          focalLength: "90mm",
          aperture: "f/3.2",
          shutterSpeed: "1/125s",
          iso: "100"
        }
      },
      {
        id: "in-3",
        url: "/images/8/in-3.webp",
        title: "Concrete Shadow",
        caption: "Golden hour sunlight raking across the face of the subject next to a weathered pillar.",
        aspectRatio: "landscape",
        location: "Otaru, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "XCD 55mm f/2.5 V",
          focalLength: "55mm",
          aperture: "f/4.0",
          shutterSpeed: "1/60s",
          iso: "200"
        }
      },
      {
        id: "in-4",
        url: "/images/8/in-4.webp",
        title: "Reflected Gaze",
        caption: "A direct portrait of Xiao Yuanhang seen through a pane of glass with soft reflections.",
        aspectRatio: "portrait",
        location: "Otaru, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "XCD 90mm f/2.5 V",
          focalLength: "90mm",
          aperture: "f/3.5",
          shutterSpeed: "1/160s",
          iso: "64"
        }
      },
      {
        id: "in-5",
        url: "/images/8/in-5.webp",
        title: "The Diner",
        caption: "An intense, candid look from the subject holding a spoon at a local eatery.",
        aspectRatio: "portrait",
        location: "Otaru, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "XCD 55mm f/2.5 V",
          focalLength: "55mm",
          aperture: "f/2.5",
          shutterSpeed: "1/200s",
          iso: "64"
        }
      },
      {
        id: "in-6",
        url: "/images/8/in-6.webp",
        title: "Clasped Hands",
        caption: "A formal black-and-white portrait capturing the subject's quiet posture and clasped hands.",
        aspectRatio: "portrait",
        location: "Otaru, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "XCD 90mm f/2.5 V",
          focalLength: "90mm",
          aperture: "f/5.6",
          shutterSpeed: "1/30s",
          iso: "200"
        }
      }
    ]
  },
  {
    id: "outskirts",
    title: "Okinawa Breeze",
    subtitle: "Okinawa Street Journal",
    category: "Street",
    year: "2025",
    location: "Okinawa, Japan",
    coordinates: "26.2124° N, 127.6809° E",
    coverImage: "/images/9/cover.webp",
    description: "A street-level study of Okinawa's unique cultural landscape, where local island life, tourist curiosity, and historical military presence coexist. These snapshots capture the quiet moments of rest, youthful play, and the distinct architecture of Japan's southern prefecture.",
    colorTheme: {
      bg: "bg-sky-50/50",
      text: "text-sky-950",
      accent: "border-sky-300"
    },
    images: [
      {
        id: "ou-1",
        url: "/images/9/ou-1.webp",
        title: "The Conductor",
        caption: "A boy wearing a paper Yui Rail monorail hat checks his phone while waiting on a platform.",
        aspectRatio: "portrait",
        location: "Okinawa, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "FE 24-70mm f/2.8 GM II",
          focalLength: "50mm",
          aperture: "f/8.0",
          shutterSpeed: "1/250s",
          iso: "100"
        }
      },
      {
        id: "ou-2",
        url: "/images/9/ou-2.webp",
        title: "Sightseers",
        caption: "Tourists with luggage look up and take photos on a quiet street next to parked scooters.",
        aspectRatio: "landscape",
        location: "Okinawa, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "FE 24-70mm f/2.8 GM II",
          focalLength: "35mm",
          aperture: "f/11.0",
          shutterSpeed: "1/500s",
          iso: "64"
        }
      },
      {
        id: "ou-3",
        url: "/images/9/ou-3.webp",
        title: "Camp Lester Gate",
        caption: "A guard stands at the entrance of Camp Lester, capturing the dual character of Okinawa's land.",
        aspectRatio: "landscape",
        location: "Chatan, Okinawa",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "FE 70-200mm f/2.8 GM OSS II",
          focalLength: "100mm",
          aperture: "f/5.6",
          shutterSpeed: "1/500s",
          iso: "100"
        }
      }
    ]
  },
  {
    id: "vistas",
    title: "Transient States",
    subtitle: "Travels of the Soul",
    category: "Street",
    year: "2025",
    location: "Tokyo, Japan",
    coordinates: "35.6762° N, 139.6503° E",
    coverImage: "/images/10/cover.webp",
    description: "A visual journal tracing a young traveler’s journey across contrasting environments. From the vibrant tiled facades of Bangkok temples and the clear float of tropical seas to quiet domestic shadows, close details of touch, and the rushing light trails of Tokyo bridges at night, these frames explore the fluid states of youth and motion.",
    colorTheme: {
      bg: "bg-orange-50/40",
      text: "text-amber-950",
      accent: "border-orange-300"
    },
    images: [
      {
        id: "vi-1",
        url: "/images/10/vi-1.webp",
        title: "Temple Wall",
        caption: "Standing in front of the ornate, colorful porcelain details of Wat Arun, Bangkok.",
        aspectRatio: "portrait",
        location: "Bangkok, Thailand",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "FE 24-70mm f/2.8 GM II",
          focalLength: "35mm",
          aperture: "f/11.0",
          shutterSpeed: "1/30s",
          iso: "100"
        }
      },
      {
        id: "vi-2",
        url: "/images/10/vi-2.webp",
        title: "Weightless",
        caption: "Floating peacefully in the shallow, clear turquoise sea of a tropical island.",
        aspectRatio: "landscape",
        location: "Koh Samui, Thailand",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "FE 24-70mm f/2.8 GM II",
          focalLength: "50mm",
          aperture: "f/8.0",
          shutterSpeed: "1/250s",
          iso: "64"
        }
      },
      {
        id: "vi-3",
        url: "/images/10/vi-3.webp",
        title: "Sleeping Engine",
        caption: "A motorcycle covered in plastic stands silently under neon lights in a Tokyo backstreet.",
        aspectRatio: "landscape",
        location: "Tokyo, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "FE 16-35mm f/2.8 GM II",
          focalLength: "16mm",
          aperture: "f/11.0",
          shutterSpeed: "1/500s",
          iso: "64"
        }
      },
      {
        id: "vi-4",
        url: "/images/10/vi-4.webp",
        title: "The Grip",
        caption: "An intimate close-up of a hand clutching a bag strap against the soft bokeh of city lights.",
        aspectRatio: "landscape",
        location: "Tokyo, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "FE 70-200mm f/2.8 GM OSS II",
          focalLength: "70mm",
          aperture: "f/8.0",
          shutterSpeed: "1/500s",
          iso: "64"
        }
      },
      {
        id: "vi-5",
        url: "/images/10/vi-5.webp",
        title: "Light Streams",
        caption: "Leaning on a bridge overlooking long-exposure light trails of traffic under the city night sky.",
        aspectRatio: "landscape",
        location: "Tokyo, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "FE 24-70mm f/2.8 GM II",
          focalLength: "35mm",
          aperture: "f/8.0",
          shutterSpeed: "1/60s",
          iso: "200"
        }
      }
    ]
  },
  {
    id: "pairing",
    title: "Diptych of Her",
    subtitle: "Two Moments",
    category: "Portrait",
    year: "2025",
    location: "Tokyo, Japan",
    coordinates: "35.6762° N, 139.6503° E",
    coverImage: "/images/11/cover.webp",
    description: "A diptych capturing two contrasting moments of a young woman in a striped dress. The first frame presents her in a quiet, sunlit traditional garden sitting on a red bench; the second frame is a candid flash portrait of her crouching on a street crosswalk at night. Together they form a dialogue between quiet tradition and spontaneous urban night.",
    colorTheme: {
      bg: "bg-neutral-950",
      text: "text-neutral-100",
      accent: "border-neutral-600"
    },
    images: [
      {
        id: "pa-1",
        url: "/images/11/pa-1.webp",
        title: "Spontaneous Night",
        caption: "A playful flash portrait of the subject crouching on a street crosswalk at night.",
        aspectRatio: "portrait",
        location: "Tokyo, Japan",
        date: "2025",
        exif: {
          camera: "ILCE-7CM2",
          lens: "XF 35mm f/1.4 R",
          focalLength: "35mm",
          aperture: "f/2.8",
          shutterSpeed: "1/125s",
          iso: "400"
        }
      }
    ]
  }

];
