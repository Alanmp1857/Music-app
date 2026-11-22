// const BASE_URL = "https://saavn.sumit.co";
const BASE_URL = "https://saavn.bycomsolutions.com";

// Core API paths
const API = `${BASE_URL}/api`;
const SEARCH = `${API}/search`;

// Exported URLs
export const baseURL = BASE_URL;

export const songURL = `${API}/songs`;
export const albumURL = `${API}/albums`;
export const playlistURL = `${API}/playlists`;
export const homepageURL = `${API}/playlists?id=107605145`;

// Search URLs
export const searchSongURL = `${SEARCH}/songs`;
export const searchAlbumURL = `${SEARCH}/albums`;
export const searchArtistURL = `${SEARCH}/artists`;
export const searchPlaylistURL = `${SEARCH}/playlists`;

// Additional endpoints (non-API root)
export const popularPlaylistURL = `${BASE_URL}/playlists?id=`;
export const albumByIdURL = `${BASE_URL}/albums?id=`;
export const searchSongResultURL = `${BASE_URL}/songs?id=`;
export const searchTrendingPlaylistURL = `${BASE_URL}/search/playlists?query=`;
export const artistSongsURL = `${API}/search/artists?query=`;
