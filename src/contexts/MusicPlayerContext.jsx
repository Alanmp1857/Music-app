import { createContext, useContext, useRef, useState } from "react";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (trackData) => {
    // Support both old format (just URL string) and new format (object with metadata)
    const trackUrl = typeof trackData === "string" ? trackData : trackData.url;
    const trackInfo =
      typeof trackData === "string"
        ? { url: trackData, name: null, artist: null, image: null }
        : trackData;

    if (audioRef.current.src !== trackUrl) {
      audioRef.current.src = trackUrl;
    }

    audioRef.current.play();
    setCurrentTrack(trackInfo);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const resumeTrack = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        pauseTrack,
        resumeTrack,
        audioRef,
      }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
