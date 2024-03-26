import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
import { playlistURL } from "../../../../services/browseApi";

interface Image {
  url: string;
}

interface DownloadUrl {
  url: string;
}

// Interface for the song data
interface Song {
  id: string;
  name: string;
  year: number;
  duration: number;
  primaryArtists: string[];
  language: string;
  image: Image[];
  downloadUrl: DownloadUrl[];
  album: string;
}

const ShowTrendingList: React.FC = () => {
  // Get the playlist ID from the route parameters
  const { id } = useParams();

  // State for storing search results
  const [searchResults, setSearchResults] = useState<Song[]>([]);

  // State to track the ID of the currently playing song
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);

  // Reference for the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to play a song
  const playSong = (songId: string) => {
    const song = searchResults.find((song) => song.id === songId);
    if (song && audioRef.current) {
      const downloadUrl = song.downloadUrl[4]?.url || ""; // Access the url property
      audioRef.current.src = downloadUrl;
      audioRef.current.play();
      setCurrentSongId(songId);
    }
  };

  // Function to pause the currently playing song
  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setCurrentSongId(null);
    }
  };

  // Function to handle play/pause button click
  const handlePlayPause = (songId: string) => {
    if (currentSongId === songId) {
      if (audioRef.current?.paused) {
        playSong(songId);
      } else {
        pauseSong();
      }
    } else {
      playSong(songId);
    }
  };

  // Fetch data when the component mounts or when the album ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`${playlistURL}?id=${id}`);
        const response = await data.json();
        setSearchResults(response.data.songs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div style={{ marginLeft: "300px", marginTop: "100px" }}>
      <h1 style={{ color: "white" }}>Song List</h1>
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
                <IconButton
                  aria-label="play/pause"
                  onClick={() => handlePlayPause(song.id)}>
                  {currentSongId === song.id && !audioRef.current?.paused ? (
                    <PauseIcon sx={{ height: 38, width: 38, color: "gray" }} />
                  ) : (
                    <PlayArrowIcon
                      sx={{ height: 38, width: 38, color: "gray" }}
                    />
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

export default ShowTrendingList;
