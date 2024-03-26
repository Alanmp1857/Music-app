import React, { useState, useEffect } from "react";
import { Grid, Box, IconButton } from "@mui/material";
import ListenNowCard from "./ListenNowCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { searchSongURL } from "../../../../services/browseApi";

interface DownloadUrl {
  quality: string;
  url: string;
}

interface Song {
  id: string;
  name: string;
  image: {
    quality: string;
    url: string;
  }[];
  primaryArtists: string;
  downloadUrl: DownloadUrl[];
}

const ListenNow: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  const query = "popular english";
  const limit = 20;

  useEffect(() => {
    // Fetch data using axios
    const fetchData = async () => {
      try {
        const data = await fetch(
          `${searchSongURL}?query=${query}&limit=${limit}`
        );

        const response = await data.json();
        // console.log(response.data);
        setSongs(response.data.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleScroll = (scrollDirection: "left" | "right") => {
    const container = document.getElementById("scroll-container");
    if (container) {
      const visibleWidth = container.clientWidth;
      const halfVisibleWidth = visibleWidth / 1.5;

      if (scrollDirection === "left") {
        container.scrollTo({
          left: scrollLeft - halfVisibleWidth,
          behavior: "smooth",
        });
        setScrollLeft((prev) => prev - halfVisibleWidth);
      } else {
        container.scrollTo({
          left: scrollLeft + halfVisibleWidth,
          behavior: "smooth",
        });
        setScrollLeft((prev) => prev + halfVisibleWidth);
      }
    }
  };

  const handleSongPlay = (songId: string) => {
    setCurrentlyPlaying(songId);
  };

  const handleSongPause = () => {
    setCurrentlyPlaying(null);
  };

  return (
    <div style={{ margin: "40px 20px 20px 300px" }}>
      {/* Section Title */}
      <h1 style={{ color: "white" }}>Popular Songs</h1>

      {/* Scroll Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          aria-label="Scroll left"
          onClick={() => handleScroll("left")}>
          <ArrowBackIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton
          aria-label="Scroll right"
          onClick={() => handleScroll("right")}>
          <ArrowForwardIcon sx={{ color: "white" }} />
        </IconButton>
      </div>

      {/* Container for the songs */}
      <Box
        id="scroll-container"
        sx={{
          display: "flex",
          overflowX: "hidden",
          marginTop: "10px",
          gap: "5px",
        }}>
        {/* Map through each song and render ListenNowCard */}
        {songs.map((song, index) => (
          <Grid item xs={1} sm={1} md={1} key={index}>
            <ListenNowCard
              image={song.image[2].url}
              name={song.name}
              singer={song.primaryArtists}
              downloadUrl={song.downloadUrl[4].url}
              isPlaying={currentlyPlaying === song.id}
              onPlay={() => handleSongPlay(song.id)}
              onPause={handleSongPause}
            />
          </Grid>
        ))}
      </Box>
    </div>
  );
};

export default ListenNow;
