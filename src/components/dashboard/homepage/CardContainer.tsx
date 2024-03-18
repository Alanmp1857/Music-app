import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import SongCard from "./SongCard";
import { homepageURL } from "../../../services/browseApi";

// Define the default query string

const CardContainer = () => {
  // State to hold the fetched songs
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Fetch popular songs using axios when the component mounts
    const fetchData = async () => {
      try {
        // const { data } = await axios.request(options);
        const data = await fetch(`${homepageURL}`);
        const response = await data.json();
        // console.log(response.data.songs);
        setSongs(response.data.songs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ margin: "0px 10px 20px 50px" }}>
      <h1>Trending Songs</h1>
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
