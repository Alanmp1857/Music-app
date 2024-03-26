import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// Props interface for TrendingListCard
interface TrendingListCardProps {
  id: string;
  image: string;
  name: string;
}

// Functional component for rendering a card in the trending list
const TrendingListCard: React.FC<TrendingListCardProps> = ({ image, name }) => {
  return (
    <Card
      sx={{
        maxWidth: 200,
        margin: "10px",
        backgroundColor: "#19272e",
        color: "white",
      }}>
      {/* Playlist image */}
      <CardMedia
        component="img"
        sx={{ width: 200, height: "100%" }}
        image={image}
        alt={`Playlist cover for ${name}`}
      />

      <CardContent>
        {/* Playlist name */}
        <Typography gutterBottom variant="h5" component="div" title={name}>
          {/* Truncate long names and add ellipsis */}
          {name.length > 10 ? name.substring(0, 10) + "..." : name}
        </Typography>
      </CardContent>

      {/* Card actions (currently empty) */}
      <CardActions
        sx={{
          marginTop: "-20px",
          display: "flex",
          justifyContent: "center",
        }}></CardActions>
    </Card>
  );
};

export default TrendingListCard;
