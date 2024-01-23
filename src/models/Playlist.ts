export default interface Image {
  link: string;
}

// Define the Playlist interface
export default interface PlayList {
  id: string;
  title: string;
  image: Image[];
}

// Define the Album interface
export default interface Album {
  id: string;
  name: string;
  image: Image[];
}
