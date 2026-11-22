import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { albumURL } from "../../../../services/browseApi";
import { useParams } from "react-router";
import { useMusicPlayer } from "../../../../contexts/MusicPlayerContext";

const ShowAlbumList = () => {
  // Get the album ID from the route parameters
  const { id } = useParams();
  const { playTrack, pauseTrack, currentTrack, isPlaying } = useMusicPlayer();

  // State for storing search results
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Fetch data when the component mounts or when the album ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`${albumURL}?id=${id}`);
        const response = await data.json();
        console.log(response);
        const results = response.data.songs;
        // Extract relevant information from API response
        console.log(results);

        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Function to handle play/pause button click
  const handlePlayPause = (song: any) => {
    const downloadUrl = song.downloadUrl[4]?.url || "";
    const currentTrackUrl = typeof currentTrack === "string" ? currentTrack : currentTrack?.url;
    
    if (currentTrackUrl === downloadUrl && isPlaying) {
      pauseTrack();
    } else {
      playTrack({
        url: downloadUrl,
        name: song.name,
        artist: song.primaryArtists?.join(", ") || "Unknown Artist",
        image: song.image[2]?.url || null,
      });
    }
  };

  return (
    <div className="content-page detail-page">
      <header className="section-heading">
        <p className="section-eyebrow">Now playing</p>
        <h1>Song List</h1>
      </header>
      <Grid
        container
        spacing={{ xs: 2, sm: 2, md: 2 }}
        columns={{ xs: 1, sm: 2, md: 3, lg: 5 }}>
        {searchResults.map((song) => (
          <Grid item xs={1} sm={1} md={1} key={song.id}>
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
                image={song.image[2].url}
                alt={`Song cover for ${song.name}`}
              />
              <CardContent>
                {/* Song name */}
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  title={song.name}>
                  {/* Truncate long names and add ellipsis */}
                  {song.name.length > 10
                    ? song.name.substring(0, 10) + "..."
                    : song.name}
                </Typography>
              </CardContent>

              <CardActions
                sx={{
                  marginTop: "-40px",
                  display: "flex",
                  justifyContent: "center",
                }}>
                {/* Play controls */}
                <IconButton aria-label="play/pause" onClick={() => handlePlayPause(song)}>
                  {(() => {
                    const downloadUrl = song.downloadUrl[4]?.url || "";
                    const currentTrackUrl = typeof currentTrack === "string" ? currentTrack : currentTrack?.url;
                    const isCurrentSong = currentTrackUrl === downloadUrl && isPlaying;
                    return isCurrentSong ? (
                      <PauseIcon sx={{ height: 38, width: 38, color: "gray" }} />
                    ) : (
                      <PlayArrowIcon
                        sx={{ height: 38, width: 38, color: "gray" }}
                      />
                    );
                  })()}
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ShowAlbumList;
