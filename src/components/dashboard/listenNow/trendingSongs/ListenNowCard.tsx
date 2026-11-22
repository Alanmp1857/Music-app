import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { CardActions } from "@mui/material";
import { useMusicPlayer } from "../../../../contexts/MusicPlayerContext";

interface ListenNowCardProps {
  image: string;
  name: string;
  singer: string;
  downloadUrl: string;
}

const ListenNowCard: React.FC<ListenNowCardProps> = ({
  image,
  name,
  singer,
  downloadUrl,
}) => {
  const { playTrack, pauseTrack, currentTrack, isPlaying } = useMusicPlayer();

  // Handler for play/pause button click
  const handlePlayPause = () => {
    const currentTrackUrl = typeof currentTrack === "string" ? currentTrack : currentTrack?.url;
    
    if (currentTrackUrl === downloadUrl && isPlaying) {
      pauseTrack();
    } else {
      playTrack({
        url: downloadUrl,
        name: name,
        artist: singer || "Unknown Artist",
        image: image || null,
      });
    }
  };

  const isCurrentSong = (() => {
    const currentTrackUrl = typeof currentTrack === "string" ? currentTrack : currentTrack?.url;
    return currentTrackUrl === downloadUrl && isPlaying;
  })();

  return (
    <Card
      sx={{
        maxWidth: 200,
        margin: "10px",
        backgroundColor: "#19272e",
        color: "white",
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
          {!isCurrentSong ? (
            <PlayArrowIcon
              sx={{
                height: 38,
                width: 38,
                color: "gray",
              }}
            />
          ) : (
            <PauseIcon sx={{ height: 38, width: 38, color: "gray" }} />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ListenNowCard;
