const BUTTON_SOUND_URL = "/ui-button-click.mp3";

export function playButtonFeedback() {
  if (typeof window === "undefined") return;

  // Disable button feedback sound on mobile and touch devices
  const isMobile = window.innerWidth < 768 || 
                   ("ontouchstart" in window) || 
                   (navigator.maxTouchPoints > 0);
  if (isMobile) return;

  const sound = new Audio(BUTTON_SOUND_URL);
  sound.volume = 0.32;
  void sound.play().catch(() => undefined);
}
