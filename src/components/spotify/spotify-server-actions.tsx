"use server";

import React from "react";

import { SongItem } from "../songs";

import type { SpotifySongData } from "@/lib/spotify-auth";
import { Button, Text, View } from "react-native";
import UserPlaylistsServer from "./user-playlists-server";
import { Stack } from "expo-router";

// Get user's playlists
// Types for Spotify API responses
export interface SpotifyPaging<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SpotifyPlaylist {
  collaborative: boolean;
  description: string | null;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number | null;
    width: number | null;
  }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  public: boolean;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

// Types for Spotify API responses
interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: SpotifyImage[];
  genres: string[];
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  release_date: string;
  total_tracks: number;
  artists: SpotifyArtist[];
  external_urls: {
    spotify: string;
  };
}

// Helper function to handle Spotify API responses
const handleSpotifyResponse = async (response: Response) => {
  const data = await response.json();
  if ("error" in data) {
    const err = new Error(data.error.message);
    // @ts-expect-error
    err.statusCode = data.error.status;
    throw err;
  }
  return data;
};

// Original search function
export const renderSongsAsync = async (
  auth: { access_token: string },
  { query, limit }: { query: string; limit?: number }
) => {
  const res = (await fetch(
    `https://api.spotify.com/v1/search?` +
      new URLSearchParams({
        q: query,
        type: "track",
        limit: limit?.toString() ?? "10",
      }),
    {
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    }
  ).then(handleSpotifyResponse)) as SpotifySongData;

  return (
    <>
      {res.tracks.items.map((track) => (
        <SongItem
          href={track.external_urls.spotify}
          key={track.id}
          image={track.album.images[0].url}
          title={track.name}
          artist={track.artists.map((artist) => artist.name).join(", ")}
        />
      ))}
    </>
  );
};

export const getUserPlaylists = async (
  auth: { access_token: string },
  { limit = 20, offset = 0 }: { limit?: number; offset?: number }
) => {
  const data = (await fetch(
    `https://api.spotify.com/v1/me/playlists?` +
      new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      }),
    {
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    }
  ).then(handleSpotifyResponse)) as SpotifyPaging<SpotifyPlaylist>;

  //   console.log("DATA", data.items[0].);
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

  return <UserPlaylistsServer data={data} dom={{ matchContents: true }} />;
};

// Get user's top tracks
export const getTopTracks = async (
  auth: { access_token: string },
  {
    timeRange = "medium_term",
    limit = 20,
  }: {
    timeRange?: "short_term" | "medium_term" | "long_term";
    limit?: number;
  }
) => {
  const data = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?` +
      new URLSearchParams({
        time_range: timeRange,
        limit: limit.toString(),
      }),
    {
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    }
  ).then(handleSpotifyResponse);

  return (
    <div className="space-y-4">
      {data.items.map((track) => (
        <SongItem
          href={track.external_urls.spotify}
          key={track.id}
          image={track.album.images[0].url}
          title={track.name}
          artist={track.artists.map((artist) => artist.name).join(", ")}
        />
      ))}
    </div>
  );
};

// Get recently played tracks
export const getRecentlyPlayed = async (
  auth: { access_token: string },
  {
    limit = 20,
    before,
    after,
  }: { limit?: number; before?: number; after?: number }
) => {
  const params: Record<string, string> = { limit: limit.toString() };
  if (before) params.before = before.toString();
  if (after) params.after = after.toString();

  const data = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played?` +
      new URLSearchParams(params),
    {
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    }
  ).then(handleSpotifyResponse);

  return (
    <div className="space-y-4">
      {data.items.map((item) => (
        <SongItem
          href={item.track.external_urls.spotify}
          key={item.track.id}
          image={item.track.album.images[0].url}
          title={item.track.name}
          artist={item.track.artists.map((artist) => artist.name).join(", ")}
          playedAt={new Date(item.played_at).toLocaleString()}
        />
      ))}
    </div>
  );
};

