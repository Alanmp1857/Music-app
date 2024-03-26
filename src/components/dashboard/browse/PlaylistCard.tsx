import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

//  props for the BrowseCard component
interface BrowseCardProps {
  id: string;
  image: string;
  name: string;
}

const PlaylistCard: React.FC<BrowseCardProps> = ({ image, name }) => {
  return (
    <Card
      sx={{
        maxWidth: 200,
        margin: "10px",
        backgroundColor: "#19272e",
        color: "white",
      }}>
      {/* Display song image */}
      <CardMedia
        component="img"
        sx={{ width: 200, height: "100%" }}
        image={image}
        alt={`Song cover for ${name}`}
      />
      <CardContent>
        {/* Display song/album name with ellipsis for long names */}
        <Typography gutterBottom variant="h5" component="div" title={name}>
          {name.length > 10 ? `${name.substring(0, 10)}...` : name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;
