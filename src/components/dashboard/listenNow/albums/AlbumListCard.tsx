import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

// Define the props interface for AlbumListCard component
interface AlbumListCardProps {
  id: string;
  image: string;
  name: string;
}

// AlbumListCard component: Displays a card for an album with image and name
const AlbumListCard: React.FC<AlbumListCardProps> = ({ image, name }) => {
  return (
    <Card
      data-testid="listen-now-card" // Test ID for testing purposes
      sx={{
        maxWidth: 200,
        margin: "10px",
        backgroundColor: "#19272e",
        color: "white",
      }}>
      {/* Album image */}
      <CardMedia
        component="img"
        sx={{ width: 200, height: "100%" }}
        image={image}
        alt={`Album cover for ${name}`} // Alt text for accessibility
      />
      <CardContent>
        {/* Album name */}
        <Typography gutterBottom variant="h5" component="div" title={name}>
          {/* Truncate long names and add ellipsis */}
          {name.length > 10 ? name.substring(0, 10) + "..." : name}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          marginTop: "-20px",
          display: "flex",
          justifyContent: "center",
        }}>
        {/* Additional actions or buttons can be placed here */}
      </CardActions>
    </Card>
  );
};

export default AlbumListCard;
