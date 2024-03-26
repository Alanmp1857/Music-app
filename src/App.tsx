import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Premium from "./components/premium/Premium";
import BrowseContainer from "./components/dashboard/browse/BrowseContainer";
import HomePage from "./components/dashboard/HomePage";
import SearchSongResult from "./components/dashboard/searchSong/SearchSongResult";
import ListenContainer from "./components/dashboard/listenNow/ListenContainer";
import ShowTrendingList from "./components/dashboard/listenNow/trendingList/ShowTrendingList";
import ShowAlbumList from "./components/dashboard/listenNow/albums/ShowAlbumList";
import ShowPlaylistEnglish from "./components/dashboard/browse/englishPlaylist/ShowPlaylistEnglish";
import Library from "./components/dashboard/librarySongs/Library";
import "./App.css";

function App() {
  return (
    <div style={{ backgroundColor: "#121c21" }}>
      <BrowserRouter>
        <HomePage />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/browse" element={<BrowseContainer />} />
          <Route path="/listen-now" element={<ListenContainer />} />
          <Route path="/search/:id" element={<SearchSongResult />} />
          <Route path="/trending/:id" element={<ShowTrendingList />} />
          <Route path="/playlist/:id" element={<ShowPlaylistEnglish />} />
          <Route path="/album/:id" element={<ShowAlbumList />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
