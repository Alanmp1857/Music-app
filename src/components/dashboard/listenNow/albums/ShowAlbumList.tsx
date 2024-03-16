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
import { albumByIdURL } from "../../../../services/browseApi";
import { useParams } from "react-router";

const ShowAlbumList = () => {
  // Get the album ID from the route parameters
  const { id } = useParams();

  // State for storing search results
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Reference for the audio element
  const audioRef = useRef<HTMLAudioElement | null>(new Audio());

  // State to track whether a song is currently playing
  const [isPlaying, setIsPlaying] = useState(false);

  // const query = "12411331";
  const query = "Hq1sr6xu";

  // Fetch data when the component mounts or when the album ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(albumByIdURL + `${id}`);
        // const data = response.data;
        const data = await fetch(
          `https://saavn.dev/api/search/albums?query=${query}`
        );
        const response = await data.json();
        console.log(response.data.results);
        const results = response.data.results;

        if (response.status === "SUCCESS") {
          // Extract relevant information from API response
          // const results = response.data;
          // console.log(results);
          const songsInfo = results.map((result: any) => ({
            id: result.id,
            name: result.name,
            // year: result.year,
            // duration: result.duration,
            // primaryArtists: result.primaryArtists,
            // language: result.language,
            image: result.image[2]?.url,
            // downloadUrl: result.downloadUrl[4]?.url,
            album: result.album.name,
          }));

          setSearchResults(songsInfo);
        } else {
          console.error("Error in API response:", response.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Function to handle play/pause button click
  const handlePlayPause = (downloadUrl: string) => {
    const audio = audioRef.current;

    if (audio) {
      if (audio.src === downloadUrl) {
        // Pause if the same song is playing
        audio.pause();
        setIsPlaying(false);
      } else {
        // Change the song if a different one is playing
        audio.src = downloadUrl;
        audio.play();
        setIsPlaying(true);
      }
    }
  };

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
                  onClick={() => handlePlayPause(song.downloadUrl)}>
                  {isPlaying ? (
                    <PauseIcon sx={{ height: 38, width: 38 }} />
                  ) : (
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  )}
                </IconButton>

                {/* Audio element */}
                <audio ref={audioRef}>
                  <source src={song.downloadUrl} type="audio/mp4" />
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
