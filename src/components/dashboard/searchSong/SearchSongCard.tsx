// Import necessary components and libraries
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions, IconButton, Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useMusicPlayer } from "../../../contexts/MusicPlayerContext";

interface Album {
  link: string;
}

interface SearchSongCardProps {
  image: string;
  name: string;
  singer: string;
  onClick: () => void;
  album: Album[];
  downloadUrl?: string;
  songId?: string;
}

const SearchSongCard: React.FC<SearchSongCardProps> = ({
  image,
  name,
  singer,
  onClick,
  downloadUrl,
}) => {
  const { playTrack } = useMusicPlayer();

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (downloadUrl) {
      playTrack({
        url: downloadUrl,
        name: name,
        artist: singer || "Unknown Artist",
        image: image || null,
      });
    }
  };

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
            width: 140,
            height: 120,
            objectFit: "cover",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          image={image}
          alt={`Song cover for ${name}`}
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
          {/* Artist name */}
          {singer && (
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
              {singer}
            </Typography>
          )}
        </CardContent>

        {downloadUrl && (
          <CardActions
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}>
            <IconButton
              aria-label="play/pause"
              onClick={handlePlayClick}
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}>
              <PlayArrowIcon sx={{ height: 40, width: 40 }} />
            </IconButton>
          </CardActions>
        )}

        {/* Hover overlay */}
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
    </div>
  );
};

export default SearchSongCard;
