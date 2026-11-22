import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useAuth0 } from "@auth0/auth0-react";
import { CardActions, Box } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import {
  addFavSong,
  getFavSong,
  removeFavSong,
} from "../../../services/favoriteSongs";
import { useMusicPlayer } from "../../../contexts/MusicPlayerContext";

interface Artist {
  id: string;
  name: string;
  url: string;
  image: boolean;
  type: string;
  role: string;
}

interface Image {
  url: string;
}

interface downloadUrl {
  quality: string;
  url: string;
}

interface Song {
  id: string;
  name: string;
  playCount: string;
  language: string;
  downloadUrl: downloadUrl[];
  artists: Artist[];
  image: Image[];
  songs: string;
}

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  const email = user?.email;

  const { playTrack, currentTrack, isPlaying } = useMusicPlayer();

  const newSong = {
    user: email,
    songId: song.id,
    name: song.name,
    image: song.image?.[2]?.url || song.image?.[0]?.url || "",
    downloadUrl: song.downloadUrl?.[4]?.url || song.downloadUrl?.[0]?.url || "",
  };

  useEffect(() => {
    // Fetch the user's favorite songs
    const fetchFavoriteSongs = async () => {
      try {
        if (isAuthenticated) {
          const response = await getFavSong();
          const userFavorites = response.data;
          setFavoriteSongs(userFavorites);

          // Check if the current song is in the list of favorites
          const isSongFavorite = userFavorites.some(
            (favSong: any) => favSong.songId === song.id
          );
          setIsFavorite(isSongFavorite);
        }
      } catch (error) {
        console.error("Error fetching favorite songs:", error);
      }
    };

    fetchFavoriteSongs();
  }, [isAuthenticated, song.id]);

  const handleFavoriteClick = async () => {
    console.log("Adding to favorites:", newSong);

    try {
      await addFavSong(newSong);
      console.log("Successfully added to favorites");
      setIsFavorite(true);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFavourite = async (id: string) => {
    console.log("Removed");

    try {
      await Promise.all(
        favoriteSongs.map(async (favSong: any) => {
          if (favSong.songId === id) {
            await removeFavSong(favSong.id);
          }
        })
      );

      setIsFavorite(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Guard clause: return null if song data is incomplete
  if (!song || !song.id || !song.name || !song.image || !song.downloadUrl) {
    return null;
  }

  return (
    <Card
      className="song-card"
      sx={{
        width: "100%",
        maxWidth: "none",
        backgroundColor: "#111a2b",
        borderRadius: 4,
        transition: "all 0.3s ease",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 18px 42px rgba(0, 0, 0, 0.38)",
          backgroundColor: "#18243a",
          "& .MuiCardActions-root": {
            opacity: 1,
          },
          "& .hover-overlay": {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        },
      }}>
      {/* song image */}
      <CardMedia
        component="img"
        sx={{
          width: "100%",
          height: "auto",
          aspectRatio: "1",
          objectFit: "cover",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        image={song.image?.[2]?.url || song.image?.[0]?.url || ""}
        alt={`Song cover for ${song.name}`}
      />
      <CardContent
        sx={{
          padding: "12px !important",
          "&:last-child": {
            paddingBottom: "12px",
          },
        }}>
        {/* song/album name */}
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          title={song.name}
          sx={{
            color: "white",
            fontWeight: 500,
            fontSize: "0.95rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
          {song.name}
        </Typography>
        {/* Artist name */}
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: "0.8rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            mt: 0.5,
          }}>
          {(() => {
            if (Array.isArray(song.artists) && song.artists.length > 0) {
              return song.artists.map((a: Artist) => a.name).join(", ");
            }
            if (typeof song.artists === "string") {
              return song.artists;
            }
            return "Unknown Artist";
          })()}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          gap: 1,
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}>
        {/* Play controls */}
        <IconButton
          aria-label="play/pause"
          onClick={(e) => {
            e.stopPropagation();
            const downloadUrl =
              song.downloadUrl?.find(
                (item: { quality: string }) => item.quality === "320kbps"
              )?.url ||
              song.downloadUrl?.[4]?.url ||
              song.downloadUrl?.[0]?.url;

            if (!downloadUrl) {
              console.error("No download URL available for this song");
              return;
            }

            const currentTrackUrl =
              typeof currentTrack === "string"
                ? currentTrack
                : currentTrack?.url;

            if (currentTrackUrl === downloadUrl && isPlaying) {
              // Already handled by global player
              return;
            }

            playTrack({
              url: downloadUrl,
              name: song.name,
              artist:
                Array.isArray(song.artists) && song.artists.length > 0
                  ? song.artists.map((a: Artist) => a.name).join(", ")
                  : song.artists || "Unknown Artist",
              image: song.image?.[2]?.url || song.image?.[0]?.url || null,
            });
          }}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              transform: "scale(1.1)",
            },
            transition: "all 0.2s ease",
          }}>
          {(() => {
            const downloadUrl =
              song.downloadUrl?.find(
                (item: { quality: string }) => item.quality === "320kbps"
              )?.url ||
              song.downloadUrl?.[4]?.url ||
              song.downloadUrl?.[0]?.url ||
              "";
            const currentTrackUrl =
              typeof currentTrack === "string"
                ? currentTrack
                : currentTrack?.url;
            const isCurrentSong =
              downloadUrl && currentTrackUrl === downloadUrl && isPlaying;
            return isCurrentSong ? (
              <PauseIcon sx={{ height: 40, width: 40 }} />
            ) : (
              <PlayArrowIcon sx={{ height: 40, width: 40 }} />
            );
          })()}
        </IconButton>
        {/* favourite button */}
        {isAuthenticated && (
          <IconButton
            aria-label="favorite"
            onClick={(e) => {
              e.stopPropagation();
              isFavorite ? removeFavourite(song.id) : handleFavoriteClick();
            }}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: isFavorite ? "#ff1744" : "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "#ff1744",
              },
              transition: "all 0.2s ease",
            }}>
            <FavoriteOutlinedIcon />
          </IconButton>
        )}
      </CardActions>
      {/* Hover overlay for play button visibility */}
      <Box
        className="hover-overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0)",
          transition: "background-color 0.3s ease",
          pointerEvents: "none",
        }}
      />
    </Card>
  );
};

export default SongCard;
