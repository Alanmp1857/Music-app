import ListenNow from "./trendingSongs/ListenNow";
import AlbumList from "./albums/AlbumList";
import TrendingList from "./trendingList/TrendingList";
import { Box } from "@mui/material";

const ListenContainer = () => {
  return (
    <Box component="div" sx={{ ml: -4, mr: 1 }}>
      <TrendingList />
      <ListenNow />
      <AlbumList />
    </Box>
  );
};

export default ListenContainer;
