import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import SearchSongCard from "./SearchSongCard";
import { Link } from "react-router-dom";
import { searchSongURL, searchArtistURL } from "../../../services/browseApi";
import PersonIcon from "@mui/icons-material/Person";

interface SearchSongProps {
  query: string;
  searchType?: "songs" | "artists";
}

const SearchSong: React.FC<SearchSongProps> = ({
  query,
  searchType = "songs",
}) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const limit = 10;

  // Simple Artist Card Component
  interface ArtistCardProps {
    image: string;
    name: string;
    followerCount?: number;
    onClick: () => void;
  }

  const ArtistCard: React.FC<ArtistCardProps> = ({
    image,
    name,
    followerCount,
    onClick,
  }) => {
    return (
      <div onClick={onClick}>
        <Card
          sx={{
            width: "140px",
            margin: "10px",
            backgroundColor: "#19272e",
            color: "white",
            borderRadius: 2,
            transition: "all 0.3s ease",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
              backgroundColor: "#1f2f37",
            },
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 120,
              backgroundColor: "#25aae1",
            }}>
            {image ? (
              <CardMedia
                component="img"
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                image={image}
                alt={`Artist ${name}`}
              />
            ) : (
              <PersonIcon sx={{ fontSize: 60, color: "white" }} />
            )}
          </Box>
          <CardContent
            sx={{
              padding: "12px !important",
              textAlign: "center",
              "&:last-child": {
                paddingBottom: "12px",
              },
            }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              title={name}
              sx={{
                color: "white",
                fontWeight: 500,
                fontSize: "0.95rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
              {name}
            </Typography>
            {followerCount && (
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "0.8rem",
                  mt: 0.5,
                }}>
                {followerCount.toLocaleString()} followers
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL =
          searchType === "artists" ? searchArtistURL : searchSongURL;
        const data = await fetch(`${baseURL}?query=${query}&limit=${limit}`);
        const response = await data.json();
        console.log(response.data.results);

        // Extract relevant information from the API response
        const results = response.data.results;

        if (searchType === "artists") {
          // Handle artist results
          const artistsInfo: any[] = results.map((result: any) => ({
            id: result.id,
            name: result.name,
            image: result.image?.[2]?.url || result.image?.[0]?.url || "",
            type: "artist",
            // Add artist-specific fields
            followerCount: result.followerCount,
            fanCount: result.fanCount,
            isVerified: result.isVerified,
          }));
          setSearchResults(artistsInfo);
        } else {
          // Handle song results (existing logic)
          const songsInfo: any[] = results.map((result: any) => ({
            id: result.id,
            name: result.name,
            image: result.image[2].url,
            primaryArtists: result.primaryArtists,
            album: result.album.name,
            type: "song",
          }));
          setSearchResults(songsInfo);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [query, searchType]);

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
        spacing={{ xs: 2, sm: 3, md: 4 }}
        columns={{ xs: 2, sm: 3, md: 4, lg: 5 }}>
        {/* Map through searchResults to render appropriate card components */}
        {searchResults.map((result) => (
          <Grid item xs={1} sm={1} md={1} key={result.id}>
            <Link
              to={
                searchType === "artists"
                  ? `/artist/${encodeURIComponent(result.name)}`
                  : `/search/${searchType}/${result.id}`
              }
              style={{ textDecoration: "none", color: "#19272e" }}
              key={result.id}>
              {searchType === "artists" ? (
                <ArtistCard
                  image={result.image}
                  name={result.name}
                  followerCount={result.followerCount}
                  onClick={handleCardClick}
                />
              ) : (
                <SearchSongCard
                  image={result.image}
                  name={result.name}
                  singer={result.primaryArtists}
                  onClick={handleCardClick}
                  album={result.album}
                  downloadUrl={result.downloadUrl}
                  songId={result.id}
                />
              )}
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchSong;
