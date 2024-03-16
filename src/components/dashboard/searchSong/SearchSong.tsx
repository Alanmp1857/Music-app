import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import SearchSongCard from "./SearchSongCard";
import { Link } from "react-router-dom";
import { searchSongURL } from "../../../services/browseApi";

interface SearchSongProps {
  query: string;
}

const SearchSong: React.FC<SearchSongProps> = ({ query }) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const limit = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(searchSongURL + `${query}` + limit);
        const data = await fetch(
          `${searchSongURL}?query=${query}&limit=${limit}`
        );
        const response = await data.json();
        console.log(response.data.results);

        // Extract relevant information from the API response
        const results = response.data.results;
        const songsInfo: any[] = results.map((result: any) => ({
          id: result.id,
          name: result.name,
          image: result.image[2].url,
          primaryArtists: result.primaryArtists,
          album: result.album.name,
        }));

        setSearchResults(songsInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [query]);

  // Handler for card click to set isCollapsed to true
  const handleCardClick = () => {
    setIsCollapsed(true);
  };

  return (
    <div
      style={{
        margin: "20px 20px 20px 20px",
        display: isCollapsed ? "none" : "block",
      }}>
      <Grid
        container
        spacing={{ xs: 2, sm: 2, md: 3 }}
        columns={{ xs: 1, sm: 2, md: 4 }}>
        {/* Map through searchResults to render SearchSongCard components */}
        {searchResults.map((result) => (
          <Grid item xs={1} sm={1} md={1} key={result.id}>
            {/* Add style prop to the Link component to remove underline */}
            <Link
              to={`/search/${result.id}`}
              style={{ textDecoration: "underline", color: "white" }}
              key={result.id}>
              <SearchSongCard
                key={result.id}
                image={result.image}
                name={result.name}
                singer={result.primaryArtists}
                onClick={handleCardClick}
                album={result.album}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchSong;
