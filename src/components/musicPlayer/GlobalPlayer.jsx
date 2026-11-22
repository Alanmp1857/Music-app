import { useEffect, useState } from "react";
import { useMusicPlayer } from "../../contexts/MusicPlayerContext";
import {
  Box,
  IconButton,
  Slider,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function GlobalPlayer() {
  const {
    currentTrack,
    isPlaying,
    pauseTrack,
    resumeTrack,
    audioRef,
  } = useMusicPlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);

  // Update current time and duration
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleTimeUpdate = () => updateTime();
    const handleLoadedMetadata = () => {
      updateDuration();
      updateTime();
    };
    const handleEnded = () => {
      setCurrentTime(0);
      pauseTrack();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    // Set initial volume
    audio.volume = volume / 100;

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, currentTrack, pauseTrack, volume]);

  // Update volume when slider changes
  useEffect(() => {
    const audio = audioRef?.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted, audioRef]);

  if (!currentTrack) return null;

  // Handle both old format (string URL) and new format (object with metadata)
  const trackUrl =
    typeof currentTrack === "string" ? currentTrack : currentTrack.url;
  const trackName = typeof currentTrack === "string" ? null : currentTrack.name;
  const trackArtist =
    typeof currentTrack === "string" ? null : currentTrack.artist;
  const trackImage =
    typeof currentTrack === "string" ? null : currentTrack.image;

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (event, newValue) => {
    const audio = audioRef?.current;
    if (audio) {
      audio.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    setIsMuted(newValue === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Extract song name from URL (fallback)
  const getSongName = () => {
    if (trackName) return trackName;
    try {
      const urlParts = trackUrl.split("/");
      const fileName = urlParts[urlParts.length - 1];
      return fileName.split(".")[0] || "Unknown Song";
    } catch {
      return "Now Playing";
    }
  };

  const getArtistName = () => {
    return trackArtist || "Unknown Artist";
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#19272e",
        color: "white",
        zIndex: 1300,
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        padding: { xs: "8px", sm: "12px 16px" },
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
          maxWidth: "1400px",
          margin: "0 auto",
        }}>
        {/* Song Info */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            minWidth: { sm: "200px", md: "250px" },
            gap: 1.5,
          }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 1,
              backgroundColor: "#2a3a42",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              overflow: "hidden",
              backgroundImage: trackImage ? `url(${trackImage})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
            {!trackImage && (
              <Typography variant="h6" sx={{ color: "#64b5f6" }}>
                🎵
              </Typography>
            )}
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "white",
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
              {getSongName()}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
              {getArtistName()}
            </Typography>
          </Box>
        </Box>

        {/* Main Controls */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
            gap: 0.5,
          }}>
          {/* Playback Controls */}
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              size="small"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                "&:hover": {
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              disabled>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton
              onClick={isPlaying ? pauseTrack : resumeTrack}
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  transform: "scale(1.05)",
                },
                transition: "all 0.2s",
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
              }}>
              {isPlaying ? (
                <PauseIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
              ) : (
                <PlayArrowIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
              )}
            </IconButton>
            <IconButton
              size="small"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                "&:hover": {
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              disabled>
              <SkipNextIcon />
            </IconButton>
          </Stack>

          {/* Progress Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",
              maxWidth: { xs: "100%", sm: "600px" },
            }}>
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                minWidth: "40px",
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
              }}>
              {formatTime(currentTime)}
            </Typography>
            <Slider
              value={currentTime}
              max={duration || 100}
              onChange={handleSeek}
              sx={{
                color: "#64b5f6",
                height: 4,
                "& .MuiSlider-thumb": {
                  width: 12,
                  height: 12,
                  "&:hover": {
                    boxShadow: "0 0 0 8px rgba(100, 181, 246, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  height: 4,
                },
                "& .MuiSlider-rail": {
                  height: 4,
                  opacity: 0.3,
                },
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                minWidth: "40px",
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
              }}>
              {formatTime(duration)}
            </Typography>
          </Box>
        </Box>

        {/* Volume Control */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 1,
            minWidth: "120px",
            justifyContent: "flex-end",
          }}>
          <IconButton
            onClick={toggleMute}
            size="small"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}>
            {isMuted || volume === 0 ? (
              <VolumeOffIcon fontSize="small" />
            ) : (
              <VolumeUpIcon fontSize="small" />
            )}
          </IconButton>
          <Slider
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            sx={{
              color: "#64b5f6",
              width: "80px",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 10,
                height: 10,
              },
              "& .MuiSlider-track": {
                height: 4,
              },
              "& .MuiSlider-rail": {
                height: 4,
                opacity: 0.3,
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}
