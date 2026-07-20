const R2_MEDIA_PREFIX = "/media";

export function getMediaUrl(path: string) {
  if (!import.meta.env.PROD) return path;
  if (path.startsWith("/images/") || path.startsWith("/audio/")) {
    return R2_MEDIA_PREFIX + path;
  }
  return path;
}
