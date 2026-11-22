import React from "react";
import ShowTrendingList from "../../listenNow/trendingList/ShowTrendingList";

// Generic component for displaying a playlist
const ShowPlaylist = () => {
  return (
    <div className="content-page detail-page">
      {/* Reusing the ShowTrendingList component */}
      <ShowTrendingList />
    </div>
  );
};

export default ShowPlaylist;
