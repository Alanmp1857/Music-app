import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { baseURL } from "../../../../services/browseApi";
import PlaylistCard from "../PlaylistCard";

interface Image {
  link: string;
}

// Define the Playlist interface
interface PlayList {
  id: string;
  title: string;
  image: Image[];
}

// Default query string
const query = "hindi";

// Component for displaying trending Hindi playlists
const HindiPlaylist = () => {
  // State to hold playlists and scroll position
  const [playlists, setPlaylists] = useState<PlayList[]>([]);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    // Fetch data using axios when the component mounts
    axios
      .get(baseURL + query)
      .then((response) => {
        setPlaylists(response.data.data.playlists || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to handle scrolling left or right
  const handleScroll = (scrollDirection: "left" | "right") => {
    const container = document.getElementById("scroll-container-3");

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

  return (
    <div style={{ margin: "40px 20px 20px 30px" }}>
      <h1>Trending Playlists - Hindi</h1>
      {/* Navigation buttons for scrolling */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={() => handleScroll("left")}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton onClick={() => handleScroll("right")}>
          <ArrowForwardIcon />
        </IconButton>
      </div>
      {/* Container for playlist cards with scroll functionality */}
      <Box
        id="scroll-container-3"
        sx={{
          display: "flex",
          overflowX: "hidden", // Make the container scrollable
          marginTop: "10px",
          gap: "5px", // Adjust the gap as needed
        }}>
        {/* Map through playlists and display playlist cards */}
        {playlists.map((playlist, id) => (
          <Link
            to={`/trending/${playlist.id}`}
            style={{ textDecoration: "none" }}
            key={id}>
            <Grid item xs={1} sm={1} md={1}>
              <PlaylistCard
                id={playlist.id}
                image={playlist.image[2].link}
                title={playlist.title}
              />
            </Grid>
          </Link>
        ))}
      </Box>
    </div>
  );
};

export default HindiPlaylist;
