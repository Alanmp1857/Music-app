// Define Artist interface
interface Artist {
  id: string;
  name: string;
  url: string;
  image: boolean;
  type: string;
  role: string;
}

// Define Image interface
interface Image {
  link: string;
}

// Define downloadUrl interface
interface downloadUrl {
  quality: string;
  link: string;
}

// Define Song interface
interface Song {
  primaryArtists: string;
  id: string;
  name: string;
  playCount: string;
  language: string;
  downloadUrl: downloadUrl[];
  artists: Artist[];
  image: Image[];
  songs: string;
}

// Define SongCardProps interface
interface SongCardProps {
  song: Song;
}

export type { Song, SongCardProps };
