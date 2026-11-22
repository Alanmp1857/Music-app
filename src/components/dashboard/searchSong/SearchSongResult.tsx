import { Button, Card, Box } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useParams } from "react-router-dom";
import {
  songURL,
  searchSongURL,
  searchArtistURL,
} from "../../../services/browseApi";
import { useMusicPlayer } from "../../../contexts/MusicPlayerContext";

const SearchSongResult = () => {
  const { id, type } = useParams();
  const { playTrack, pauseTrack, currentTrack, isPlaying } = useMusicPlayer();

  // State for search results
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch search results on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!id) {
          setSearchResults([]);
          setIsLoading(false);
          return;
        }

        const decodedId = decodeURIComponent(id);
        const searchType = type || "songs"; // Default to songs if no type specified

        // Check if id is a search query
        // Song IDs are typically short alphanumeric strings (usually 10-15 chars)
        // Search queries typically have spaces or special characters
        const isSearchQuery =
          decodedId.includes(" ") ||
          decodedId.length > 20 ||
          /[^a-zA-Z0-9\-_]/.test(decodedId) ||
          decodedId.split(" ").length > 1;

        console.log(
          "Search ID:",
          decodedId,
          "Type:",
          searchType,
          "Is search query:",
          isSearchQuery
        );

        if (isSearchQuery) {
          // Handle search query - use appropriate endpoint based on type
          const searchURL =
            searchType === "artists" ? searchArtistURL : searchSongURL;
          const data = await fetch(
            `${searchURL}?query=${encodeURIComponent(decodedId)}&limit=20`
          );
          const response = await data.json();

          console.log("Search API response:", response);

          const results = response.data?.results || [];
          const songsInfo: any[] = results.map((result: any) => {
            // Handle different artist data structures
            let artistName = "Unknown Artist";
            if (result.primaryArtists) {
              if (typeof result.primaryArtists === "string") {
                artistName = result.primaryArtists;
              } else if (Array.isArray(result.primaryArtists)) {
                artistName = result.primaryArtists.join(", ");
              }
            } else if (result.artists) {
              if (result.artists.all && Array.isArray(result.artists.all)) {
                const singers = result.artists.all
                  .filter((artist: any) => artist.role === "singer")
                  .map((artist: any) => artist.name);
                artistName =
                  singers.length > 0 ? singers.join(", ") : "Unknown Artist";
              } else if (Array.isArray(result.artists)) {
                artistName = result.artists
                  .map((a: any) => a.name || a)
                  .join(", ");
              } else if (typeof result.artists === "string") {
                artistName = result.artists;
              }
            }

            return {
              id: result.id,
              name: result.name,
              year: result.year,
              duration: result.duration,
              artists: result.artists || { all: [] },
              primaryArtists: result.primaryArtists,
              artistName: artistName,
              language: result.language,
              image: result.image?.[2]?.url || result.image?.[0]?.url || "",
              downloadUrl:
                result.downloadUrl?.[4]?.url ||
                result.downloadUrl?.[0]?.url ||
                null,
              album: result.album?.name || "Unknown Album",
            };
          });

          setSearchResults(songsInfo);
        } else {
          // Handle song ID (existing behavior)
          try {
            const data = await fetch(`${songURL}/${decodedId}`);
            const response = await data.json();

            const results = Array.isArray(response.data)
              ? response.data
              : [response.data];

            const songsInfo: any[] = results.map((result: any) => {
              let artistName = "Unknown Artist";
              if (result.artists) {
                if (result.artists.all && Array.isArray(result.artists.all)) {
                  const singers = result.artists.all
                    .filter((artist: any) => artist.role === "singer")
                    .map((artist: any) => artist.name);
                  artistName =
                    singers.length > 0 ? singers.join(", ") : "Unknown Artist";
                } else if (Array.isArray(result.artists)) {
                  artistName = result.artists
                    .map((a: any) => a.name || a)
                    .join(", ");
                } else if (typeof result.artists === "string") {
                  artistName = result.artists;
                }
              }

              return {
                id: result.id,
                name: result.name,
                year: result.year,
                duration: result.duration,
                artists: result.artists,
                artistName: artistName,
                language: result.language,
                image: result.image?.[2]?.url || result.image?.[0]?.url || "",
                downloadUrl:
                  result.downloadUrl?.[4]?.url ||
                  result.downloadUrl?.[0]?.url ||
                  null,
                album: result.album?.name || "Unknown Album",
              };
            });

            setSearchResults(songsInfo);
          } catch (songError) {
            // If song ID fetch fails, try as search query
            console.log("Song ID fetch failed, trying as search query");
            const searchURL =
              searchType === "artists" ? searchArtistURL : searchSongURL;
            const data = await fetch(
              `${searchURL}?query=${encodeURIComponent(decodedId)}&limit=20`
            );
            const response = await data.json();
            const results = response.data?.results || [];
            setSearchResults(
              results.map((result: any) => ({
                id: result.id,
                name: result.name,
                artistName: result.primaryArtists || "Unknown Artist",
                image: result.image?.[2]?.url || result.image?.[0]?.url || "",
                downloadUrl:
                  result.downloadUrl?.[4]?.url ||
                  result.downloadUrl?.[0]?.url ||
                  null,
              }))
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, type]);

  // Handle play/pause
  const handlePlayPause = (song: any) => {
    const downloadUrl = song.downloadUrl;
    if (!downloadUrl) {
      console.error("No download URL available for this song");
      return;
    }

    const currentTrackUrl =
      typeof currentTrack === "string" ? currentTrack : currentTrack?.url;

    // Get artist name from various possible structures
    let artistName = song.artistName || "Unknown Artist";
    if (!song.artistName && song.artists) {
      if (song.artists.all && Array.isArray(song.artists.all)) {
        const singers = song.artists.all
          .filter((artist: any) => artist.role === "singer")
          .map((artist: any) => artist.name);
        artistName = singers.length > 0 ? singers.join(", ") : "Unknown Artist";
      } else if (Array.isArray(song.artists)) {
        artistName = song.artists.map((a: any) => a.name || a).join(", ");
      } else if (typeof song.artists === "string") {
        artistName = song.artists;
      }
    } else if (song.primaryArtists) {
      if (typeof song.primaryArtists === "string") {
        artistName = song.primaryArtists;
      } else if (Array.isArray(song.primaryArtists)) {
        artistName = song.primaryArtists.join(", ");
      }
    }

    if (currentTrackUrl === downloadUrl && isPlaying) {
      pauseTrack();
    } else {
      playTrack({
        url: downloadUrl,
        name: song.name,
        artist: artistName,
        image: song.image || null,
      });
    }
  };

  return (
    <Box
      sx={{
        marginLeft: { xs: "20px", sm: "100px", md: "280px" },
        marginTop: "120px",
        marginRight: "20px",
        paddingBottom: "40px",
      }}>
      <Typography
        variant="h4"
        sx={{
          color: "white",
          marginBottom: 3,
          fontWeight: 600,
        }}>
        Search Results{id && ` for "${decodeURIComponent(id)}"`}
      </Typography>
      {isLoading ? (
        <Typography
          variant="h6"
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            textAlign: "center",
            marginTop: 5,
          }}>
          Loading...
        </Typography>
      ) : searchResults.length === 0 ? (
        <Typography
          variant="h6"
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            textAlign: "center",
            marginTop: 5,
          }}>
          No songs found
        </Typography>
      ) : (
        searchResults.map((song) => (
          <Card
            key={song.id}
            sx={{
              display: "flex",
              marginBottom: 2,
              backgroundColor: "#19272e",
              borderRadius: 3,
              overflow: "hidden",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#1f2f37",
                transform: "translateX(8px)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              },
            }}>
            {/* Song image */}
            <CardMedia
              component="img"
              sx={{
                width: { xs: 120, sm: 150, md: 180 },
                height: { xs: 120, sm: 150, md: 180 },
                objectFit: "cover",
                flexShrink: 0,
              }}
              image={song.image}
              alt={`Song cover for ${song.name}`}
            />

            {/* Song details */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-between",
              }}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    marginBottom: 1,
                  }}>
                  {song.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: 0.5,
                  }}>
                  {song.artistName ||
                    (() => {
                      if (
                        song.artists?.all &&
                        Array.isArray(song.artists.all)
                      ) {
                        const singers = song.artists.all
                          .filter((artist: any) => artist.role === "singer")
                          .map((artist: any) => artist.name);
                        return singers.length > 0
                          ? singers.join(", ")
                          : "Unknown Artist";
                      } else if (song.primaryArtists) {
                        if (typeof song.primaryArtists === "string") {
                          return song.primaryArtists;
                        } else if (Array.isArray(song.primaryArtists)) {
                          return song.primaryArtists.join(", ");
                        }
                      }
                      return "Unknown Artist";
                    })()}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, marginTop: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                    }}>
                    Album: {song.album}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                    }}>
                    Language: {song.language}
                  </Typography>
                </Box>
              </Box>

              {/* Audio controls */}
              <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                <Button
                  variant="contained"
                  startIcon={(() => {
                    const currentTrackUrl =
                      typeof currentTrack === "string"
                        ? currentTrack
                        : currentTrack?.url;
                    const isCurrentSong =
                      currentTrackUrl === song.downloadUrl && isPlaying;
                    return !isCurrentSong ? <PlayArrowIcon /> : <PauseIcon />;
                  })()}
                  onClick={() => handlePlayPause(song)}
                  sx={{
                    backgroundColor: "#64b5f6",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#42a5f5",
                    },
                    borderRadius: 2,
                    paddingX: 3,
                    paddingY: 1,
                    textTransform: "none",
                    fontWeight: 600,
                  }}>
                  {(() => {
                    const currentTrackUrl =
                      typeof currentTrack === "string"
                        ? currentTrack
                        : currentTrack?.url;
                    const isCurrentSong =
                      currentTrackUrl === song.downloadUrl && isPlaying;
                    return isCurrentSong ? "Pause" : "Play";
                  })()}
                </Button>
              </Box>
            </Box>
          </Card>
        ))
      )}
    </Box>
  );
};

export default SearchSongResult;
