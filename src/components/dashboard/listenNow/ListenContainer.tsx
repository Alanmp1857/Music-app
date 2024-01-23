import ListenNow from "./trendingSongs/ListenNow";
import AlbumList from "./albums/AlbumList";
import TrendingList from "./trendingList/TrendingList";

const ListenContainer = () => {
  return (
    <div>
      <TrendingList />
      <ListenNow />
      <AlbumList />
    </div>
  );
};

export default ListenContainer;