// Get recommendations based on seed tracks
export const getRecommendations = async (
  auth: { access_token: string },
  {
    seedTracks,
    limit = 20,
    minEnergy,
    maxEnergy,
    minDanceability,
    maxDanceability,
  }: {
    seedTracks: string[];
    limit?: number;
    minEnergy?: number;
    maxEnergy?: number;
    minDanceability?: number;
    maxDanceability?: number;
  }
) => {
  const params: Record<string, string> = {
    seed_tracks: seedTracks.join(","),
    limit: limit.toString(),
  };

  if (minEnergy !== undefined) params.min_energy = minEnergy.toString();
  if (maxEnergy !== undefined) params.max_energy = maxEnergy.toString();
  if (minDanceability !== undefined)
    params.min_danceability = minDanceability.toString();
  if (maxDanceability !== undefined)
    params.max_danceability = maxDanceability.toString();

  const data = await fetch(
    `https://api.spotify.com/v1/recommendations?` + new URLSearchParams(params),
    {
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    }
  ).then(handleSpotifyResponse);

  return (
    <div className="space-y-4">
      {data.tracks.map((track) => (
        <SongItem
          href={track.external_urls.spotify}
          key={track.id}
          image={track.album.images[0].url}
          title={track.name}
          artist={track.artists.map((artist) => artist.name).join(", ")}
        />
      ))}
    </div>
  );
};

// Get user's saved albums
export const getSavedAlbums = async (
  auth: { access_token: string },
  { limit = 20, offset = 0 }: { limit?: number; offset?: number }
) => {
  const data = await fetch(
    `https://api.spotify.com/v1/me/albums?` +
      new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      }),
    {
      headers: { Authorization: `Bearer ${auth.access_token}` },
    }
  ).then((res) =>
    handleSpotifyResponse<SpotifyPaging<{ album: SpotifyAlbum }>>(res)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.items.map(({ album }) => (
        <div
          key={album.id}
          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
        >
          <img
            src={album.images[0]?.url ?? "/placeholder.png"}
            alt={`${album.name} cover`}
            className="w-full aspect-square object-cover rounded-md"
          />
          <h3 className="font-semibold mt-2 truncate" title={album.name}>
            {album.name}
          </h3>
          <p className="text-sm text-gray-600 truncate">
            {album.artists.map((artist) => artist.name).join(", ")}
          </p>
          <p className="text-xs text-gray-500">{album.total_tracks} tracks</p>
        </div>
      ))}
    </div>
  );
};

