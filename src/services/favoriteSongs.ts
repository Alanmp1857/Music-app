import axios from "axios";
import Song from "../models/index";

// add to favourites
const addFavSong = (newSong: Song) => {
  return axios.post("http://localhost:4000/user-favourite", newSong);
};

//get all favourites
const getFavSong = () => {
  return axios.get("http://localhost:4000/user-favourite");
};

//remove from favourites
const removeFavSong = (id: string) => {
  return axios.delete(`http://localhost:4000/user-favourite/${id}`);
};

export { addFavSong, getFavSong, removeFavSong };
