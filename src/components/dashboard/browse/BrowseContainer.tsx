import EnglishPlaylist from "./englishPlaylist/EnglishPlaylist";
import HindiPlaylist from "./hindiPlaylist/HindiPlaylist";
import TamilPlaylist from "./tamilPlaylist/TamilPlaylist";
import TeluguPlaylist from "./teluguPlaylist/TeluguPlaylist";
const BrowseContainer = () => {
  return (
    <div style={{ marginLeft: "300px" }}>
      <EnglishPlaylist />
      <HindiPlaylist />
      <TeluguPlaylist />
      <TamilPlaylist />
    </div>
  );
};

export default BrowseContainer;
