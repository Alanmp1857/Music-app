export const pauseAllAudio = (except?: HTMLAudioElement | null) => {
  document.querySelectorAll("audio").forEach((audio) => {
    if (audio !== except) {
      audio.pause();
    }
  });
};

