import { Button, IconButton } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState, useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useParams } from "react-router-dom";
import { songURL } from "../../../services/browseApi";

const SearchSongResult = () => {
  const { id } = useParams();

  // Ref for audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // State for search results and play/pause
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Fetch search results on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(searchSongResultURL + `${id}`);
        // const data = response.data;

        const data = await fetch(`${songURL}/${id}`);
        const response = await data.json();
        // console.log(response.data);

        const results = response.data;

        const songsInfo: any[] = results.map((result: any) => ({
          id: result.id,
          name: result.name,
          year: result.year,
          duration: result.duration,
          primaryArtists: result.primaryArtists,
          language: result.language,
          image: result.image[2].url,
          downloadUrl: result.downloadUrl[4].url,
          album: result.album.name,
        }));

        console.log(songsInfo);

        setSearchResults(songsInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Handle play/pause
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      style={{
        marginLeft: "400px",
        marginTop: "100px",
      }}>
      {searchResults.map((song) => (
        <div
          key={song.id}
          style={{
            display: "flex",
            margin: "10px",
            backgroundColor: "darkgray",
            width: "80%",
            borderRadius: "10px",
          }}>
          {/* Song details */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CardMedia component="img" height="300px" image={song.image} />
          </div>
          <div style={{ marginTop: "10px" }}>
            <Typography
              component="div"
              variant="h4"
              sx={{ marginLeft: "20px" }}>
              {song.name}
            </Typography>
            <Typography
              component="div"
              variant="h5"
              sx={{ marginLeft: "20px" }}>
              Artist: {song.primaryArtists}
            </Typography>
            <Typography
              component="div"
              variant="h5"
              sx={{ marginLeft: "20px" }}>
              Album: {song.album}
            </Typography>
            <Typography
              component="div"
              variant="h6"
              sx={{ marginLeft: "20px" }}>
              Duration:{" "}
              {Math.floor(song.duration / 60) +
                ":" +
                (song.duration % 60) +
                "min" +
                " | " +
                "Language: " +
                song.language}
            </Typography>

            {/* Music slider */}
            <div style={{ marginLeft: "10px", opacity: 0.5 }}>
              <audio controls ref={audioRef} src={song.downloadUrl}></audio>
            </div>

            {/* Audio controls */}
            <div style={{ display: "flex", margin: "20px" }}>
              <Button
                variant="contained"
                color="success"
                onClick={handlePlayPause}>
                <IconButton aria-label="play/pause">
                  {!isPlaying ? <PlayArrowIcon /> : <PauseIcon />}
                </IconButton>
                {isPlaying ? "Pause" : "Play"}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSongResult;
