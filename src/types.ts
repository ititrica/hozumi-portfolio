/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExifData {
  camera: string;
  lens: string;
  focalLength: string;
  aperture: string;
  shutterSpeed: string;
  iso: string;
}

export interface Photo {
  id: string;
  url: string;
  title: string;
  caption: string;
  aspectRatio: "portrait" | "landscape" | "square";
  exif?: ExifData;
  location?: string;
  date?: string;
}

export interface PhotographySeries {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  year: string;
  location: string;
  coordinates: string;
  coverImage: string;
  cardImage?: string;
  coverTitle?: string;
  coverCaption?: string;
  images: Photo[];
  colorTheme: {
    bg: string;
    text: string;
    accent: string;
  };
}

export type ViewState = "home" | "about" | "series" | "playground";
