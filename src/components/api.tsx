"use client";

import { createSpotifyAPI } from "@/components/spotify/spotify-actions";
import {
  getTopTracks,
  getUserPlaylists,
  renderSongsAsync,
  getAvailableGenres,
  getCategoryPlaylists,
  getFeaturedPlaylists,
  getFollowedArtists,
  getNewReleases,
  getRecentlyPlayed,
  getRecommendations,
  getSavedAlbums,
  renderPlaylistAsync,
} from "@/components/spotify/spotify-server-actions";

export const {
  Provider: SpotifyActionsProvider,
  useSpotify: useSpotifyActions,
} = createSpotifyAPI({
  renderSongsAsync,
  getTopTracks,
  getUserPlaylists,
  getAvailableGenres,
  getCategoryPlaylists,
  getFeaturedPlaylists,
  getFollowedArtists,
  getNewReleases,
  getRecentlyPlayed,
  getRecommendations,
  getSavedAlbums,
  renderPlaylistAsync,
});
