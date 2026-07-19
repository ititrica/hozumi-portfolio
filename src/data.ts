/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhotographySeries } from "./types";

export const PHOTOGRAPHY_DATA: PhotographySeries[] = [
  {
    "id": "solitary-drift",
    "title": "Solitary Drift",
    "subtitle": "Cinematic Portraits",
    "category": "Portrait",
    "year": "2025",
    "location": "Hokkaido, Japan",
    "coordinates": "43.0646° N, 141.3468° E",
    "coverImage": "/images/01-solitary-drift/so-01.webp",
    "description": "A visual essay capturing quiet moments of reflection, solitary walks, and urban geometries across Hokkaido.",
    "colorTheme": {
      "bg": "bg-stone-100",
      "text": "text-stone-900",
      "accent": "border-stone-400"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/01-solitary-drift/so-02.webp",
        "title": "Warm Light",
        "caption": "A quiet moment under the soft glow of streetlights.",
        "aspectRatio": "landscape",
        "location": "Sapporo, Japan",
        "date": "December 2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "Summilux-M 35mm f/1.4 ASPH",
          "focalLength": "35mm",
          "aperture": "f/5.6",
          "shutterSpeed": "1/1000s",
          "iso": "64"
        }
      },
      {
        "id": "03",
        "url": "/images/01-solitary-drift/so-03.webp",
        "title": "Above the Steps",
        "caption": "A view from the stairs under the blue winter sky.",
        "aspectRatio": "portrait",
        "location": "Otaru, Japan",
        "date": "December 2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "Elmarit-M 28mm f/2.8 ASPH",
          "focalLength": "28mm",
          "aperture": "f/8.0",
          "shutterSpeed": "1/500s",
          "iso": "100"
        }
      },
      {
        "id": "04",
        "url": "/images/01-solitary-drift/so-04.webp",
        "title": "Passage",
        "caption": "Leaning against the cold concrete walls in the shadows.",
        "aspectRatio": "portrait",
        "location": "Asahikawa, Japan",
        "date": "December 2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "Summilux-M 35mm f/1.4 ASPH",
          "focalLength": "35mm",
          "aperture": "f/4.0",
          "shutterSpeed": "1/2000s",
          "iso": "64"
        }
      },
      {
        "id": "05",
        "url": "/images/01-solitary-drift/so-05.webp",
        "title": "Nocturnal Flow",
        "caption": "A solitary walk amidst blurred city lights and passing traffic.",
        "aspectRatio": "landscape",
        "location": "Sapporo, Japan",
        "date": "December 2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "Apo-Summicron-M 50mm f/2 ASPH",
          "focalLength": "50mm",
          "aperture": "f/2.8",
          "shutterSpeed": "1/125s",
          "iso": "200"
        }
      }
    ]
  },
  {
    "id": "monochrome-studies",
    "title": "Monochrome Studies",
    "subtitle": "Black & White Narratives",
    "category": "Monochrome",
    "year": "2025",
    "location": "Okinawa, Japan",
    "coordinates": "26.2124° N, 127.6809° E",
    "coverImage": "/images/02-monochrome-studies/mo-01.webp",
    "description": "A series of high-contrast black and white photographs exploring structural lines, human presence, and quiet shores.",
    "colorTheme": {
      "bg": "bg-slate-950",
      "text": "text-slate-100",
      "accent": "border-neutral-500/50"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/02-monochrome-studies/mo-02.webp",
        "title": "Anteroom Naha",
        "caption": "Geometric shadows at the entrance of a concrete hotel.",
        "aspectRatio": "landscape",
        "location": "Naha, Japan",
        "date": "November 2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "65mm F2 DG DN | Contemporary 020",
          "focalLength": "65mm",
          "aperture": "f/5.6",
          "shutterSpeed": "1/250s",
          "iso": "100"
        }
      },
      {
        "id": "03",
        "url": "/images/02-monochrome-studies/mo-03.webp",
        "title": "Street Musician",
        "caption": "A busker performing on the sidewalk at night.",
        "aspectRatio": "portrait",
        "location": "Naha, Japan",
        "date": "November 2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "XF 56mm f/1.2 R WR",
          "focalLength": "56mm",
          "aperture": "f/1.2",
          "shutterSpeed": "1/125s",
          "iso": "1600"
        }
      },
      {
        "id": "04",
        "url": "/images/02-monochrome-studies/mo-04.webp",
        "title": "Solitary Crow",
        "caption": "A bird perched on a white metal railing by the sea.",
        "aspectRatio": "portrait",
        "location": "Okinawa Coast, Japan",
        "date": "December 2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F2.8 ZA",
          "focalLength": "35mm",
          "aperture": "f/2.8",
          "shutterSpeed": "1/4000s",
          "iso": "125"
        }
      },
      {
        "id": "05",
        "url": "/images/02-monochrome-studies/mo-05.webp",
        "title": "Sea Structure",
        "caption": "An old concrete platform standing in the waves.",
        "aspectRatio": "portrait",
        "location": "Okinawa, Japan",
        "date": "October 2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F2.8 ZA",
          "focalLength": "35mm",
          "aperture": "f/2.8",
          "shutterSpeed": "1/1600s",
          "iso": "160"
        }
      }
    ]
  },
  {
    "id": "expressions",
    "title": "Expressions",
    "subtitle": "Character Studies",
    "category": "Portrait",
    "year": "2026",
    "location": "Tokyo, Japan",
    "coordinates": "35.6762° N, 139.6503° E",
    "coverImage": "/images/03-expressions/ex-01.webp",
    "description": "A collection of intimate portraits exploring facial expressions, textures of clothing, and raw human emotion.",
    "colorTheme": {
      "bg": "bg-sky-50/50",
      "text": "text-sky-950",
      "accent": "border-sky-300"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/03-expressions/ex-02.webp",
        "title": "Neutrality",
        "caption": "A clean studio portrait in dark draped clothing.",
        "aspectRatio": "portrait",
        "location": "Tokyo, Japan",
        "date": "January 2026",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "65mm F2 DG DN | Contemporary 020",
          "focalLength": "65mm",
          "aperture": "f/2",
          "shutterSpeed": "1/250s",
          "iso": "1000"
        }
      },
      {
        "id": "03",
        "url": "/images/03-expressions/ex-03.webp",
        "title": "Details",
        "caption": "A close-up of hands holding a metal carabiner.",
        "aspectRatio": "landscape",
        "location": "Tokyo, Japan",
        "date": "February 2026",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F2.8 ZA",
          "focalLength": "35mm",
          "aperture": "f/2.8",
          "shutterSpeed": "1/250s",
          "iso": "1000"
        }
      },
      {
        "id": "04",
        "url": "/images/03-expressions/ex-04.webp",
        "title": "Spiral Steps",
        "caption": "Sitting on a concrete spiral staircase looking upward.",
        "aspectRatio": "portrait",
        "location": "Tokyo, Japan",
        "date": "March 2026",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F2.8 ZA",
          "focalLength": "35mm",
          "aperture": "f/2.8",
          "shutterSpeed": "1/100s",
          "iso": "200"
        }
      },
      {
        "id": "05",
        "url": "/images/03-expressions/ex-05.webp",
        "title": "Raw Emotion",
        "caption": "An expressive, close-up snapshot showing raw feeling.",
        "aspectRatio": "landscape",
        "location": "Tokyo, Japan",
        "date": "March 2026",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F2.8 ZA",
          "focalLength": "35mm",
          "aperture": "f/2.8",
          "shutterSpeed": "1/500s",
          "iso": "100"
        }
      }
    ]
  },
  {
    "id": "urban-connection",
    "title": "Urban Connection",
    "subtitle": "Interactions & Portraits",
    "category": "Portrait",
    "year": "2026",
    "location": "Tokyo, Japan",
    "coordinates": "35.6762° N, 139.6503° E",
    "coverImage": "/images/04-urban-connection/ur-01.webp",
    "description": "Capturing candid moments of companionship, laughter, and reflection in urban public parks and streets.",
    "colorTheme": {
      "bg": "bg-amber-50/30",
      "text": "text-amber-950",
      "accent": "border-amber-300/60"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/04-urban-connection/ur-02.webp",
        "title": "The Bench",
        "caption": "Sitting together in a quiet city garden surrounded by green leaves.",
        "aspectRatio": "landscape",
        "location": "Tokyo, Japan",
        "date": "July 2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F2.8 ZA",
          "focalLength": "35mm",
          "aperture": "f/2.8",
          "shutterSpeed": "1/250s",
          "iso": "1600"
        }
      },
      {
        "id": "03",
        "url": "/images/04-urban-connection/ur-03.webp",
        "title": "A Moment",
        "caption": "A candid close-up of a shared, playful kiss.",
        "aspectRatio": "landscape",
        "location": "Tokyo, Japan",
        "date": "August 2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F2.8 ZA",
          "focalLength": "35mm",
          "aperture": "f/2.8",
          "shutterSpeed": "1/250s",
          "iso": "1250"
        }
      },
      {
        "id": "04",
        "url": "/images/04-urban-connection/ur-04.webp",
        "title": "Looking Up",
        "caption": "Standing on the pathway with arms crossed under modern skyscrapers.",
        "aspectRatio": "portrait",
        "location": "Tokyo, Japan",
        "date": "May 2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F2.8 ZA",
          "focalLength": "35mm",
          "aperture": "f/5.6",
          "shutterSpeed": "1/250s",
          "iso": "500"
        }
      },
      {
        "id": "05",
        "url": "/images/04-urban-connection/ur-05.webp",
        "title": "Gaze",
        "caption": "A direct, close-up portrait with hands in motion.",
        "aspectRatio": "landscape",
        "location": "Tokyo, Japan",
        "date": "September 2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F2.8 ZA",
          "focalLength": "35mm",
          "aperture": "f/2.8",
          "shutterSpeed": "1/250s",
          "iso": "2500"
        }
      }
    ]
  },
  {
    "id": "winter-illusion",
    "title": "Winter & Illusion",
    "subtitle": "Creative Portraiture",
    "category": "Portrait",
    "year": "2025",
    "location": "Hokkaido, Japan",
    "coordinates": "43.0646° N, 141.3468° E",
    "coverImage": "/images/05-winter-illusion/wi-01.webp",
    "description": "An exploration of creative double-exposure portraiture and quiet, snowy scenes across northern Japan.",
    "colorTheme": {
      "bg": "bg-orange-50/40",
      "text": "text-amber-950",
      "accent": "border-orange-300"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/05-winter-illusion/wi-02.webp",
        "title": "Dot Wall",
        "caption": "A quiet portrait set against a pattern of red dots.",
        "aspectRatio": "portrait",
        "location": "Tokyo, Japan",
        "date": "July 2024",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "SMC Pentax 67 105mm f/2.4",
          "focalLength": "105mm",
          "aperture": "f/8.0",
          "shutterSpeed": "1/500s",
          "iso": "160"
        }
      },
      {
        "id": "03",
        "url": "/images/05-winter-illusion/wi-03.webp",
        "title": "Double Vision",
        "caption": "A creative double-exposure portrait showing two perspectives.",
        "aspectRatio": "portrait",
        "location": "Tokyo, Japan",
        "date": "June 2024",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "65mm F2 DG DN | Contemporary 020",
          "focalLength": "65mm",
          "aperture": "f/5.6",
          "shutterSpeed": "6s",
          "iso": "50"
        }
      },
      {
        "id": "04",
        "url": "/images/05-winter-illusion/wi-04.webp",
        "title": "Winter Silence",
        "caption": "Leaning against a bare tree trunk in a white snowy field.",
        "aspectRatio": "portrait",
        "location": "Biei, Japan",
        "date": "December 2024",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "SMC Pentax 67 105mm f/2.4",
          "focalLength": "105mm",
          "aperture": "f/5.6",
          "shutterSpeed": "1/125s",
          "iso": "160"
        }
      },
      {
        "id": "05",
        "url": "/images/05-winter-illusion/wi-05.webp",
        "title": "Cold Whisper",
        "caption": "A serene portrait surrounded by winter frost.",
        "aspectRatio": "portrait",
        "location": "Hokkaido, Japan",
        "date": "December 2024",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F1.4 GM",
          "focalLength": "35mm",
          "aperture": "f/1.4",
          "shutterSpeed": "1/125s",
          "iso": "100"
        }
      },
      {
        "id": "06",
        "url": "/images/05-winter-illusion/wi-06.webp",
        "title": "Cigarette & Cold",
        "caption": "A close-up portrait in the snow with a bandaged hand.",
        "aspectRatio": "portrait",
        "location": "Biei, Japan",
        "date": "December 2024",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "SMC Pentax 67 75mm f/2.8",
          "focalLength": "75mm",
          "aperture": "f/4.0",
          "shutterSpeed": "1/60s",
          "iso": "800"
        }
      },
      {
        "id": "07",
        "url": "/images/05-winter-illusion/wi-07.webp",
        "title": "Snow Drift",
        "caption": "Lying down flat on a vast, snow-covered hill.",
        "aspectRatio": "portrait",
        "location": "Asahikawa, Japan",
        "date": "December 2024",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "SMC Pentax 67 105mm f/2.4",
          "focalLength": "105mm",
          "aperture": "f/11.0",
          "shutterSpeed": "1/1000s",
          "iso": "160"
        }
      },
      {
        "id": "08",
        "url": "/images/05-winter-illusion/wi-08.webp",
        "title": "Frost Mirror",
        "caption": "Reflections of light and ice on a winter profile.",
        "aspectRatio": "portrait",
        "location": "Hokkaido, Japan",
        "date": "December 2024",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F1.4 GM",
          "focalLength": "35mm",
          "aperture": "f/1.4",
          "shutterSpeed": "1/125s",
          "iso": "100"
        }
      },
      {
        "id": "09",
        "url": "/images/05-winter-illusion/wi-09.webp",
        "title": "Snowy Illusion",
        "caption": "Double-exposure silhouette blending with the falling snow.",
        "aspectRatio": "portrait",
        "location": "Hokkaido, Japan",
        "date": "December 2024",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F1.4 GM",
          "focalLength": "35mm",
          "aperture": "f/1.4",
          "shutterSpeed": "1/125s",
          "iso": "100"
        }
      }
    ]
  },
  {
    "id": "northern-fragments",
    "title": "Northern Fragments",
    "subtitle": "Hokkaido Vignettes",
    "category": "Street",
    "year": "2025",
    "location": "Hokkaido, Japan",
    "coordinates": "43.0646° N, 141.3468° E",
    "coverImage": "/images/06-northern-fragments/no-01.webp",
    "description": "A documentary collection capturing the quiet corners and fleeting encounters of Hokkaido. From a blue cafe truck overlooking the ocean and weathered seaside homes to unexpected street installations and the dust-kicking energy of northern horse racing, these frames document the rustic poetry of Japan's northernmost island.",
    "colorTheme": {
      "bg": "bg-stone-100",
      "text": "text-stone-900",
      "accent": "border-stone-400"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/06-northern-fragments/no-02.webp",
        "title": "Seaside Respite",
        "caption": "A blue-grey house perched at the water's edge with a lone subcompact car, Hokkaido coast.",
        "aspectRatio": "landscape",
        "location": "Hokkaido, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "Elmarit-M 28mm f/2.8 ASPH",
          "focalLength": "28mm",
          "aperture": "f/8.0",
          "shutterSpeed": "1/500s",
          "iso": "100"
        }
      },
      {
        "id": "03",
        "url": "/images/06-northern-fragments/no-03.webp",
        "title": "Weathered Frame",
        "caption": "A collapsed wooden shack slowly returning to the earth, contrasting with modern housing behind it.",
        "aspectRatio": "landscape",
        "location": "Hokkaido, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "Summilux-M 35mm f/1.4 ASPH",
          "focalLength": "35mm",
          "aperture": "f/5.6",
          "shutterSpeed": "1/250s",
          "iso": "64"
        }
      },
      {
        "id": "04",
        "url": "/images/06-northern-fragments/no-04.webp",
        "title": "Sun Mall Companion",
        "caption": "A giant plush bear sits quietly at an outdoor table in a snowy shopping arcade, Otaru.",
        "aspectRatio": "landscape",
        "location": "Otaru, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "Apo-Summicron-M 50mm f/2 ASPH",
          "focalLength": "50mm",
          "aperture": "f/11.0",
          "shutterSpeed": "1/125s",
          "iso": "64"
        }
      },
      {
        "id": "05",
        "url": "/images/06-northern-fragments/no-05.webp",
        "title": "The Dirt Track",
        "caption": "Horses kick up dust under the pale northern sun during a local race.",
        "aspectRatio": "landscape",
        "location": "Hokkaido, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "65mm F2 DG DN | Contemporary 020",
          "focalLength": "65mm",
          "aperture": "f/5.6",
          "shutterSpeed": "1/1600s",
          "iso": "100"
        }
      },
      {
        "id": "06",
        "url": "/images/06-northern-fragments/no-06.webp",
        "title": "Silent Coast",
        "caption": "A weathered breakwater extending into the misty grey sea under a pale sky.",
        "aspectRatio": "landscape",
        "location": "Hokkaido, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F1.4 GM",
          "focalLength": "35mm",
          "aperture": "f/1.4",
          "shutterSpeed": "1/125s",
          "iso": "100"
        }
      }
    ]
  },
  {
    "id": "tracks-and-tides",
    "title": "Tracks and Tides",
    "subtitle": "Regional Japan Diaries",
    "category": "Street",
    "year": "2025",
    "location": "Choshi, Japan",
    "coordinates": "35.7347° N, 140.8268° E",
    "coverImage": "/images/07-tracks-and-tides/tr-01.webp",
    "description": "A photographic diary tracking the quiet rhythms of Japan's local railways, coastal edges, and regional landmarks. From the solitary guard at a country station to the crashing tides of the Pacific, these frames capture the nostalgic transit of everyday life in the provinces.",
    "colorTheme": {
      "bg": "bg-slate-950",
      "text": "text-slate-100",
      "accent": "border-amber-500/50"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/07-tracks-and-tides/tr-02.webp",
        "title": "Tokawa Dispatch",
        "caption": "A station guard holding flag batons waits at a quiet local station on the Choshi line.",
        "aspectRatio": "landscape",
        "location": "Choshi, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F2.8 ZA",
          "focalLength": "35mm",
          "aperture": "f/4.5",
          "shutterSpeed": "1/200s",
          "iso": "100"
        }
      },
      {
        "id": "03",
        "url": "/images/07-tracks-and-tides/tr-03.webp",
        "title": "Parasol by the Shore",
        "caption": "A woman holds a parasol, looking out over the rocky coast as a girl walks nearby.",
        "aspectRatio": "landscape",
        "location": "Choshi, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F2.8 ZA",
          "focalLength": "35mm",
          "aperture": "f/2.8",
          "shutterSpeed": "1/1250s",
          "iso": "100"
        }
      },
      {
        "id": "04",
        "url": "/images/07-tracks-and-tides/tr-04.webp",
        "title": "Pacific Surge",
        "caption": "Waves crashing violently against the volcanic rocks under a bright blue sky.",
        "aspectRatio": "portrait",
        "location": "Choshi, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F2.8 ZA",
          "focalLength": "35mm",
          "aperture": "f/2.8",
          "shutterSpeed": "1/1600s",
          "iso": "100"
        }
      },
      {
        "id": "05",
        "url": "/images/07-tracks-and-tides/tr-05.webp",
        "title": "Iron Horse Consultation",
        "caption": "Railway workers discuss operations beside a classic orange DE10 diesel locomotive.",
        "aspectRatio": "portrait",
        "location": "Tochigi, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F2.8 ZA",
          "focalLength": "35mm",
          "aperture": "f/2.8",
          "shutterSpeed": "1/1000s",
          "iso": "100"
        }
      },
      {
        "id": "06",
        "url": "/images/07-tracks-and-tides/tr-06.webp",
        "title": "Evening Over the Fields",
        "caption": "A dramatic purple twilight sky stretching over solar panels and local houses.",
        "aspectRatio": "landscape",
        "location": "Chiba, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "E 28-200mm F2.8-5.6 A071",
          "focalLength": "28mm",
          "aperture": "f/2.8",
          "shutterSpeed": "1s",
          "iso": "1000"
        }
      },
      {
        "id": "07",
        "url": "/images/07-tracks-and-tides/tr-07.webp",
        "title": "Brick and Sky",
        "caption": "The white bell tower of a historic red-brick church rising toward passing clouds.",
        "aspectRatio": "portrait",
        "location": "Otaru, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "65mm F2 DG DN | Contemporary 020",
          "focalLength": "65mm",
          "aperture": "f/5.6",
          "shutterSpeed": "1/320s",
          "iso": "50"
        }
      }
    ]
  },
  {
    "id": "diptych-of-her",
    "title": "Diptych of Her",
    "subtitle": "Two Moments",
    "category": "Portrait",
    "year": "2025",
    "location": "Tokyo, Japan",
    "coordinates": "35.6762° N, 139.6503° E",
    "coverImage": "/images/08-diptych-of-her/di-01.webp",
    "description": "A diptych capturing two contrasting moments of a young woman in a striped dress. The first frame presents her in a quiet, sunlit traditional garden sitting on a red bench; the second frame is a candid flash portrait of her crouching on a street crosswalk at night. Together they form a dialogue between quiet tradition and spontaneous urban night.",
    "colorTheme": {
      "bg": "bg-neutral-950",
      "text": "text-neutral-100",
      "accent": "border-neutral-600"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/08-diptych-of-her/di-02.webp",
        "title": "Spontaneous Night",
        "caption": "A playful flash portrait of the subject crouching on a street crosswalk at night.",
        "aspectRatio": "portrait",
        "location": "Tokyo, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "E 17-70mm F2.8 B070",
          "focalLength": "43mm",
          "aperture": "f/2.8",
          "shutterSpeed": "1/125s",
          "iso": "2000"
        }
      }
    ]
  },
  {
    "id": "xiao-yuanhang",
    "title": "Xiao Yuanhang",
    "subtitle": "A Winter in Otaru",
    "category": "Portrait",
    "year": "2025",
    "location": "Otaru, Japan",
    "coordinates": "43.1907° N, 140.9947° E",
    "coverImage": "/images/09-xiao-yuanhang/xi-01.webp",
    "description": "An intimate portrait study of Xiao Yuanhang, captured across various locations and light conditions in Otaru. Through grainy black-and-white double exposures, neon-lit close-ups, and direct natural light, this series explores the quiet moods, intensity, and introspective character of a single subject.",
    "colorTheme": {
      "bg": "bg-amber-50/30",
      "text": "text-amber-950",
      "accent": "border-amber-300/60"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/09-xiao-yuanhang/xi-02.webp",
        "title": "Raincoat and Glass",
        "caption": "A high-contrast black-and-white profile of Xiao Yuanhang wearing a clear plastic jacket.",
        "aspectRatio": "portrait",
        "location": "Otaru, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "XCD 90mm f/2.5 V",
          "focalLength": "90mm",
          "aperture": "f/2.5",
          "shutterSpeed": "1/180s",
          "iso": "64"
        }
      },
      {
        "id": "03",
        "url": "/images/09-xiao-yuanhang/xi-03.webp",
        "title": "Warm Neon",
        "caption": "Warm streetlights illuminating the profile of the subject under the city lights.",
        "aspectRatio": "portrait",
        "location": "Otaru, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "65mm F2 DG DN | Contemporary 020",
          "focalLength": "65mm",
          "aperture": "f/2",
          "shutterSpeed": "1/200s",
          "iso": "1600"
        }
      },
      {
        "id": "04",
        "url": "/images/09-xiao-yuanhang/xi-04.webp",
        "title": "Concrete Shadow",
        "caption": "Golden hour sunlight raking across the face of the subject next to a weathered pillar.",
        "aspectRatio": "landscape",
        "location": "Otaru, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "XCD 55mm f/2.5 V",
          "focalLength": "55mm",
          "aperture": "f/4.0",
          "shutterSpeed": "1/60s",
          "iso": "200"
        }
      },
      {
        "id": "05",
        "url": "/images/09-xiao-yuanhang/xi-05.webp",
        "title": "Reflected Gaze",
        "caption": "A direct portrait of Xiao Yuanhang seen through a pane of glass with soft reflections.",
        "aspectRatio": "portrait",
        "location": "Otaru, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "65mm F2 DG DN | Contemporary 020",
          "focalLength": "65mm",
          "aperture": "f/2.8",
          "shutterSpeed": "1/250s",
          "iso": "1000"
        }
      },
      {
        "id": "06",
        "url": "/images/09-xiao-yuanhang/xi-06.webp",
        "title": "The Diner",
        "caption": "An intense, candid look from the subject holding a spoon at a local eatery.",
        "aspectRatio": "portrait",
        "location": "Otaru, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "65mm F2 DG DN | Contemporary 020",
          "focalLength": "65mm",
          "aperture": "f/2",
          "shutterSpeed": "1/250s",
          "iso": "6400"
        }
      },
      {
        "id": "07",
        "url": "/images/09-xiao-yuanhang/xi-07.webp",
        "title": "Clasped Hands",
        "caption": "A formal black-and-white portrait capturing the subject's quiet posture and clasped hands.",
        "aspectRatio": "portrait",
        "location": "Otaru, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "XCD 90mm f/2.5 V",
          "focalLength": "90mm",
          "aperture": "f/5.6",
          "shutterSpeed": "1/30s",
          "iso": "200"
        }
      },
      {
        "id": "08",
        "url": "/images/09-xiao-yuanhang/xi-08.webp",
        "title": "Alleyway Encounter",
        "caption": "Xiao Yuanhang stands in a narrow snowy alleyway, looking over his shoulder.",
        "aspectRatio": "portrait",
        "location": "Otaru, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F1.4 GM",
          "focalLength": "35mm",
          "aperture": "f/1.4",
          "shutterSpeed": "1/125s",
          "iso": "100"
        }
      }
    ]
  },
  {
    "id": "okinawa-breeze",
    "title": "Okinawa Breeze",
    "subtitle": "Okinawa Street Journal",
    "category": "Street",
    "year": "2025",
    "location": "Okinawa, Japan",
    "coordinates": "26.2124° N, 127.6809° E",
    "coverImage": "/images/10-okinawa-breeze/ok-01.webp",
    "description": "A street-level study of Okinawa's unique cultural landscape, where local island life, tourist curiosity, and historical military presence coexist. These snapshots capture the quiet moments of rest, youthful play, and the distinct architecture of Japan's southern prefecture.",
    "colorTheme": {
      "bg": "bg-sky-50/50",
      "text": "text-sky-950",
      "accent": "border-sky-300"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/10-okinawa-breeze/ok-02.webp",
        "title": "The Conductor",
        "caption": "A boy wearing a paper Yui Rail monorail hat checks his phone while waiting on a platform.",
        "aspectRatio": "portrait",
        "location": "Okinawa, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 24-70mm f/2.8 GM II",
          "focalLength": "50mm",
          "aperture": "f/8.0",
          "shutterSpeed": "1/250s",
          "iso": "100"
        }
      },
      {
        "id": "03",
        "url": "/images/10-okinawa-breeze/ok-03.webp",
        "title": "Sightseers",
        "caption": "Tourists with luggage look up and take photos on a quiet street next to parked scooters.",
        "aspectRatio": "landscape",
        "location": "Okinawa, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 24-70mm f/2.8 GM II",
          "focalLength": "35mm",
          "aperture": "f/11.0",
          "shutterSpeed": "1/500s",
          "iso": "64"
        }
      },
      {
        "id": "04",
        "url": "/images/10-okinawa-breeze/ok-04.webp",
        "title": "Camp Lester Gate",
        "caption": "A guard stands at the entrance of Camp Lester, capturing the dual character of Okinawa's land.",
        "aspectRatio": "landscape",
        "location": "Chatan, Okinawa",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 70-200mm f/2.8 GM OSS II",
          "focalLength": "100mm",
          "aperture": "f/5.6",
          "shutterSpeed": "1/500s",
          "iso": "100"
        }
      }
    ]
  },
  {
    "id": "transient-states",
    "title": "Transient States",
    "subtitle": "Travels of the Soul",
    "category": "Street",
    "year": "2025",
    "location": "Tokyo, Japan",
    "coordinates": "35.6762° N, 139.6503° E",
    "coverImage": "/images/11-transient-states/tr11-01.webp",
    "description": "A visual journal tracing a young traveler’s journey across contrasting environments. From the vibrant tiled facades of Bangkok temples and the clear float of tropical seas to quiet domestic shadows, close details of touch, and the rushing light trails of Tokyo bridges at night, these frames explore the fluid states of youth and motion.",
    "colorTheme": {
      "bg": "bg-orange-50/40",
      "text": "text-amber-950",
      "accent": "border-orange-300"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/11-transient-states/tr11-02.webp",
        "title": "Temple Wall",
        "caption": "Standing in front of the ornate, colorful porcelain details of Wat Arun, Bangkok.",
        "aspectRatio": "portrait",
        "location": "Bangkok, Thailand",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 24-70mm f/2.8 GM II",
          "focalLength": "35mm",
          "aperture": "f/11.0",
          "shutterSpeed": "1/30s",
          "iso": "100"
        }
      },
      {
        "id": "03",
        "url": "/images/11-transient-states/tr11-03.webp",
        "title": "Weightless",
        "caption": "Floating peacefully in the shallow, clear turquoise sea of a tropical island.",
        "aspectRatio": "landscape",
        "location": "Koh Samui, Thailand",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 24-70mm f/2.8 GM II",
          "focalLength": "50mm",
          "aperture": "f/8.0",
          "shutterSpeed": "1/250s",
          "iso": "64"
        }
      },
      {
        "id": "04",
        "url": "/images/11-transient-states/tr11-04.webp",
        "title": "Sleeping Engine",
        "caption": "A motorcycle covered in plastic stands silently under neon lights in a Tokyo backstreet.",
        "aspectRatio": "landscape",
        "location": "Tokyo, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 16-35mm f/2.8 GM II",
          "focalLength": "16mm",
          "aperture": "f/11.0",
          "shutterSpeed": "1/500s",
          "iso": "64"
        }
      },
      {
        "id": "05",
        "url": "/images/11-transient-states/tr11-05.webp",
        "title": "The Grip",
        "caption": "An intimate close-up of a hand clutching a bag strap against the soft bokeh of city lights.",
        "aspectRatio": "landscape",
        "location": "Tokyo, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 70-200mm f/2.8 GM OSS II",
          "focalLength": "70mm",
          "aperture": "f/8.0",
          "shutterSpeed": "1/500s",
          "iso": "64"
        }
      },
      {
        "id": "06",
        "url": "/images/11-transient-states/tr11-06.webp",
        "title": "Light Streams",
        "caption": "Leaning on a bridge overlooking long-exposure light trails of traffic under the city night sky.",
        "aspectRatio": "landscape",
        "location": "Tokyo, Japan",
        "date": "2025",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "E 17-70mm F2.8 B070",
          "focalLength": "19mm",
          "aperture": "f/3.5",
          "shutterSpeed": "1/3s",
          "iso": "200"
        }
      }
    ]
  },
  {
    "id": "analog-hokkaido",
    "title": "Analog Hokkaido",
    "subtitle": "Grain and Grains",
    "category": "Landscape",
    "year": "2026",
    "location": "Hokkaido, Japan",
    "coordinates": "45.5230° N, 141.9366° E",
    "coverImage": "/images/12-analog-hokkaido/an-01.webp",
    "description": "Film photography capturing the northernmost points of Hokkaido, steaming ramen in Sapporo nights, and silent snowscapes of winter Otaru.",
    "colorTheme": {
      "bg": "bg-stone-50",
      "text": "text-stone-900",
      "accent": "border-stone-400"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/12-analog-hokkaido/an-02.webp",
        "title": "Sapporo Ramen Craft",
        "caption": "A steaming bowl of fresh ramen prepared in a cozy Sapporo eatery.",
        "aspectRatio": "landscape",
        "location": "Sapporo, Japan",
        "date": "February 2026",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F1.4 GM",
          "focalLength": "35mm",
          "aperture": "f/1.4",
          "shutterSpeed": "1/125s",
          "iso": "100"
        }
      },
      {
        "id": "03",
        "url": "/images/12-analog-hokkaido/an-03.webp",
        "title": "Otaru Snow Street",
        "caption": "Falling snow dusting the streets of Otaru during winter.",
        "aspectRatio": "landscape",
        "location": "Otaru, Japan",
        "date": "February 2026",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F1.4 GM",
          "focalLength": "35mm",
          "aperture": "f/1.4",
          "shutterSpeed": "1/125s",
          "iso": "100"
        }
      },
      {
        "id": "04",
        "url": "/images/12-analog-hokkaido/an-04.webp",
        "title": "Northern Transit Line",
        "caption": "Railway tracks extending into the vast white snowlands of northern Hokkaido.",
        "aspectRatio": "landscape",
        "location": "Wakkanai, Japan",
        "date": "February 2026",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F1.4 GM",
          "focalLength": "35mm",
          "aperture": "f/1.4",
          "shutterSpeed": "1/125s",
          "iso": "100"
        }
      },
      {
        "id": "05",
        "url": "/images/12-analog-hokkaido/an-05.webp",
        "title": "Winter Silence",
        "caption": "Quiet lamplight illuminating high snow walls in Otaru.",
        "aspectRatio": "landscape",
        "location": "Otaru, Japan",
        "date": "February 2026",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F1.4 GM",
          "focalLength": "35mm",
          "aperture": "f/1.4",
          "shutterSpeed": "1/125s",
          "iso": "100"
        }
      },
      {
        "id": "06",
        "url": "/images/12-analog-hokkaido/an-06.webp",
        "title": "Sapporo Night Steam",
        "caption": "Warm rising steam inside a late-night Sapporo ramen shop.",
        "aspectRatio": "landscape",
        "location": "Sapporo, Japan",
        "date": "February 2026",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F1.4 GM",
          "focalLength": "35mm",
          "aperture": "f/1.4",
          "shutterSpeed": "1/125s",
          "iso": "100"
        }
      },
      {
        "id": "07",
        "url": "/images/12-analog-hokkaido/an-07.webp",
        "title": "Northernmost Monument",
        "caption": "The landmark monument designating the northernmost point of Japan at Soya Cape.",
        "aspectRatio": "landscape",
        "location": "Soya Cape, Japan",
        "date": "February 2026",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F1.4 GM",
          "focalLength": "35mm",
          "aperture": "f/1.4",
          "shutterSpeed": "1/125s",
          "iso": "100"
        }
      }
    ]
  },
  {
    "id": "transient-geographies",
    "title": "Transient Geographies",
    "subtitle": "Asia Transit",
    "category": "Street",
    "year": "2026",
    "location": "Thailand, Chiba & Taiwan",
    "coordinates": "13.7563° N, 100.5018° E",
    "coverImage": "/images/13-transient-geographies/tr13-01.webp",
    "description": "A travelogue of street corners across Thailand, dynamic actions at Chiba racecourse, and nostalgic fabric door curtains in Taiwan.",
    "colorTheme": {
      "bg": "bg-zinc-100",
      "text": "text-zinc-900",
      "accent": "border-zinc-400"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/13-transient-geographies/tr13-02.webp",
        "title": "Bangkok Transit Colors",
        "caption": "Tangled power lines and colorful tuk-tuks in Bangkok's bustling center.",
        "aspectRatio": "landscape",
        "location": "Bangkok, Thailand",
        "date": "March 2026",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F1.4 GM",
          "focalLength": "35mm",
          "aperture": "f/1.4",
          "shutterSpeed": "1/125s",
          "iso": "100"
        }
      },
      {
        "id": "03",
        "url": "/images/13-transient-geographies/tr13-03.webp",
        "title": "Chiba Racecourse Track",
        "caption": "Wind and mud flying by the racing track at Chiba racecourse.",
        "aspectRatio": "portrait",
        "location": "Chiba, Japan",
        "date": "March 2026",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F1.4 GM",
          "focalLength": "35mm",
          "aperture": "f/1.4",
          "shutterSpeed": "1/125s",
          "iso": "100"
        }
      },
      {
        "id": "04",
        "url": "/images/13-transient-geographies/tr13-04.webp",
        "title": "Taiwan Curtain Textures",
        "caption": "Nostalgic blue fabric door curtains at a traditional shop doorway in Taiwan.",
        "aspectRatio": "landscape",
        "location": "Taipei, Taiwan",
        "date": "March 2026",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "FE 35mm F1.4 GM",
          "focalLength": "35mm",
          "aperture": "f/1.4",
          "shutterSpeed": "1/125s",
          "iso": "100"
        }
      },
      {
        "id": "05",
        "url": "/images/13-transient-geographies/tr13-05.webp",
        "title": "Taiwan Doorway Detail",
        "caption": "Battered walls and fabric curtains hanging over a door frame in a Taiwan alleyway.",
        "aspectRatio": "landscape",
        "location": "Jiufen, Taiwan",
        "date": "March 2026",
        "exif": {
          "camera": "ILCE-7CM2",
          "lens": "65mm F2 DG DN | Contemporary 020",
          "focalLength": "65mm",
          "aperture": "f/9",
          "shutterSpeed": "1/250s",
          "iso": "100"
        }
      }
    ]
  },
  {
    "id": "letters-in-morning-light",
    "title": "Letters in Morning Light",
    "subtitle": "Intimate Portraits",
    "category": "Portrait",
    "year": "2026",
    "location": "Japan",
    "coordinates": "35.6762° N, 139.6503° E",
    "coverImage": "/images/14-letters-in-morning-light/le-01.webp",
    "cardImage": "/images/14-letters-in-morning-light/le-07.webp",
    "coverTitle": "Letter by the Window",
    "coverCaption": "A quiet portrait by the window, capturing a private moment of thought and stillness.",
    "description": "A quiet portrait study shaped by window light, small domestic gestures, and the suspended feeling of early morning.",
    "colorTheme": {
      "bg": "bg-stone-50",
      "text": "text-stone-900",
      "accent": "border-stone-400"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/14-letters-in-morning-light/le-02.webp",
        "title": "White Rose",
        "caption": "A soft close-up portrait where the white rose adds a gentle, poetic mood.",
        "aspectRatio": "portrait",
        "location": "Japan",
        "date": "2026"
      },
      {
        "id": "03",
        "url": "/images/14-letters-in-morning-light/le-03.webp",
        "title": "Before Waking",
        "caption": "Morning light, an alarm clock, and a relaxed pose create a calm sense of early morning.",
        "aspectRatio": "landscape",
        "location": "Japan",
        "date": "2026"
      },
      {
        "id": "04",
        "url": "/images/14-letters-in-morning-light/le-04.webp",
        "title": "Warmth by the Window",
        "caption": "Holding a cup near the window, the image conveys a simple and peaceful daily moment.",
        "aspectRatio": "landscape",
        "location": "Japan",
        "date": "2026"
      },
      {
        "id": "05",
        "url": "/images/14-letters-in-morning-light/le-05.webp",
        "title": "Corner Light",
        "caption": "A seated figure in soft light, expressing quiet reflection and solitude.",
        "aspectRatio": "portrait",
        "location": "Japan",
        "date": "2026"
      },
      {
        "id": "06",
        "url": "/images/14-letters-in-morning-light/le-06.webp",
        "title": "Close Distance",
        "caption": "A low-angle portrait that highlights natural expression and subtle emotion.",
        "aspectRatio": "portrait",
        "location": "Japan",
        "date": "2026"
      },
      {
        "id": "07",
        "url": "/images/14-letters-in-morning-light/le-07.webp",
        "title": "Half Dreaming",
        "caption": "A close facial portrait with a blurred, dreamy atmosphere.",
        "aspectRatio": "landscape",
        "location": "Japan",
        "date": "2026"
      },
      {
        "id": "08",
        "url": "/images/14-letters-in-morning-light/le-08.webp",
        "title": "Light in the Eye",
        "caption": "An extreme close-up focusing on the eye, hair, and delicate emotional detail.",
        "aspectRatio": "portrait",
        "location": "Japan",
        "date": "2026"
      },
      {
        "id": "09",
        "url": "/images/14-letters-in-morning-light/le-09.webp",
        "title": "Between Breaths",
        "caption": "A detailed close-up emphasizing skin texture, lips, and soft natural light.",
        "aspectRatio": "portrait",
        "location": "Japan",
        "date": "2026"
      }
    ]
  },
  {
    "id": "whispers-in-silver-light",
    "title": "Whispers in Silver Light",
    "subtitle": "Intimate Portraits",
    "category": "Portrait",
    "year": "2026",
    "location": "Japan",
    "coordinates": "35.6762° N, 139.6503° E",
    "coverImage": "/images/15-whispers-in-silver-light/wh-01.webp",
    "cardImage": "/images/15-whispers-in-silver-light/wh-02.webp",
    "coverTitle": "The Quiet Reader",
    "coverCaption": "Seated in an antique chair, the figure holds a book in stillness, surrounded by the warm atmosphere of a private room.",
    "description": "A quiet portrait series shaped by soft light, delicate textures, and fleeting moments of reflection. The images explore solitude, elegance, and the gentle dialogue between the figure, flowers, and space.",
    "colorTheme": {
      "bg": "bg-neutral-100",
      "text": "text-neutral-900",
      "accent": "border-neutral-400"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/15-whispers-in-silver-light/wh-02.webp",
        "title": "Fallen Petals",
        "caption": "A tender moment of contemplation, captured through a lowered gaze and a single delicate petal held between the fingers.",
        "aspectRatio": "square",
        "location": "Japan",
        "date": "2026"
      },
      {
        "id": "03",
        "url": "/images/15-whispers-in-silver-light/wh-03.webp",
        "title": "Flower in the Light",
        "caption": "A floral shadow rests across the shoulder, blending the softness of the body with the poetry of natural light.",
        "aspectRatio": "portrait",
        "location": "Japan",
        "date": "2026"
      },
      {
        "id": "04",
        "url": "/images/15-whispers-in-silver-light/wh-04.webp",
        "title": "A Rose Behind Her",
        "caption": "Seen from behind, the figure becomes a quiet canvas for the shadow of a flower, suspended in warm afternoon light.",
        "aspectRatio": "portrait",
        "location": "Japan",
        "date": "2026"
      },
      {
        "id": "05",
        "url": "/images/15-whispers-in-silver-light/wh-05.webp",
        "title": "Touch of Bloom",
        "caption": "A close study of a flower, a hand, and a fleeting gesture, emphasizing texture, intimacy, and gentle curiosity.",
        "aspectRatio": "square",
        "location": "Japan",
        "date": "2026"
      },
      {
        "id": "06",
        "url": "/images/15-whispers-in-silver-light/wh-06.webp",
        "title": "Passing Through Light",
        "caption": "The flowing dress and luminous window create a dreamlike portrait of movement, grace, and quiet departure.",
        "aspectRatio": "portrait",
        "location": "Japan",
        "date": "2026"
      }
    ]
  },
  {
    "id": "skyline-frequency",
    "title": "Skyline Frequency",
    "subtitle": "Urban Portraits",
    "category": "Portrait",
    "year": "2026",
    "location": "Tokyo, Japan",
    "coordinates": "35.6762° N, 139.6503° E",
    "coverImage": "/images/16-skyline-frequency/sk-01.webp",
    "cardImage": "/images/16-skyline-frequency/sk-01.webp",
    "coverTitle": "Signal Within Reach",
    "coverCaption": "A flip phone and an outstretched hand create a direct connection between the subject, the camera, and the city.",
    "description": "A playful urban portrait series combining wide-angle perspective, retro technology, and bright daylight. The subject interacts with the lens while the surrounding skyscrapers amplify a sense of energy, freedom, and modern city life.",
    "colorTheme": {
      "bg": "bg-sky-50",
      "text": "text-slate-900",
      "accent": "border-sky-400"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/16-skyline-frequency/sk-02.webp",
        "title": "Pocket Perspective",
        "caption": "A compact camera and a playful gesture capture the spontaneous spirit of urban self-expression.",
        "aspectRatio": "portrait",
        "location": "Tokyo, Japan",
        "date": "2026"
      },
      {
        "id": "03",
        "url": "/images/16-skyline-frequency/sk-03.webp",
        "title": "City Sound",
        "caption": "Headphones become a symbol of personal rhythm in a dramatic low-angle portrait beneath the skyline.",
        "aspectRatio": "portrait",
        "location": "Tokyo, Japan",
        "date": "2026"
      },
      {
        "id": "04",
        "url": "/images/16-skyline-frequency/sk-04.webp",
        "title": "Touch the Sky",
        "caption": "A reaching hand, a bright expression, and towering buildings bring movement and youthful confidence into the frame.",
        "aspectRatio": "portrait",
        "location": "Tokyo, Japan",
        "date": "2026"
      },
      {
        "id": "05",
        "url": "/images/16-skyline-frequency/sk-05.webp",
        "title": "Breaking the Frame",
        "caption": "Both hands extend beyond the traditional portrait space, turning the photograph into an energetic interaction.",
        "aspectRatio": "portrait",
        "location": "Tokyo, Japan",
        "date": "2026"
      },
      {
        "id": "06",
        "url": "/images/16-skyline-frequency/sk-06.webp",
        "title": "Between the Towers",
        "caption": "A calm, confident pose balances the strong architectural lines and expansive blue sky.",
        "aspectRatio": "portrait",
        "location": "Tokyo, Japan",
        "date": "2026"
      }
    ]
  },
  {
    "id": "whispers-in-green",
    "title": "Whispers in Green",
    "subtitle": "Botanical Portraits",
    "category": "Portrait",
    "year": "2026",
    "location": "Japan",
    "coordinates": "35.6762° N, 139.6503° E",
    "coverImage": "/images/17-whispers-in-green/wh17-01.webp",
    "cardImage": "/images/17-whispers-in-green/wh17-01.webp",
    "coverTitle": "A Leaf of Light",
    "coverCaption": "An intimate portrait where a fragile leaf becomes a quiet detail of tenderness.",
    "description": "A quiet portrait series shaped by soft light, delicate foliage, and intimate expressions. Each image explores the gentle connection between the subject and nature.",
    "colorTheme": {
      "bg": "bg-emerald-50",
      "text": "text-emerald-950",
      "accent": "border-emerald-300"
    },
    "images": [
      {
        "id": "02",
        "url": "/images/17-whispers-in-green/wh17-02.webp",
        "title": "Among the Vines",
        "caption": "A soft portrait framed by hanging greenery, capturing a calm and attentive gaze.",
        "aspectRatio": "portrait",
        "location": "Japan",
        "date": "2026"
      },
      {
        "id": "03",
        "url": "/images/17-whispers-in-green/wh17-03.webp",
        "title": "Garden Reverie",
        "caption": "Surrounded by cascading leaves, the subject pauses in a peaceful, dreamlike moment.",
        "aspectRatio": "portrait",
        "location": "Japan",
        "date": "2026"
      },
      {
        "id": "04",
        "url": "/images/17-whispers-in-green/wh17-04.webp",
        "title": "Dappled Gaze",
        "caption": "Filtered sunlight and blurred foliage create a layered portrait filled with quiet intensity.",
        "aspectRatio": "portrait",
        "location": "Japan",
        "date": "2026"
      },
      {
        "id": "05",
        "url": "/images/17-whispers-in-green/wh17-05.webp",
        "title": "A Quiet Bloom",
        "caption": "A contemplative expression and a delicate vine convey stillness and gentle emotion.",
        "aspectRatio": "portrait",
        "location": "Japan",
        "date": "2026"
      },
      {
        "id": "06",
        "url": "/images/17-whispers-in-green/wh17-06.webp",
        "title": "Through the Green",
        "caption": "Soft foreground leaves frame a direct gaze, blending intimacy with natural serenity.",
        "aspectRatio": "portrait",
        "location": "Japan",
        "date": "2026"
      }
    ]
  }
];
