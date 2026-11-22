import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Premium from "./components/premium/Premium";
import BrowseContainer from "./components/dashboard/browse/BrowseContainer";
import SearchSongResult from "./components/dashboard/searchSong/SearchSongResult";
import ListenContainer from "./components/dashboard/listenNow/ListenContainer";
import ShowTrendingList from "./components/dashboard/listenNow/trendingList/ShowTrendingList";
import ShowAlbumList from "./components/dashboard/listenNow/albums/ShowAlbumList";
import ShowPlaylist from "./components/dashboard/browse/playlist/ShowPlaylist";
import Library from "./components/dashboard/librarySongs/Library";
import ArtistSongs from "./components/dashboard/searchSong/ArtistSongs";
import "./App.css";
import HeaderV2 from "./components/header/HeaderV2";
import { MusicPlayerProvider } from "./contexts/MusicPlayerContext";
import GlobalPlayer from "./components/musicPlayer/GlobalPlayer";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#121c21",
        paddingBottom: "100px",
        minHeight: "100vh",
      }}>
      <MusicPlayerProvider>
        <GlobalPlayer />
        <BrowserRouter>
          <HeaderV2 />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/browse" element={<BrowseContainer />} />
            <Route path="/listen-now" element={<ListenContainer />} />
            <Route path="/search/:id" element={<SearchSongResult />} />
            <Route path="/search/:type/:id" element={<SearchSongResult />} />
            <Route path="/artist/:artistName" element={<ArtistSongs />} />
            <Route path="/trending/:id" element={<ShowTrendingList />} />
            <Route path="/playlist/:id" element={<ShowPlaylist />} />
            <Route path="/album/:id" element={<ShowAlbumList />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </BrowserRouter>
      </MusicPlayerProvider>
    </div>
  );
}

export default App;