// Get user's followed artists
export const getFollowedArtists = async (
  auth: { access_token: string },
  { limit = 20, after }: { limit?: number; after?: string }
) => {
  const params = new URLSearchParams({
    type: "artist",
    limit: limit.toString(),
  });
  if (after) params.set("after", after);

  const data = await fetch(
    `https://api.spotify.com/v1/me/following?${params}`,
    {
      headers: { Authorization: `Bearer ${auth.access_token}` },
    }
  ).then((res) =>
    handleSpotifyResponse<{ artists: SpotifyPaging<SpotifyArtist> }>(res)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.artists.items.map((artist) => (
        <div
          key={artist.id}
          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
        >
          <img
            src={artist.images[0]?.url ?? "/placeholder.png"}
            alt={`${artist.name} profile`}
            className="w-full aspect-square object-cover rounded-full"
          />
          <h3
            className="font-semibold mt-2 text-center truncate"
            title={artist.name}
          >
            {artist.name}
          </h3>
          <p className="text-sm text-gray-600 text-center">
            {artist.followers.total.toLocaleString()} followers
          </p>
          <div className="flex flex-wrap gap-1 mt-2 justify-center">
            {artist.genres.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="text-xs bg-gray-100 px-2 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Get featured playlists
export const getFeaturedPlaylists = async (
  auth: { access_token: string },
  {
    limit = 20,
    offset = 0,
    country,
    locale,
    timestamp,
  }: {
    limit?: number;
    offset?: number;
    country?: string;
    locale?: string;
    timestamp?: string;
  }
) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });
  if (country) params.set("country", country);
  if (locale) params.set("locale", locale);
  if (timestamp) params.set("timestamp", timestamp);

  const data = await fetch(
    `https://api.spotify.com/v1/browse/featured-playlists?${params}`,
    {
      headers: { Authorization: `Bearer ${auth.access_token}` },
    }
  ).then((res) =>
    handleSpotifyResponse<{
      message: string;
      playlists: SpotifyPaging<SpotifyPlaylist>;
    }>(res)
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{data.message}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.playlists.items.map((playlist) => (
          <div
            key={playlist.id}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <img
              src={playlist.images[0]?.url ?? "/placeholder.png"}
              alt={`${playlist.name} cover`}
              className="w-full aspect-square object-cover rounded-md"
            />
            <h3 className="font-semibold mt-2 truncate" title={playlist.name}>
              {playlist.name}
            </h3>
            {playlist.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {playlist.description}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              By {playlist.owner.display_name} • {playlist.tracks.total} tracks
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Get new releases
export const getNewReleases = async (
  auth: { access_token: string },
  {
    limit = 20,
    offset = 0,
    country,
  }: {
    limit?: number;
    offset?: number;
    country?: string;
  }
) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });
  if (country) params.set("country", country);

  const data = await fetch(
    `https://api.spotify.com/v1/browse/new-releases?${params}`,
    {
      headers: { Authorization: `Bearer ${auth.access_token}` },
    }
  ).then((res) =>
    handleSpotifyResponse<{ albums: SpotifyPaging<SpotifyAlbum> }>(res)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.albums.items.map((album) => (
        <div
          key={album.id}
          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
        >
          <img
            src={album.images[0]?.url ?? "/placeholder.png"}
            alt={`${album.name} cover`}
            className="w-full aspect-square object-cover rounded-md"
          />
          <h3 className="font-semibold mt-2 truncate" title={album.name}>
            {album.name}
          </h3>
          <p className="text-sm text-gray-600 truncate">
            {album.artists.map((artist) => artist.name).join(", ")}
          </p>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">
              {new Date(album.release_date).toLocaleDateString()}
            </span>
            <span className="text-xs text-gray-500">
              {album.total_tracks} tracks
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Get available genres
export const getAvailableGenres = async (auth: { access_token: string }) => {
  const data = await fetch(
    "https://api.spotify.com/v1/recommendations/available-genre-seeds",
    {
      headers: { Authorization: `Bearer ${auth.access_token}` },
    }
  ).then((res) => handleSpotifyResponse<{ genres: string[] }>(res));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {data.genres.map((genre) => (
        <div
          key={genre}
          className="p-2 bg-gray-100 rounded-lg text-center hover:bg-gray-200 transition-colors"
        >
          <span className="text-sm capitalize">{genre.replace(/-/g, " ")}</span>
        </div>
      ))}
    </div>
  );
};

// Get category playlists
export const getCategoryPlaylists = async (
  auth: { access_token: string },
  {
    categoryId,
    limit = 20,
    offset = 0,
    country,
  }: {
    categoryId: string;
    limit?: number;
    offset?: number;
    country?: string;
  }
) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });
  if (country) params.set("country", country);

  const data = await fetch(
    `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?${params}`,
    {
      headers: { Authorization: `Bearer ${auth.access_token}` },
    }
  ).then((res) =>
    handleSpotifyResponse<{ playlists: SpotifyPaging<SpotifyPlaylist> }>(res)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.playlists.items.map((playlist) => (
        <div
          key={playlist.id}
          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
        >
          <img
            src={playlist.images[0]?.url ?? "/placeholder.png"}
            alt={`${playlist.name} cover`}
            className="w-full aspect-square object-cover rounded-md"
          />
          <h3 className="font-semibold mt-2 truncate" title={playlist.name}>
            {playlist.name}
          </h3>
          {playlist.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {playlist.description}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            By {playlist.owner.display_name} • {playlist.tracks.total} tracks
          </p>
        </div>
      ))}
    </div>
  );
};

export const renderPlaylistAsync = async (
  auth: { access_token: string },
  { playlistId }: { playlistId: string }
) => {
  const data = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: { Authorization: `Bearer ${auth.access_token}` },
    }
  ).then(handleSpotifyResponse);

  console.log("DATA", data);
  return (
    <>
      <Stack.Screen
        options={{
          title: data.name,
        }}
      />
      <View className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.tracks.items.map((item) => (
          <SongItem
            href={item.track.external_urls.spotify}
            key={item.track.id}
            image={item.track?.album?.images?.[0]?.url}
            title={item.track.name}
            artist={item.track.artists.map((artist) => artist.name).join(", ")}
          />
        ))}
      </View>
    </>
  );
};
