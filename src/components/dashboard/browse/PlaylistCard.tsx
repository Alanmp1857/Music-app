import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

//  props for the BrowseCard component
interface BrowseCardProps {
  id: string;
  image: string;
  title: string;
}

const PlaylistCard: React.FC<BrowseCardProps> = ({ image, title }) => {
  return (
    <Card
      sx={{
        maxWidth: 200,
        margin: "10px",
        background:
          "linear-gradient(to top, #f0f0f0, #d3d3d3, #808080, #4d4d4d, #000000)",
      }}>
      {/* Display song image */}
      <CardMedia
        component="img"
        sx={{ width: 200, height: "100%" }}
        image={image}
        alt={`Song cover for ${title}`}
      />
      <CardContent>
        {/* Display song/album name with ellipsis for long titles */}
        <Typography gutterBottom variant="h5" component="div" title={title}>
          {title.length > 10 ? `${title.substring(0, 10)}...` : title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;
