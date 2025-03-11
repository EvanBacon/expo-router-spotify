"use server";

// Fetch authenticated data from Spotify and render UI.

import React from "react";

import type { SpotifySongData } from "@/lib/spotify-auth";
import { Text } from "react-native";
import UserPlaylistsServer from "@/components/user-playlists-server";
import Playlist from "@/components/playlist-info";
import SearchResults from "@/components/search-results";
import { fetchSpotifyDataAsync } from "./spotify-server-api";
import type {
  SpotifyPaging,
  SpotifyPlaylist,
  SpotifyPlaylistData,
} from "./spotify-api-types";

// Original search function
export const renderSongsAsync = async ({
  query,
  limit,
}: {
  query: string;
  limit?: number;
}) => {
  const res = await fetchSpotifyDataAsync<SpotifySongData>(
    `/v1/search?` +
      new URLSearchParams({
        q: query,
        type: "track,artist,album",
        limit: limit?.toString() ?? "10",
      })
  );
  // const res = require("@/fixtures/drake-search.json") as SpotifySongData;
  return <SearchResults data={res} query={query} />;
};

export const getUserPlaylists = async ({
  limit = 20,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
}) => {
  const data = await fetchSpotifyDataAsync<SpotifyPaging<SpotifyPlaylist>>(
    `/v1/me/playlists?` +
      new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })
  );

  // Handle empty response
  if (!data?.items?.length) {
    return (
      <Text
        style={{
          alignItems: "center",
          padding: 16,
          color: "#6b7280",
        }}
      >
        No playlists found
      </Text>
    );
  }

  return <UserPlaylistsServer data={data} />;
};

export const renderPlaylistAsync = async ({
  playlistId,
}: {
  playlistId: string;
}) => {
  const data = await fetchSpotifyDataAsync<SpotifyPlaylistData>(
    `/v1/playlists/${playlistId}`
  );

  const userData = await fetchSpotifyDataAsync<any>(data.owner.href);

  return <Playlist data={data} user={userData} />;
};
