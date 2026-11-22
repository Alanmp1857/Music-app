import React, { useEffect, useState } from "react";
import { getFavSong, removeFavSong } from "../../../services/favoriteSongs";
import {
  Typography,
  CardMedia,
  IconButton,
  CardActions,
  Card,
  Grid,
  CardContent,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import PauseIcon from "@mui/icons-material/Pause";
import { useMusicPlayer } from "../../../contexts/MusicPlayerContext";

const Library = () => {
  const [favouriteList, setFavouriteList] = useState([]);
  const { playTrack, pauseTrack, currentTrack, isPlaying } = useMusicPlayer();

  useEffect(() => {
    const fetchFavouriteSongs = async () => {
      try {
        const res = await getFavSong();
        setFavouriteList(res.data);
      } catch (error) {
        console.error("Error fetching favorite songs:", error);
      }
    };
    fetchFavouriteSongs();
  }, []);

  const handlePlayPause = (song: any) => {
    const downloadUrl = song.downloadUrl;
    const currentTrackUrl = typeof currentTrack === "string" ? currentTrack : currentTrack?.url;
    
    if (currentTrackUrl === downloadUrl && isPlaying) {
      pauseTrack();
    } else {
      playTrack({
        url: downloadUrl,
        name: song.name,
        artist: "Unknown Artist",
        image: song.image || null,
      });
    }
  };

  return (
    <div style={{ margin: "100px 10px 20px 100px" }}>
      <h1 style={{ color: "white" }}>Favourite Songs</h1>
      <Grid
        container
        spacing={{ xs: 2, sm: 2, md: 2 }}
        columns={{ xs: 4, sm: 3, md: 5 }}>
        {favouriteList.map((song: any) => (
          <Grid item xs={1} sm={1} md={1} key={song.id}>
            <Card
              sx={{
                maxWidth: 200,
                margin: "10px",
                backgroundColor: "#19272e",
                color: "white",
              }}>
              <CardMedia
                component="img"
                sx={{ width: 200, height: "100%" }}
                image={song.image}
                alt={`Song cover for ${song.name}`}
              />

              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  title={song.name}>
                  {song.name.length > 10
                    ? song.name.substring(0, 10) + "..."
                    : song.name}
                </Typography>
              </CardContent>

              <CardActions
                sx={{
                  marginTop: "-30px",
                  display: "flex",
                  justifyContent: "center",
                }}>
                <IconButton
                  aria-label="play/pause"
                  onClick={() => handlePlayPause(song)}>
                  {(() => {
                    const currentTrackUrl = typeof currentTrack === "string" ? currentTrack : currentTrack?.url;
                    const isCurrentSong = currentTrackUrl === song.downloadUrl && isPlaying;
                    return isCurrentSong ? (
                      <PauseIcon sx={{ height: 38, width: 38, color: "gray" }} />
                    ) : (
                      <PlayArrowIcon
                        sx={{ height: 38, width: 38, color: "gray" }}
                      />
                    );
                  })()}
                </IconButton>

                <DeleteIcon
                  sx={{ color: "red" }}
                  onClick={() => removeFavSong(song.id)}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Library;
