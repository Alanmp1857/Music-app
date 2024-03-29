import { Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import TrendingListCard from "./TrendingListCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { searchPlaylistURL } from "../../../../services/browseApi";

interface Image {
  url: string;
}

interface PlayList {
  id: string;
  name: string;
  image: Image[];
}

const query = "popular";

const TrendingList = () => {
  // State to store playlists
  const [playlists, setPlaylists] = useState<PlayList[]>([]);

  // State to track horizontal scroll position
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    // Fetch data using axios when the component mounts

    const fetchData = async () => {
      try {
        const data = await fetch(`${searchPlaylistURL}?query=${query}`);
        const response = await data.json();
        // console.log(response.data);
        setPlaylists(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle horizontal scroll
  const handleScroll = (scrollDirection: "left" | "right") => {
    const container = document.getElementById("scroll-container-2");

    if (container) {
      const visibleWidth = container.clientWidth;
      const halfVisibleWidth = visibleWidth / 1.5;

      // Scroll left or right based on the direction
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
    <div style={{ margin: "100px 20px 20px 300px" }}>
      <h1 style={{ color: "white" }}>Popular Playlists</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Scroll buttons */}
        <IconButton onClick={() => handleScroll("left")}>
          <ArrowBackIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton onClick={() => handleScroll("right")}>
          <ArrowForwardIcon sx={{ color: "white" }} />
        </IconButton>
      </div>

      {/* Playlist container with horizontal scroll */}
      <Box
        id="scroll-container-2"
        sx={{
          display: "flex",
          overflowX: "hidden", // Make the container scrollable
          marginTop: "10px",
          gap: "5px", // Adjust the gap as needed
        }}>
        {/* Mapping through playlists */}
        {playlists.map((playlist, index) => (
          <Link
            key={index}
            to={`/trending/${playlist.id}`}
            style={{ textDecoration: "none" }}>
            <Grid item xs={1} sm={1} md={1}>
              <TrendingListCard
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

export default TrendingList;
