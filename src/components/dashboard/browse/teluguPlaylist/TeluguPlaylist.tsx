import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { searchPlaylistURL } from "../../../../services/browseApi";
import PlaylistCard from "../PlaylistCard";

interface Image {
  url: string;
}

// Define the Playlist interface
interface PlayList {
  id: string;
  name: string;
  image: Image[];
}

// Default query string
const query = "telugu";

// Component for displaying trending Telugu playlists
const TeluguPlaylist = () => {
  // State to hold playlists and scroll position
  const [playlists, setPlaylists] = useState<PlayList[]>([]);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    // Fetch data using axios when the component mounts

    const fetchData = async () => {
      try {
        const data = await fetch(`${searchPlaylistURL}?query=${query}`);
        const response = await data.json();
        setPlaylists(response.data.results);
        // console.log(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Function to handle scrolling left or right
  const handleScroll = (scrollDirection: "left" | "right") => {
    const container = document.getElementById("scroll-container-4");

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
      <h1 style={{ color: "white" }}>Trending Playlists - Telugu</h1>
      {/* Navigation buttons for scrolling */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={() => handleScroll("left")}>
          <ArrowBackIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton onClick={() => handleScroll("right")}>
          <ArrowForwardIcon sx={{ color: "white" }} />
        </IconButton>
      </div>
      {/* Container for playlist cards with scroll functionality */}
      <Box
        id="scroll-container-4"
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
                image={playlist.image[2].url}
                name={playlist.name}
              />
            </Grid>
          </Link>
        ))}
      </Box>
    </div>
  );
};

export default TeluguPlaylist;
