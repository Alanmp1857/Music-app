import React, { useEffect, useRef, useState } from "react";
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

const ShowAlbumList = () => {
  // Get the album ID from the route parameters
  const { id } = useParams();

  // State for storing search results
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Reference for the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // State to track whether a song is currently playing
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPlaying, setIsPlaying] = useState(false);

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
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        // Play the audio
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Error starting playback:", error);
            });
        }
      } else {
        // Pause the audio
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Add event listener to update play/pause icon when audio starts playing
  useEffect(() => {
    if (audioRef.current) {
      const handlePlaying = () => {
        setIsPlaying(true);
      };

      audioRef.current.addEventListener("playing", handlePlaying);

      return () => {
        // Clean up the event listener when the component unmounts
        // eslint-disable-next-line react-hooks/exhaustive-deps
        audioRef.current?.removeEventListener("playing", handlePlaying);
      };
    }
  }, []);

  return (
    <div style={{ marginLeft: "300px", marginTop: "100px" }}>
      <h1>Song List</h1>
      <Grid
        container
        spacing={{ xs: 2, sm: 2, md: 2 }}
        columns={{ xs: 4, sm: 3, md: 5 }}>
        {searchResults.map((song) => (
          <Grid item xs={1} sm={1} md={1} key={song.id}>
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
                <IconButton aria-label="play/pause" onClick={handlePlayPause}>
                  {/* <PlayArrowIcon sx={{ height: 38, width: 38 }} /> */}
                  {audioRef.current && !audioRef.current.paused ? (
                    <PauseIcon sx={{ height: 38, width: 38 }} />
                  ) : (
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  )}
                </IconButton>

                {/* Audio element */}
                <audio ref={audioRef}>
                  <source src={song.downloadUrl[4].url} type="audio/mp4" />
                </audio>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ShowAlbumList;
