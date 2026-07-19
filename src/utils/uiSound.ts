const BUTTON_SOUND_URL = "/ui-button-click.mp3";

export function playButtonFeedback() {
  if (typeof window === "undefined") return;

  const sound = new Audio(BUTTON_SOUND_URL);
  sound.volume = 0.32;
  void sound.play().catch(() => undefined);
}
