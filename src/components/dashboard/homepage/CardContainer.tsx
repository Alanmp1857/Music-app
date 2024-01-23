import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import SongCard from "./SongCard";
import { popularPlaylistURL } from "../../../services/browseApi";

// Define the default query string
const defaultQuery = "61969868";

const CardContainer = () => {
  // State to hold the fetched songs
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Fetch popular songs using axios when the component mounts
    axios
      .get(popularPlaylistURL + defaultQuery)
      .then((response) => {
        // Update state with fetched songs
        setSongs(response.data.data.songs || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ margin: "0px 10px 20px 50px" }}>
      <h1>Popular Songs</h1>
      {/* Responsive grid for displaying song cards */}
      <Grid
        container
        spacing={{ xs: 2, sm: 2, md: 2, lg: 2 }}
        columns={{ xs: 1, sm: 2, md: 3, lg: 5 }}>
        {/* Map through songs and display SongCard components */}
        {songs.map((song, index) => (
          <Grid item xs={1} sm={1} md={1} key={index}>
            {/* Pass the song as a prop to the SongCard component */}
            <SongCard song={song} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CardContainer;
