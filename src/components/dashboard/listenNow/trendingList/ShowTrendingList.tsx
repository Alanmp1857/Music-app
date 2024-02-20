import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { popularPlaylistURL } from "../../../../services/browseApi";

// Interface for the song data
interface Song {
  id: string;
  name: string;
  year: number;
  duration: number;
  primaryArtists: string[];
  language: string;
  image: string;
  downloadUrl: string;
  album: string;
}

const ShowTrendingList: React.FC = () => {
  // Get the playlist ID from the route parameters
  const { id } = useParams<{ id: string }>();

  // State to store the search results
  const [searchResults, setSearchResults] = useState<Song[]>([]);

  // State to manage the active audio element and playing status
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});

  // Function to handle play/pause button click
  const handlePlayPause = (songId: string, downloadUrl: string) => {
    if (activeAudio) {
      // Pause if there's an active audio element
      activeAudio.pause();
      setActiveAudio(null);
      setIsPlaying((prevIsPlaying) => ({
        ...prevIsPlaying,
        [songId]: false,
      }));
    } else {
      // Create a new audio element and play the song
      const audio = new Audio(downloadUrl);
      audio.play().catch((error) => {
        console.error("Error starting playback:", error);
      });

      // Set up a callback for when the song ends
      audio.onended = () => {
        setIsPlaying((prevIsPlaying) => ({
          ...prevIsPlaying,
          [songId]: false,
        }));
      };

      // Set the new audio element as active
      setActiveAudio(audio);
      setIsPlaying((prevIsPlaying) => ({
        ...prevIsPlaying,
        [songId]: true,
      }));
    }
  };

  // Fetch data when the component mounts or when the playlist ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(popularPlaylistURL + `${id}`);
        const data = response.data;

        if (data.status === "SUCCESS") {
          // Extract relevant information from API response
          const results = data.data.songs;
          const songsInfo = results.map((result: any) => ({
            id: result.id,
            name: result.name,
            year: result.year,
            duration: result.duration,
            primaryArtists: result.primaryArtists,
            language: result.language,
            image: result.image[2].link,
            downloadUrl: result.downloadUrl[4].link,
            album: result.album.name,
          }));

          // Update the state with the songs information
          setSearchResults(songsInfo);
        } else {
          console.error("Error in API response:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Reset audio and playing status when search results change
  useEffect(() => {
    if (activeAudio) {
      activeAudio.pause();
      setActiveAudio(null);
      setIsPlaying({});
    }
  }, [searchResults, activeAudio]);

  return (
    <div style={{ marginLeft: "300px", marginTop: "100px" }}>
      <h1>Song List</h1>
      <Grid
        container
        spacing={{ xs: 2, sm: 2, md: 2 }}
        columns={{ xs: 4, sm: 3, md: 5 }}>
        {searchResults.map((song, index) => (
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
                image={song.image}
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
                  marginTop: "-30px",
                  display: "flex",
                  justifyContent: "center",
                }}>
                {/* Play/Pause button */}
                <IconButton
                  aria-label="play/pause"
                  onClick={() => handlePlayPause(song.id, song.downloadUrl)}>
                  {isPlaying[song.id] ? (
                    <PauseIcon sx={{ height: 38, width: 38 }} />
                  ) : (
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  )}
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ShowTrendingList;
