import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useAuth0 } from "@auth0/auth0-react";
import { CardActions } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import {
  addFavSong,
  getFavSong,
  removeFavSong,
} from "../../../services/favoriteSongs";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPlaying, setIsPlaying] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const email = user?.email;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const newSong = {
    user: email,
    songId: song.id,
    name: song.name,
    image: song.image[2].url,
    downloadUrl: song.downloadUrl[4].url,
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

  // Handler for play/pause button click
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        // Play the audio
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Error starting playback:", error);
            });
        }
      } else {
        // Pause the audio
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Add event listener to update play/pause icon when audio starts playing
  useEffect(() => {
    if (audioRef.current) {
      const handlePlaying = () => {
        setIsPlaying(true);
      };

      audioRef.current.addEventListener("playing", handlePlaying);

      return () => {
        // Clean up the event listener when the component unmounts
        // eslint-disable-next-line react-hooks/exhaustive-deps
        audioRef.current?.removeEventListener("playing", handlePlaying);
      };
    }
  }, []);

  return (
    <Card
      sx={{
        maxWidth: 200,
        background:
          "linear-gradient(to top, #f0f0f0, #d3d3d3, #808080, #4d4d4d, #000000)",
      }}>
      {/* song image */}
      <CardMedia
        component="img"
        sx={{ width: 200, height: "100%" }}
        image={song.image[2].url}
        alt={`Song cover for ${song.name}`}
      />
      <CardContent>
        {/* song/album name */}
        <Typography gutterBottom variant="h5" component="div" title={song.name}>
          {song.name.length > 10
            ? `${song.name.substring(0, 10)}...`
            : song.name}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          marginTop: "-40px",
          display: "flex",
          justifyContent: "center",
        }}>
        {/* Play controls */}
        <IconButton aria-label="play/pause" onClick={handlePlayPause}>
          {/* <PlayArrowIcon sx={{ height: 38, width: 38 }} /> */}
          {audioRef.current && !audioRef.current.paused ? (
            <PauseIcon sx={{ height: 38, width: 38 }} />
          ) : (
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          )}
        </IconButton>
        {/* favourite button */}
        {isAuthenticated && (
          <IconButton
            aria-label="favorite"
            onClick={() =>
              isFavorite ? removeFavourite(song.id) : handleFavoriteClick()
            }>
            <FavoriteOutlinedIcon
              sx={{ color: isFavorite ? "red" : "inherit" }}
            />
          </IconButton>
        )}
        {/* Audio element */}
        <audio ref={audioRef}>
          <source
            src={
              song.downloadUrl.find(
                (item: { quality: string }) => item.quality === "320kbps"
              )?.url || ""
            }
            type="audio/mp4"
          />
        </audio>
      </CardActions>
    </Card>
  );
};

export default SongCard;
