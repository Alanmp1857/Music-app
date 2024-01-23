// Import necessary components and libraries
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";

interface Album {
  link: string;
}

interface ListenNowCardProps {
  image: string;
  name: string;
  singer: string;
  onClick: () => void;
  album: Album[];
}

const SearchSongCard: React.FC<ListenNowCardProps> = ({
  image,
  name,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      {/*  */}

      <Card sx={{ width: "200px", margin: "10px 10px 10px 10px" }}>
        {/* song image */}
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image={image}
          alt={`Song cover for ${name}`}
        />
        <CardContent>
          {/* song/album name */}
          <Typography gutterBottom variant="h5" component="div" title={name}>
            {name.length > 10 ? name.substring(0, 10) + "..." : name}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            marginTop: "-20px",
            display: "flex",
            justifyContent: "center",
          }}></CardActions>
      </Card>
    </div>
  );
};

export default SearchSongCard;
