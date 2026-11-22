import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Grid, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { searchPlaylistURL } from "../../../../services/browseApi";
import PlaylistCard from "../PlaylistCard";

// Define the Playlist interface
interface Image {
  url: string;
}

interface PlayList {
  id: string;
  name: string;
  image: Image[];
}

interface PlaylistProps {
  language: string;
  query: string;
  containerId: string;
}

// Generic component for displaying trending playlists by language
const Playlist: React.FC<PlaylistProps> = ({
  language,
  query,
  containerId,
}) => {
  // State to hold playlists and scroll position
  const [playlists, setPlaylists] = useState<PlayList[]>([]);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Fetch playlists data from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`${searchPlaylistURL}?query=${query}`);
        const response = await data.json();
        console.log("Playlist", response.data, data);
        setPlaylists(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [query]);

  // Function to handle scrolling left or right
  const handleScroll = (scrollDirection: "left" | "right") => {
    const container = document.getElementById(containerId);

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
    <section className="music-section">
      <header className="section-heading">
        <p className="section-eyebrow">Explore by language</p>
        <h2 className="section-title">Trending Playlists - {language}</h2>
      </header>
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
        id={containerId}
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
    </section>
  );
};

export default Playlist;
