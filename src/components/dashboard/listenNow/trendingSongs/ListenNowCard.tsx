import React, { useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { CardActions } from "@mui/material";

interface ListenNowCardProps {
  image: string;
  name: string;
  singer: string;
  downloadUrl: string;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

const ListenNowCard: React.FC<ListenNowCardProps> = ({
  image,
  name,
  singer,
  downloadUrl,
  isPlaying,
  onPlay,
  onPause,
}) => {
  // Ref to the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handler for play/pause button click
  const handlePlayPause = () => {
    if (audioRef.current) {
      // If audio is playing, pause it; otherwise, play it
      isPlaying ? audioRef.current.pause() : audioRef.current.play();

      // Trigger onPlay or onPause callback
      isPlaying ? onPause() : onPlay();
    }
  };

  // Handler for the end of audio playback
  const handleEnded = () => {
    onPause(); // Triggered when audio playback ends
  };

  return (
    <Card
      sx={{
        maxWidth: 200,
        margin: "10px",
        background:
          "linear-gradient(to top, #f0f0f0, #d3d3d3, #808080, #4d4d4d, #000000)",
      }}>
      {/* Song image */}
      <CardMedia
        component="img"
        sx={{ width: 200, height: "100%" }}
        image={image}
        alt={`Song cover for ${name}`}
      />
      <CardContent>
        {/* Song/album name */}
        <Typography gutterBottom variant="h5" component="div" title={name}>
          {name.length > 10 ? name.substring(0, 10) + "..." : name}
        </Typography>

        {/* Artist details */}
        {singer && singer.length > 0 && (
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ fontSize: "15px" }}
            title={singer}>
            {singer.length > 12 ? singer.substring(0, 12) + "..." : singer}
          </Typography>
        )}
      </CardContent>

      <CardActions
        sx={{
          marginTop: "-30px",
          display: "flex",
          justifyContent: "center",
        }}>
        {/* Play/pause controls */}
        <IconButton aria-label="play/pause" onClick={handlePlayPause}>
          {!isPlaying ? (
            <PlayArrowIcon
              sx={{
                height: 38,
                width: 38,
              }}
            />
          ) : (
            <PauseIcon sx={{ height: 38, width: 38 }} />
          )}
        </IconButton>

        {/* Audio element */}
        <audio ref={audioRef} onEnded={handleEnded}>
          <source src={downloadUrl} type="audio/mp4" />
        </audio>
      </CardActions>
    </Card>
  );
};

export default ListenNowCard;
