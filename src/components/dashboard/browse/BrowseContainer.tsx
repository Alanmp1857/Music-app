import EnglishPlaylist from "./englishPlaylist/EnglishPlaylist";
import HindiPlaylist from "./hindiPlaylist/HindiPlaylist";
import MalayalamPlaylist from "./malayalamPlaylist/MalayalamPlaylist";
import TeluguPlaylist from "./teluguPlaylist/TeluguPlaylist";
const BrowseContainer = () => {
  return (
    <div style={{ marginLeft: "300px" }}>
      <EnglishPlaylist />
      <HindiPlaylist />
      <TeluguPlaylist />
      <MalayalamPlaylist />
    </div>
  );
};

export default BrowseContainer;
