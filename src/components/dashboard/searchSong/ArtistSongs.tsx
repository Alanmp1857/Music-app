import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CircularProgress,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useParams } from "react-router-dom";
import { artistSongsURL } from "../../../services/browseApi";
import { useMusicPlayer } from "../../../contexts/MusicPlayerContext";

const ArtistSongs: React.FC = () => {
  const { artistName } = useParams<{ artistName: string }>();
  const { playTrack, pauseTrack, currentTrack, isPlaying } = useMusicPlayer();
  const [songs, setSongs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [artistInfo, setArtistInfo] = useState<any>(null);

  useEffect(() => {
    const fetchArtistSongs = async () => {
      if (!artistName) return;

      setIsLoading(true);
      try {
        const decodedArtistName = decodeURIComponent(artistName);
        const response = await fetch(
          `${artistSongsURL}${encodeURIComponent(decodedArtistName)}&limit=50`
        );
        const data = await response.json();
        console.log("response from artist", response, data);

        if (data.data?.results) {
          const songsData = data.data.results.map((song: any) => ({
            id: song.id,
            name: song.name,
            image: song.image?.[2]?.url || song.image?.[0]?.url || "",
            downloadUrl:
              song.downloadUrl?.[4]?.url || song.downloadUrl?.[0]?.url || null,
            duration: song.duration,
            primaryArtists: song.primaryArtists,
            album: song.album?.name || "Unknown Album",
            year: song.year,
            language: song.language,
          }));

          setSongs(songsData);

          // Extract artist info from the first song (assuming all songs are by the same artist)
          if (songsData.length > 0) {
            setArtistInfo({
              name: decodedArtistName,
              songCount: songsData.length,
              image: songsData[0].image,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching artist songs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtistSongs();
  }, [artistName]);

  const handlePlayPause = (song: any) => {
    if (!song.downloadUrl) {
      console.error("No download URL available for this song");
      return;
    }

    const currentTrackUrl =
      typeof currentTrack === "string" ? currentTrack : currentTrack?.url;

    let artistName = "Unknown Artist";
    if (song.primaryArtists) {
      if (typeof song.primaryArtists === "string") {
        artistName = song.primaryArtists;
      } else if (Array.isArray(song.primaryArtists)) {
        artistName = song.primaryArtists.join(", ");
      }
    }

    if (currentTrackUrl === song.downloadUrl && isPlaying) {
      pauseTrack();
    } else {
      playTrack({
        url: song.downloadUrl,
        name: song.name,
        artist: artistName,
        image: song.image || null,
      });
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}>
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  return (
    <Box
      className="content-page detail-page">
      {/* Artist Header */}
      {artistInfo && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 4,
            padding: 3,
            backgroundColor: "#19272e",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "#25aae1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 3,
              overflow: "hidden",
            }}>
            {artistInfo.image ? (
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                image={artistInfo.image}
                alt={artistInfo.name}
              />
            ) : (
              <Typography
                variant="h3"
                sx={{ color: "white", fontWeight: "bold" }}>
                {artistInfo.name.charAt(0).toUpperCase()}
              </Typography>
            )}
          </Box>
          <Box>
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: "bold",
                marginBottom: 1,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}>
              {artistInfo.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "1.1rem",
              }}>
              {artistInfo.songCount}{" "}
              {artistInfo.songCount === 1 ? "song" : "songs"} available
            </Typography>
          </Box>
        </Box>
      )}

      {/* Songs Grid */}
      <Typography
        variant="h4"
        sx={{
          color: "white",
          marginBottom: 3,
          fontWeight: 600,
        }}>
        Songs
      </Typography>

      {songs.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            padding: 4,
            backgroundColor: "#19272e",
            borderRadius: 2,
          }}>
          <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
            No songs found for this artist
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {songs.map((song) => {
            const currentTrackUrl =
              typeof currentTrack === "string"
                ? currentTrack
                : currentTrack?.url;
            const isCurrentSong =
              currentTrackUrl === song.downloadUrl && isPlaying;

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
                <Card
                  sx={{
                    backgroundColor: "#19272e",
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
                      backgroundColor: "#1f2f37",
                    },
                  }}>
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={song.image}
                      alt={song.name}
                      sx={{
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                    <IconButton
                      onClick={() => handlePlayPause(song)}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.9)",
                          transform: "translate(-50%, -50%) scale(1.1)",
                        },
                        transition: "all 0.2s ease",
                      }}>
                      {isCurrentSong ? (
                        <PauseIcon fontSize="large" />
                      ) : (
                        <PlayArrowIcon fontSize="large" />
                      )}
                    </IconButton>
                  </Box>
                  <CardContent sx={{ padding: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        marginBottom: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={song.name}>
                      {song.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        marginBottom: 0.5,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                      {song.primaryArtists || "Unknown Artist"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.5)",
                        fontSize: "0.8rem",
                      }}>
                      {song.album} • {song.year || "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default ArtistSongs;
