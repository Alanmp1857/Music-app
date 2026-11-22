import React from "react";
import ShowTrendingList from "../../listenNow/trendingList/ShowTrendingList";

// Generic component for displaying a playlist
const ShowPlaylist = () => {
  return (
    <div
      style={{
        marginTop: "100px",
        marginLeft: "280px",
        width: "80%",
      }}>
      {/* Reusing the ShowTrendingList component */}
      <ShowTrendingList />
    </div>
  );
};

export default ShowPlaylist;
