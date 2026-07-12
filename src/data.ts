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
    location: "Hokkaido, Japan",
    coordinates: "43.0646° N, 141.3468° E",
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
    location: "Chiba, Japan",
    coordinates: "35.6073° N, 140.1064° E",
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
       aspectRatio: "portrait",
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
    location: "Shanghai, China",
    coordinates: "31.2304° N, 121.4737° E",
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
        aspectRatio: "portrait",
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
        aspectRatio: "landscape",
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
        aspectRatio: "portrait",
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
        aspectRatio: "landscape",
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
    year: "2026",
    location: "Shanghai, China",
    coordinates: "31.2304° N, 121.4737° E",
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
    year: "2025",
    location: "Hokkaido, Japan",
    coordinates: "43.0646° N, 141.3468° E",
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
        aspectRatio: "portrait",
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
        aspectRatio: "portrait",
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
      },
 
      {
        id: "ic-4",
        url: "/images/interstate-chronicles/ic-4.webp",
        title: "Sideways Glow",
        caption: "Neon motel sign glowing against the indigo desert twilight.",
        aspectRatio: "portrait",
        location: "Nevada, USA",
        date: "July 2024",
        exif: {
          camera: "Pentax 67II",
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
        title: "Dust Horizon",
        caption: "Endless two-lane blacktop disappearing into the heat haze.",
        aspectRatio: "portrait",
        location: "California, USA",
        date: "July 2024",
        exif: {
          camera: "Pentax 67II",
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
    title: "Thresholds",
    subtitle: "Open Territory",
    category: "Landscape",
    year: "2025",
    location: "Hokkaido, Japan",
    coordinates: "43.0646° N, 141.3468° E",
    coverImage: "/images/6/cover.webp",
    description: "An exploration of spatial thresholds and transitional spaces where interior meets exterior, land meets sky, and solid meets void. These wide-frame compositions draw the eye toward distant horizons and architectural edges, capturing the quiet drama of open landscapes and the structures that define their boundaries.",
    colorTheme: {
      bg: "bg-stone-100",
      text: "text-stone-900",
      accent: "border-stone-400"
    },
    images: [
      {
        id: "th-1",
        url: "/images/6/th-1.webp",
        title: "Open Reach",
        caption: "Expansive landscape stretching toward a distant mountain silhouette.",
        aspectRatio: "landscape",
        location: "Unknown",
        date: "2025",
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
        id: "th-2",
        url: "/images/6/th-2.webp",
        title: "Layered Ground",
        caption: "Textural foreground leading into layered middle and far distances.",
        aspectRatio: "landscape",
        location: "Unknown",
        date: "2025",
        exif: {
          camera: "Leica M11-P",
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
        title: "Dividing Line",
        caption: "A sharp horizon line bisecting textural earth and soft sky.",
        aspectRatio: "landscape",
        location: "Unknown",
        date: "2025",
        exif: {
          camera: "Leica M11-P",
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
        title: "Distant Vantage",
        caption: "Wide-angle view from an elevated position overlooking open terrain.",
        aspectRatio: "landscape",
        location: "Unknown",
        date: "2025",
        exif: {
          camera: "Leica M11-P",
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
    title: "Ephemera",
    subtitle: "Wandering Frames",
    category: "Street",
    year: "2025",
    location: "Kobe, Japan",
    coordinates: "34.6901° N, 135.1955° E",
    coverImage: "/images/7/cover.webp",
    description: "A collection of fleeting moments captured in motion across urban landscapes. Passersby, street corners, unexpected reflections, and the poetry of everyday encounters. These frames celebrate the ephemeral nature of city life -- the transient gestures and shifting lights that compose the rhythm of the street.",
    colorTheme: {
      bg: "bg-slate-950",
      text: "text-slate-100",
      accent: "border-amber-500/50"
    },
    images: [
      {
        id: "ep-1",
        url: "/images/7/ep-1.webp",
        title: "Morning Passerby",
        caption: "A lone figure crossing an intersection in golden morning light.",
        aspectRatio: "landscape",
        location: "Unknown",
        date: "2025",
        exif: {
          camera: "Fujifilm X-T5",
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
        title: "Street Geometry",
        caption: "Architectural lines framing an everyday urban scene.",
        aspectRatio: "landscape",
        location: "Unknown",
        date: "2025",
        exif: {
          camera: "Fujifilm X-T5",
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
        title: "Silhouette Alley",
        caption: "Narrow alleyway with a figure caught in backlight.",
        aspectRatio: "portrait",
        location: "Unknown",
        date: "2025",
        exif: {
          camera: "Fujifilm X-T5",
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
        title: "Evening Drift",
        caption: "Blurred motion of a cyclist passing under street lamps.",
        aspectRatio: "portrait",
        location: "Unknown",
        date: "2025",
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
        id: "ep-5",
        url: "/images/7/ep-5.webp",
        title: "Shadows Cast",
        caption: "Long afternoon shadows stretching across a cobblestone plaza.",
        aspectRatio: "landscape",
        location: "Unknown",
        date: "2025",
        exif: {
          camera: "Fujifilm X-T5",
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
        title: "Rain Reflection",
        caption: "Wet pavement mirroring a neon storefront sign.",
        aspectRatio: "portrait",
        location: "Unknown",
        date: "2025",
        exif: {
          camera: "Fujifilm X-T5",
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
    title: "Inscapes",
    subtitle: "Interior Silences",
    category: "Portrait",
    year: "2025",
    location: "Hokkaido, Japan",
    coordinates: "43.0646° N, 141.3468° E",
    coverImage: "/images/8/cover.webp",
    description: "An intimate series of interior portraits and quiet studies. Focusing on the subtle geometries of the human form and the spaces we inhabit, these frames explore introspective stillness, soft window light, and the unspoken narratives carried in posture and expression.",
    colorTheme: {
      bg: "bg-amber-50/30",
      text: "text-amber-950",
      accent: "border-amber-300/60"
    },
    images: [
      {
        id: "in-1",
        url: "/images/8/in-1.webp",
        title: "Window Study I",
        caption: "Soft northern light falling across a figure in quiet repose.",
        aspectRatio: "portrait",
        location: "Studio Paris",
        date: "2025",
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
        id: "in-2",
        url: "/images/8/in-2.webp",
        title: "Turned Away",
        caption: "A profile half-veiled in shadow, lost in thought.",
        aspectRatio: "portrait",
        location: "Studio Paris",
        date: "2025",
        exif: {
          camera: "Hasselblad X2D 100C",
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
        title: "Wide Interior",
        caption: "A room corner with a lone figure creating spatial balance.",
        aspectRatio: "landscape",
        location: "Studio Paris",
        date: "2025",
        exif: {
          camera: "Hasselblad X2D 100C",
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
        title: "Hands at Rest",
        caption: "Close detail of clasped hands resting on fabric.",
        aspectRatio: "portrait",
        location: "Studio Paris",
        date: "2025",
        exif: {
          camera: "Hasselblad X2D 100C",
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
        title: "Veiled Glance",
        caption: "Eyes meeting the lens through a sheer fabric barrier.",
        aspectRatio: "portrait",
        location: "Studio Paris",
        date: "2025",
        exif: {
          camera: "Hasselblad X2D 100C",
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
        title: "Still Life",
        caption: "An unpeopled interior corner with soft light and shadow-play.",
        aspectRatio: "portrait",
        location: "Studio Paris",
        date: "2025",
        exif: {
          camera: "Hasselblad X2D 100C",
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
    title: "Outskirts",
    subtitle: "Peripheral Views",
    category: "Landscape",
    year: "2025",
    location: "Okinawa, Japan",
    coordinates: "26.3344° N, 127.8056° E",
    coverImage: "/images/9/cover.webp",
    description: "A photographic journey to the edges -- where the urban grid dissolves into open countryside, and the built environment gives way to natural forms. These peripheral views capture the transitional beauty of liminal landscapes, where something ends and something else begins.",
    colorTheme: {
      bg: "bg-sky-50/50",
      text: "text-sky-950",
      accent: "border-sky-300"
    },
    images: [
      {
        id: "ou-1",
        url: "/images/9/ou-1.webp",
        title: "Single Tree",
        caption: "A solitary tree standing against a vast, open horizon.",
        aspectRatio: "portrait",
        location: "Unknown",
        date: "2025",
        exif: {
          camera: "Sony a7R V",
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
        title: "Field Lines",
        caption: "Parallel agricultural lines receding toward a distant treeline.",
        aspectRatio: "landscape",
        location: "Unknown",
        date: "2025",
        exif: {
          camera: "Sony a7R V",
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
        title: "Edge of Town",
        caption: "The last buildings giving way to open countryside.",
        aspectRatio: "landscape",
        location: "Unknown",
        date: "2025",
        exif: {
          camera: "Sony a7R V",
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
    title: "Vistas",
    subtitle: "Wide Horizons",
    category: "Landscape",
    year: "2025",
    location: "Tokyo, Japan",
    coordinates: "35.6762° N, 139.6503° E",
    coverImage: "/images/10/cover.webp",
    description: "Expansive panoramic landscapes captured in the golden hours of dawn and dusk. These wide compositions emphasize the grandeur of natural spaces -- sweeping coastlines, rolling hills, and dramatic cloud formations -- inviting the viewer to breathe in the scale and mood of the open world.",
    colorTheme: {
      bg: "bg-orange-50/40",
      text: "text-amber-950",
      accent: "border-orange-300"
    },
    images: [
      {
        id: "vi-1",
        url: "/images/10/vi-1.webp",
        title: "First Light",
        caption: "Dawn breaking over a still, mist-covered valley.",
        aspectRatio: "portrait",
        location: "Unknown",
        date: "2025",
        exif: {
          camera: "Sony a7R V",
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
        title: "Golden Slope",
        caption: "Late afternoon light raking across a grassy hillside.",
        aspectRatio: "landscape",
        location: "Unknown",
        date: "2025",
        exif: {
          camera: "Sony a7R V",
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
        title: "Cloud Cathedral",
        caption: "Dramatic cumulus formations towering over a flat landscape.",
        aspectRatio: "landscape",
        location: "Unknown",
        date: "2025",
        exif: {
          camera: "Sony a7R V",
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
        title: "Coastal Reach",
        caption: "A rocky coastline stretching toward a hazy sea horizon.",
        aspectRatio: "landscape",
        location: "Unknown",
        date: "2025",
        exif: {
          camera: "Sony a7R V",
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
        title: "Dusk Plain",
        caption: "The last light fading over an open plain, sky and earth merging.",
        aspectRatio: "landscape",
        location: "Unknown",
        date: "2025",
        exif: {
          camera: "Sony a7R V",
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
    title: "Pairing",
    subtitle: "Two Moments",
    category: "Street",
    year: "2023",
    location: "Osaka, Japan",
    coordinates: "34.6937° N, 135.5023° E",
    coverImage: "/images/11/cover.webp",
    description: "A diptych of urban moments -- two frames that speak to each other across time and space. A study in contrasts: wide and intimate, day and twilight, motion and stillness. Together they form a dialogue about the way cities hold both the vast and the personal within the same streets.",
    colorTheme: {
      bg: "bg-neutral-950",
      text: "text-neutral-100",
      accent: "border-neutral-600"
    },
    images: [
      {
        id: "pa-1",
        url: "/images/11/pa-1.webp",
        title: "The Second Look",
        caption: "An urban corner seen from across the street, waiting for a passerby.",
        aspectRatio: "portrait",
        location: "Paris, France",
        date: "2025",
        exif: {
          camera: "Fujifilm X-T5",
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
