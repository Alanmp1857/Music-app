import React, { useEffect, useState } from "react";
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
    <section className="music-section">
      <header className="section-heading">
        <p className="section-eyebrow">Picked for your next session</p>
        <h2 className="section-title">Trending Songs</h2>
        <p className="section-description">
          The tracks listeners are coming back to right now.
        </p>
      </header>
      <div className="song-grid">
        {songs.map((song, index) => (
          <div className="song-grid-item" key={index}>
            <SongCard song={song} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardContainer;
