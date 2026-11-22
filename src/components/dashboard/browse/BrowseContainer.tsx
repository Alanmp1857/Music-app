import Playlist from "./playlist/Playlist";

const BrowseContainer = () => {
  return (
    <div style={{ marginLeft: "100px" }}>
      <Playlist
        language="English"
        query="english"
        containerId="scroll-container-english"
        isFirst={true}
      />
      <Playlist
        language="Hindi"
        query="hindi"
        containerId="scroll-container-hindi"
      />
      <Playlist
        language="Telugu"
        query="telugu"
        containerId="scroll-container-telugu"
      />
      <Playlist
        language="Malayalam"
        query="malayalam"
        containerId="scroll-container-malayalam"
      />
    </div>
  );
};

export default BrowseContainer;
