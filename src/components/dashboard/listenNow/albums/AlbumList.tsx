import axios from "axios";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Grid, IconButton } from "@mui/material";
import AlbumListCard from "./AlbumListCard";
import { Link } from "react-router-dom";
import { albumURL, searchAlbumURL } from "../../../../services/browseApi";

// Define the Image interface
interface Image {
  url: string;
}

// Define the Album interface
interface Album {
  id: string;
  name: string;
  image: Image[];
}

// Query for fetching trending albums
const query = "trending";

const AlbumList = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    // Fetch data using axios
    const fetchData = async () => {
      try {
        const data = await fetch(
          `https://saavn.dev/api/search/albums?query=${query}&limit=10`
        );
        const response = await data.json();
        // Set the fetched albums in the state
        // console.log(response);
        setAlbums(response.data.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // For scroll functionality
  const handleScroll = (scrollDirection: "left" | "right") => {
    const container = document.getElementById("scroll-container-3");
    if (container) {
      const visibleWidth = container.clientWidth;
      const halfVisibleWidth = visibleWidth / 1.5;

      if (scrollDirection === "left") {
        // Scroll left
        container.scrollTo({
          left: scrollLeft - halfVisibleWidth,
          behavior: "smooth",
        });
        setScrollLeft((prev) => prev - halfVisibleWidth);
      } else {
        // Scroll right
        container.scrollTo({
          left: scrollLeft + halfVisibleWidth,
          behavior: "smooth",
        });
        setScrollLeft((prev) => prev + halfVisibleWidth);
      }
    }
  };

  return (
    <div style={{ margin: "40px 20px 20px 300px" }}>
      {/* Section Title */}
      <h1>Trending Albums</h1>

      {/* Scroll buttons */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Scroll left button */}
        <IconButton onClick={() => handleScroll("left")}>
          <ArrowBackIcon />
        </IconButton>
        {/* Scroll right button */}
        <IconButton onClick={() => handleScroll("right")}>
          <ArrowForwardIcon />
        </IconButton>
      </div>
      {/* End of Scroll buttons */}

      {/* Container for the album cards */}
      <Box
        id="scroll-container-3"
        sx={{
          display: "flex",
          overflowX: "hidden",
          marginTop: "10px",
          gap: "5px",
        }}>
        {albums.map((album, id) => (
          // Link to the individual album page
          <Link
            to={`/album/${album.id}`}
            key={id}
            style={{ textDecoration: "none" }}>
            {/* Album card component */}
            <Grid item xs={1} sm={1} md={1}>
              <AlbumListCard
                id={album.id}
                image={album.image[2].url}
                name={album.name}
              />
            </Grid>
          </Link>
        ))}
      </Box>
      {/* End of Container for the album cards */}
    </div>
  );
};

export default AlbumList;
