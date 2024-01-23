import React from "react";
import ShowTrendingList from "../../listenNow/trendingList/ShowTrendingList";

// Component for displaying the Hindi playlist
const ShowHindiPlaylist = () => {
  return (
    <div style={{ marginTop: "100px", marginLeft: "280px", width: "80%" }}>
      {/* Reusing the ShowTrendingList component */}
      <ShowTrendingList />
    </div>
  );
};

export default ShowHindiPlaylist;
