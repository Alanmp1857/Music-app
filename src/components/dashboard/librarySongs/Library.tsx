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

const Library = () => {
  const [favouriteList, setFavouriteList] = useState([]);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  const [isPlayingMap, setIsPlayingMap] = useState<{ [key: number]: boolean }>(
    {}
  );

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
  }, [favouriteList]);

  const handlePlayPause = (downloadUrl: string, songId: number) => {
    if (audioRef) {
      if (audioRef.src === downloadUrl) {
        // Pause if the same song is playing
        audioRef.pause();
        setIsPlayingMap((prevMap) => ({ ...prevMap, [songId]: false }));
      } else {
        // Change the song if a different one is playing
        audioRef.src = downloadUrl;
        audioRef.play();
        setIsPlayingMap((prevMap) => ({ ...prevMap, [songId]: true }));
      }
    }
  };

  return (
    <div style={{ margin: "100px 10px 20px 300px" }}>
      <h1>Favourite Songs</h1>
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
                background:
                  "linear-gradient(to top, #f0f0f0, #d3d3d3, #808080, #4d4d4d, #000000)",
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
                  onClick={() => handlePlayPause(song.downloadUrl, song.id)}>
                  {isPlayingMap[song.id] ? (
                    <PauseIcon sx={{ height: 38, width: 38 }} />
                  ) : (
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  )}
                </IconButton>

                <DeleteIcon
                  sx={{ color: "red" }}
                  onClick={() => removeFavSong(song.id)}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
        {/* Audio element */}
        <audio ref={(ref) => setAudioRef(ref)} />
      </Grid>
    </div>
  );
};

export default Library;
